<template>
<div class="publish">
     <!-- 头部 -->
      <h2>发表新攻略</h2>
      <p class="wenzi">分享你的个人游记，让更多人看到哦！</p>
      <el-input v-model="input" placeholder="请输入内容" class="titlinput"></el-input>
      <!-- 富文本框 -->
   <div id="app" class="container">
       <VueEditor :config="config" ref="vueEditor" />
  </div>
      <!-- 底部选择城市框 -->
      <span>选择城市：</span> 
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
     <el-button type="success" round @click="tijiao">发布</el-button>
    <el-button type="primary" @click="draft" round>保存到草稿</el-button>
    </div>
  </div>
</template>
<script>
// 需要单独引入样式
import "quill/dist/quill.snow.css"
import moment from "moment";
let VueEditor;
if (process.browser) {
    VueEditor = require('vue-word-editor').default
}
export default {
  name: 'app',
    data(){
        return{
            input:'',
            // 选中的游玩城市
            playCity:'',
            // 选中的城市id
            playCityid:'',
            // 后台给你的城市列表数据
            citydata:[],
            // 草稿箱数组
            caogao:[],
      config: {
        modules: { 
          // 工具栏
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['image', 'video'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          ]
        },
        // 主题
        theme: 'snow',
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file){
            return true
          },
          uploadProgress(res){

          },
          uploadSuccess(res, insert){
            insert("http://localhost:1337" + res.data[0].url)
          },
          uploadError(){},
          showProgress: true
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file){
            return true
          },
          uploadProgress(res){
          },
          uploadSuccess(res, insert){
            insert("http://localhost:1337" + res.data[0].url)
          },
          uploadError(){},
        }
      }
        }
    },
    components: {
    VueEditor
  },
    methods: {
    // 搜索建议
       async queryDestSearch(value,cb){
         this.citydata=[]
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
             // 给数组里面的每个对象元素添加一个value属性进去，并赋值给建议城市，并返回新的数组，
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
      // 提交文章
       async tijiao(){
        let hh=await this.$axios({
          url:'/posts',
          method:'post',
          headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
         },
          data:{
            title:this.input,
            city:this.playCityid,
            content:this.$refs.vueEditor.editor.root.innerHTML
          }
        })
        // 新增成功时提示框
        if (hh.status===200){
          this.$message({
          showClose: true,
          message: hh.data.message,
          type: 'success'
        });
            // 标题
            this.input='',
            // 选中的游玩城市
            this.playCity='',
            // 文本框内容
            this.$refs.vueEditor.editor.root.innerHTML=''
        }
        },
        // 保存草稿
        draft(){
          let time= moment(new Date()).format(`YYYY-MM-DD`);
          let data=[{
            title:this.input,
            cityName:this.playCity,
            content:this.$refs.vueEditor.editor.root.innerHTML,
            time
          }]
          // 从本地获取数据
            let str = localStorage.getItem('posts') || "[]";
            let arr = JSON.parse(str);
            if (arr.length!=0){
        this.caogao.push(data[0])
        localStorage.setItem('posts',JSON.stringify(this.caogao))
            }else{
        this.caogao=data
        localStorage.setItem('posts',JSON.stringify(this.caogao))
            }
            console.log(this.caogao);
        },
},
mounted(){
  // 文本框设置样式
this.$refs.vueEditor.editor.root.style='min-height:400px;max-height:400px;overflow-y:auto;'
}
}
</script>

<style lang="less" scoped>
.publish{
    h2{
    font-weight: 400;
    font-size: 22px;
    margin-bottom: 10px;
    }
    .wenzi{
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
    }
    .buttons{
        margin: 20px 0;
}
.container {
  margin: 0 auto;
  padding: 20px 0;
}
}

</style>