<template>
  <div class="det_right">
    <h3>相关攻略</h3>
    
    <div v-for="(item, index) in recHtml" :key="index" class="bottom">
      <nuxt-link v-if="item" :to="`/post/detail?id=${item.id}`" @click="linkTo(item.id)">
      <el-col :span="10">
        <img :src="item.images[0]" alt />
      </el-col>
      <el-col :span="14">
        <p>{{ item.title }}</p>
        <span>{{ item.updated_at }}阅读:{{item.watch}}</span>
      </el-col>
    </nuxt-link>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  data() {
    return {
      // 推荐文章数据
      recHtml: [{ title: "", updated_at: "", images: [""], watch: "" }]
    };
  },
  methods: {
    linkTo(id) {
      this.$router.push({ path: "posts", query: { id } });
    },
    // 获取相关文章
    getRelatedArticles() {
      this.$axios({
        url: "/posts/recommend"
        // url: "http://157.122.54.189:9095/posts/recommend",
        // params: {
        //   // id: "4"
        // }
      }).then(res => {
        res.data.data.forEach(v => {
          // console.log(new Date(v.updated_at));
          v.updated_at = Moment(v.updated_at).format("YYYY-MM-DD");
        });
        this.recHtml = res.data.data;
        console.log(res, 999999);
        // console.dir(Moment);
      });
    }
  },
  mounted() {
    this.getRelatedArticles();
  }
};
</script>


<style lang="less" scope>
.det_right {
  padding-left: 15px;
  .bottom {
    padding: 15px 0;
    border-bottom: 1px solid #666;
  }
  h3 {
    font-weight: 400;
    padding: 15px 0;
    border-bottom: 1px solid #666;
  }
  div {
    height: 80px;
    overflow: hidden;
    position: relative;
    p {
      margin-left: 10%;
    }
    img {
      height: 100%;
      width: 100%;
      margin-right: 5px;
    }
    span {
      position: absolute;
      left: 10%;
      bottom: 0;
      color: #939393;
    }
  }
}
</style>