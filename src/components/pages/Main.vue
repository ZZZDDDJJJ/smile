<template>
  <div>
    <div class="main">
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表页</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车页</van-tabbar-item>
      <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    mounted(){
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight
        document.getElementsByClassName('main')[0].style.height = winHeight - 50 + 'px'
          console.log(this.$route)
        if(this.$route.path == '/Cart'){
          this.active=2;
        }
  
    },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    changeTabbar(active) {
      console.log(active);
      switch (active) {
        case 0:
          this.$router.push({ name: "ShoppingMall" });
          break;
        case 1:
          this.$router.push({ name: "CategoryList" });
          break;
        case 2:
          this.$router.push({ name: "Cart" });
          break;
        case 3:
          this.$router.push({name:'Member'})
          break;
      }
    }
  }
};
</script>

<style scoped>


</style>