<template>
  <div class="publish">
      <!-- 头部 -->
      <h2>发表新攻略</h2>
      <p>分享你的个人游记，让更多人看到哦！</p>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <!-- 富文本框 -->
      <!-- 底部城市框 -->
      选择城市：
       <el-autocomplete
      class="inline-input"
      v-model="playCity"
      :fetch-suggestions="queryDestSearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleDestSelect"
      @blur="handlDestBlur"
    ></el-autocomplete>
    <!-- 发布按钮 -->
    <div class="buttons">
        <el-button type="success" round>发布</el-button>
    <el-button type="primary" round>保存到草稿</el-button>
    </div>
  
  </div>
</template>

<script>
export default {
    data(){
        return{
            input:'',
            // 选中的游玩城市
            playCity:'',
            // 选中的城市id
            playCityid:'',
            // 后台给你的城市列表数据
            citydata:[]
            
        }
    },
    methods: {
    // 搜索建议
       async queryDestSearch(value,cb){
        //    输入不为空
           if(value===''){
               return
           }else{
            let hh=await this.$axios({
             url:'/airs/city',
             params: {
                    // 输入框的关键字
                    name: value
                }
            })
            this.citydata=hh.data.data
             console.log(hh);
             // 添加一个value属性进去返回的数据，并赋值给建议城市
            hh.data.data.map((item,index)=>{
              this.citydata.push(
                 Object.assign(item,{value:item.name})
                ) 
              });
            //   返回建议城市
              cb(this.citydata)
           }
           
        },
      // 游玩城市下拉选择时触发
        handleDestSelect(item) {
            // 把选中的城市id设置给this.playCityid
            this.playCityid = item.id;
        },

      // 游玩城市输入框失去焦点时候触发
      handlDestBlur(){
        //   如果失焦的时候的默认值
            this.playCity = this.playCity ? this.citydata[0].value :"";
            this.playCityid= this.playCity ? this.citydata[0].id :"";  
        },
    },
    


}
</script>

<style lang="less" scoped>
.publish{
    width: 750px;
    .buttons{
        margin: 20px 0;
}
}
</style>