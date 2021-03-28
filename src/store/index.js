import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //Etat : 0  en attente , 1 : en cours de prép. , 2 : prêt à expedié , 3 : expédié , 4 :en cours de livraison , 5 :livré
    orders: [
              { id: 10 ,
                client: 'guillaume Star' , 
                priority : 0 , 
                state :0, 
                d_achat :'06/03/2021' , 
                d_p_livraison:1616038364820, 
                products : [
                  { id_product : 1 ,name :"KeyNetic", version : "V1", picked : false , shipped : false, grouped : false },
                  { id_product : 2 ,name :"KeyNetic", version : "V1", picked : false , shipped : false, grouped : false },
                  { id_product : 3 ,name :"KeyNetic", version : "V2", picked : false , shipped : false, grouped : false },
                  { id_product : 4 ,name :"KeyVibe",  version : "V2", picked : false , shipped : false, grouped : false }
                ],
                orderPicked  : {},
                orderPickedGroup : [],
                orderShipped : [],
              },
              { id: 11 ,
                client: 'Donnald Feza', 
                priority :0, 
                state :2, 
                d_achat :'06/03/2021' , 
                d_p_livraison:1615777800000 ,
                products : [
                  {id_product: 5 , name :"KeyNetic", version : "V1", picked : true , shipped : false, grouped : true },
                  {id_product: 6,  name :"KeyNetic", version : "V1", picked : true , shipped : false, grouped : false },
                ],
                orderPicked  : { id_picked : 1 , products : [ 
                                                              { id: 5, name :"KeyNetic", qrcode :'KeyNetic_V1_145789' , weight : 200, shipped : false, grouped : true, id_group : 1, },
                                                              { id: 6, name :"KeyNetic", qrcode : "KeyNetic_V1_145789" , weight : 300,shipped : false, grouped : false , id_group : 0 },
                                                            ] 
                               },
                orderPickedGroup :[ 
                                    { id_group : 1, 
                                      id_picked : 1, 
                                      id_order : 11 , 
                                      weight : 200, 
                                      pack : { id : 1 , name : "small package" ,  maxWeight: 500 }, 
                                      shipped : {} , 
                                      products : [
                                                    { id: 5, name :"KeyNetic", qrcode :'KeyNetic_V1_145789' , weight : 200 },
                                                 ]
                                    },
                                  ],
                orderShipped : [],
              },
              { id: 12 ,
                client: 'Green Shells', 
                priority :1, 
                state: 1 , 
                d_achat :'07/03/2021' , 
                d_p_livraison:1616209800000,
                products : [
                  { id_product : 7 ,name :"KeyNetic", version : "V1", picked : true , grouped : false , shipped : false },
                  { id_product : 8 ,name :"KeyVibe", version : "V1", picked : true , grouped : false, shipped : false },
                  { id_product : 9 ,name :"KeyVibe", version : "V2", picked : false , grouped : false, shipped : false },
                ],
                orderPicked  : { id_picked : 2 , products : [ 
                                                              { id: 7, name :"KeyNetic" , qrcode :'KeyNetic_V1_145755' , weight : 100, grouped : false },
                                                              { id: 8, name :"KeyVibe", qrcode : "KeyVibe_V1_145759" , weight : 300, grouped : false},
                                                            ] 
                                },
                orderPickedGroup : [],
                orderShipped : [],
              },
              { id: 15 ,
                client: 'shu yang' , 
                priority :1, 
                state :0 , 
                d_achat :'05/03/2021' , 
                d_p_livraison:1616367600000,
                products : [
                  { id_product : 10 ,name :"KeyNetic", version : "V2", picked : false , grouped : false, shipped : false },
                  { id_product : 11 ,name :"KeyNetic", version : "V1", picked : false , grouped : false, shipped : false },
                  { id_product : 12 ,name :"KeyNetic", version : "V1", picked : false , grouped : false, shipped : false },
                  { id_product : 13 ,name :"KeyVibe",  version : "V2", picked : false , grouped : false, shipped : false }
                ],
                orderPicked  : {} ,
                orderPickedGroup : [],
                orderShipped : [],
              },
              { id: 16 ,
                client: 'Tufi nayo', 
                priority :4, 
                state : 3 , 
                d_achat :'01/03/2021' , 
                d_p_livraison:1615590000000,
                products : [
                  { id_product : 14 ,name :"KeyNetic", version : "V2", picked : true , grouped : true, shipped : true },
                ],
                orderPicked  :  { id_picked : 3 , products : [ 
                                                              { id: 14, name :"KeyNetic" , qrcode :'KeyNetic_V2_155855' , weight : 400, grouped : true, shipped : true },
                                                             ] 
                                },
                orderPickedGroup : [
                                      { id_group : 2, 
                                        id_picked : 3, 
                                        id_order : 16 , 
                                        weight : 400, 
                                        pack : { id : 1 , name : "small package" ,  maxWeight: 500 }, 
                                        shipped : {id_ship : 1 },
                                        products : [
                                                    { id: 5, name :"KeyNetic", qrcode :'KeyNetic_V1_145789' , weight : 200 },
                                                  ],
                                      },

                                   ],
                orderShipped : [
                                {
                                  id_ship : 1,
                                  id_group : 2,
                                  id_picked : 3,
                                  id_order : 16,
                                  weight :400,
                                  tracking : "1L452456",
                                  tracking_status : 3,
                                }
                ],
              },
              { id: 14 ,
                client: 'Shiny Star', 
                priority :0, 
                state :1 , 
                d_achat :'06/03/2021' , 
                d_p_livraison:1615849200000,
                products : [
                  { id_product : 15 ,name :"KeyNetic", version : "V1", picked : false , grouped : false, shipped : false },
                  { id_product : 16 ,name :"KeyNetic", version : "V1", picked : false , grouped : false, shipped : false },
                  { id_product : 17 ,name :"KeyNetic", version : "V1", picked : false , grouped : false, shipped : false },
                  { id_product : 18 ,name :"KeyNetic",  version : "V1", picked :true , grouped : false, shipped : false },
                  { id_product : 19 ,name :"KeyNetic",  version : "V1", picked : true , grouped : false,  shipped : false }
                ],
                orderPicked  : { id_picked : 4 , products : [ 
                                                               { id: 18, name :"KeyNetic" , qrcode :'KeyNetic_V1_455855' , weight : 400, grouped : false , shipped : false },
                                                               { id: 19, name :"KeyNetic" , qrcode :'KeyNetic_V1_455866' , weight : 400, grouped : false , shipped : false },
                                                            ] 
                               },
                orderPickedGroup : [],
                orderShipped : [],
              
              },
              { id: 17 ,
                client: 'Amadou Umoja', 
                priority :1, 
                state: 2 , 
                d_achat :'06/03/2021' , 
                d_p_livraison:1616194800000,
                products : [
                  { id_product : 20 ,name :"KeyVibe", version : "V1", picked : true , grouped : false, shipped : false },
                  { id_product : 21 ,name :"KeyVibe", version : "V1", picked : true , grouped : false, shipped : false },
                ],
                orderPicked  : { id_picked : 5 , products : [ 
                                                               { id: 20, name :"KeyVibe" , qrcode :'KeyVibe_V1_345855' , weight : 400, grouped : false, shipped : false },
                                                               { id: 21, name :"KeyVibe" , qrcode :'KeyVibe_V1_465866' , weight : 400, grouped : false, shipped : false},
                                                            ] 
                               },
                orderPickedGroup : [],
                orderShipped : [],
              
              },
              { id: 19 ,
                client: 'Keita Kenté', 
                priority :0 , 
                state: 0 , 
                d_achat :'06/03/2021' , 
                d_p_livraison:1616022000000,
                products : [
                  { id_product : 22 ,name :"KeyVibe", version : "V1", picked : false , grouped : false, shipped : false },
                  { id_product : 23 ,name :"KeyNetic", version : "V1", picked : false , grouped : false, shipped : false },
                ],
                orderPicked  : {},
                orderPickedGroup : [],
                orderShipped : [],
              },
              { id: 20 ,
                client: 'Audry Djembe', 
                priority :3 , 
                state: 0 , 
                d_achat :'06/03/2021' , 
                d_p_livraison:1616886000000,
                products : [
                  { id_product : 24 ,name :"KeyVibe", version : "V1", picked : false , grouped : false,  shipped : false },
                  { id_product : 25 ,name :"KeyNetic", version : "V1", picked : false , grouped : false, shipped : false },
                  { id_product : 26 ,name :"KeyNetic", version : "V1", picked : false , grouped : false, shipped : false },
                  { id_product : 27 ,name :"KeyVibe",  version : "V2", picked :false , grouped : false, shipped : false },
                  { id_product : 28 ,name :"KeyVibe",  version : "V2", picked : false , grouped : false, shipped : false }
                ],
                orderPicked  : {},
                orderPickedGroup : [],
                orderShipped : [],
              },
  ],

  stateValues :[

     { state : 0 , textState :"En attente" , color : "blue dark"},
     { state : 1 , textState :"En cours de préparation" , color : "yellow"},
     { state : 2 , textState :"Preparé" , color : "orange lighten-1"},
     { state : 3 , textState :"Terminer" , color : "success"},
  ],

  priorityValues : [
   {priority: 0, textPriority :"Retard de" , color : 'error', textState : "En retard" },
   {priority: 1, textPriority :"Reste" , color : 'orange lighten-1', textState : "Reste moins 2 jours" },
   {priority: 2, textPriority:"Reste" , color : "yellow ",  textState : "Reste moins 4 jours" },
   {priority: 3, textPriority:"Reste" , color : "blue dark",  textState : "Reste plus 4 jours" },
   {priority: 4, textPriority:"Traité" , color : "success",  textState : "Traité" },
  ],

  packs : [
    { id : 1 , name : "Small package" ,  maxWeight: 500 },
    { id : 2 , name : "Large package" ,  maxWeight: 1000 },
    { id : 3 , name : "Extra-large package" ,  maxWeight: 1500 },
  ],

  tackingStatus : [
    { id : 0 , text : "Pris en charge par le transporteur"  },
    { id : 1 , text : "Arrivé sur le site de distribution" },
    { id : 2 , text : "En cours de livraison" },
    { id : 3 , text : "Colis distribué" },
  ],

  productsPicked : [],

  lastIdPicked : 5 ,

  lastIdGrouped : 2 ,

  lastIdShipped : 1 ,



  },

  getters: {
    getAllOrders : (state) => {
          return state.orders ;
    },

    getAllHavePickedOrders : (state) => {
        return state.orders.filter((order)=> {
          return (Object.keys(order.orderPicked).length !== 0);
        });
    },

    getAllHavePickedOrderGroups : (state) => {
      return state.orders.filter((order)=> {
        return (order.orderPickedGroup.length !== 0);
      });
    },

    getAllPickedOrderGroups : (state,getters) => {
      //const orders = getters.getAllHavePickedOrderGroups ;

      const orders = getters.getAllOrders;

      const groups = [] ;
      for (const order of orders){
        const pickedGroups = order.orderPickedGroup ;
        if(pickedGroups.length !==  0 ) {
           for(const pickedGroup of pickedGroups){
            const group ={
              id_group : pickedGroup.id_group,
              id_order : pickedGroup.id_order,
              id_picked : pickedGroup.id_picked,
              pack : pickedGroup.pack,
              products : pickedGroup.products,
              shipped : pickedGroup.shipped,
              weight : pickedGroup.weight,
              client : order.client,
            }
           
            groups.push(group);
           }
        }
      }
      //console.log(groups);
      return groups;
    },

    getProductOfPickedOrderGroup : (state,getters) => (ids) =>{
      const order =  getters.getOrderDetails(ids.id_order);
      //console.log(order);
      const orderPickedGroups = order.orderPickedGroup ;

      const group = orderPickedGroups.filter((group)=> {
        return (group.id_group == ids.id_group);
      });


      return group[0].products;

    },

    getAllPickedOrders : (state,getters) => {
      const orders = getters.getAllHavePickedOrders ;
      return orders.map((order)=> {
        return {
          id : order.orderPicked.id_picked,
          client : order.client ,
          id_order : order.id ,
          state : order.state ,
          date : order.d_p_livraison,
          priority : order.priority,
        };
      });
  },

  

    getOrdersByState : (state) => (selectedState) => {

   // return state.orders.map(order => {
     // return [];
      return state.orders.filter(order => {
        return selectedState.includes(order.state) ;
      })

    },


    getOrdersByPriority : (state) => (selectedPriority) => {
     
      return state.orders.filter(order => {
        return selectedPriority.includes(order.priority) ;
      })
    },


    getOrdersBySelectedData : (state,getters) => ( selectedState, selectedPriority) => {
      let selecteds ;
      if(selectedState.length){
        //console.log(selectedState)
        selecteds= getters.getOrdersByState(selectedState) ;
      }
      else 
        selecteds = getters.getAllOrders ;

      if(!selectedPriority.length){
         return selecteds ;
      }

      return selecteds.filter( order => {
        return selectedPriority.includes(order.priority);
      });

    },

    getOrderDetails : (state)  => (id) => {
     
        return state.orders.find((order) => {
           return (order.id === id);
        }) ;
    },

    getStateValues : (state) => {
      return state.stateValues;
    },


    getPriorityValues : (state) => {
      
      return state.priorityValues;
    },


    getTackingStatus : (state) => {
      
      return state.tackingStatus;
    },


    getProductNotPicked : (state,getters) => (id) => {
      const order = getters.getOrderDetails(id) ;
      return order.products.filter((product)=> {
        return (!product.picked);
      })
    },


    getProductNotGrouped : (state,getters) => (id) => {
      const order = getters.getOrderDetails(id) ;
      return order.orderPicked.products.filter((product)=> {
        return (!product.grouped);
      })
    },


    getIdProductNotPicked : (state,getters) => (id) => {
      const products = getters.getProductNotPicked(id) ;
      return products.products.maps((product)=> {
        return product.id_product;
      })
    },

    getProductPicked: (state) => {
     // console.log("get infoproduct");
      return  state.productsPicked;
    },


    getProductsOrderPicked : (state, getters) => (id) => {
      const order = getters.getOrderDetails(id.id_order) ;
      if(order && order.orderPicked){
        return (order.orderPicked.products)?order.orderPicked.products:[];
      } else {
        return [];
      }
     
    },


    getOrderShipped : (state,getters) => (id) => {
      const order = getters.getOrderDetails(id.id_order) ;
      //console.log(id);
     /* const ship =  order.orderShipped.map((ship)=> {
        if(ship.id_ship === id.id_ship)
         return ship;
      });
      if(ship.length === 0 )
        return [];
      else
        return ship[0];*/
        
        let orderShip  = {};
        for(const ship of order.orderShipped){
           if(ship.id_ship === id.id_ship){
             orderShip = ship ;
           }
        }

        return orderShip;
    },


    getLastIdPicked : (state) => {
      return state.lastIdPicked;
    },

    getLastIdGrouped : (state) => {

      return state.lastIdGrouped;
    },

    getLastIdShipped : (state)=> {
      return state.lastIdShipped;
    },

    getPacks : (state) => {
      return state.packs ;
    }


  
  },
  mutations: {
    addProductPicked : (state,playload) => {
      state.productsPicked.push(playload) ;
    },

    removeAllProductsPicked : (state) => {
      state.productsPicked = [] ;
    },

    removeProductPicked : (state,playload) => {
      state.productsPicked =  state.productsPicked.filter((product)=> {
        return (product.id !==  playload );
      });
    },

    initProductsPickedFromOrder : (state,playload) => {
       // let products = playload ;
       // products.canBeDelete = false ;
        state.productsPicked = playload ;
    },

    setLastIdPicked : (state,playload) => {
      state.lastIdPicked  = playload ;
    },

    setLastIdGrouped : (state,playload) => {
      state.lastIdGrouped  = playload ;
    },

    setLastIdShipped : (state,playload) => {
      state.lastIdShipped = playload ;
    },

    changeProductsPickedStatus : (state,changeThis) => {
      let orderState = changeThis.order ;
      const ids = changeThis.ids_products ;
      //pending, prepared or in_preparation
      let prepared = true ;
      let in_preparation = false ;

       for(let product of orderState.products) {
         if(ids.includes(product.id_product)){
           //change picked state
            product.picked = true;
         }
         //use new state 
         prepared &= product.picked ;
         in_preparation |= product.picked ;
       }

       if(prepared) {
         orderState.state = 2;
       }else {
         if(in_preparation){
          orderState.state = 1;
         }else {
          orderState.state = 0;
         }
       }


    },

    changeProductsGroupedStatus : (state,changeThis) => {

      let orderState = changeThis.order ;
      const ids = changeThis.ids_products ;
      const id_group = changeThis.group.id_group ;
      // changeThis.group = { id_group 

     

      for(let product of orderState.products) {
         if(ids.includes(product.id_product)){
            product.grouped = true;
         }
       }


      for(let product of orderState.orderPicked.products) {
        if(ids.includes(product.id)){
          //change picked state
           product.grouped = true;
           product.id_group = id_group;
        }
        
      }

    },

    changeProductsShippedStatus : (state,changeThis) => {

      let orderState = changeThis.order ;
      const ids = changeThis.id_products ;
      const id_group = changeThis.id_group ;
      const id_ship  = changeThis.ship.id_ship ;


      let sucessState = true ; 

      for(let product of orderState.products) {
         if(ids.includes(product.id_product)){
            product.shipped = true;
         }

         sucessState &= product.shipped ;
         
       }


      //change state if all product are shipped
      if(orderState.state !== 3) {
            if(sucessState){
              orderState.state = 3;
              orderState.priority = 4;
            }
            
      }


      for(let product of orderState.orderPicked.products) {
        if(ids.includes(product.id)){
          //change picked state
           product.shipped = true;
        }
        
      }


      for(let orderPickedGroup of orderState.orderPickedGroup){
        if(orderPickedGroup.id_group === id_group){
          orderPickedGroup.shipped = { id_ship : id_ship };
         /* for(product of orderPickedGroup.products ){
              product.shipped = { id_ship : id_ship };
          }*/
        }
      }

      

    },

    saveProductsPicked : (state,changeThis) => {
     
      // getter 
    let orderState = changeThis.order;

     //data to save or change

    let  id_picked = changeThis.id_picked;

    let products = changeThis.products;

    const havePickedProduct = changeThis.havePickedProduct;

      if(havePickedProduct){
        for(let product of products){
          orderState.orderPicked.products.push(product);
        }
      }else {
        orderState.orderPicked = {
          id_picked  : id_picked,
          products : products ,
        }
      }
    },

    saveProductsGrouped : (state,changeThis) => {

      // getter 
    let orderPickedGroup = changeThis.order.orderPickedGroup;

    //data to save or change

    orderPickedGroup.push(changeThis.group);

    },

    savePackageShipped : (state,changeThis) => {

      // getter 
    let orderShipped = changeThis.order.orderShipped;

    //data to save or change

    orderShipped.push(changeThis.ship);

    },

  },
  actions: {

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

  },


  modules: {

  }
})
