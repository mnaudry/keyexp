<template>
    <v-snackbar
      app
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
          @click="closeSnackBar"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
export default {
   name: 'SnackBar',

   data : function() {
        return {
        };
    },


    props : [ 'snackbar', 'message'] ,

    methods : {
        closeSnackBar : function() {
            this.$emit('clicked');     
        }

    }

}
</script>



