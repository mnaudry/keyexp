<template>
<div class="pickedOrderGroups">
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
             <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-tooltip top>
                   <template v-slot:activator="{ on, attrs }">
                      <v-btn  
                          class="mr-4" 
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          color="primary"
                          @click="addPickedOrderGroup()"
                          >
                          <v-icon left>
                              mdi-play-circle-outline
                          </v-icon>
                          Grouper
                      </v-btn>
                    </template>
                    <span>Regrouper de produits préparés</span>
                  </v-tooltip>

          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-card outlined class="mt-2">
      <v-data-table
      :headers="pickedOrderGroupsHeaders"
      :items="pickedOrderGroups"
      item-key="id"
      :search="search"
      :loading="pickedOrderGroupsLoading" 
      :loading-text="pickedOrderGroupsLoadingText"
       no-data-text="Pas des groupes disponibles"
      >
        <template v-slot:item.shipped="{ item }">
           <v-simple-checkbox
                    disabled
                    :value="isShipped(item.shipped)"
                   
                    ></v-simple-checkbox>
        </template>


        <template v-slot:item.pack="{ item }">
           <span> {{ packageText(item.pack) }} </span>
        </template>


        <template v-slot:item.actions="{ item }">

          <v-tooltip top v-if="!isShipped(item.shipped)" >
            <template v-slot:activator="{ on, attrs }">

              <v-btn   
                  icon 
                  color="primary ml-3"
                  v-bind="attrs"
                  v-on="on"
              >
                  <v-icon
                      dense outlined
              
                      @click="initShipItem(item)"
                  >
                  mdi-cube-send
                  </v-icon>
              </v-btn>
          </template>
          <span>Envoyer un colis (produits groupés)</span>
        </v-tooltip>

        <v-tooltip top v-else >
          <template v-slot:activator="{ on, attrs }">
            
           <v-btn  
              icon 
              color="primary ml-3"
              v-bind="attrs"
              v-on="on"
            >
                <v-icon
                    dense outlined
                    @click="initTrackItem(item)"
                >
                mdi-map-clock
                </v-icon>
            </v-btn>
          </template>
          <span>Suivre un colis</span>
        </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog
      max-width="500px"
        v-model="dialogShip"
     >
       <v-card>
          <v-card-title>
              <span class="headline">{{ dialogShipTitle }}</span>
           </v-card-title>
           <v-card-text>
              <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                      <v-text-field
                            v-model="dialogShipItem.client"
                            label="Client"
                            disabled
                          ></v-text-field>
                        </v-col>
                         <v-col
                         cols="12"
                         sm="12"
                         md="12"
                        >
                          <v-text-field
                            v-model="dialogShipItem.weight"
                            label="Poids en g"
                            disabled
                          ></v-text-field>
                        </v-col>
                          <v-col
                         cols="12"
                         sm="12"
                         md="12"
                        >
                          <v-text-field
                            v-model="dialogShipItem.tracking"
                            label="Numéro de suivie"
                            :error-messages="errorMessages"
                            persistent-hint
                            hint="1L545637"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        @click="closeShip()"
                      >
                        Annuler
                      </v-btn>
                      <v-btn
                        color="primary"
                        text
                        @click="save(dialogShipItem)"
                      >
                        Enregistrer
                      </v-btn>
                   </v-card-actions>
                </v-card>
      </v-dialog>


      <v-dialog
      max-width="700px"
        v-model="dialogTrack"
     >
       <v-card>
          <v-card-title>
              <span class="headline">{{ dialogTrackTitle }}</span>
           </v-card-title>
           <v-card-text>
              <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                      <v-text-field
                            :value="dialogTrackItem.tracking"
                            label="N de suivie"
                            disabled
                       ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                      <v-text-field
                            :value="getTrackingText(dialogTrackItem.tracking_status)"
                            label="Status de suivie"
                            disabled
                       ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                     <v-stepper alt-labels>
                       <v-stepper-header >
                          <v-stepper-step
                            :step="trackingStatus[0].id"
                            :complete="trackingStatus[0].step"
                           
                          >
                            <small>{{ trackingStatus[0].text }}</small>
                          </v-stepper-step>

                          <v-divider></v-divider>

                          <v-stepper-step
                            :step="trackingStatus[1].id"
                            :complete="trackingStatus[1].step"
                            
                            
                          >
                            <small>{{ trackingStatus[1].text }}</small>
                          </v-stepper-step>

                          <v-divider></v-divider>

                          <v-stepper-step
                            :step="trackingStatus[2].id"
                            :complete="trackingStatus[2].step"
                            
                          >
                            <small>{{ trackingStatus[2].text }}</small>
                          </v-stepper-step>

                          <v-divider></v-divider>

                          <v-stepper-step 
                            :step="trackingStatus[3].id"
                            :complete="trackingStatus[3].step"
                           >
                            <small>{{ trackingStatus[3].text }}</small>
                          </v-stepper-step>
                        </v-stepper-header>
                      </v-stepper>
                    </v-col>
                  
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        @click="closeTrack()"
                      >
                        OK
                      </v-btn>
                     
                   </v-card-actions>
                </v-card>
      </v-dialog>
</div>
</template>

<script>

import HeaderTitle from '../components/HeaderTitle';

export default {
  name: 'PickedOrderGroups',

  components : {
    HeaderTitle,
  },
 
  data : function() {
    return {

      title : 'Groupes',
      goBack : false,

      showBreadCrumbs : false ,
      search : '',

      pickedOrderGroups : [] ,

      pickedOrderGroupsLoading : false ,

      pickedOrderGroupsLoadingText : 'chargement  des groupes ... Veuillez patientez',

      stateValue :[],
      priorityValue : [],

      dialogShip : false,

      dialogTrack : false,

      dialogTrackTitle : "Suivie d'un colis",

      dialogShipTitle : "Envoyé un colis",

      dialogShipItem : {
        client : '',
        tracking : '',
        item  : {},
        weight :'',
      },


      dialogTrackItem : {
        tracking : "",
        tracking_status : "",
      },

      errorMessages: '',
      
    };
  },


  created : function() {
   
     this.pickedOrderGroups = this.loadPickedOrderGroups();
     this.pickedOrderGroupsLoading = false;
  },

  watch : {

    tracking : function() {
      this.errorMessages = '';
    },
  },

  computed : {

    pickedOrderGroupsHeaders  : function (){
         //{id: 10 ,client: 'guillaume Star', etat :1, d_achat :'06/03/2021' , d_p_livraison:'13/03/2021'},
         return [
           {
             text : 'Id',
             align: 'start',
             sortable : false,
             value : 'id_group',  filterable : false 
           } ,

            {
             text : 'Client',
             value :'client',
           },

           {
             text : 'Id Préparation',
             value :'id_picked',
           },

            {
             text : 'Carton',
             value :'pack',sortable : false,  filterable : false 
           },

           {
             text : 'Poids en g',
             value :'weight'
           },

           {
             text : 'Expédié',
             value :'shipped',sortable : false,  filterable : false 
           },


           { text: 'Actions', value: 'actions', sortable: false },


         ];
      },

      trackingStatus : function() {

        let status = this.$store.getters.getTackingStatus;
         return status.map((status)=> {
            return {
                id : status.id, 
                text : status.text,
                step : false,
              };
          });
      }

  },

  methods : {

     loadPickedOrderGroups : function(){
            this.pickedOrderGroupsLoading = true ;
            
            return this.$store.getters.getAllPickedOrderGroups;
           
      },

      addPickedOrderGroup : function() {
         
           this.$router.push({ name: 'PickedOrderGroup_create' });
      },

      isShipped : function(shipped) {

           return (Object.keys(shipped).length !== 0);

      },

      packageText : function(pack) {

          return `${pack.name}_${pack.maxWeight}`;

      },

      closeShip : function() {
       this.dialogShip = false ;
      },

      closeTrack : function() {
        this.dialogTrack = false ;
      },

      initShipItem : function(group){

        this.dialogShipItem.client =  group.client;
       
        this.dialogShipItem.item =  Object.assign({}, group);
        this.dialogShipItem.weight =  group.weight;
        this.dialogShip = true;
      
      },

      initTrackItem : function(group){
     
       const ship =  this.$store.getters.getOrderShipped({id_order : group.id_order , id_ship : group.shipped.id_ship })
       
       
       this.dialogTrackItem.tracking = ship.tracking;
       this.dialogTrackItem.tracking_status = ship.tracking_status;

       
       this.trackingStatus.map((status)=>{
         if(status.id <= ship.tracking_status ){
           
           status.step = true ;
         }else {
           status.step = false ;
         }
       }) ;

       this.dialogTrack = true;
      },



      getTrackingText : function(status){
       
       let st = {};
        for(const tracking of this.trackingStatus){
          if(tracking.id ===  status){
            st = tracking;
          }
        }
       return st.text ;
      },

      save : function(dialog) {

        let pattern = /^1L(\d){6}$/;
        if(!pattern.test(dialog.tracking)){
          this.errorMessages = 'Entrez un numéro de suivie valide';
          return ;
        }

      
        const playload = {
          group : dialog.item ,
          tracking : dialog.tracking,

        }

        this.$store.dispatch('savePackageShipped',playload).then((response)=>{
                if(response.status === "saved"){
                   
                    this.dialogShip = false;
                    this.$router.push({name :'PickedOrderGroups', query: {  _randomkey: new Date().getTime() } });
                    
                }else {
                 this.dialogShip = false;
                 this.message = "Désolé, nous n'avons pas pu enregister vos produits, veuillez contacter le support";
                 this.snackbar = true;
                 return;
        
                }
          });
            
      },

      show : function(item) {
         console.log(item);
      },
  }
}
</script>
<style lang="scss" scoped>
  .pickedOrderGroups {
    .v-card {
      border : thin solid var(--v-border-base);
    }

  }

  .v-stepper {
      box-shadow: unset;
    }
  

 
</style>
