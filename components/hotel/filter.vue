<template>
  <div>
    <el-row class="filter">
      <el-col :span="8"
              class="priceSlide">
        <el-row type="flex"
                justify="space-between">
          <el-col>价格</el-col>
          <el-col>0-{{price}}</el-col>
        </el-row>
        <el-slider v-model="price"
                   :min="0"
                   :max="4000"
                   @change="handleSelect"
                   :debounce="300"></el-slider>
      </el-col>
      <el-col :span="16">
        <el-row>
          <el-col :span="6"
                  class="checkbox">
            <div>住宿等级</div>
            <el-dropdown placement="bottom"
                         class="dropdown">
              <div class="el-dropdown-link">
                <div style="float:left">
                  {{levelSelect}}
                </div>
                <i class="el-icon-arrow-down el-icon--right"
                   style="float:right"></i>
              </div>
              <el-dropdown-menu slot="dropdown"
                                v-if="options"
                                style="width: 140px">
                <el-dropdown-item v-for="item in options.levels"
                                  @click.native="handleLevel(item)"
                                  :icon="`${levels.indexOf(item.id) === -1? '':'el-icon-check'}`"
                                  :key="item.id">
                  {{item.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="6"
                  class="checkbox">
            <div>住宿类型</div>
            <el-dropdown placement="bottom"
                         class="dropdown">
              <div class="el-dropdown-link">
                <div style="float:left">
                  {{typeSelect}}
                </div>
                <i class="el-icon-arrow-down el-icon--right"
                   style="float:right"></i>
              </div>
              <el-dropdown-menu slot="dropdown"
                                v-if="options"
                                style="width: 140px">
                <el-dropdown-item v-for="item in options.types"
                                  @click.native="handleType(item)"
                                  :icon="`${types.indexOf(item.id) === -1? '':'el-icon-check'}`"
                                  :key="item.id">
                  {{item.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="6"
                  class="checkbox">
            <div>酒店设施</div>
            <el-dropdown placement="bottom"
                         class="dropdown">
              <div class="el-dropdown-link">
                <div style="float:left">
                  {{assetSelect}}
                </div>
                <i class="el-icon-arrow-down el-icon--right"
                   style="float:right"></i>
              </div>
              <el-dropdown-menu slot="dropdown"
                                v-if="options"
                                style="width: 140px">
                <el-dropdown-item v-for="item in options.assets"
                                  @click.native="handleAsset(item)"
                                  :icon="`${assets.indexOf(item.id) === -1? '':'el-icon-check'}`"
                                  :key="item.id">
                  {{item.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="6"
                  class="checkbox">
            <div>酒店品牌</div>
            <el-dropdown placement="bottom"
                         class="dropdown">
              <div class="el-dropdown-link">
                <div style="float:left">
                  {{brandSelect}}
                </div>
                <i class="el-icon-arrow-down el-icon--right"
                   style="float:right"></i>
              </div>
              <el-dropdown-menu slot="dropdown"
                                v-if="options"
                                style="width: 200px;max-height: 10em;overflow:auto">
                <el-dropdown-item v-for="item in options.brands"
                                  @click.native="handleBrand(item)"
                                  :icon="`${brands.indexOf(item.id) === -1? '':'el-icon-check'}`"
                                  :key="item.id">
                  {{item.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'hotel-filter',
  data () {
    return {
      options: null,
      price: 4000,
      levels: [],
      types: [],
      assets: [],
      brands: [],
    }
  },
  computed: {
    levelSelect () {
      if (this.levels.length === 0) {
        return '不限'
      } else
        if (this.levels.length === 1) {
          return this.levels[0] + '星'
        } else {
          return `已选中${this.levels.length}项`
        }
    },
    typeSelect () {
      if (this.types.length === 0) {
        return '不限'
      } else
        if (this.types.length === 1) {
          return this.options.types.find(e => e.id === this.types[0]).name
        } else {
          return `已选中${this.types.length}项`
        }
    },
    assetSelect () {
      if (this.assets.length === 0) {
        return '不限'
      } else
        if (this.assets.length === 1) {
          return this.options.assets.find(e => e.id === this.assets[0]).name
        } else {
          return `已选中${this.assets.length}项`
        }
    },
    brandSelect () {
      if (this.brands.length === 0) {
        return '不限'
      } else
        if (this.brands.length === 1) {
          return this.options.brands.find(e => e.id === this.brands[0]).name
        } else {
          return `已选中${this.brands.length}项`
        }
    }
  },
  methods: {
    handleLevel (item) {
      let index = this.levels.indexOf(item.id)
      if (index === -1) {
        this.levels.push(item.id)
      } else {
        this.levels.splice(index, 1)
      }
      this.handleSelect()
    },
    handleType (item) {
      let index = this.types.indexOf(item.id)
      if (index === -1) {
        this.types.push(item.id)
      } else {
        this.types.splice(index, 1)
      }
      this.handleSelect()
    },
    handleAsset (item) {
      let index = this.assets.indexOf(item.id)
      if (index === -1) {
        this.assets.push(item.id)
      } else {
        this.assets.splice(index, 1)
      }
      this.handleSelect()
    },
    handleBrand (item) {
      let index = this.brands.indexOf(item.id)
      if (index === -1) {
        this.brands.push(item.id)
      } else {
        this.brands.splice(index, 1)
      }
      this.handleSelect()
    },
    handleSelect () {
      this.$emit('filterSelect', {
        price: this.price,
        levels: this.levels,
        types: this.types,
        assets: this.assets,
        brands: this.brands
      })
    }
  },
  mounted () {
    this.$axios({
      url: '/hotels/options'
    }).then(res => {
      this.options = res.data.data
    })
  }
}
</script>

<style lang="less" scoped>
.filter {
  padding: 10px 0;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #666;
  .priceSlide {
    padding: 0 20px;
  }
  .checkbox {
    padding: 0 20px;
    height: 100%;
    box-sizing: border-box;
    border-left: 1px solid #ddd;
    .dropdown {
      width: 100%;
      margin: 10px 0;
      .el-dropdown-link::after {
        display: block;
        content: "0";
        height: 0;
        visibility: hidden;
        clear: both;
      }
    }
  }
}
</style>