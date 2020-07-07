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
                     @remove="removeTask(task)"
                     @complete="completeTask(task)"
                     :task="task"
                     :key="index"
          ></taskitem>
      </transition-group>
    </section>
</template>

<script>
import taskitem from './task-item.vue';
import axios from 'axios'
export default {
  props: ['tasks'],
  components:{
      taskitem
  },
   data() {
    return {
      newTask: '',
      updateTasks:this.tasks,
      apiurl:"VUE_APP_API_URLhttp://www.todo.manojksharma.in/database.php"
    };
  },
  computed: {
    incomplete() {
      return this.updateTasks.filter(this.inProgress).length;
    }
  },
    mounted() {
     this.getTask();
  
  },
  methods: {
    addTask() {
      if (this.newTask) {
        this.updateTasks.push({
          title: this.newTask,
          completed: false
        });
        // Call add api here
         axios.get("http://www.todo.manojksharma.in/database.php?type=add&title="+this.newTask, {
         headers: {
        }
      }).then(res => {        
     
        res.data.map(function(value) {
          if(value.completed=="1"){
            value.completed=false;
          }
        });
        
      this.updateTasks=res.data;
      }).catch(err => {
        console.log(err);
      });
        this.newTask = "";
      }
    },
    
    completeTask(task) {

     
     let completed =task.completed=="0"?"1":"0";      
      axios
        .get("http://www.todo.manojksharma.in/database.php?type=update&completed="+ completed+"&id=" + task.id, {
          headers: {}
        })
        .then(() => {
          this.getTask();
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeTask(task) {
           // Call delete api here
         axios.get("http://www.todo.manojksharma.in/database.php?type=delete&id="+task.id, {
         headers: {
        }
      }).then( ()=> {        
     
        this.getTask();
      }).catch(err => {
        console.log(err);
      });
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
    },
   async getTask() {
      await axios.get("http://www.todo.manojksharma.in/database.php", {
         headers: {
        }
      }).then(res => {        
     
        res.data.map(function(value) {
          if(value.completed=="1"){
            value.completed=true;
          }
          else
          {
            value.completed=false;
          }
        });
        
        this.updateTasks=res.data;
      }).catch(err => {
        console.log(err);
      });
  
    }


  }
};
</script>

<style>
</style>
