
<template>
  <!-- 酒店基本信息 -->
  <div class="hotelInfo">
    <el-row class="basicInfo" type="flex" justify>
      <el-col :span="4">基本信息</el-col>
      <el-col :span="5">入住时间:14:00之后</el-col>
      <el-col :span="5">离店时间:12:00之前</el-col>
      <el-col
        :span="5"
      >{{$store.state.hotelDetail.hotelData[0].creation_time}}/{{$store.state.hotelDetail.hotelData[0].renovat_time}}</el-col>
      <el-col :span="5">酒店规模:{{$store.state.hotelDetail.hotelData[0].roomCount}}间客房</el-col>
    </el-row>
    <el-row class="service" type="flex" justify>
      <el-col :span="4">主要设施</el-col>
      <el-col :span="20">
        <el-tag type="info" size="small">外币兑换服务</el-tag>
        <el-tag type="info" size="small">电梯</el-tag>
        <el-tag type="info" size="small">洗衣服务</el-tag>
        <el-tag type="info" size="small">热水壶</el-tag>
      </el-col>
    </el-row>
    <el-row class="park" type="flex" justify>
      <el-col :span="4">停车服务</el-col>
      <el-col :span="20">-</el-col>
    </el-row>
    <el-row class="brand" type="flex" justify>
      <el-col :span="4">品牌信息</el-col>
      <el-col :span="20">-</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.hotelInfo {
  padding-bottom: 40px;
  .basicInfo,
  .service,
  .park,
  .brand {
    font-size: 14px;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid rgb(235, 238, 245);
  }
}
</style>