<template>
  <div class="detailContainer">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">{{this.hotelDetail[0].big_cate}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">{{this.hotelDetail[0].real_city}}酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{this.hotelDetail[0].name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 酒店标题 -->
    <div class="hotelTitle">
      <h3>
        {{this.hotelDetail[0].name}}
        <i
          v-for="(item,index) in level"
          :key="index"
          class="iconfont iconhuangguan"
        ></i>
      </h3>
      <P>{{this.hotelDetail[0].alias}}</P>
      <span>
        <i class="el-icon-location"></i>
        {{this.hotelDetail[0].address}}
      </span>
    </div>
    <!-- 酒店图片 -->
    <el-row class="hotel" type="flex">
      <el-col class="leftPic" :span="16">
        <img :src="bigSrc.url" />
      </el-col>
      <el-col class="rightPic" :span="8">
        <el-row class="samllPic" type="flex">
          <img
            v-for="(item,index) in imgSrc"
            :key="index"
            @click="handleClick(index)"
            :src="item.url"
          />
        </el-row>
      </el-col>
    </el-row>
    <!-- 价格来源 -->
    <div class="hotelPrice">
      <a href="http://www.baidu.com">
        <el-table :data="products" style="width:100%">
          <el-table-column prop="name" label="价格来源" width="420"></el-table-column>
          <el-table-column prop="bestType" label="低价房型" width="420"></el-table-column>
          <el-table-column prop="price" label="最低价格/每晚">
            <template slot-scope="scope">
              <span style="margin-left: 10px">￥{{ scope.row.price }}</span> 起
              <i class="el-icon-arrow-right"></i>
            </template>
          </el-table-column>
        </el-table>
      </a>
    </div>

    <!-- 地图/风景/交通 -->
    <div class="mapView">
      <el-row type="flex" justify>
        <el-col :span="16">
          <!-- 地图 -->
          <Map />
        </el-col>

        <el-col :span="8">
          <!-- 风景列表 -->
          <SceneryList />
        </el-col>
      </el-row>
    </div>

    <!-- 基本信息 -->
    <BasicInfo />

    <!-- 用户评论 -->
    <UserComment />
  </div>
</template>

<script>
import Map from "@/components/hotel/map";
import SceneryList from "@/components/hotel/sceneryList";
import BasicInfo from "@/components/hotel/basicInfo";
import UserComment from "@/components/hotel/userComment";

export default {
  data() {
    return {
      hotelDetail: [
        {
          big_cate: ""
        }
      ],
      level: "",
      bigSrc: { url: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg" },
      imgSrc: [
        { url: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg" },
        { url: "http://157.122.54.189:9093/images/hotel-pics/2.jpeg" },
        { url: "http://157.122.54.189:9093/images/hotel-pics/3.jpeg" },
        { url: "http://157.122.54.189:9093/images/hotel-pics/4.jpeg" },
        { url: "http://157.122.54.189:9093/images/hotel-pics/5.jpeg" },
        { url: "http://157.122.54.189:9093/images/hotel-pics/6.jpeg" }
      ],
      products: []
    };
  },

  components: {
    Map,
    SceneryList,
    BasicInfo,
    UserComment
  },
  methods: {
    handleClick(index) {
      this.bigSrc = this.imgSrc[index];
    }

    // link () {
    //     window.location.href = "http://www.baidu.com"
    //   }
  },

  mounted() {
    this.$axios({
      url: "/hotels/?",
      params: this.$route.query.id // 这个id需要从链接里面取
    }).then(res => {
      // console.log(res.data);
      this.hotelDetail = res.data.data;
      this.products = res.data.data[0].products;
      this.level = res.data.data[0].hotellevel.level; // 等级,皇冠

      // 酒店详情数据存储到store
      this.$store.commit("hotelDetail/setHotelData", this.hotelDetail);
    });
  }
};
</script>

<style lang="less" scoped>
.detailContainer {
  width: 1000px;
  margin: 0 auto;
  .breadcrumb {
    padding: 20px 0;
  }
  .hotelTitle {
    padding-bottom: 40px;
    h3 {
      font-size: 24px;
      font-weight: 400;
      // margin-right:20px;
      .iconhuangguan {
        color: #ff9900;
        margin-left: 2px;
      }
    }
    p {
      font-size: 12px;
      color: #666;
    }
    span {
      font-size: 14px;
      color: #666;
    }
  }
  .hotel {
    margin-bottom: 30px;
    .leftPic {
      img {
        width: 640px;
        height: 360px;
      }
    }
    .rightPic {
      .samllPic {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        // align-items: center;
        flex-wrap: wrap;
        img {
          height: 110px;
          display: block;
          margin-bottom: 15px;
        }
      }
    }
  }
  .hotelPrice {
    padding-bottom: 40px;
    cursor: pointer;
    span {
      font-size: 16px;
      font-weight: 400;
      color: rgb(255, 153, 0);
    }
    i {
      color: rgb(255, 153, 0);
    }
  }
  .mapView {
    padding-bottom: 40px;
  }
  width: 1000px;
  margin: 0 auto;
  .bigpic {
    width: 640px;
    height: 360px;
  }
  .spic {
    width: 160px;
  }
}
</style>