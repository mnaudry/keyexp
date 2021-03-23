<template>
<div class="pickedOrder">
    <v-card outlined class="mt-2">
        <h1 class="text-button pl-2">{{ title }}</h1>
    </v-card>
</div>
</template>

<script>


export default {
  name: 'Dashboard',
 
  data : function() {
    return {
      title : 'Préparation',
    };
  }
}
</script>
<style lang="scss" scoped>
  .home {
    .v-card {
      border : thin solid var(--v-border-base);
    }
  }
</style>
