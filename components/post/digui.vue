<template>
  <div>
    <!-- {{data}} -->
    <div v-for="(item, index) in data" :key="index" class="list">
      <img v-if="item.account" :src="`${url}${item.account.defaultAvatar}`" class="UserImg" />
      <span v-if="item.account">{{item.account.nickname}}</span>
      <span >{{item.updated_at|getMoment}}</span>
      <span>{{item.level}}</span>
      <Item :data="item" v-if="item.parent"/>
      <!-- <Item data="item" v-on:follow="followId" /> -->
      <div v-if="item.content">{{item.content}}</div>
        <img  v-for="(item1, index) in item.pics" :key="index" v-if="item1" :src="`${url}${item1.url}`" class="pinglunImg" />
      <div style="overflow:hidden">
        <a href="javascript:;" style="float:right" @click="reply(item)">回复</a>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
import Item from "@/components/post/item";
export default {
  data() {
    return {
      url: this.$axios.defaults.baseURL
    };
  },
  mounted() {
    console.log(this.$axios.defaults.baseURL);
  },
  props: ["data"],
  filters: {
    getMoment: data => {
      return Moment(data).format("YYYY-MM-DD hh:ss");
    }
  },
  components: {
    Item
  },
  methods:{
    reply(data) {
      // console.log(data);
      this.$store.commit("post/setInfoData", data.id);
      this.$store.commit("post/setnameData", data.account.nickname);
    }
  }
};
</script>

<style lang="less" scoped>
div{
  margin-bottom: 10px;
}
.list {
  border: 1px solid red;
  padding: 5px;
}
.UserImg {
  width: 16px;
}
.pinglunImg {
  width: 20%;
}
</style>