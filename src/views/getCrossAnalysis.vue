<template>
<div>
    dsadadasd</div>   
</template>

<script>
export default {
    data(){
        return{
            id:0
        }
    },
    mounted(){
        this.id = this.$route.params.id;
        console.log(this.id)
    }
}
</script>
<style scoped>

</style>>
    