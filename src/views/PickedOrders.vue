<template>
<div class="pickedOrder">
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

          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-card outlined class="mt-2">
      <v-data-table
      :headers="pickedOrdersHeaders"
      :items="pickedOrders"
      item-key="id"
      :search="search"
      :loading="pickedOrdersLoading" 
      :loading-text="pickedOrdersLoadingText"
       no-data-text="Pas des préparations disponibles"
      >
        <template v-slot:item.state="{ item }">
          <v-chip label  :color="getState(item.state, true)"  text-color="white" >
            {{ getState(item.state)}}
          </v-chip>
        </template>

         <template v-slot:item.priority="{ item }">
          <v-chip label   :color="getPriority(item.priority,item.date,true)" text-color="white" >
            {{ getPriority(item.priority, item.date) }}
          </v-chip>
        </template>


        <template v-slot:item.actions="{ item }">

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="primary ml-3">
                <v-icon
                    v-bind="attrs"
                    v-on="on"
                    dense outlined
                    @click="openPickedOrder(item.id_order, item.id)"
                >
                mdi-format-list-checks
                </v-icon>
            </v-btn>
          </template>
          <span>Continuer à préparer la commande</span>
        </v-tooltip>

        </template>
      </v-data-table>
    </v-card>
</div>
</template>

<script>

import HeaderTitle from '../components/HeaderTitle';
import Util from '../util';

export default {
  name: 'PickedOrders',

  components : {
    HeaderTitle,
  },
 
  data : function() {
    return {

      title : 'Préparations',
      goBack : false,

      showBreadCrumbs : false ,
      search : '',

      pickedOrders : [] ,

      pickedOrdersLoading : false ,

      pickedOrdersLoadingText : 'chargement  des préparations ... Veuillez patientez',

      stateValue :[],
      priorityValue : [],
      
    };
  },


  created : function() {
     this.stateValue = this.$store.getters.getStateValues ;
     this.priorityValue = this.$store.getters.getPriorityValues ;
     this.pickedOrders = this.loadPickedOrders();
     this.pickedOrdersLoading = false;
  },

  computed : {

    pickedOrdersHeaders  : function (){
        
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
             text : 'Id Commande',
             value :'id_order',
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

  methods : {

     loadPickedOrders : function(){
            this.pickedOrdersLoading = true ;
            return this.$store.getters.getAllPickedOrders;
           
      },

      getState : function(state,color = false) {
          return Util.getState(this.stateValue ,state, color);
      },

      getPriority : function (priority, date, color = false) {

        return Util.getPriority(this.priorityValue,priority, date, color);

      },

      openPickedOrder : function(id_order, id_picked) {
         
           this.$router.push({ name: 'PickedOrder_edit', params: { id_order : id_order , id_picked : id_picked } });
      }


  }
}
</script>
<style lang="scss" scoped>
  .pickedOrder {
    .v-card {
      border : thin solid var(--v-border-base);
    }
  }
</style>
