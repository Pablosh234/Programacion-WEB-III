<template>
    <el-button plain @click="dialogFormVisible = true">Crear nuevo Team</el-button>
    <el-dialog v-model="dialogFormVisible" title="Inscribe un Nuevo Equipo a la UCI" width="500">
        <el-form :model="form" :rules="rules" ref="formRef" @submit.prevent="enviarTeam()">
            <el-form-item label="Nombre del Equipo" :label-width="formLabelWidth" prop="nameequipo">
                <el-input v-model="form.nomequipo" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Pais " :label-width="formLabelWidth" prop="pais">
                <el-input v-model="form.pais" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Director Tecnico " :label-width="formLabelWidth" prop="directortec">
                <el-input v-model="form.directortec" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Patrocinador " :label-width="formLabelWidth" prop="patrocinador">
                <el-input v-model="form.patrocinador" autocomplete="off" />
            </el-form-item>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancelar</el-button>
                <el-button type="primary" native-type="submit">
                        Crear
                </el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script setup>
    import { reactive, ref } from 'vue';
    import { postTeam } from '../apis/apis.js';
    import { useToast } from "vue-toastification";

    const toast = useToast();
    const dialogFormVisible = ref(false);
    const formLabelWidth = '140px';
    const formRef = ref(null);
    const emit = defineEmits(['team-agregado']);
    const form = reactive({
        namequipo: '',
        pais: '',
        directortec: '',
        patrocinador: '',
    });
    const rules = {
        pais: [
            { required: true, message: 'El país es obligatorio', trigger: 'blur' },
            { pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: 'Solo letras permitidas', trigger: 'blur' }
        ],
        directortec: [
            { required: true, message: 'El director técnico es obligatorio', trigger: 'blur' },
            { pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: 'Solo letras permitidas', trigger: 'blur' }
        ],
        namequipo: [
            { required: true, message: 'El nombre del equipo es obligatorio', trigger: 'blur' }
        ],
        patrocinador: [
            { required: true, message: 'El patrocinador es obligatorio', trigger: 'blur' }
        ]
    };

    const enviarTeam = async()=>{
        await  formRef.value.validate(async(valid)=>{
            if(valid){
                try{
                    const data = {
                        ...form
                    }
                    await postTeam(data);
                    dialogFormVisible.value=false;
                    emit('team-agregado');
                    toast.success("Se agrego correctamente",{
                        position: "top-center",
                        timeout:3000,
                    });
                }catch(error){
                    console.error(error);
                }
            }
        })
        
    }
</script>

<style>
</style>