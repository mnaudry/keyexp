const getters =  {

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

}

export default getters;
   
   