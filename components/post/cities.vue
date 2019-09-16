<template>
  <div class="cities">

    <div @mouseenter="isShow=true" @mouseleave="isShow=false">
      <!-- tab左侧 -->
      <div class="menu">
        <div v-for="(item,index) in options" :key="index" @mouseenter="count = index">
          {{item.type}}
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <!-- tab右侧 -->
      <div class="menuRight" v-show="count === index" v-for="(item,index) in options" :key="index"
      v-if="isShow"
      >
        <div class="menuRightLi" v-for="(item,index) in item.children" :key="index" @click="citiesClick(item.city)">
          <span>{{index+1}}</span>
          <nuxt-link to="#" class="city" >{{item.city}}</nuxt-link>
          <nuxt-link to="#" class="cityDetail">{{item.desc}}</nuxt-link>
        </div>
      </div>

    </div>

    <!-- 推荐城市 -->
    <div class="recommened">
      <div class="tuijian">推荐城市</div>
      <hr />
      <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" />
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      options: [],
      count: 0,
      cityList:[]
    };
  },

  methods: {
    citiesClick(city){
      console.log(city)
      console.log(this.$store)
      // this.$store.state
      this.$store.commit('cities/setInfoCities',city)
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      this.options = res.data.data;
      console.log(res.data.data);
    });
  }
};
</script>

<style scoped lang="less">
.cities {
  // width: 1000px;
  // border-bottom: 1px #ddd solid;
  // margin:0 auto;
  padding: 20px 0;
  position: relative;
  width: 260px;
}
.menu {
  width: 260px;
  border: 1px solid #dddddd;
  border-right: none;
}
.menu div {
  height: 41px;
  line-height: 41px;
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  padding: 0 20px;
  font-size: 14px;
  z-index: 2;
  background-color:#fff;
  &:hover {
    border-right: none;
    color: orange;
  }
}

.menu div:nth-child(4) {
  border-bottom: none;
}
.menu div i {
  float: right;
  width:10px;
  height:10px;
  color:#999;
  line-height:40px;
  height:40px;
  font-size:20px;
  color:inherit
}
.menuRight {
  position: absolute;
  width: 350px;
  border: 1px solid #dddddd;
  //   position: absolute;
  left: 260px;
  top: 20px;
  display: hidden;
  background-color: #fff;
  padding: 10px 20px;
  z-index: 1;
}
.menuRightLi span {
  color: orange;
  font-style: italic;
  font-size: 24px;
  vertical-align: middle;
}
.menuRightLi .city {
  color: orange;
  margin: 0 10px;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
}
.menuRightLi .cityDetail {
  color: #999;
  vertical-align: middle;
  font-size: 14px;
}
.active {
  color: #ffa500;
  border-right-color: #fff;
}

//推荐图片
.recommened {
  width: 260px;
  margin-top: 10px;
}
hr {
  margin-bottom: 10px;
  border: 1px solid #dddddd;
}
.tuijian {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 10px;
}
img {
  width: 260px;
  height: 173.2px;
}
</style>