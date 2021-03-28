<template>
<div class="pickedOrder">
     <HeaderTitle :title ="title" :goBack="goBack" :backText="backText"  :showBreadCrumbs="showBreadCrumbs" :goBackLink="routerBack" />
     <v-card outlined class="mt-2">
             <v-data-table
                :headers="headers"
                :items="productsPicked"
                 no-data-text="Pas de produits préparés"
            >
                <template v-slot:top>
                    <v-toolbar flat>
                         <v-toolbar-title>Liste de produits préparés</v-toolbar-title>
                         <v-spacer></v-spacer>
                          <v-divider
                            class="mx-4"
                            inset
                            vertical
                            ></v-divider>
                            <!-- hide-details label="Select" -->
                            <v-select  
                                :items="productsToPickedSelectList"
                                item-text="name"
                                item-value="id"
                                menu-props="auto"
                                no-data-text="Pas de produits à préparer"
                                v-model="productsToPickedSelected"
                                
                                prepend-icon="mdi-chart-box-plus-outline"
                                single-line 
                                hint="scanner pour l'ajouter"
                                placeholder="Choisissez un produit"
                                >
                            </v-select>
                             <v-divider
                            class="mx-4"
                            inset
                            vertical
                            ></v-divider>
                            <v-tooltip top  >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn  class="mr-4" 
                                        v-bind="attrs"
                                        v-on="on"
                                        outlined
                                        color="primary"
                                        @click="scan()"
                                        >
                                        <v-icon left>
                                            mdi-qrcode-scan
                                        </v-icon>
                                        Scanner
                                    </v-btn>
                                </template>
                                <span>Scanner le produit pour l'ajouter dans la liste</span>
                            </v-tooltip>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{item}">
                    <v-tooltip top v-if="item.canBeDelete" >
                        <template v-slot:activator="{ on, attrs }">

                            <v-icon
                                v-bind="attrs"
                                v-on="on"
                                dense
                                
                                @click="removeProductPicked(item)"
                            >
                                mdi-close
                            </v-icon>
                        </template>
                        <span>Supprimer le produit de la liste</span>
                    </v-tooltip>
                </template>
                 <template v-slot:item.grouped="{item}">
                   <v-simple-checkbox
                    disabled
                    v-model="item.grouped"
                   
                    ></v-simple-checkbox>
                </template>

                 <template v-slot:item.shipped="{item}">
                   <v-simple-checkbox
                    disabled
                    v-model="item.shipped"
                   
                    ></v-simple-checkbox>
                </template>
            </v-data-table>
    </v-card>
    <v-card outlined class="my-2 py-4">
         <v-row>
              <v-spacer></v-spacer>
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
                        <span>Enregister pour sauvegarder la préparation</span>
                    </v-tooltip>
                 </div>
            </v-col>
        </v-row>
    </v-card>
     <SnackBar :snackbar="snackbar" :message="message" @clicked="snackBarClose" />
</div>
</template>

<script>
import HeaderTitle from '../components/HeaderTitle';
import SnackBar from '../components/SnackBar';

export default {
  name: 'PickedOrder',
  components : {
      HeaderTitle,
      SnackBar,
  },
 
  data : function() {
    return {
      title : 'Préparation',
      goBack : true ,
      backText : 'préparations',
      routerBack : '/PickedOrders',
      idOrder : 0,
      idPicked : 0,
      showGroup : false ,
      showBreadCrumbs : false ,
      disableSave : true ,
      nbProductPickedOrder : 0 ,
      headers : [
                    { text: 'qrcode', value: 'qrcode', },
                    { text: 'Produit', value: 'name', sortable: false },
                    { text: 'Poids en g', value: 'weight', sortable: false },
                    { text: 'Groupé', value: 'grouped' },
                    { text: 'Expédié', value: 'shipped' },
                    { text: 'Actions', value: 'actions', sortable: false },
              ],

      

      productsToPicked : [],

      productsToPickedSelectList : [], 

      productsToPickedSelected : [],

      infoProduct : {},

      snackbar: false,

      message : "",

    };
  },


  computed : {

      productsPicked : function() {
         return  this.$store.getters.getProductPicked;
      }

  },



  watch : {
      productsPicked : function(value) {

        if (value.length > this.nbProductPickedOrder)
             this.disableSave = false ;
        else    
            this.disableSave= true ;
        
        }
  },

   created : function() {
      
       this.idOrder = parseInt(this.$route.params.id_order);

       this.$store.dispatch('removeAllProductsPicked');

        let playload = {
                id_order :  this.idOrder ,
            };
       

        if(this.$route.params.id_picked) {
            this.idPicked = this.$route.params.id_picked ;
            this.showGroup = true ;
            playload.id_picked = this.idPicked ;
           
            this.$store.dispatch('initProductsPickedFromOrder',playload);
            
       }
       this.nbProductPickedOrder =  this.$store.getters.getProductsOrderPicked(playload).length;
      
       this.initProductToPicked();

      

    },

    methods :  {
         initProductToPicked : function() {
               this.productsToPicked =  this.$store.getters.getProductNotPicked(this.idOrder);
               
               for (const product of this.productsToPicked ){
                 this.addProductTopickedSelect( product.id_product,  product.name , product.version)
                }
        },

        addProductTopickedSelect : function(id , name, version) {
            
            this.productsToPickedSelectList.push({ id: id , name : `${name}_${version}`});
        },

        removeProductTopickedSelect :function(id){
           const array = this.productsToPickedSelectList.filter((product)=>{
                return product.id != id ;
            });

             this.productsToPickedSelectList = array;
        },

        
       generateProductScanInfo : function(id) {

            const product =   this.productsToPicked.find((product)=> {
                return (product.id_product === id);
            })

            

            this.$store.dispatch('generateInfoProduct',product).then(() => {
                   
            })
       
        },

        scan : function() {
            
             if(this.productsToPickedSelected.length === 0){
                 this.message = "Vous devez selectionner un produit à scanner";
                 this.snackbar = true;
                 return ;
             }

             
             if(this.productsToPickedSelectList.length === 0 ){
                 this.message = "Désolé, il n'y a plus de produits à préparer";
                 this.snackbar = true;
                 return ;
             }
            this.generateProductScanInfo(this.productsToPickedSelected);
            this.removeProductTopickedSelect(this.productsToPickedSelected);
            this.productsToPickedSelected = [];
        },

        removeProductPicked : function(product) {
            
             this.$store.dispatch('removeProductPicked',product.id);

             const getproduct = this.productsToPicked.find((p) => {
                 return p.id_product === product.id ;
             });

             

             this.addProductTopickedSelect( getproduct.id_product,  getproduct.name , getproduct.version);

        },


        getAllProductToSave : function(products){

            return products.filter((product)=> {
                return (product.canBeDelete);
            })
        },

        save : function() {
            
            const products = this.getAllProductToSave(this.productsPicked);

            const playload = {
                ids : {
                   id_order :  this.idOrder ,
                   id_picked : this.idPicked ,
                },
                products : products,
            }
            
            this.$store.dispatch('saveProductsPicked',playload).then((response)=>{
                if(response.status === "saved"){
                    //catch navigation duplicated eror work arround add random query
                    this.$router.push({name :'PickedOrder_edit', params: { id_order : this.idOrder , id_picked : response.id_picked }, query : { _randomkey: new Date().getTime()}});
                    
                }else {
                 this.message = "Désolé, nous n'avons pas pu enregister les produits préparés, veuillez contacter le support";
                 this.snackbar = true;
        
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
  .pickedOrder {
    .v-card {
      border : thin solid var(--v-border-base);
    }
  }
</style>
