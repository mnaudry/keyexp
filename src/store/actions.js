const actions =  {

    generateInfoProduct : function (context,playload) {
 
        return new Promise((resolve) => {
         
         /// ask to server ....
         const product = playload ;

         const digit = Math.floor(100000 + Math.random() * 9000000);
         let weight = (Math.floor(Math.random() * 5) * 100); 
         if(weight === 0)
           weight = 100;
         let infoProduct = {
             id : product.id_product ,
             name : product.name,
             qrcode : `${product.name}_${product.version}_${digit}`,
             weight : weight,
             canBeDelete : true ,
             grouped : false ,
             shipped : false,
         };
         
         context.commit('addProductPicked',infoProduct);
         resolve();
          
           
       }); 
   
   
   },

   removeAllProductsPicked : function (context) {

      context.commit('removeAllProductsPicked');
         
    },


    removeProductPicked : function (context,playload) {

     context.commit('removeProductPicked',playload);
        
   },

   initProductsPickedFromOrder : function (context, playload) {

     const products = context.getters.getProductsOrderPicked(playload) ;
     //products.canBeDelete = false ;
     const newProducts = products.map((product)=>{
       //let obj =  Object.create(product);
       //obj.canBeDelete = false;
      
       let obj = {
         id : product.id ,
         name : product.name,
         qrcode : product.qrcode,
         weight : product.weight,
         canBeDelete : false,
         grouped : product.grouped,
         shipped : product.shipped,
       }
       return obj;
     })
     //console.log(newProducts);
     context.commit('initProductsPickedFromOrder',newProducts);
   },


   getNewIdPicked : function(context) {

       //ask to the server .....

       return new Promise((resolve) => {

         let id = context.getters.getLastIdPicked;
           id++;
         context.commit('setLastIdPicked',id);
         resolve();

       });
       

   },

   saveProductsPicked : function(context,playload){


     return new Promise((resolve) => {
      
       const  productsTopicked = playload.products ;
       const ids =  playload.ids ;
       

       let orderState = context.getters.getOrderDetails(ids.id_order);

       let changeThis = {} ;

       //flag to check if this order have already  a picked object
       changeThis.havePickedProduct = false ;

       //Object.keys(product.shipped).length !== 0 
       if(Object.keys(orderState.orderPicked).length !== 0){

         changeThis.id_picked = orderState.orderPicked.id_picked;
         changeThis.havePickedProduct = true ;
         
       }else {
         const lastId = context.getters.getLastIdPicked;
         const nextId = lastId + 1;
         // change last Id

         context.commit('setLastIdPicked',nextId);

         changeThis.id_picked = nextId;

       }

 
       // products to add in state.order[id].orderPicked.products
       changeThis.products = [] ;

       // id_product to change picked state in state.order[id]
       changeThis.ids_products = [] ;

       for(let product of productsTopicked){

         let obj = {
           id : product.id ,
           name : product.name,
           qrcode : product.qrcode,
           weight : product.weight,
           grouped : product.grouped,
           shipped : product.shipped,
         }
         changeThis.products.push(obj);
         changeThis.ids_products.push(product.id);
       }

       //use it like getter in savePoductsPicked and changeProductsPickedStatus
       changeThis.order = orderState;

       // change PickedProduct state state.order[id].products.picked
       context.commit('changeProductsPickedStatus',changeThis);
       // add new products  state.order[id].orderPicked.products
       context.commit('saveProductsPicked',changeThis);

       const response = {
         id_picked : changeThis.id_picked ,
         status : "saved" ,
       }

       //console.log(changeThis);
       
       resolve(response);

     });

   },

   saveProductsGrouped : function(context,playload){

     return new Promise((resolve) => {
      
       const  productsNotGrouped = playload.products ;
       const id_order =  playload.orderPicked.id_order ;
       const id_picked = playload.orderPicked.id;
       const weight = playload.totalWeight;
       const pack = playload.pack;
       

       let orderState = context.getters.getOrderDetails(id_order);

       let changeThis = {} ;

         
       
       const lastId = context.getters.getLastIdGrouped;
       const nextId = lastId + 1;
         // change last Id

       context.commit('setLastIdGrouped',nextId);

       changeThis.group = {
         id_group  :  nextId ,
         id_picked : id_picked,
         id_order : id_order ,
         weight : weight,
         pack : pack,
         products : [],
         shipped : {},
       }

       // id_product to change Grouped state in state.order[id] , state.order[id].orderPicked.products ,
       changeThis.ids_products = [] ;

       for(let product of productsNotGrouped){

         let obj = {
           id : product.id ,
           name : product.name,
           qrcode : product.qrcode,
           weight : product.weight,
         }
         changeThis.group.products.push(obj);
         changeThis.ids_products.push(product.id);
       }

       //use it like getter in saveProductsGrouped and changeProductsGroupedStatus
       changeThis.order = orderState;

       // change  state.order[id].products  and state.order[id].orderPicked.products
       context.commit('changeProductsGroupedStatus',changeThis);
       // add new orderPickedGroup in  state.order[id].orderPickedGroup
       context.commit('saveProductsGrouped',changeThis);
     
       const response = {
         id_group : nextId ,
         id_order : id_order,
         status : "saved" ,
       }

       //console.log(changeThis);
       
       resolve(response);

     });
   },


   savePackageShipped : function(context,playload){

     return new Promise((resolve) => {
      
       const id_order =  playload.group.id_order ;
       const id_picked = playload.group.id_picked;
       const id_group = playload.group.id_group;
       //const tracking = playload.tracking;

       //console.log(id_order,id_picked,id_group);
       
         
       let orderState = context.getters.getOrderDetails(id_order);


       let products = context.getters.getProductOfPickedOrderGroup({id_order : id_order , id_group : id_group});

       let ids = products.map((product)=>{
         return product.id ;
       })

       
       let changeThis = {} ;

         
       
       const lastId = context.getters.getLastIdShipped;
       const nextId = lastId + 1;
      
       context.commit('setLastIdShipped',nextId);

  

       changeThis.ship = {
         id_ship : nextId,
         id_picked : id_picked,
         id_group : id_group,
         id_order : id_order,
         weight : playload.group.weight,
         tracking : playload.tracking,
         tracking_status : Math.floor(Math.random() * 4) ,
       }

       changeThis.id_products = ids ;
       
       changeThis.id_group = id_group;
       changeThis.order = orderState;



       // change  state.order[id].products ,  state.order[id].orderPicked.products and state.order[id].orderPickedGroup.shipped
       context.commit('changeProductsShippedStatus',changeThis);
       // add new orderPickedGroup in  state.order[id].orderShipped
       context.commit('savePackageShipped',changeThis);



       const response = {
         id_group : nextId ,
         id_order : id_order,
         status : "saved" ,
       }
       
       resolve(response);

     });
   },

 }

 export default actions;