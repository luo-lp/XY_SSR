<template>
  <div class="det_right">
    <h3>相关攻略</h3>

    <div v-for="(item, index) in recHtml" :key="index" class="bottom">
      <nuxt-link v-if="item" :to="`/post/detail?id=${item.id}`" @click="linkTo(item.id)">
        <el-col :span="10">
          <div class="Dimg">
            <img :src="item.images[0]" alt />
          </div>
        </el-col>
        <el-col :span="14">
          <div class="aside">{{ item.title }}</div>
          <span>{{ item.updated_at }}阅读:{{item.watch?item.watch:0}}</span>
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
      }).then(res => {
        res.data.data.forEach(v => {
          v.updated_at = Moment(v.updated_at).format("YYYY-MM-DD");
        });
        this.recHtml = res.data.data;
      });
    }
  },
  mounted() {
    this.getRelatedArticles();
  }
};
// 测试
</script>

<style lang="less" scoped>
.det_right {
  padding-left: 15px;
  .Dimg{
    width: 100%;
    background-color: #dddddd;
  }
  .aside {
    padding-left: 10%;
    line-height: 1.4em;
    height: 2.8em;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
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