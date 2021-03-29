import Vue from 'vue'
import Vuex from 'vuex'


import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

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

    getters,
    mutations,
    actions,
    modules: {

    }
})