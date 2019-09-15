<template>
  <div>
    <div class="digui-item">
      <item :data="data.parent" v-if="data.parent" />
    
      <span v-if="data.account">{{data.account.nickname}}</span>
      <span >{{data.updated_at|getMoment}}</span>
      <span>{{data.level}}</span>
      <div>
          <img v-for="(item1, index) in data.pics" :key="index" v-if="item1" :src="`${$axios.defaults.baseURL}${item1.url}`" class="pinglunImg" />
      </div>
      <div style="overflow:hidden">
        <a href="javascript:;" style="float:right" @click="reply(data)">回复</a>
      </div>
      <!-- <div>

        
        
      </div>-->

      <!-- <span>{{data.account.created_at}}</span> -->
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
      // console.log(id);
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

<style lang="less" scope>
.digui-item {
  border: 1px solid #666;
  padding: 10px;
  img {
    width: 16px;
  }
  .pics {
    width: 20%;
  }
  .pinglunImg{
    width: 20%;
  }
}
</style>