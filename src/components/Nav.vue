<template>
<div class="nav-component">
    <v-app-bar flat app clipped-left color="primary">
      <router-link class="header-logo" to='/'>
        <div >
          <v-img alt="logo KeyExp" src="../assets/logo.png" max-width="40px"></v-img>
        </div>
        <v-toolbar-title class="text-uppercase grey--text" >
          <v-img alt="keyprod logo title" src="../assets/keyprod.png" max-width="120px" ></v-img>
        </v-toolbar-title>
      </router-link>
    </v-app-bar>
    <v-navigation-drawer  permanent color="background"  v-model="drawer" :mini-variant.sync="mini" app clipped>
     <!-- <v-divider></v-divider>-->

      <v-list-item >
         <v-list-item-title></v-list-item-title>
          <v-btn icon  @click.stop="mini = !mini" >
            <v-icon  color="primary" >mdi-chevron-double-left</v-icon>
          </v-btn>
      </v-list-item>

     <!-- <v-divider></v-divider>-->

      <v-list shaped>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item link  v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-icon>
              <v-icon v-text="link.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="link.text" ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</div> 
</template>

<script>
export default {
  name: 'Nav',

  data: () => {
    return {
       drawer : true,
       mini: true,
       selectedItem : true ,
       links : [
        { icon : 'mdi-view-dashboard' , text : 'Tableau de bord', route :'/' },
        { icon : 'mdi-shopping' , text : 'Commandes', route :'/orders' },
        { icon : 'mdi-format-list-checkbox' , text : 'préparation', route :'/pickedOrders' }
      ]
    };
  }
};
</script>

<style lang="scss" >
.nav-component  {
        .header-logo  {
            display : flex ;
            align-items: center;
        }
        .v-navigation-drawer__border {
            background-color : var(--v-border-base) !important;
        }
}
</style>

