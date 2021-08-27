<template>
    <div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            id:0,
            data:[]
        }
    },
    mounted(){
        this.id = this.$route.params.id;
        this.getData();
    },
    methods:{
        getData(){
            var Data=new FormData();
            Data.append('id',this.id);
            axios({
                url:'',
                method:'post',
                data:Data,
            }).then((res)=>{
                this.data=res.data.data;
                this.getAnalysis();
            })
        },
        getAnalysis(data){
        },
        // toGradeAnalysis(){
        //     this.$router.push({ name: "gradeanalysis", params: { id: id } });
        // }
    },
}
</script>

<style lang="" scoped>
    
</style>