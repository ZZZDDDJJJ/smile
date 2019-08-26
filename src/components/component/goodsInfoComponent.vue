<template>
  <div class="goods-info" @click="goGoodsPage()">
      <div class="goods-image">
          <img v-lazy="goodsImage" width="90%" />

      </div>

      <div class="goods-name">{{goodsName}}</div>
      <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>


  </div>
</template>

<script>
import {toMoney} from '@/filter/moneyFilter.js' 
export default {
    props:['goodsName','goodsImage','goodsPrice','goodsId'],

    data(){
        return{}

    },
    methods:{
goGoodsPage(){
    console.log(this.$route)
    this.$router.push({path:'/Goods',query:{goodsId:this.goodsId}})
}
    },

    filters:{
        moneyFilter:function(money){
            return toMoney(money)
        }
    }

}


</script>

<style scoped>
    .goods-name{
        padding: 0 8px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space:nowrap; 
    }
</style>