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
              label="Rechercher ..."
              color="primary"
            ></v-text-field>
        </v-col>
        <v-col md="6" sm="12">
          <div class="pt-2 d-flex">
            <v-spacer></v-spacer>

            <v-btn outlined  color='primary' class="mr-2" @click="initOrders()" >
                    <v-icon color="primary" >
                      mdi-autorenew
                    </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
       <v-row>
          <v-col md="6" sm="12">
            <v-select dense :items="stateValue" item-text="textState" item-value="state" v-model="selectedState" multiple  chips label="Etat" class="ml-2" @input="selectedChange">
              <template v-slot:selection="{item}">
                   <v-chip label  :color="item.color"  text-color="white" >
                     {{ item.textState }}
                   </v-chip>
              </template>
            </v-select>
          </v-col>
          <v-col md="6" sm="12">
            <v-select dense  :items="priorityValue" item-text="textState" item-value="priority" v-model="selectedPriority" multiple  chips label="priorité" class="mr-2" @input="selectedChange">
              <template v-slot:selection="{item}">
                   <v-chip label  :color="item.color"  text-color="white" >
                     {{ item.textState }}
                   </v-chip>
              </template>
            </v-select>
          </v-col>
       </v-row>
    </v-card>
   <!-- <v-card outlined >
      <h1 class="text-button pl-2">{{ title }}</h1>
      <div></div></div>
       <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </v-card>-->
     
      <v-card outlined class="mt-2">
      <v-data-table
      :headers="ordersHeaders"
      :items="orders"
      item-key="id"
      :search="search"
      :loading="ordersLoading" 
      :loading-text="ordersLoadingText"
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
            <v-btn icon color="primary ml-3">
                <v-icon
                    dense outlined
                    @click="openDetails(item.id)"
                >
                mdi-shopping-search
                </v-icon>
            </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import Format from 'date-fns/format';
import HeaderTitle from '../components/HeaderTitle';

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
         //{id: 10 ,client: 'guillaume Star', etat :1, d_achat :'06/03/2021' , d_p_livraison:'13/03/2021'},
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
             text : 'D. achat',
             value :'d_achat',
           },

          {
             text : 'D. prév. liv.',
             value :'d_p_livraison',
           },

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
        return (color)?this.stateValue[state].color : this.stateValue[state].textState;
      },


      getPriority : function (priority, date, color = false) {

           const now = new Date().getTime() ;
           const nbDaySt = date - now ;
           const aDay = 1000*60*60*24;
           const  days = Math.round((Math.abs(nbDaySt)/aDay));
          if(priority === 4)
             return (color)? this.priorityValue[priority].color :  this.priorityValue[priority].textPriority ; 
          else 
            return (color)?this.priorityValue[priority].color : this.priorityValue[priority].textPriority + ` ${days} jour(s)`;

      },


      priority : function (state,date,color=false) {

        
        //const nbDay =  (now - date) >= 0 ?

       

       // console.log(Format(new Date(),'dd/MM/yyyy'));


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
       // console.log(this.selectedState);
         this.orders =  this.updateOrders(this.selectedState,this.selectedPriority) ;
         this.ordersLoading = false ;
      },

      selectedPriorityChange : function() {
        //console.log(this.selectedPriority)
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
         // console.log("details");
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
