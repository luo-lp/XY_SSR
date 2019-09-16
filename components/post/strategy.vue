<template>
  <div class="strategy">
    <div class="searchCity">
      <div class="search">
        <input type="text" placeholder="请输入想去的地方，比如:'广州'" />
        <i class="el-icon-search"></i>
      </div>
      <div class="searchRecommened">
        <span>推荐:</span>
        <a
          style="margin-right:5px"
          to="#"
          @click="gzClick(item)"
          v-for="(item,index) in cityS "
          :key="index"
        >{{item}}</a>
      </div>
    </div>
    <div class="title">
      <h2>推荐攻略</h2>
      <nuxt-link to="/post/create">
        <el-button type="primary" icon="el-icon-edit" class="youji">写游记</el-button>
      </nuxt-link>
    </div>

    <div class="main" v-for="(item,index) in content" :key="index">
      <nuxt-link :to="`/post/detail?id=${item.id}`" class="firstline">{{item.title}}</nuxt-link>
      <br />

      <p href="#" class="content">
        <a>{{item.summary}}</a>
      </p>

      <a class="img">
        <img v-for="(item2,index2) in item.images" :key="index2" :src="item2" v-if="index2 < 3" />
      </a>

      <div class="under" id="under">
        <div class="left">
          <i class="el-icon-location-outline"></i>
          <span>{{item.cityName}}</span>
          <img
           
            style="height:16px;width:16px;display:block"
            :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`"
            
          />
          <span class="nickName">{{$store.state.user.userInfo.user.nickname}}</span>
          <span class="el-icon-view"></span>
          <span class="watch">{{item.watch}}</span>
        </div>
        <span class="like">{{item.like?item.like:0}}赞</span>
      </div>


    </div>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: [],
      pageIndex: 1,
      pageSize: 3,
      total: 0,
      currentChange: [],
      images: [],
      id: 1,
      // isActive:true,
      // hasError:false,
      searchCities: "",
      cityS: ["广州", "上海", "北京"],
      city: ""
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // this.content = res.data.data.slice(0,val)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.content = this.currentChange.slice(
        this.pageSize * (val - 1),
        this.pageSize * val
      );
    },

    gzClick(city) {
      console.log(city);
      this.$axios({
        url: "/posts/",
        params:{
          city
        }
      }).then(res => {
        console.log(res.data.data, 222);
        this.content = res.data.data;
        // console.log(res.data[0].images,444)
        this.total = res.data.data.length;
        this.content = res.data.data.slice(0, this.pageSize);
        this.currentChange = res.data.data;

        console.log(this.$store);
      });
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/"
    }).then(res => {
      console.log(res.data.data, 222);
      this.content = res.data.data;
      // console.log(res.data[0].images,444)
      this.total = res.data.data.length;
      this.content = res.data.data.slice(0, this.pageSize);
      this.currentChange = res.data.data;

      console.log(this.$store);
    });
  },
  watch:{
    '$store.state.cities.infoCities'(){
      
      this.$axios({
        url: "/posts/",
        params:{
          city:this.$store.state.cities.infoCities
        }
      }).then(res => {
        console.log(res.data.data, 222);
        this.content = res.data.data;
        // console.log(res.data[0].images,444)
        this.total = res.data.data.length;
        this.content = res.data.data.slice(0, this.pageSize);
        this.currentChange = res.data.data;

        console.log(this.$store);
      });
    }
  }
};
</script>

<style scoped lang="less">
.activee{
  float: left;
}
#under{
  // background-color: red;
  line-height: 14px;
  img{
    margin: 0 5px;
  height: 14px;
  width: 14px;
  }
  .nickName{
    color:orange;
    margin-right: 5px;
  }
}
.strategy {
  width: 700px;
}
.title {
  border-bottom: 1px #eee solid;
  // padding-bottom:10px;
  // border-top:none;
  // padding:10px 0;
}
.title:after {
  content: "";
  display: block;
  clear: both;
}
h2 {
  font-weight: 400;
  font-size: 18px;
  color: orange;
  border-bottom: 2px solid orange;
  margin-top: 10px;
  padding-bottom: 10px;
  float: left;
}
h3 {
  font-size: 18px;
}
.youji {
  float: right;
}
.main {
  padding: 20px 0;
  border-bottom: 1px solid #999;
}
.main .firstline {
  font-size: 18px;
  display: block;
}
.main .firstline:hover {
  color: orange;
}
.main img {
  width: 220px;
  height: 150px;
  display: block;
}
.main .img {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  // float:left;
}
.main .content {
  display: block;
  color: #666666;
  font-size: 14px;
  line-height: 1.5;
  height: 63px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
}
.main p {
  font-size: 14px;
}
// .oneImage{
//   float:left;
//   margin-right:10px;
// }
// .oneImageWord{
//   float:right
//   width:470px;
// }

active {
  float: left;
}
.left {
  display: flex;
}
.right {
  float: right;
}
.under {
  font-size: 14px;
  color: #999;
  display: flex;
  justify-content: space-between;
  height: 20px;
}
.like {
  font-size: 16px;
  color: orange;
  float: right;
}

.searchCity {
  width: 700px;
  overflow: hidden;
  clear: both;
}
.search {
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
  border: 3px solid orange;
}
.search input {
  padding: 0 20px;
  line-height: 40px;
  outline: none;
  border: none;
  background: none;
  width: 610px;
}
.search i {
  font-size: 24px;
  color: orange;
  font-weight: 700;
  margin-right: 10px;
}
.searchRecommened {
  font-size: 12px;
  color: #666;
  padding: 10px 0;
}
// .searchRecommened nuxt-link:hover{
//     text-decoration: normal;
// }
.input-with-select {
  border: 3px solid orange;
  width: 700px;
}
</style>