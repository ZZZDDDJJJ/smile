<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="80%" class="location-icon" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image,index) in bannerPicArray" :key="index">
          <img v-lazy="image.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="type-bar">
      <div v-for="(cate ,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <div>
      <img v-lazy="adBanner" width="100%" />
    </div>

    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index"  >
            <div class="recommend-item" @click="goPages(item.goodsId)">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
<floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
<floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
<floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    <!-- <div class="floor">
      <div class="floor-anomaly">
        <div class="floor-one">
          <img :src="floor1_0.image" width="100%" />
        </div>
        <div>
          <div class="floor-two">
            <img :src="floor1_1.image" width="100%" />
          </div>
          <div>
            <img :src="floor1_2.image" width="100%" />
          </div>
        </div>
      </div>

      <div class="floor-rule">
        <div v-for="(item,index) in floor1.slice(3)" :key="index">
          <img :src="item.image" width="100%" />
        </div>
      </div>
    </div> -->


    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">

        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods " :key="index" >

            <goodsInfo :goodsName="item.name" :goodsImage="item.image" :goodsPrice="item.price" :goodsId="item.goodsId"></goodsInfo>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from  '../component/floorComponent';
import { toMoney } from '@/filter/moneyFilter.js'
import goodsInfo from '../component/goodsInfoComponent'
import url from '@/serviceAPI.config.js'

export default {
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      msg: "Shopping Mall",
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName:{},
      hotGoods:[]
    
    };
  },

  created() {
    axios({
      url: url.getShopingMallInfo,
      method: "get"
    })
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.category = response.data.data.category;
          this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPicArray = response.data.data.slides;
          this.recommendGoods = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.floorName = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods;
          
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  filters:{
    moneyFilter(money){
      return toMoney(money)
    }
  },
  methods:{
    goPages(goodsId){
    this.$router.push({path:'/Goods',query:{goodsId:goodsId}})
    }
  }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;

  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}

.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}

.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}

.swiper-area {
  clear: both;
  max-height: 10rem;
  overflow: hidden;
}

.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-flow: row;

  flex: 1;
  justify-content: center;
  align-items: center;
}

.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}

.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}

.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}

.recommend-body {
  border-bottom: 1px solid #eee;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}

.hot-area{
  text-align: center;
  font-size: 14px;
  overflow: auto;
  

}
.hot-title{
  height: 1.8rem;
  line-height: 1.8rem;
 background-color: #f0f0f0;
}

.hot-goods{
    height: 115rem;
    overflow: hidden;
    background-color: #fff;
  
}

.type-bar div{
      flex:1;
  }
</style>

