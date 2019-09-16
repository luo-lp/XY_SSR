<template>
  <div>
    <el-row class="good" type="flex" justify="center">
      <span>
        <i class="iconfont iconiconfontpinglun"></i>
        <!-- 评论({{goods.CommentNumber}}) -->
        {{ $store.state.post.dianzanData }}
        
      </span>
      <span @click="collect">
        <i class="iconfont iconshoucang4"></i>
        收藏
      </span>
      <span>
        <i class="iconfont iconfenxiang"></i>
        分享
      </span>
      <span @click="clickLike">
        <i class="iconfont icondianzan1"></i>
        <!-- 点赞({{goods.like}}) -->
        {{ $store.state.post.pinglunData }}
      </span>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: {
        // 评论
        CommentNumber: null,
        // 点赞
        like: null
      }
    };
  },
  methods: {
    // 点击收藏后触发
    collect() {
      this.$axios({
        url: "/posts/star",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        params: {
          id: this.$route.query.id
        }
      })
    },
    // 点击点赞后触发
    clickLike() {
      this.$axios({
        url: "posts/like",
        // 配置请求头信息
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        params: {
          id: this.$route.query.id
        }
      });
    },
    // 获取文章数据
    getDetailList() {
      this.$axios({
        url: "/posts?id=" + this.$route.query.id
      }).then(res => {
        // 评论人数
        this.goods.CommentNumber = res.data.data[0].comments.length;
        console.log(this.goods.CommentNumber);
        
        this.goods.like = !res.data.data[0].like ? 0 : res.data.data[0].like;
      });
    },
  },
  mounted() {
    this.getDetailList();
  }
};
</script>

<style lang="less" scoped>
.good {
  margin: 55px 0;
  span {
    text-align: center;
    margin: 0 15px;
    i {
      font-size: 30px;
      display: block;
    }
  }
}
</style>