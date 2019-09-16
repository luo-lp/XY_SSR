<template>

    <el-row type="flex" justify="space-between" class="container_post_index">
        <div class="left">
            <Cities/>
            <!-- <RecommendedCity/> -->
        </div>
        <div class="right">
            <!-- <SearchCity/> -->
            <Strategy/>
        </div>
    </el-row>

</template>

<script>
import Cities from "@/components/post/cities";
// import SearchCity from "@/components/post/searchCity";
import Strategy  from "@/components/post/strategy";

export default {
  components: {
    Cities,
    // SearchCity,
    Strategy,
  }
};
</script>  

<style lang="less">
    .container_post_index{
        width:1000px;
        margin:0 auto
    }
    .left{
        width:260px
    }
    .right{
        width:700px;
    }
  
  
</style>