<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别类表"></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                v-for="(item,index) in category"
                :key="index"
                :class="{categoryActive:categoryIndex==index}"
                @click="clickCategory(index,item.ID)"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" title-active-color="red" @click="onClickCategorySub">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>

          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onload" class="list-div1">
                <div class="list-item" v-for="(item,index) in goodList" :key="index" @click="goGoodsInfo(item.ID)">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror='errorImg'/>
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
import url from "@/serviceAPI.config.js";
import {toMoney} from '@/filter/moneyFilter.js'
export default {
  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 - 50 + "px";
    document.getElementById("list-div").style.height = winHeight - 90  -50 + "px";
  },
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0,

      loading: false,
      finished: false,
      isRefresh: false,
      categorySubId: "",
      goodList: [],
      page: 1,
      errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"',
    };
  },
  methods: {
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            Toast("服务器错误，数据获取失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: {
          categoryId: categoryId
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            console.log(response.data.message);
            this.categorySub = response.data.message;

            this.active = 0;
            this.onload();
            this.categorySubId = this.categorySub[0].ID;
            console.log(this.categorySub);
          } else {
            Toast("服务器错误，获取数据失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page = 1;
      this.goodList = [];
      this.finished = false;

      this.getCategorySubByCategoryId(categoryId);
    },
    onload() {
      setTimeout(() => {
        console.log(this.categorySubId);
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
      }, 500);
    },
    onRefresh() {
      setTimeout(() => {
        this.goodList = [];
        this.onload();
        this.isRefresh = false;
        this.finished=false;
        this.page=1;

      }, 500);
    },
    onClickCategorySub(index, title) {
      //console.log( this.categorySub)
      this.categorySubId = this.categorySub[index].ID;
      console.log(this.categorySubId);

      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onload();
    },
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message.length) {
            this.page++;
            this.goodList = this.goodList.concat(response.data.message);
          } else {
            this.finished = true;
          }
          this.loading = false;
          console.log(this.finished);
        })
        .catch(error => {
          console.log(error);
        });
    },
    goGoodsInfo(id){
      this.$router.push({name:'Goods',params:{goodsId:id}})

    }  
    },
  filters:{
    moneyFilter(money){
      return toMoney(money)
    }
  }
};
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}

#leftNav ul li {
  line-height: 44px;
  border-bottom: 1px solid #e4e7ed;

  font-size: 0.8rem;
  text-align: center;
}

.categoryActive {
  background-color: #ffffff;
}

.list-item {
  
  text-align:center;
  border-bottom: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
  background-color: #fff;
  display: flex;
  flex-flow: column;
  /* font-size: 0.8rem; */
  box-sizing: border-box;
  width: 7.5rem;
 
  justify-content: space-around;
  
}

#list-div {
  overflow: scroll;
}

.list-div1{
  display: flex;
  flex-flow: row wrap;
  

}
.list-item-img {
  flex: 1;
}

.list-item-text {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  font-size: 12px;
  flex:1;
  
}
</style>