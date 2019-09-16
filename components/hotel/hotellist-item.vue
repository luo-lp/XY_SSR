<template>
  <div>
    <el-row class="hotelList-item">
      <el-col :span="8">
        <nuxt-link :to="{path:'/hotel/detail',query: {id: data.id}}">
          <img :src="data.photos"
               :alt="data.name"
               style="width:320px;height:210px" />
        </nuxt-link>
      </el-col>
      <el-col :span="10"
              style="padding:0 10px">
        <div class="title">{{data.name}}</div>
        <div class="alias">{{data.alias}}
          <span v-if="data.hotellevel">
            <i class="iconfont iconchangyongtubiao-mianxing- crown"
               v-for="(item,key) in data.hotellevel.level"
               :key="key" />
          </span>
          {{data.hoteltype.name}}</div>
        <div class="comment">
          <el-row>
            <el-col :span="10">
              <el-rate :value="data.stars"
                       disabled
                       show-score
                       score-template="{value}分">
              </el-rate>
            </el-col>
            <el-col :span="7">
              <span class="num">{{data.all_remarks + 20}}</span>
              条评论
            </el-col>
            <el-col :span="7"></el-col>
            <span class="num">{{data.all_remarks + 12}}</span>
            篇游记
          </el-row>
        </div>
        <div class="location">
          <i class="iconfont iconweizhi"></i>
          {{data.address}}</div>
      </el-col>
      <el-col :span="6"
              style="padding:0 10px">
        <div class="product">
          <el-row class="product-data"
                  @click.native="jump"
                  v-for="(child,key) in data.products"
                  :key="key">
            <el-col :span="14">{{child.name}}</el-col>
            <el-col :span="10">
              <span class="price">&yen;{{child.price}}</span>起>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'hotellist-data',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    jump () {
      window.open('https://hotels.ctrip.com/hotel/694679.html', '_blank')
    },
  }
}
</script>

<style lang="less" scoped>
.hotelList-item {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  .title {
    font-size: 26px;
    column-rule: #000;
  }
  .alias {
    font-size: 16px;
    color: #b9a59b;
    .crown {
      color: #ff9900;
    }
  }
  .comment {
    padding: 10px 0;
    .num {
      color: #ff9900;
    }
  }
  .location {
    font-size: 14px;
    color: #b9a59b;
  }
  .product {
    margin-top: 40px;
    .product-data {
      cursor: pointer;
      display: block;
      padding: 10px;
      border-bottom: 1px solid #ebeef5;
      font-size: 16px;
      color: #666;
      .price {
        color: #ff9900;
      }
      &:hover {
        background-color: rgba(128, 119, 119, 0.3);
      }
    }
  }
}
</style>