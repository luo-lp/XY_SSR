<template>
  <div>
    <div v-for="(item, index) in data" :key="index" class="list">
      <div class="top">
        <img v-if="item.account" :src="`${url}${item.account.defaultAvatar}`" class="UserImg" />
        <span v-if="item.account">{{item.account.nickname}}</span>
        <span style="color:#979797">{{item.updated_at|getMoment}}</span>
        <span style="float:right">{{item.level}}</span>
      </div>
      <Item :data="item.parent" v-if="item.parent" />
      <div>
        <p v-if="item.content" class="content">{{item.content}}</p>
        <img
          v-for="(item1, index) in item.pics"
          :key="index"
          v-if="item1"
          :src="`${url}${item1.url}`"
          class="pinglunImg"
        />
        <div class="show">
          <a href="javascript:;" style="float:right" @click="reply(item)">回复</a>
        </div>
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
  methods: {
    reply(data) {
      // console.log(data);
      this.$store.commit("post/setInfoData", data.id);
      this.$store.commit("post/setnameData", data.account.nickname);
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  padding-left: 30px;
  padding-top: 15px;
  font-size: 14px;
}
div {
  font-size: 12px;
}
.top {
  // box-sizing: border-box;
  padding-top: 5px;
  margin-bottom: 15px;
}
.list {
  border: 1px solid #b4b4b4;
  padding: 15px;
  margin-bottom: 10px;
  span {
    padding-top: 3px;
  }
}
.UserImg {
  width: 16px;
  margin-right: 5px;
  float: left;
}
.pinglunImg {
  width: 20%;
}
.show {
  overflow: hidden;
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
</style>