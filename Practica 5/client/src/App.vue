<template>
  <add @team-agregado="refresh"/>
  <List ref="team"/>
  
</template>


<script setup>
import List from './components/Listado.vue'
import add from './components/Add.vue'
import { ref } from 'vue'


const team = ref(null);
const refresh = ()=>{
  team.value?.tableTeams();
}

</script>



<style scoped>

</style>
