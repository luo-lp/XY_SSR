<template>
  <div class="userComment">
    <h3>0条真实用户评论</h3>
    <el-row class="allRates" type="flex" justify>
      <el-col class="comments" :span="4">
        <span>总评论{{$store.state.hotelDetail.hotelData[0].all_remarks}}</span>
        <br />
        <span>好评数:{{$store.state.hotelDetail.hotelData[0].good_remarks}}</span>
        <br />
        <span>差评数:{{$store.state.hotelDetail.hotelData[0].bad_remarks}}</span>
      </el-col>
      <el-col :span="20">
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
            <el-progress class="env" color="#ff9900" :width="60" :percentage="scores.environment*10" :format="format"></el-progress>
          </el-col>
          <el-col :span="6">
            <el-progress class="pro" color="#ff9900" :width="60" :percentage="scores.product*10" :format="format1"></el-progress>
          </el-col>
          <el-col :span="6">
            <el-progress class="ser" color="#ff9900" :width="60" :percentage="scores.service*10" :format="format2"></el-progress>
          </el-col>
          
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scores: {
        environment: 0,
        product: 0,
        service: 0,
        a:null
      }
    };
  },

  methods:{
     format(percentage) {
        return percentage === 100 ? `环境:10`:'环境:'+this.scores.environment;
      },
     format1(percentage) {
        return percentage === 100 ? `产品:10`:'产品:'+this.scores.product;
      },
     format2(percentage) {
        return percentage === 100 ? `服务:10`:'服务:'+this.scores.service;

      }
  },
  
  mounted() {
    setTimeout(() => {
      this.scores = this.$store.state.hotelDetail.hotelData[0].scores;
      // console.log(this.$store.state.hotelDetail,1111);
      // this.a=this.$store.state.hotelDetail
      // console.log(this.a,222);

    }, 100);
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
        width: 60px;
        height: 60px;
        line-height: 60px;
      }
    }
  }
}
/deep/.el-progress-bar{
  margin-right: 0;
}
</style>