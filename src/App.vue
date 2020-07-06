<template>
<div>
 <itemList :tasks="tasks"></itemList>
</div>
</template>
<script>
import '@/assets/css/style.css'
import itemList from './views/item-list.vue';
    export default {
        components: {
        itemList
        },
        data () {
            return {          
           tasks: [ ]
          }
      },
       methods: {    
    }
    }
</script>
