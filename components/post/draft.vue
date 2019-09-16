<template>
     <div class="draft">
    <p>草稿箱({{$store.state.draft.createpost.draftcontent.length}})</p>
    <div
    v-for="(item,index) in $store.state.draft.createpost.draftcontent " :key="index"
    class="lishi"
    >
    <span
     @click="draftchange(item)" type="text">{{item.title}} <i class="el-icon-edit"></i>
     </span>
     <p>{{item.time}}</p>
    </div>
   </div>
</template>

<script>
export default {
    data(){
        return{
            // 草稿箱数组
            caogao:[],
        }
    },
    methods: {
        /* 编辑草稿   */
        draftchange(hh){
         this.$store.commit('draft/changedraft',hh)
        }
    },
    mounted(){
    // 从vuex仓库获取数据
    this.caogao=this.$store.state.draft.createpost.draftcontent
    console.log(this.caogao,111);
     

    }

}
</script>

<style lang="less" scoped>
.draft{
    border: 1px solid #ddd;
    padding: 10px;
    width: 200px;
    margin-left: 10px;
  .lishi{
  padding: 5px 0px;
  span:hover{
    color: aqua;
    cursor:pointer;
  }
}
  }
</style>