<template>
  <div class="container">
    <div class="main">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     class="breadCrumb">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>南京酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form inline>
        <el-form-item>
          <el-autocomplete v-model="name"
                           :fetch-suggestions="querySearchAsync"
                           placeholder="请输入内容"
                           @select="handleSelect"></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="enterTime"
                          type="daterange"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-popover placement="bottom"
                      width="400"
                      ref="popover"
                      trigger="click">
            <div class="popover">
              <el-row>
                <el-col :span="8">每间</el-col>
                <el-col :span="8"
                        :style="{padding:'0 20px'}">
                  <el-select v-model="personNum.adult"
                             size="mini"
                             @change="handleAdultChange"
                             placeholder="请选择">
                    <el-option v-for="item in 9"
                               :key="item"
                               :label="item"
                               :value="item">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="8"
                        :style="{padding:'0 20px'}">
                  <el-select v-model="personNum.child"
                             size="mini"
                             @change="handleChildChange"
                             placeholder="请选择">
                    <el-option v-for="item in 10"
                               :key="item"
                               :label="item-1"
                               :value="item-1">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-button type="primary"
                         size="mini"
                         style="float: right"
                         @click="closePopover">确定</el-button>
            </div>
            <el-input placeholder="人数未定"
                      suffix-icon="el-icon-user"
                      v-model="person"
                      slot="reference">
            </el-input>
          </el-popover>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查看价格</el-button>
        </el-form-item>
      </el-form>
      <el-row type="flex"
              class="locationInfo"
              justify="space-between">
        <el-col :span="12"
                class="description"
                :class="{hidden: toggleScenic}">
          <el-row type="flex"
                  class="desc-item"
                  justify="space-between">
            <el-col :span="4">区域:</el-col>
            <el-col>
              <div class="scenic-box">
                <a class="scenic"
                   @click="sceniceChoose=''"
                   :class="{active:scenicChoose === ''}"
                   href="javascript:void(0)">全部</a>
                <a v-for="item in scenicList"
                   href="javascript:void(0)"
                   @click="scenicChoose = item.id"
                   :class="{active: scenicChoose === item.id}"
                   class="scenic"
                   :key="item.id">{{item.name}}</a>
              </div>
              <a class="toggleScenic"
                 href="javascript:void(0)"
                 @click="toggleScenic = !toggleScenic">
                <i class="el-icon-d-arrow-right icon" />
                等{{scenicList.length}}个区域
              </a>
            </el-col>
          </el-row>
          <el-row type="flex"
                  class="desc-item"
                  justify="space-between">
            <el-col :span="4">攻略:</el-col>
            <el-col>
              北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。
            </el-col>
          </el-row>
          <el-row type="flex"
                  class="desc-item avarage"
                  justify="space-between">
            <el-col :span="4">均价
              <el-tooltip class="item"
                          effect="dark"
                          content="等级均价由平日价格计算得出，节假日价格会有上浮"
                          placement="top-start">
                <sup class="question">?</sup>
              </el-tooltip>
              :
            </el-col>
            <el-col>
              <el-tooltip class="item grade"
                          effect="dark"
                          content="等级评定是针对房价，设施和服务等各方面水平的综合评估"
                          placement="bottom-start">
                <span>
                  <i class="iconfont iconchangyongtubiao-mianxing- crown"></i>
                  <i class="iconfont iconchangyongtubiao-mianxing- crown"></i>
                  <i class="iconfont iconchangyongtubiao-mianxing- crown"></i>
                  &yen;332</span>
              </el-tooltip>
              <el-tooltip class="item grade"
                          effect="dark"
                          content="等级评定是针对房价，设施和服务等各方面水平的综合评估"
                          placement="bottom-start">
                <span>
                  <i class="iconfont iconchangyongtubiao-mianxing- crown"></i>
                  <i class="iconfont iconchangyongtubiao-mianxing- crown"></i>
                  <i class="iconfont iconchangyongtubiao-mianxing- crown"></i>
                  &yen;521</span>
              </el-tooltip>
              <el-tooltip class="item grade"
                          effect="dark"
                          content="等级评定是针对房价，设施和服务等各方面水平的综合评估"
                          placement="bottom-start">
                <span>
                  <i class="iconfont iconchangyongtubiao-mianxing- crown"></i>
                  <i class="iconfont iconchangyongtubiao-mianxing- crown"></i>
                  <i class="iconfont iconchangyongtubiao-mianxing- crown"></i>&yen;768</span>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <div id="map">
            <img src="~assets/image/loading.gif"
                 alt="加载中"
                 v-show="mapVisiable">
          </div>
        </el-col>
      </el-row>
      <hotel-Filter @filterSelect="handleFilter" />
      <div class="hotelList"
           v-if="hotelList && hotelList.length >0">
        <hotel-List :model="hotelList" />
        <div class="pagination">
          <el-pagination layout="prev, pager, next"
                         :total="total"
                         :current-page="current"
                         @current-change="handleSizeChange">
          </el-pagination>
        </div>
      </div>
      <div v-else-if="hotelList && hotelList.length === 0 "
           class="findNone">
        没有符合要求的酒店
      </div>
      <div v-else
           class="loading">
        <img src="~assets/image/loading.gif"
             alt="加载中">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      filterCache: {
        price: 4000,
        levels: [],
        types: [],
        assets: [],
        brands: []
      },
      total: 0,
      city: 74,
      name: '南京',
      timer: null,
      cityList: [],
      person: '',
      personNum: {
        adult: '2成人',
        child: '0儿童'
      },
      enterTime: '',
      current: 1,
      nextStart: 0,
      scenicList: [],
      scenicChoose: '',
      toggleScenic: true,
      mapVisiable: true,
      page: 1,
      hotelList: null,
      timer: null
    }
  },

  components: {
    hotelList: () => import('@/components/hotel/hotellist'),
    hotelFilter: () => import('@/components/hotel/filter')
  },

  mounted () {
    /* 判断是否为 query有无设置city = 74 */
    if (!this.$route.query || this.$route.query.city !== 74) {
      this.$router.replace('/hotel?city=74')
    }
    this.$axios({
      url: '/cities',
      params: {
        name: '南京'
      }
    }).then(res => {
      this.scenicList = res.data.data[0].scenics
    })
    window.onLoad = () => { this.initHotelInfo({}) }
    var url = 'https://webapi.amap.com/maps?v=1.4.15&key=17c65e86043f1657d93baab36608003f&callback=onLoad';
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);

  },

  watch: {
    city (to) {
      let query = { ...this.$route.query }
      query.city = to
      this.$router.replace({
        path: '/hotel',
        query
      })
    },
    scenicChoose (to) {
      this.initHotelInfo({})
    }
  },

  methods: {
    handleSelect (e) {
      this.city = e.id
    },
    querySearchAsync (name, cb) {
      this.timer && clearTimeout(this.timer)
      let result = []
      this.timer = setTimeout(() => {
        this.$axios({
          url: '/cities',
          params: {
            name
          }
        })
          .then(res => {
            if (res.status === 200 && res.data.data.length > 0) {
              result = res.data.data
              result.forEach(e => {
                e.value = e.name
              })
            }
            cb(result)
          })
      }, 3000 * Math.random());
    },
    handleAdultChange (e) {
      this.personNum.adult = e + '成人'
    },
    handleChildChange (e) {
      this.personNum.child = e + '儿童'
    },
    closePopover () {
      this.$refs.popover.doClose()
      if (this.personNum.child === '0儿童') {
        this.person = this.personNum.adult
      } else {
        this.person = this.personNum.adult + '' + this.personNum.child
      }
    },
    initHotelInfo (filter) {
      if (filter.price) {
        this.filterCache = {
          price: filter.price,
          levels: filter.levels,
          types: filter.types,
          assets: filter.assets,
          brands: filter.brands
        }
      }
      let query = ''
      query += '&city=' + this.city
      if (this.scenicChoose) {
        query += '&scenic=' + this.scenicList
      }
      query += '&price_lt=' + this.filterCache.price
      this.filterCache.levels.map(e => query += '&hotellevel_in=' + e)
      this.filterCache.types.map(e => query += '&hoteltype_in=' + e)
      this.filterCache.assets.map(e => query += '&hotelasset_in=' + e)
      this.filterCache.brands.map(e => query += '&hotelbrand_in=' + e)
      if (this.nextStart !== 0) {
        query += '&_start=' + this.nextStart
      }
      return this.$axios({
        url: '/hotels?' + query,
      }).then(res => {
        let data = res.data.data
        this.hotelList = data
        this.listLoaded = true
        this.total = res.data.total
        if (!res.data.total || res.data.total === 0) return
        let map = new AMap.Map('map', {
          center: [data[0].location.longitude, data[0].location.latitude],
          zoom: 11
        })
        data.forEach((e, i) => {
          let content = `<div class="marker">${i + 1}</div>`
          let marker = new AMap.Marker({
            position: new AMap.LngLat(e.location.longitude, e.location.latitude),
            content,
            title: e.name,
          })
          map.add(marker)
        })
        this.mapVisiable = false
      })
    },
    handleFilter (filter) {
      this.mapVisiable = false
      this.hotelList = null
      this.initHotelInfo(filter)
    },
    handleSizeChange (page) {
      this.$router.push({
        path: '/hotel',
        query: {
          city: this.city,
          page
        }
      })
      this.current = page
      this.nextStart = (page - 1) * 10
      this.mapVisiable = true
      this.hotelList = null
      this.initHotelInfo({})
    }
  }
}
</script>

<style lang="less" scoped>
@import url("//at.alicdn.com/t/font_1411763_8dc2ko4gvi9.css");
.container {
  min-width: 1000px;
  .main {
    width: 1000px;
    margin: 0 auto;
    .breadCrumb {
      font-size: 14px;
      color: #606266;
      padding: 20px 0;
    }
    .locationInfo {
      margin-bottom: 20px;
      .description {
        padding: 30px;
        font-size: 14px;
        color: #666;
        .desc-item {
          margin: 10px 0;
        }
        .scenic-box {
          .scenic {
            margin-right: 20px;
            display: block;
            float: left;
            &:hover {
              color: #0099ff;
              text-decoration: underline;
            }
            &.active {
              color: #999999;
              background-color: #eeeeee;
              border-radius: 5px;
            }
          }
          &::after {
            display: block;
            content: "";
            clear: both;
            visibility: hidden;
            height: 0;
          }
        }
        .toggleScenic {
          .icon {
            color: #ff9900;
            transform: rotate(90deg);
          }
        }
        &.hidden {
          .scenic-box {
            max-height: 3em;
            overflow: hidden;
          }
          .toggleScenic {
            .icon {
              transform: rotate(270deg);
            }
          }
        }
        .avarage {
          .question {
            display: inline-block;
            width: 14px;
            height: 14px;
            text-align: center;
            line-height: 14px;
            color: #fff;
            border-radius: 50%;
            background-color: #cccccc;
          }
          .grade {
            margin-right: 20px;
          }
          .crown {
            color: #ff9900;
          }
        }
      }
      #map {
        width: 100%;
        height: 300px;
        /deep/.marker {
          width: 20px;
          height: 30px;
          text-align: center;
          font-size: 10px;
          color: #fff;
          background-color: #3f95fb;
          border-radius: 10px 10px 15px 15px;
          background: url(https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png)
            no-repeat;
          background-size: 20px 30px;
        }
      }
    }

    .pagination {
      padding: 20px 0;
      text-align: center;
    }
    .findNone {
      height: 300px;
      line-height: 300px;
      font-size: 20px;
      text-align: center;
    }
    .loading {
      img {
        display: block;
        margin: 0 auto;
        width: 50%;
      }
    }
  }
}
</style>