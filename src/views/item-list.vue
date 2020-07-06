<template>
    <section class="tasks">
      <h1>
        Tasks 
        <transition name="fade">
          <small v-if="incomplete">({{ incomplete }})</small>
        </transition>
        
      </h1>
      <div class="tasks__new input-group">
        <input type="text"
               class="input-group-field"
               v-model="newTask"
               @keyup.enter="addTask"
               placeholder="New task"
        >
        <span class="input-group-button">
          <button @click="addTask" 
                  class="button"
          >
            <i class="fa fa-plus"></i> Add
          </button>
  
        </span>
      </div>

      <div class="tasks__clear button-group pull-right">
        <button class="button warning small"
                @click="clearCompleted"
        >
          <i class="fa fa-check"></i> Clear Completed
        </button>
        <button class="button alert small"
                @click="clearAll"
        >
          <i class="fa fa-trash"></i> Clear All
        </button>
      </div>
      
      <transition-group name="fade" tag="ul" class="tasks__list no-bullet">
          <taskitem v-for="(task, index) in updateTasks"
                     @remove="removeTask(index)"
                     @complete="completeTask(task)"
                     :task="task"
                     :key="index"
          ></taskitem>
      </transition-group>
    </section>
</template>

<script>
import taskitem from './task-item.vue';
export default {
  props: ['tasks'],
  components:{
      taskitem
  },
   data() {
    return {
      newTask: '',
      updateTasks:this.tasks
    };
  },
  computed: {
    incomplete() {
      return this.updateTasks.filter(this.inProgress).length;
    }
  },
  methods: {
    addTask() {
      if (this.newTask) {
        this.updateTasks.push({
          id: Math.floor(Math.random()*(50-10+1)+10),
          title: this.newTask,
          completed: false
        });
        this.newTask = "";
      }
    },
    
    completeTask(task) {
      task.completed = !task.completed;
    },
    removeTask(index) {
      this.updateTasks.splice(index, 1);
    },
    clearCompleted() {
      this.updateTasks = this.updateTasks.filter(this.inProgress);
    },
    clearAll() {
     this.updateTasks=[];
    },

    inProgress(task) {
      return !this.isCompleted(task);
    },
    isCompleted(task) {
      return task.completed;
    }
  }
};
</script>

<style>
</style>
