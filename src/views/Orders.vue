<template>
  <div class="orders">
   <!-- <v-card outlined class="mt-2">
        <h1 class="text-button pl-2">{{ title }}</h1>
    </v-card>-->
    <HeaderTitle :title ="title" :goBack="goBack"  :showBreadCrumbs="showBreadCrumbs"  />
    <v-card   outlined class="mt-2" >
       <v-row>
        <v-col md="6" sm="12">
           <v-text-field class="ml-2"
              v-model="search"
              append-icon="mdi-magnify"
              label="Rechercher un client ..."
              color="primary"
            ></v-text-field>
        </v-col>
        <v-col md="6" sm="12">
          <div class="pt-2 d-flex">
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined v-bind="attrs"  v-on="on"  color='primary' class="mr-2" @click="initOrders()" >
                          <v-icon color="primary" >
                            mdi-autorenew
                          </v-icon>
                  </v-btn>
              </template>
              <span>Rafraîchir la page</span>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
       <v-row>
          <v-col md="6" sm="12" class="mb-2">
            <v-select dense :items="stateValue" 
                      item-text="textState" 
                      item-value="state" 
                      v-model="selectedState" 
                      multiple  
                      chips 
                      label="Etat" 
                      class="ml-2" 
                      @input="selectedChange"
                       hint="Triez les commandes par Etat"
                       persistent-hint
              >
              <template v-slot:selection="{item}">
                   <v-chip label  :color="item.color"  text-color="white" >
                     {{ item.textState }}
                   </v-chip>
              </template>
            </v-select>
          </v-col>
          <v-col md="6" sm="12" class="mb-2">
            <v-select dense  :items="priorityValue" item-text="textState" item-value="priority" v-model="selectedPriority" multiple  chips label="priorité" class="mr-2" @input="selectedChange"
                      hint="Triez les commandes par priorité"
                      persistent-hint
            >
              <template v-slot:selection="{item}">
                   <v-chip label  :color="item.color"  text-color="white" >
                     {{ item.textState }}
                   </v-chip>
              </template>
            </v-select>
          </v-col>
       </v-row>
    </v-card>
  
     
      <v-card outlined class="mt-2">
      <v-data-table
      :headers="ordersHeaders"
      :items="orders"
      item-key="id"
      :search="search"
      :loading="ordersLoading" 
      :loading-text="ordersLoadingText"
       no-data-text="Pas des commandes disponibles"
      >
        <template v-slot:item.state="{ item }">
          <v-chip label  :color="getState(item.state, true)"  text-color="white" >
            {{ getState(item.state)}}
          </v-chip>
        </template>

         <template v-slot:item.priority="{ item }">
          <v-chip label   :color="getPriority(item.priority,item.d_p_livraison,true)" text-color="white" >
            {{ getPriority(item.priority, item.d_p_livraison) }}
          </v-chip>
        </template>

        <template v-slot:item.d_p_livraison="{ item }">
            {{ date( item.d_p_livraison) }}
        </template>

        <template v-slot:item.actions="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon 
                      color="primary ml-3"
                      v-bind="attrs"
                      v-on="on"
                >
                    <v-icon
                        dense outlined
                        @click="openDetails(item.id)"
                    >
                    mdi-shopping-search
                    </v-icon>
                </v-btn>
              </template>
            <span>Afficher les détails de la commande</span>
            </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>

import Format from 'date-fns/format';
import HeaderTitle from '../components/HeaderTitle';
import Util from '../util';

export default {
  name: 'Home',

  components : {
    HeaderTitle,
  },
  data : function() {
    return {
      title : 'Commandes',
      goBack : false,

      showBreadCrumbs : false ,
    
      search : '',
      selectedState : [
       
      ],
      selectedPriority : [

      ],

      orders : [] ,

      ordersLoading : false ,

      ordersLoadingText : 'chargement  des commandes ... Veuillez patientez',

      stateValue :[],
      priorityValue : [],

    };
  },

  created : function() {
     this.stateValue = this.$store.getters.getStateValues ;
     this.priorityValue = this.$store.getters.getPriorityValues ;
     this.orders = this.loadOrders();
     this.ordersLoading = false;
  },

  computed : {

    ordersHeaders  : function (){
        
         return [
           {
             text : 'Id',
             align: 'start',
             sortable : false,
             value : 'id',
           } ,
           {
             text : 'Client',
             value :'client',
           } ,

           {
             text : 'Date d\'achat',
             value :'d_achat',
           },

          /*{
             text : 'D. prév. liv.',
             value :'d_p_livraison',
           },*/

            {
             text : 'Etat',
             value :'state',
           },
          
          
          { text: 'Priorité', value: 'priority'  },

          { text: 'Actions', value: 'actions', sortable: false },


         ];
      },


  },

   methods: {
      getState : function (state , color = false ) {
        
        return Util.getState(this.stateValue ,state, color);
      },


      getPriority : function (priority, date, color = false) {

            return Util.getPriority(this.priorityValue,priority, date, color);

      },


      priority : function (state,date,color=false) {


        if(state < 3) {

           const now = new Date().getTime() ;
           const nbDaySt = date - now ;
           const aDay = 1000*60*60*24;
           const  days = Math.round((Math.abs(nbDaySt)/aDay));
           
   
         if(nbDaySt < 0){
           
            return (color)? this.priorityValue[0].color :  this.priorityValue[0].textPriority + ` ${days} jour(s)`;
         } else {
   
               if(days < 3){
                   return (color)? this.priorityValue[1].color :  this.priorityValue[1].textPriority + ` ${days} jour(s)`;
               }
                else if(days < 5){
                  return (color)? this.priorityValue[2].color :  this.priorityValue[2].textPriority + ` ${days} jour(s)`;
              }else
              {
                return (color)? this.priorityValue[3].color :  this.priorityValue[3].textPriority + ` ${days} jour(s)`;
              }
         }

        } else {
           return (color)? this.priorityValue[4].color :  this.priorityValue[4].textPriority ; 
        }


      },


      date : function(dpl) {
       return Format(new Date(dpl),'dd/MM/yyyy');  
      },


      selectedChange : function() {
       
         this.orders =  this.updateOrders(this.selectedState,this.selectedPriority) ;
         this.ordersLoading = false ;
      },

      selectedPriorityChange : function() {
        
        this.orders =  this.updateOrders(this.selectedPriority,'priority') ;
        this.ordersLoading = false ;
      },


      loadOrders : function(){
            this.ordersLoading = true ;
            return  this.$store.getters.getAllOrders;
      },

      updateOrders : function(selectedState,selectedPriority ) {
          this.ordersLoading = true ;
          return this.$store.getters.getOrdersBySelectedData(selectedState,selectedPriority);
      },

      initOrders : function(){
         this.selectedState = [];
         this.selectedPriority = [];
         this.ordersLoading = true ;
         this.orders = this.loadOrders();
         this.ordersLoading = false;
      },

      openDetails : function(id) {
        
          this.$router.push({ name: 'OrdersDetails', params: { id: id } });
      }



   }
}
</script>
<style lang="scss" >
  .orders {
    .v-card {
      border : thin solid var(--v-border-base);
    }
  }
</style>
