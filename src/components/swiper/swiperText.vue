<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="text">
        <div class="centent">
          F-22战斗机（英文：F-22 fighter，编号：F-22，代号/绰号：Raptor，译文：猛禽，通称：洛克希德·马丁F-22“猛禽”），是美国一型单座双发高隐身性第五代战斗机，是世界上第一种进入服役的第五代战斗机 [1] 。
          F-22战斗机的隐身性能、灵敏性、精确度和态势感知能力结合，组合其空对空和空对地作战能力，使得它成为当今世界综合性能最佳的战斗机。 [2]
          F-22战斗机由美国洛克希德·马丁公司（Lockheed Martin）和波音公司联合研制，于21世纪初期陆续进入美国空军服役，以取代F-15战斗机。洛克希德·马丁公司为主承包商，负责设计大部分机身、武器系统和F-22的最终组装。计划合作伙伴波音公司则提供机翼、后机身、航空电子综合系统和培训系统。但由于F-22的制造成本过高、俄罗斯和中国的第五代战斗机的计划延迟导致的缺乏清晰空对空作战任务、猛禽的出口禁令和其它使用计划（包括F-35和无人机）都使得F-22的生产计划提前终止。2009年4月，美国国防部建议停止新订单，经国会批准最终采购187架战斗机。 《2010财年国防授权法》致使缺乏生产更多F-22的资金。2011年12月13日最后一架F-22的上线仪式在多宾斯空军预备役基地举行 [1] 。
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      swiperOption: {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        mousewheel: true
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style scoped>
.swiper {
  height: 300px;
  overflow: hidden;
}
.text {
  font-size: 18px !important;
  text-align: left;
  padding: 30px;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>