<template>
  <div class="userComment">
    <h3>0条真实用户评论</h3>
    <el-row class="allRates" type="flex" justify>
      <el-col class="comments" :span="5">
        <span>总评论{{$store.state.hotelDetail.hotelData[0].all_remarks}}</span>
        <br />
        <span>好评数:{{$store.state.hotelDetail.hotelData[0].good_remarks}}</span>
        <br />
        <span>差评数:{{$store.state.hotelDetail.hotelData[0].bad_remarks}}</span>
      </el-col>
      <el-col :span="19">
        <el-row type="flex" justify>
          <el-col :span="6" v-if="scores">
            <el-rate
              class="rates"
              v-model="$store.state.hotelDetail.hotelData[0].stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </el-col>
          <el-col :span="6">
            <el-progress
              class="env"
              type="circle"
              :percentage="scores.environment*10"
              color="#ff9900"
              :stroke-width="4"
              status="text"
              :width="80"
            >环境<br>{{scores.environment}}</el-progress>
          </el-col>
          <el-col :span="6">
            <el-progress
              class="pro"
              type="circle"
              :percentage="scores.product*10"
              color="#ff9900"
              :stroke-width="4"
              status="text"
              :width="80"
            >产品<br>{{scores.product}}</el-progress>
          </el-col>
          <el-col :span="6">
            <el-progress
              class="ser"
              type="circle"
              :percentage="scores.service*10"
              color="#ff9900"
              :stroke-width="4"
              status="text"
              :width="80"
            >服务<br>{{scores.service}}</el-progress>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      scores: {
        environment: 0,
        product: 0,
        service: 0
      }
    };
  },

  mounted() {
    setTimeout(() => {
      this.scores = this.$store.state.hotelDetail.hotelData[0].scores;
    }, 10);
  }
  
};
</script>

<style lang="less" scoped>
.userComment {
  padding-bottom: 40px;
  h3 {
    padding-bottom: 20px;
    font-size: 16px;
  }
  .allRates {
    align-items: center;
    height: 100px;
    //   line-height: 100px;
    .rates {
      height: 80px;
      line-height: 80px;
      .env,
      .pro,
      .ser {
        width: 80px;
        height: 80px;
      }
    }
  }
}
</style>