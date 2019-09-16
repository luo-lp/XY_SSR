<template>
    <div class="searchCity">
        <div class="search" >
            <!-- <el-input style="width:100%" placeholder="请输入想去的地方，比如:'广州'" v-model="searchCities" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input> -->
            <input type="text" placeholder="请输入想去的地方，比如:'广州'">
            <i class="el-icon-search"></i>
        </div>
        <div class="searchRecommened">
            <span>推荐:</span>
            <a style="margin-right:5px" to='#' @click="gzClick(item)" v-for="(item,index) in cityS " :key="index">{{item}}</a>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchCities:'',
            cityS:[
                '广州',
                '上海',
                '北京'
            ],
            city:''
        }
    },
    methods:{
        gzClick(city){
            console.log(city);
            // this.$store.state.
        }
    }
}
</script>

<style scoped lang="less">
    .searchCity{
        width:700px;
        overflow: hidden;
        clear:both;
        
    }
    .search{
        margin-top:20px;
        height:40px;
        line-height:40px;
        border:3px solid orange;
    }
    .search input{
        padding:0 20px;
        line-height:40px;
        outline:none;
        border:none;
        background:none;
        width:610px;
    }
    .search i{
        font-size:24px;
        color:orange;
        font-weight:700;
        margin-right:10px;
    }
    .searchRecommened{
        font-size: 12px;
        color:#666;
        padding:10px 0;
    }
    // .searchRecommened nuxt-link:hover{
    //     text-decoration: normal;
    // }
    .input-with-select{
        border:3px solid orange;
        width:700px;
    }
</style>