import axios from 'axios';

const API  = 'http://localhost:3000/api/teams'

export const getTeams = async ()=>{
    try{
        const answer =  await axios.get(API);
        return answer.data;
    }catch(error){
        console.error(error);
        return[]
    }
}
export const postTeam = async (team)=>{
    try{
        const answer = await axios.post(API,team);
        console.log(answer);
        return answer.data;
    }catch(error){
        console.error(error);
    }
}
export const putTeam = async (team)=>{
    try{
        const answer = await axios.put(`${API}/${team.id_equipo}`,team);
        console.log(answer);
        return answer.data;
    }catch(error){
        console.error(error);
    }
}
export const deleteTeam = async (id)=>{
    try{
        const answer = await axios.delete(`${API}/${id}`);
        return answer.data;
    }catch(error){
        console.error(error);
    }
}