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
                            
                            <v-select  
                                :items="productsToPickedSelectList"
                                item-text ="name"
                                item-value ="id"
                                menu-props="auto"
                                no-data-text="Pas de produits à préparer"
                                v-model="productsToPickedSelected"
                                label="Select"
                                hide-details
                                prepend-icon="mdi-chart-box-plus-outline"
                                single-line >
                            </v-select>
                             <v-divider
                            class="mx-4"
                            inset
                            vertical
                            ></v-divider>
                            <v-btn  class="mr-4" 
                                outlined
                                color="primary"
                                @click="scan()"
                                >
                                <v-icon left>
                                    mdi-qrcode-scan
                                </v-icon>
                                Scanner
                            </v-btn>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        v-if="item.canBeDelete"
                        dense
                        
                        @click="removeProductPicked(item)"
                    >
                        mdi-close
                    </v-icon>
                </template>
                 <template v-slot:item.grouped="{ item }">
                   <v-simple-checkbox
                    disabled
                    v-model="item.grouped"
                   
                    ></v-simple-checkbox>
                </template>
            </v-data-table>
    </v-card>
    <v-card outlined class="my-2 py-4">
         <v-row>
              <v-spacer></v-spacer>
              <v-col md="3" sm="12" cols="12" align-self="end" >
                  <div class="d-flex justify-end">
                    <v-btn  class="mr-4 my-4"
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
                 </div>
            </v-col>
        </v-row>
    </v-card>
    <v-snackbar
      :timeout="-1"
      :value="true"
      elevation="24"
      v-model="snackbar"
      absolute
      color="primary"
      centered
      top
      class="text--white"
    >
      
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="secondary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</div>
</template>

<script>
import HeaderTitle from '../components/HeaderTitle';

export default {
  name: 'PickedOrder',
  components : {
      HeaderTitle
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
                    { text: 'Poids', value: 'weight', sortable: false },
                    { text: 'Grouper', value: 'grouped' },
                    { text: 'Actions', value: 'actions', sortable: false },
              ],

      //productsPicked : [] ,

      

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
          console.log(this.nbProductPickedOrder);
       if(value.length > this.nbProductPickedOrder )
            this.disableSave= false ;
        else
             this.disableSave= true ;
      }
  },

   created : function() {
       this.idOrder = parseInt(this.$route.params.id_order);

       this.$store.dispatch('removeAllProductsPicked');

        if(this.$route.params.id_picked) {
            this.idPicked = this.$route.params.id_picked ;
            this.showGroup = true ;
            const playload = {
                id_order :  this.idOrder ,
                id_picked : this.idPicked
            };
            this.$store.dispatch('initProductsPickedFromOrder',playload);
            
       }
       this.nbProductPickedOrder =  this.$store.getters.getProductsOrderPicked(this.idOrder).length;
      
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
            //console.log(id);
            this.productsToPickedSelectList.push({ id: id , name : `${name}_${version}`});
        },

        removeProductTopickedSelect :function(id){
           const array = this.productsToPickedSelectList.filter((product)=>{
                return product.id != id ;
            });

             this.productsToPickedSelectList = array;
        },

        //{name :"KeyNetic" , qrcode :'KeyNetic_V1_145789' , weight : 200 }
       generateProductScanInfo : function(id) {

            
            /*const product =   this.productsToPicked.find((product)=> {
                return (product.id_product === id);
            })/*/

           /* const digit = Math.floor(100000 + Math.random() * 9000000);
            const weight = Math
            let newProduct = {
                name : product.name,
                qrcode : `${product.name}_${product.version}_${digit}`,
                weight :
            };
            console.log(newProduct);*/

           /* const product = 'titi';
            this.$store.dispatch('action1',product).then((arg) => {
                 //   console.log("resolve", arg);
                    console.log("call get data",arg);
                    console.log(this.$store.getData);
                })*/

           /* this.$store.dispatch('generateNewProduct',product).then((arg) => {
                    console.log("resolve", arg);
                    console.log(this.$store.getNewProduct);
                })*/


            //this.productsPicked.push(product);
           // const product = id ;
          //  const response = await this.$store.dispatch('action1',product);
           // console.log("reponse addProductToproductsPicked", response );
            //this.$store.commit('modifData',product);
            //console.log(this.productsToPicked);

            const product =   this.productsToPicked.find((product)=> {
                return (product.id_product === id);
            })

            //console.log(product.id , product)

            this.$store.dispatch('generateInfoProduct',product).then(() => {
                   // console.log("resolve", arg);
            })
           // console.log("toto");
       
        },

        scan : function() {
            //console.log(this.productsToPickedSelected);
             //productsToPickedSelectList.
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
            //console.log(product);

            //console.log(this.productsToPickedSelectList);
             this.$store.dispatch('removeProductPicked',product.id);

             const getproduct = this.productsToPicked.find((p) => {
                 return p.id_product === product.id ;
             });

             //console.log(getproduct);

             this.addProductTopickedSelect( getproduct.id_product,  getproduct.name , getproduct.version);

        },

        save : function() {
            console.log("save");
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
