<template>
     <div class="draft">
    <p>草稿箱({{caogao.length}})</p>
    <div
    v-for="(item,index) in caogao " :key="index"
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
          this.input=hh.title,
            // 选中的游玩城市
            this.playCity=hh.cityName,
            // 后台给你的城市列表数据
            this.$refs.vueEditor.editor.root.innerHTML=hh.content
        }
    },
    mounted(){
        // 从本地获取数据
            let str = localStorage.getItem('posts') || "[]";
            let arr = JSON.parse(str);
            this.caogao=arr
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