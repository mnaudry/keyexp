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
                  { id_product : 1 ,name :"KeyNetic", version : "V1", picked : false , shipped : false },
                  { id_product : 2 ,name :"KeyNetic", version : "V1", picked : false , shipped : false },
                  { id_product : 3 ,name :"KeyNetic", version : "V2", picked : false , shipped : false },
                  { id_product : 4 ,name :"KeyVibe",  version : "V2", picked : false , shipped : false }
                ],
                orderPicked  : {},
                orderShipped : {},
              },
              { id: 11 ,
                client: 'Donnald Feza', 
                priority :0, 
                state :2, 
                d_achat :'06/03/2021' , 
                d_p_livraison:1615777800000 ,
                products : [
                  {id_product: 5 , name :"KeyNetic", version : "V1", picked : true , shipped : false },
                  {id_product: 6,  name :"KeyNetic", version : "V1", picked : true , shipped : false },
                ],
                orderPicked  : { id_picked : 1 , products : [ 
                                                              { id: 5, name :"KeyNetic", qrcode :'KeyNetic_V1_145789' , weight : 200 , grouped : false },
                                                              { id: 6, name :"KeyNetic", qrcode : "KeyNetic_V1_145789" , weight : 300, grouped :  true },
                                                            ] 
                               },
                orderShipped : {},
              },
              { id: 12 ,
                client: 'Green Shells', 
                priority :1, 
                state: 1 , 
                d_achat :'07/03/2021' , 
                d_p_livraison:1616209800000,
                products : [
                  { id_product : 7 ,name :"KeyNetic", version : "V1", picked : true , shipped : false },
                  { id_product : 8 ,name :"KeyVibe", version : "V1", picked : true , shipped : false },
                  { id_product : 9 ,name :"KeyVibe", version : "V2", picked : false , shipped : false },
                ],
                orderPicked  : { id_picked : 2 , products : [ 
                                                              { id: 7, name :"KeyNetic" , qrcode :'KeyNetic_V1_145755' , weight : 100, grouped : false },
                                                              { id: 8, name :"KeyVibe", qrcode : "KeyVibe_V1_145759" , weight : 300, grouped : false},
                                                            ] 
                                },
                orderShipped : {},
              },
              {id: 15 ,client: 'shu yang' , priority :1, state :2 , d_achat :'05/03/2021' , d_p_livraison:1616367600000},
              {id: 16 ,client: 'Tufi nayo', priority :4, state : 3 , d_achat :'01/03/2021' , d_p_livraison:1615590000000},
              {id: 14 ,client: 'Shiny Star', priority :0, state :1 , d_achat :'06/03/2021' , d_p_livraison:1615849200000},
              {id: 17 ,client: 'Amadou Umoja', priority :1, state: 2 , d_achat :'06/03/2021' , d_p_livraison:1616194800000},
              {id: 19 ,client: 'Keita Kenté', priority :4 , state: 3 , d_achat :'06/03/2021' , d_p_livraison:1616022000000},
              {id: 20 ,client: 'Audry Djembe', priority :3 , state: 1 , d_achat :'06/03/2021' , d_p_livraison:1616886000000},
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

  productsPicked : [],

  lastIdPicked : 2 ,

  },

  getters: {
    getAllOrders : (state) => {
          return state.orders ;
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


    getProductNotPicked : (state,getters) => (id) => {
      const order = getters.getOrderDetails(id) ;
      return order.products.filter((product)=> {
        return (!product.picked);
      })
    },

    getProductPicked: (state) => {
     // console.log("get infoproduct");
      return  state.productsPicked;
    },


    getProductsOrderPicked : (state, getters) => (id) => {
      const order = getters.getOrderDetails(id.id_order) ;
      if(order && order.orderPicked){

        return order.orderPicked.products ;
      } else {
        return [];
      }
     
    },

    getLastIdPicked : (state) => {
      return state.lastIdPicked;
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

    setLastIdPciked : (state,playload) => {
      state.lastIdPicked  = playload ;
    }

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
       
        const obj = {
          id : product.id ,
          name : product.name,
          qrcode : product.qrcode,
          weight : product.weight,
          canBeDelete : false,
          grouped : product.grouped,
        }
        return obj;
      })
      console.log(newProducts);
      context.commit('initProductsPickedFromOrder',newProducts);
    },


    getNewIdPicked : function(context) {

        //ask to the server .....

        return new Promise((resolve) => {

          let id = context.getLastIdPicked();
            id++;
          context.commit('setLastIdPciked',id);
          resolve();

        });
        

    }

  },


  modules: {

  }
})
