<template>
  <v-app>
    <Nav />
    <v-main >
      <v-divider></v-divider>
      <v-container fluid>
          <router-view></router-view>
      </v-container>
    </v-main>
<!--<v-navigation-drawer  clipped >
      <div style="background-color:red;height:300px">toto</div>
    </v-navigation-drawer>
      <v-app-bar flat  clipped-left  app>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
    </v-app-bar>
    

    <v-main >
       <v-container>
         <router-link to="/">Home</router-link>
         <router-link to="/about">About</router-link>

        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app>
      footer
    </v-footer>-->
  </v-app>
</template>

<script>
import Nav from './components/Nav';

export default {
  name: 'App',
  components : {
    Nav,
  },
  data: () => {
    return {
    };
  }
};
</script>


<style lang="scss" >
  .v-main {
    background-color : var(--v-background-base);
  }
</style>

