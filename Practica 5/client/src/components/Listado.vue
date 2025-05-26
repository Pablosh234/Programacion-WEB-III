<template>
  <el-table :data="Teams" height="250" style="width: 100%">
    <el-table-column prop="id_equipo" label="Id Team" width="180" />
    <el-table-column prop="nomequipo" label="Nombre" width="180" />
    <el-table-column prop="pais" label="Pais" width = "180" />
    <el-table-column prop="directortec" label="Director Tecnico" width="180" />
    <el-table-column prop="patrocinador" label="Patrocinador" width="180" />
    <el-table-column  label="Acciones" width="180">
      <template #default="scoped">
        <el-button :icon="Search" circle />
        <el-button type="primary" :icon="Edit" @click="mostrarInput(scoped.row)" circle />
        <el-button type="danger" :icon="Delete" @click="eliminarTeam(scoped.row.id_equipo)" circle />
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogFormVisible" title="Actualiza un Equipo a la UCI" width="500">
    <el-form :model="form">
            <el-form-item label="Nombre del Equipo" :label-width="formLabelWidth">
                <el-input v-model="form.nomequipo" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Pais " :label-width="formLabelWidth">
                <el-input v-model="form.pais" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Director Tecnico " :label-width="formLabelWidth">
                <el-input v-model="form.directortec" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Patrocinador " :label-width="formLabelWidth">
                <el-input v-model="form.patrocinador" autocomplete="off" />
            </el-form-item>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancelar</el-button>
                <el-button type="primary" @click="actualizarTeam()">
                        Actualizar
                </el-button>
            </div>
    </el-form>
  </el-dialog>
</template>

<script setup>

import {
  Delete,
  Edit,
  Search,
} from '@element-plus/icons-vue'
import {onMounted,ref,reactive} from 'vue';
import {deleteTeam, getTeams, putTeam} from '../apis/apis.js';
import { ElMessage, ElMessageBox } from 'element-plus'
const Teams = ref([]);
const tableTeams = async () => {
    try {
        const result = await getTeams();
        Teams.value = result;
    } catch (error) {
        console.error(error);
    }
}

const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
const form = reactive({
  id_equipos:null,
  nomequipo: '',
  pais: '',
  directortec: '',
  patrocinador: '',
});

const mostrarInput = async(team)=>{
  try{
    form.id_equipos=team.id_equipo;
    form.nomequipo=team.nomequipo;
    form.pais=team.pais;
    form.directortec=team.directortec;
    form.patrocinador=team.patrocinador;
    dialogFormVisible.value=true;
  }catch(error){
    console.error(error);
  }
}

const actualizarTeam= async()=>{
  try{
    const data = {
      id_equipo:form.id_equipos,
      nomequipo:form.nomequipo,
      pais:form.pais,
      directortec:form.directortec,
      patrocinador:form.patrocinador,
    }
    await putTeam(data);
    dialogFormVisible.value=false;
    await tableTeams();
  }catch(error){
    console.error(error);
  }
}

const eliminarTeam = async(id)=>{
  ElMessageBox.confirm(
    'Estas a punto de eliminar un equipo. Estas seguro?',
    'Cuidado Eliminando',
    {
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      type: 'warning',
    }
  )
    .then(async() => {
      await deleteTeam(id);
      await tableTeams();
      ElMessage({
        type: 'success',
        message: 'Eliminado Exitosamente',
      })
    })
    
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Eliminacion de Equipo Cancelada',
      })
    })
}
onMounted(tableTeams);
defineExpose({tableTeams})
</script>