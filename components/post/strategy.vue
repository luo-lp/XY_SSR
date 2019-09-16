<template>
  <div class="container">
      <div class="title">
        <h2>推荐攻略</h2>
        <el-button type="primary" icon="el-icon-edit" class="youji"><nuxt-link to="/post/create">写游记</nuxt-link></el-button>
      </div>


      <div class="main"
      v-for="(item,index) in content"
      :key="index"
      >
        <nuxt-link :to="`/post/detail?id=${item.id}`" class="firstline">{{item.title}}</nuxt-link>
        <br>
            
        <p href="#" class="content"
        >
          <a>{{item.summary}}</a>
        </p>  
        
        <a class="img">
              <img 
            v-for="(item2,index2) in item.images"
            :key="index2"
            :src="item2"

            v-if="index2 < 3"
            />
        </a>

        <div >
          <span>{{item.cityName}}</span> 
          <img 
          
          style="height:16px;width:16px;display:block"
          :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`" >
          <span>{{$store.state.user.userInfo.user.nickname}}</span>
          <span class="el-icon-view"></span>
          <span>{{item.watch}}</span>
          <span>{{item.like}}赞</span>
        </div>


      </div>



      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return{
      content:[],
      pageIndex:1,
      pageSize:3,
      total:0,
      currentChange:[],
      images:[],
      id:1,
      // isActive:true,
      // hasError:false,
    }
  },
  methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.content = this.currentChange.slice(this.pageSize*(val-1),this.pageSize * val)
      }
  },
  mounted(){
    this.$axios({
      url:'/posts/',
    }).then(res=>{
      console.log(res.data.data,222)
      this.content = res.data.data
      // console.log(res.data[0].images,444)
      this.total = res.data.data.length
      this.content = res.data.data.slice(0,this.pageSize)
      this.currentChange = res.data.data 

      console.log(this.$store)

    })
  }
}
</script>

<style scoped lang="less">
  .container{
    width:700px;
  }
  .title{
    border-bottom:1px #eee solid;
    // padding-bottom:10px;
    // border-top:none;
    // padding:10px 0;
  }
  .title:after{
    content:'';
    display: block;
    clear:both;
  }
  h2{
    font-weight: 400;
    font-size: 18px;
    color:orange;
    border-bottom:2px solid orange;
    margin-top:10px;
    padding-bottom:10px;
    float:left;
  }
  h3{
    font-size:18px;
  }
  .youji{
    float:right
  }
  .main{
    padding:20px 0
    }
  .main .firstline{
    font-size:18px;
    display:block;
  }
  .main .firstline:hover{
    color:orange
  }
  .main img{
    width:220px;
    height:150px;
    display:block;
  }
  .main .img{
    display:flex;
    justify-content:space-between;
    margin:15px 0;
    // float:left;

  }
  .main .content{
    display:block;
    color:#666666;
    font-size:14px;
    line-height:1.5;
    height:63px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp:3; 

  }
  .main p{
    font-size:14px;
  }
  // .oneImage{
  //   float:left;
  //   margin-right:10px;
  // }
  // .oneImageWord{
  //   float:right
  //   width:470px;
  // }

  active{
    float:left;
  }
</style>