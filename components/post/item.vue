<template>
  <div>
    <div class="digui-item">
      <item :data="data.parent" v-if="data.parent" />
      <div class="top1">
        <span v-if="data.account">{{data.account.nickname}}</span>
        <span>{{data.updated_at|getMoment}}</span>
        <span style="float:right">{{data.level}}</span>
        <p>{{data.content}}</p>
      </div>
      <div>
        <img
          v-for="(item1, index) in data.pics"
          :key="index"
          v-if="item1"
          :src="`${$axios.defaults.baseURL}${item1.url}`"
          class="pinglunImg"
        />
      </div>
      <div class="show">
          <a href="javascript:;" style="float:right" @click="reply(data)">回复</a>
        </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  name: "item",

  props: ["data"],
  methods: {
    reply(data) {
      // console.log(data);
      this.$store.commit("post/setInfoData", data.id);
      this.$store.commit("post/setnameData", data.account.nickname);
    }
  },
  mounted() {
    console.dir(this.$axios.defaults.baseURL);
  },
  filters: {
    getMoment: data => {
      return Moment(data).format("YYYY-MM-DD hh:ss");
    }
  }
};
</script>

<style lang="less" scoped>
.digui-item {
  border: 1px solid #dddddd;
  padding: 10px;
  background-color: #f9f9f9;
  img {
    width: 16px;
  }
  .pics {
    width: 20%;
  }
  .pinglunImg {
    width: 20%;
  }
  
}
.show {
  height: 20px;
  a {
    display: none;
    float: right;
  }
  &:hover {
    a {
      display: block;
    }
  }
}
.digui-item{
  &:hover {
    a {
      display: block;
    }
  }
}
.top1 {
  margin-top: 5px;
  p{
    padding-top:25px;
  }
}
</style>