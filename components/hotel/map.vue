<template>
  <div>
    <div id="mapContainer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sceneryList: [], // 景点数据列表
      longitude: "", // 当前酒店经度
      latitude: "", // 当前酒店纬度
      location: "", // 初始坐标
      currentHotel: "", // 当前酒店
      arr: "", // 经纬度集合
      newCurrentCenter: [], // 新的中心点
      newMap: null
    };
  },
  methods: {
    // 获取交通数据
    getTrafficData() {}
  },
  mounted() {
    // 获取风景数据
    this.$axios({
      url: "https://restapi.amap.com/v3/place/text",
      params: {
        keywords: "",
        city: "厦门",
        location: "118.000227,24.518455",
        types: "风景名胜",
        output: "json",
        page: 1,
        offset: 10,
        key: "79041dfa1c752f49599e2b507c64da42"
      }
    }).then(res => {
      // 风景列表数据
      console.log(res.data.pois)
      this.sceneryList = res.data.pois;
      this.$store.commit("hotelDetail/setSceneryList", this.sceneryList);

      window.onLoad = () => {
        
        this.newMap = AMap;
        let map = new AMap.Map("mapContainer", {
          zoom: 12, // 地图缩放级别
          center: [this.longitude, this.latitude] // 中心点坐标
        });
        console.log(map)

        // 所有坐标
        let arr = [];
        this.sceneryList.forEach((e, i) => {
          let content = `<div class="markerSpot">${i + 1}</div>`;
          arr = e.location.split(",");
          let marker = new AMap.Marker({
            position: new AMap.LngLat(arr[0], arr[1]), // 经纬度
            title: e.name,
            content,
          });
          map.add(marker);
        });
      };
    });

    setTimeout(() => {
      // 获取当前酒店坐标
      this.currentHotel = this.$store.state.hotelDetail.hotelData[0].name;
      this.longitude = this.$store.state.hotelDetail.hotelData[0].location.longitude;
      this.latitude = this.$store.state.hotelDetail.hotelData[0].location.latitude;
    }, 50);

    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=144e1bdc353db812fc79f782ebd35b1f&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    
  },

  watch: {
    "$store.state.hotelDetail.currentCenter"(to) {
      this.newCurrentCenter = to.split(",");
      if (this.newMap) {
        let map = new this.newMap.Map("mapContainer", {
          zoom: 12, 
          center: this.newCurrentCenter // 新的中心点
        });

        // 所有新中心点坐标
        let arr = [];
        this.sceneryList.forEach((e, i) => {
          let content = `<div class="markerSpot">${i + 1}</div>`;
          arr = e.location.split(",");
          let marker = new AMap.Marker({
            position: new AMap.LngLat(arr[0], arr[1]), // 经纬度
            title: e.name,
            content,
          });
          map.add(marker);
        });
      }
    }
  }
};
</script>

<style lang="less" scoped >
#mapContainer {
  width: 650px;
  height: 360px;
  /deep/.markerSpot {
    width: 20px;
    height: 30px;
    line-height: 22px;
    text-align: center;
    font-size: 10px;
    color: #fff;
    background-color: #3f95fb;
    border-radius: 10px 10px 15px 15px;
    background: url(https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png)
      no-repeat;
    background-size: 20px 30px;
  }
}
</style>