<template>
  <div class="orderDetails">
    <v-card outlined   class="mt-2 py-4">
        <div>
            
            <v-btn v-if="goBack" 
                    class="mx-1"
                    text
                    color="primary"
                    router :to="goBackLink"
            >
                <v-icon left >
                        mdi-arrow-left
                </v-icon>
                {{ backText }}
            </v-btn>
        </div>
        <div>
            <v-breadcrumbs v-if="showBreadCrumbs"
                divider="/"
                :items="breadCrumbs"
            ></v-breadcrumbs>
        </div>
        <h1 class="text-button pl-4 font-weight-bold">{{ title }}</h1>
        
    </v-card>
  </div>
</template>

<script>
export default {
    name: 'HeaderTitle',
    data : function() {
        return {
        };
    },

    props : [ 'goBack', 'goBackLink' ,'title' , 'backText' , 'routerBack' , 'breadCrumbs', 'showBreadCrumbs'] ,
}

//                    :router  :to="{{ routerBack }}"
</script>
