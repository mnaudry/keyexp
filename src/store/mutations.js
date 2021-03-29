const mutations =  {
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

  }
  
  export default mutations;