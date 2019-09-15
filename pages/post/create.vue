<template>
  <div class="create">
    <!-- 左右分栏布局 -->
    <el-row :gutter="20">
      <!-- 左边编辑页面 -->
  <el-col :span="16">
    <publish/>
    </el-col>
      <!-- 右边草稿箱 -->
  <el-col :span="8"  >
      <draft/>
   </el-col>
   </el-row>
  </div>
</template>
<script>
import publish from '../../components/post/publish'
import draft from '../../components/post/draft'
export default {
    data(){
        return{


        }
    },
    // 组件注册
    components:{
        publish,
        draft
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