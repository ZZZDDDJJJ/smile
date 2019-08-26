<template>
  <div>
    <van-nav-bar title="会员中心"></van-nav-bar>

    <div class="top">
      <div class="img">
        <img
          src="https://wwc.alicdn.com/avatar/getAvatar.do?userNick=&width=50&height=50&type=sns&_input_charset=UTF-8"
          width="100%"
        />
      </div>
      <div class="name">{{userInfo.userName}}</div>
    </div>

    <div class="login">
      <div>
        <van-button type="warning" @click="login">登录</van-button>
         <van-button type="warning" @click="register">注册</van-button>
      </div>
    </div>

    <div>
      <van-cell-group>
        <van-cell title="会员卡" is-link />
        <van-cell title="地址管理" is-link />
        <van-cell title="我的订单" is-link />
        <van-cell title="会员权益" is-link />
        <van-cell title="联系我们" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  mounted() {
    if (localStorage.userInfo) {
      this.userInfo = JSON.parse(localStorage.userInfo);
    }
  },
  data() {
    return {
      userInfo: [],
      url: require("@/assets/logo.png")
    };
  },
  methods:{
      login(){
          if(localStorage.userInfo){
              Toast('已经登录')
          }else{
              this.$router.push('/login')
          }
      },
      register(){
          this.$router.push('/register')
      }
  }
};
</script>

<style scoped>
.top {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 5rem;
  text-align: center;

  background-color: #eea2ad;
}
.img img {
  border: 1px solid #fff;

  border-radius: 50px;
}

.name {
  font-size: 12px;
}

.login {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding: 10px;
  height: 3rem;
}
.login div {
  flex: 1;
  text-align: center;
}
</style>