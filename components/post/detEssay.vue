<template>
  <div class="detEssay">
    <!-- 渲染标题 -->
    <h1 v-html="detEssayData.title"></h1>
    <!-- 渲染时间与阅读量 -->
    <p class="strategyAndReadNumber">
      <span>阅读：{{ detEssayData.watch?detEssayData.watch:0 }}</span>
      <span>攻略：{{ detEssayData.created_at|formatTime }}</span>
    </p>
    <!-- 渲染内容 -->
    <div v-html="detEssayData.content"></div>
  </div>
</template>

<script>
// 引入格式化时间插件monent
import Moment from "moment";
export default {
  data() {
    return {
      // 文章总数据
      detEssayData: {},
      CommentNumber:'',
      like:''
    };
  },
  methods: {
    // 根据id获取文章
    getDetailList() {
      this.$axios({
        url: "http://127.0.0.1:1337/posts?id=" + this.$route.query.id
      }).then(res => {
        // 文章总数据
        this.detEssayData = res.data.data[0];
        // 分页
        this.total = res.data.total;
        // 评论
        this.comments = res.data.data[0].comments;
        // 评论人数
        this.CommentNumber = res.data.data[0].comments.length;
        this.$store.commit("post/setdianzanData", this.CommentNumber)
        this.like = !res.data.data[0].like ? 0 : res.data.data[0].like;
        this.$store.commit("post/pinglunData", this.like)
        // console.log(CommentNumber);
        // console.log(res, "123");
        // this.handleClose();

        this.$store.commit("post/setInfoData", null);
        this.$store.commit("post/setnameData", null);
      });
    }
  },
  mounted() {
    this.getDetailList();
  },
  filters: {
    formatTime: time => {
      return Moment(time).format("YYYY-MM-DD hh:ss");
    }
  },
  watch: {
    $route() {
      this.getDetailList();
    }
  }
};
</script>

<style lang="less">
.detEssay {
  padding-top: 30px;
  h1 {
    border-bottom: 1px solid#b4b4b4;
    padding-bottom: 25px;
    margin-bottom: 25px;
  }
  h2{
    margin: 10px 0;
  }
  p {
    >img {
      max-width: 100%;
      margin: 20px 0;
    }
    a {
      img {
        width: 100%;
      }
    }
    span {
      img {
        display: block;
        width: 100%;
        margin: 10px 0;
      }
    }
  }
  span {
    margin-bottom: 20px;
  }
  .strategyAndReadNumber {
    overflow: hidden;
    padding-bottom: 25px;
    span {
      float: right;
      margin-left: 25px;
      color: #939393;
    }
  }
}
</style>