<template>
  <div>
    <el-row type="flex" justify class="disform">
      <el-col :span="24">
        <h3>评论</h3>
        <el-tag
          v-if="$store.state.post.nameData"
          closable
          @close="handleClose"
          type="info"
        >@{{$store.state.post.nameData}}</el-tag>
        <el-form ref="form" :model="disForm" label-width>
          <el-form-item>
            <el-input type="textarea" v-model="disForm.content" class="textArea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getDiscuss" style="float:right;position: relative">提交</el-button>
            <!-- 照片墙 -->
            <el-upload
              :headers="{Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
                    }"
              :multiple="false"
              :auto-upload="true"
              :http-request="uploadFile"
              action="/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              ref="upload"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <Item v-on:follow="followId" :data="disList" />
    <el-pagination
      @current-change="currentChange"
      @size-change="handleSizeChange"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total-0"
    ></el-pagination>
  </div>
</template>

<script>
import Item from "@/components/post/digui";
export default {
  data() {
    return {
      tag: {
        name: "",
        info: ""
      },
      discussImg: [],
      content: {
        content: "",
        pics: [],
        post: this.$route.query.id
      },
      // 传过去多级评论的数据
      disList: [
        {
          content: "",
          parent: {
            id: "123",
            content: "123"
          }
        }
      ],
      dialogImageUrl: "",
      dialogVisible: false,
      // 评论
      disForm: {
        content: ""
      },
      // 上传多张图片后的数组
      pics: [],
      total: "",
      pageSize: 2
    };
  },
  methods: {
    currentChange(val) {
      let start = (val - 1) * 2;
      setTimeout(() => {
        this.$axios({
          url: "posts/comments",
          params: {
            post: 4,
            _limit: this.pageSize,
            _start: start
          }
        }).then(res => {
          this.disList = res.data.data;
          console.log(this.disList);
        });
      }, 30);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      setTimeout(() => {
        this.$axios({
          url: "posts/comments",
          params: {
            post: 4,
            _limit: this.pageSize,
            _start: 0
          }
        }).then(res => {
          this.disList = res.data.data;
          console.log(this.disList);
        });
      }, 30);
    },
    followId(aa) {
      console.log(aa);
    },
    // 清空仓库post里面存储的数据
    handleClose() {
      this.$store.commit("post/setnameData", null);
      this.$store.commit("post/setInfoData", null);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 覆盖默认上传图片事件
    uploadFile(files) {
      this.$axios
        .post("http://127.0.0.1:1337/upload", null, {
          transformRequest: [
            () => {
              let formData = new FormData();
              formData.append("files", files.file);
              return formData;
            }
          ]
        })
        .then(data => {
          // console.log(data);
          // this.discussImg=data.data
          this.content.pics = data.data;
          this.pics.push(data.data[0]);
          console.log(this.pics);
        });
    },
    // 点击提交发送请求
    getDiscuss() {
      if(!this.disForm.content){
        this.$message({
          message: '提交内容不能为空',
          type: 'warning'
        })
        return
      }
      // 图片
      this.content.pics = this.pics;
      // 内容
      this.content.content = this.disForm.content;
      this.content.post = this.$route.query.id;
      this.content.follow = this.$store.state.post.infoData;
      this.$axios({
        url: "/comments",
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
          // "Content-Type": "application/json"
        },
        data: this.content
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          // 清空 图片 内容
          this.pics = [];
          this.disForm.content = "";
          // 图片
          this.content.pics = null;
          // 内容
          this.content.content = null;
          this.getComment();
          this.$store.commit("post/setInfoData", null);
          this.content.post = null;
          this.content.follow = null;
          this.tag.name = null;
          this.tag.info = null;
          this.$store.commit("post/setnameData", null);
          this.$store.commit("post/setInfoData", null);
          this.$refs.upload.clearFiles();
        }
      });
    },

    // 获取评论数据
    getComment() {
      setTimeout(() => {
        console.log(this);
        
        this.$axios({
          url: "posts/comments",
          params: {
            post: this.$route.query.id,
            _limit: 2,
            _start: 0
          }
        }).then(res => {
          this.disList = res.data.data;
          this.total = res.data.total;
          // console.log(this.disList);
        });
      }, 30);
    }
  },
  mounted() {
    this.getComment();
  },
  components: {
    Item
  },
  watch: {
    $route() {
      this.getComment();
    }
  }
};
</script>

<style lang="less" scoped>
</style>