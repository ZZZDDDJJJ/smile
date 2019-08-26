<template>
  <div class="navbar-div" >
    <van-nav-bar title="购物车" left-text="返回" @click-left="onClickLeft"></van-nav-bar>
    <div class="cart-list">
      <div class="row" v-for="(item,index) in cartInfo" :key="index">
        <div class="item-img">
          <img :src="item.image" width="100%" />
        </div>
        <div class="column">
          <div class="item-content">
            <div class="item-name">{{item.Name}}</div>
          </div>

          <div class="item-row">
            <div class="item-price">￥{{item.price | moneyFilter}}</div>

            <div class="item-count">
              <van-stepper v-model="item.count"></van-stepper>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="totalMoney">商品总价：￥{{totalMoney|moneyFilter}}</div>
    <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false
    };
  },
  created() {
    this.getCartInfo();
  },
  mounted(){
     let winHeight = document.documentElement.clientHeight || document.body.clientHeight
        document.getElementsByClassName('navbar-div')[0].style.height = winHeight - 50 + 'px'
      

  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count;
      });
      localStorage.cartInfo = JSON.stringify(this.cartInfo);
      return allMoney;
    }
  },
  methods: {
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      console.log("this.cartInfo" + JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    },
    onClickLeft(){
      this.$router.go(-2)
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>

<style scoped>
.navbar-div{
  overflow: auto;
  
}
.cart-list {
  background-color: #fff;

}

.row {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.row .item-img {
  flex: 1;
}

.column {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  flex: 2;
}
.item-row {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}
.item-content {
  font-size: 14px;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
.item-price {
  color: red;
}
.item-count {
  margin-right: 0.5rem;
}

.totalMoney {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
</style>