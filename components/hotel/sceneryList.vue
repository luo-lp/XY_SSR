<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="风景" name="first" class="sceneryList">
        <ol>
          <li class="sceneryItem" v-for="(item,index) in sceneryList" :key="index" @mouseenter="mouseEnterChangeCenter(index)">
            <p>
              <span>{{item.name}}</span>
              <span>1.03公里</span>
            </p>
          </li>
        </ol>
      </el-tab-pane>
      <el-tab-pane label="交通" name="second" @click="handleClick" class="stationList"> 
        <ol>
          <li class="stationItem" v-for="(item,index) in stationList" :key="index">
            <p>
              <span>{{item.name}}</span>
              <span>1.03公里</span>
            </p>
          </li>
        </ol>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      sceneryList: [],  // 景点列表
      stationList: [],  // 交通列表
      currentCenter:""  // 当前中心点坐标
    };
  },
  methods: {
    // 鼠标悬停改变地图中心为当前的坐标
    mouseEnterChangeCenter(index){
      this.currentCenter = this.sceneryList[index].location  // 当前坐标点
      this.$store.commit("hotelDetail/setCurrentCenter",this.currentCenter)
    },

    // 查询交通数据
    handleClick() {
      this.$axios({
        url: "https://restapi.amap.com/v3/place/text",
        params: {
          keywords: "",
          city: "厦门",
          location: "118.000227,24.518455",
          types: "交通设施服务",
          output: "json",
          page: 1,
          offset: 10,
          key: "79041dfa1c752f49599e2b507c64da42"
        }
      }).then(res => {
        this.stationList = res.data.pois
      });
    }
  },
  
  mounted() {

    setTimeout(() => {
      this.sceneryList = this.$store.state.hotelDetail.sceneryList;
    }, 10)

  }
};
</script>

<style lang="less" scoped>
.sceneryList {
  overflow-y: scroll;
  height: 306px;
  .sceneryItem{
    p {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      line-height: 40px;
      font-size: 14px;
      color: #666;
    }
  }
}
.stationList {
  overflow-y: scroll;
  height: 306px;
  .stationItem{
    p {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      line-height: 40px;
      font-size: 14px;
      color: #666;
    }
  }
}
</style>