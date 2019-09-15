<template>
  <div class="det">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify>
      <!-- 左侧组件 -->
      <el-col :span="17">
        <!-- 文章组件 -->
        <DetEssay />
        <!-- 点赞 收藏 分享 评论 组件 -->
        <Goods />
        <!-- 评论组件 -->
        <Discuss />
      </el-col>
      <!-- 右侧组件 -->
      <el-col :span="7">
        <Correlation />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入文章组件
import DetEssay from "@/components/post/detEssay";
import Goods from "@/components/post/detgoods";
import Discuss from "@/components/post/detDiscuss";
import Correlation from "@/components/post/correlation";
export default {
  data() {
    return {};
  },
  components: {
    // 注册文章组件
    DetEssay,
    // 评论 收藏 分享 点赞
    Goods,
    // 评论
    Discuss,
    // 右侧相关攻略
    Correlation
  },
};
</script>

<style lang="less" scope>
.det {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
}
</style>