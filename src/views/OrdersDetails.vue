<template>
  <div class="orderDetails">
      <HeaderTitle :title ="title" :goBack="goBack" :backText="backText"  :showBreadCrumbs="showBreadCrumbs" :goBackLink="routerBack" />
      <v-card outlined class="mt-2">
          <v-row>
            <v-col md="3" sm="12" cols="12" >
                    <span class="ml-2" >status :</span>
                <v-chip
                    :color="getState(true)"
                    label
                    class="ma-2 white--text"
                    >
                    {{ getState() }}
                </v-chip>
            </v-col>
             <v-col md="3" sm="12" cols="12" >
                    <span class="ml-2" >Priorité :</span>
                <v-chip
                    :color="getPriority(true)"
                    label
                    class="ma-2 white--text"
                    >
                    {{ getPriority() }}
                </v-chip>
            </v-col>
            <v-col md="6" sm="12" cols="12" >
                    <v-text-field
                        :value="OrderDetails.client"
                         label="Nom du client"
                         class ="mt-3 mx-2"
                         dense
                        outlined
                        readonly
                    ></v-text-field>
            </v-col>
            </v-row>
      </v-card>
      <v-card outlined class="mt-2">
            <v-card-title>
                Liste des produits
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>

                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Recherche un produit ..."
                    single-line
                    hide-details
                ></v-text-field>

                 <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>

                <v-tooltip top v-if="haveOrderPicked()">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn  
                            v-bind="attrs"
                            v-on="on"
                            class="mr-4" 
                            outlined
                            color="primary"
                            @click="editPickedOrder()"
                            >
                            <v-icon left>
                                mdi-play-circle-outline
                            </v-icon>
                            Cont. à préparer
                        </v-btn>
                    </template>
                    <span>Continuer la préparation de la commande</span>
                </v-tooltip>
                
                <v-tooltip top v-else>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            v-bind="attrs"
                            v-on="on"
                            class="mr-4"  
                            outlined
                            color="primary"
                            @click="createPickedOrder()"
                            >
                            <v-icon left>
                                mdi-plus-circle-outline
                            </v-icon>
                            Préparer la commande
                        </v-btn>
                    </template>
                    <span>Démarrer la préparation de la commande</span>
                </v-tooltip>
            </v-card-title>
            <v-data-table 
                :headers="headers"
                :items="OrderDetails.products"
                :search="search"
            >

                <template v-slot:item.picked="{ item }">
                    <v-simple-checkbox
                    disabled
                    v-model="item.picked"
                   
                    ></v-simple-checkbox>
                </template>

                 <template v-slot:item.grouped="{ item }">
                    <v-simple-checkbox
                    disabled
                     v-model="item.grouped"
                    ></v-simple-checkbox>
                </template>

                 <template v-slot:item.shipped="{ item }">
                    <v-simple-checkbox
                    disabled
                     v-model="item.shipped"
                    ></v-simple-checkbox>
                </template>
            </v-data-table>
      </v-card>
  </div>
</template>
<script>
import HeaderTitle from '../components/HeaderTitle';

export default {
    name: 'OrdersDetails',
    components : {
        HeaderTitle,
    },
    data : function() {
        return {
              search: '',
              title : "Détails de commande",
              backText : 'Commandes',
              routerBack : '/orders',
              goBack: true ,
              idOrder :'',
              showBreadCrumbs : false ,
              OrderDetails : {} ,
              stateValue :[],
              priorityValue : [] ,
              headers : [
                    { text: 'Produit', value: 'name' },
                    { text: 'Preparé', value: 'picked', sortable : false,  filterable : false },
                    { text: 'Groupé', value: 'grouped', sortable : false , filterable : false },
                    { text: 'Expédié', value: 'shipped',sortable : false , filterable : false },
              ]

        };
    },

    computed :  {

      
    },

    created : function() {
        
       this.idOrder = parseInt(this.$route.params.id);
       this.OrderDetails =  this.loadOrderDetails();
       this.stateValue = this.$store.getters.getStateValues ;
       this.priorityValue = this.$store.getters.getPriorityValues;
       
    },

    methods : {

        loadOrderDetails : function() {
               return this.$store.getters.getOrderDetails(this.idOrder);
        },

        getState : function (color = false ) {
            const state = this.OrderDetails.state ;

            return (color)?this.stateValue[state].color : this.stateValue[state].textState;
        },

        getPriority : function (color = false ) {
            const priority = this.OrderDetails.priority ;

             return (color)?this.priorityValue[priority].color : this.priorityValue[priority].textState;
        },


        isPrepared : function(product){
               
                return product.picked ;
        },


        isShipped : function(product){
            
             return product.shipped ;
        },

        haveOrderPicked :function() {
            const orderPicked = this.OrderDetails.orderPicked ;
            return (Object.keys(orderPicked).length !== 0);
        },


        editPickedOrder : function() {
            const id = this.OrderDetails.orderPicked.id_picked;
            this.$router.push({ name: 'PickedOrder_edit', params: { id_order : this.idOrder , id_picked : id } });
        },


         createPickedOrder : function() {
            
            this.$router.push({ name: 'PickedOrder_create', params:{ id_order : this.idOrder } });
        }


    }
}
</script>

<style lang="scss" >
  .orderDetails {
    .v-card {
      border : thin solid var(--v-border-base);

      .v-card__title {
          .v-divider {
              background : var(--v-primary-base);
          }
      }
    }


  }
</style>
