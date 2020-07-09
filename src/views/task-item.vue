<template>
   <div style="margin-top: 75px;">
    <li v-for="item in task" :key="item.id"  class="tasks__item">
    <button  :class="item.completed == true ? 'tasks__item__toggle tasks__item__toggle--completed' : 'tasks__item__toggle'" 
        @click="complete(item)"
     >
       {{ item.title }}
      </button>
        <button class="tasks__item__remove button alert pull-right"
              @click="removeTask(item)"
   >
        Remove
      </button>
  </li>
    </div>
 
</template>
<script>
export default {
  props: {
    task:Array
  },
  data() {
    return {
    };
  },
  computed: {
 
  },
  methods: {
    removeTask(task) {
      this.$emit("remove", task);
    },
    complete(task) {
     this.$emit("complete", task);
    }
  },
  created(){
     this.$on("updateTasls", data => {
     console.log(data);
    });
  }
};
</script>

<style>
.tasks__item__toggle {
  width: 80%;
}
.tasks__item__remove {
  width: 20%;
}
.tasks__item .button {
  padding: 0;
}
.tasks__item {
    list-style: none;
}
</style>
