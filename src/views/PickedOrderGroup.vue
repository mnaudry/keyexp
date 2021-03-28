<template>
<div class="pickedOrderGroup">
    <HeaderTitle :title ="title" :goBack="goBack" :backText="backText"  :showBreadCrumbs="showBreadCrumbs" :goBackLink="routerBack" />
      
    <v-card outlined class="mt-2">
      <v-data-table
      :headers="productHeaders"
      :items="productsNotGrouped"
      item-key="id"
      show-select
      :search="search"
      :loading="productsNotGroupedLoading" 
      :loading-text="productsNotGroupedLoadingText"
       no-data-text="Pas des produits disponibles"
       @input="processSelectedProduct"
      >
       <template v-slot:top>
                    <v-toolbar flat>
                         <v-toolbar-title>Liste de produits</v-toolbar-title>
                         <v-spacer></v-spacer>

                          <v-divider
                            class="mx-4"
                            inset
                            vertical
                            ></v-divider>
                            
                            <v-select  
                                :items="orderPickedSelectList"
                                menu-props="auto"
                                no-data-text="Aucune préparation de disponible"
                                placeholder="Choisissez une préparation"
                                prepend-icon="mdi-format-list-checkbox"
                                hint="idPréparation_client"
                                persistent-hint
                                single-line 
                                @input="selectedChange"
                                v-model="orderPickedSelected"
                                >
                                <template v-slot:item="{ item }">
                                    <span>{{ orderPickedListText(item) }}</span>
                                </template>
                                <template v-slot:selection="{ item }">
                                 <span>{{ orderPickedListText(item) }}</span>
                                </template>
                            </v-select>
                           
                    </v-toolbar>
        </template>

      </v-data-table>
    </v-card>
    <v-card outlined class="my-2 py-4">
         <v-row>
              <v-spacer></v-spacer>
              <v-col md="3" sm="12" cols="12" align-self="end" >
                  <div class="d-flex justify-end">
                         <v-select  
                                :items="packList"
                                menu-props="auto"
                                placeholder="Choisissez un carton"
                                prepend-icon="mdi-package-variant"
                                hint="Attention au poids"
                                persistent-hint
                                :disabled="disableSelectPackage"
                                single-line 
                                @input="selectedChange"
                                v-model="packSelected"
                                >
                                <template v-slot:item="{ item }">
                                    <span>{{ packageListText(item) }}</span>
                                </template>
                                <template v-slot:selection="{ item }">
                                 <span>{{ packageListText(item) }}</span>
                                </template>
                            </v-select>
                   
                 </div>
              </v-col>
              <v-col md="3" sm="12" cols="12" align-self="end" >
                  <div class="d-flex justify-end">

                  <v-tooltip top  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn  class="mr-4 my-4"
                                  v-bind="attrs"
                                  v-on="on"
                                  outlined
                                  color="primary"
                                  @click="save()"
                                  :disabled="disableSave"
                                  >
                                  <v-icon left>
                                      mdi-content-save
                                  </v-icon>
                                  Enregistrer
                      </v-btn>

                    </template>
                    <span>Enregister pour sauvegarder le groupe</span>
                  </v-tooltip>
                 </div>
            </v-col>
        </v-row>
    </v-card>
    <snack-bar :snackbar="snackbar" :message="message" @clicked="snackBarClose" />
</div>
</template>

<script>
//import Format from 'date-fns/format';
import HeaderTitle from '../components/HeaderTitle';
import SnackBar from '../components/SnackBar';

export default {
  name: 'PickedOrderGroups',

  components : {
    HeaderTitle,
    SnackBar,
  },
 
  data : function() {
    return {

      title : 'Ajouter un groupe',
      goBack : true,
      backText : 'groupes',
      routerBack : '/PickedOrderGroups',
      search : '',

      showBreadCrumbs : false ,

      disableSave : true ,

      disableSelectPackage : true,

      orderPickedSelectList : [], 
      
      productSelected : [],

      orderPickedSelected : '', 

      

      packSelected : '',

      productsNotGrouped : [],

      productsNotGroupedLoading : false ,

      productsNotGroupedLoadingText : 'chargement  des produits ... Veuillez patientez',

      snackbar: false,

      message : "",
      
    };
  },


  created : function() {
    this.initOrderPickedSelectList();
     
  },

  computed : {

    productHeaders  : function (){
         //{id: 10 ,client: 'guillaume Star', etat :1, d_achat :'06/03/2021' , d_p_livraison:'13/03/2021'},
         return [
                    { text: 'qrcode', value: 'qrcode', },
                    { text: 'Produit', value: 'name', sortable: false },
                    { text: 'Poids', value: 'weight', sortable: false },
              ];
      },

      packList : function() {
          return this.$store.getters.getPacks
      },

   

  },

  methods : {
      
       initOrderPickedSelectList : function() {
               this.orderPickedSelectList =  this.$store.getters.getAllPickedOrders;
        },

        orderPickedListText : function(orderPicked){
             return `${orderPicked.id}_${orderPicked.client}`;
        },

        packageListText : function(pack) {
            return `${pack.name}_${pack.maxWeight}`;
        },

        selectedChange : function(){
           
           this.productsNotGrouped = this.$store.getters.getProductNotGrouped(this.orderPickedSelected.id_order);
           
        },

        processSelectedProduct : function(productSelected) {
           
            this.productSelected = productSelected ;
            if( this.productSelected.length > 0) {
                    this.disableSave = false;
                    this.disableSelectPackage = false;
            }else {
                    this.disableSave = true;
                    this.disableSelectPackage = true;
            }
        },

        save : function(){

          

           if(Object.keys(this.packSelected).length === 0 ){
                 this.snackbar = true ;
                 this.message = "Veuillez choisir un carton, avant de continuer";
                 return ;
            }

            let totalWeight = this.productSelected.reduce((sum,product)=>{
                sum+=product.weight;
                return sum;
            },0);
           
            if(totalWeight > this.packSelected.maxWeight){
                this.snackbar = true ;
                this.message = `Attention le carton selectionnez ne pourra pas  supporter vos produits, veuillez en sellectionner un autre`;
                return;
            }

            

            const playload = {
                orderPicked : this.orderPickedSelected,
                products : this.productSelected,
                pack : this.packSelected,
                totalWeight : totalWeight ,
            }


            this.$store.dispatch('saveProductsGrouped',playload).then((response)=>{
                if(response.status === "saved"){
                   
                    this.$router.push({name :'PickedOrderGroups'});
                    
                }else {
                 this.message = "Désolé, nous n'avons pas pu enregister vos produits, veuillez contacter le support";
                 this.snackbar = true;
                 return;
        
                }
            });

        },


        snackBarClose : function() {

            this.snackbar = false;
        }


     

  }
}
</script>
<style lang="scss" scoped>
  .pickedOrderGroup {
    .v-card {
      border : thin solid var(--v-border-base);
    }
  }
</style>
