<template>
  <div class="create">
    <publish/>
  </div>
</template>
<script>
import publish from '../../components/post/publish'
export default {
    data(){
        return{

        }
    },
    components:{
        publish
    }

}
</script>

<style scoped>
.create{
    width: 1000px;
    margin: 0 auto;
    padding: 20px 0;

}
</style>