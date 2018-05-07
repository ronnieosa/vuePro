<template>
  <div id='header'>
    <div class="top">
      <div class="image">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="support-count" @click="showModel">
          <div class="count">{{seller.supports.length}} 个</div>
        </div>
      </div>
    </div>
    <div class="bottom" @click="showModel">
      <span class="tittle"></span>
      <span class="text">{{seller.bulletin}}</span>
    </div>
    <div class="bg">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <transition enter-active-class="fadeInDown" leave-active-class="fadeOutUp">
      <div class="supportDetail animated" v-show="toggle">
        <div class="detailWrapper clearfix">
          <div class="detailMain">
            <div class="name">{{seller.name}}</div>
            <!--star组件-->
            <div class="starWrapper">
              <Star :score="seller.score"></Star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="list-item" v-for="(item,$index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                <span class="text">{{seller.supports[$index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detailClose" @click="closeModel">
          &times;
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import star from './star'
  Vue.use(star);

export default {
  props:{
      seller:{
        type: Object,
        default: {} //这样可以指定默认的值
      }
  },
  data(){
      return {
          classMap:[],
          toggle: false
      }
  },
  methods:{
    beforeEnter(el){
      el.style.opacity = 0
    },
    enter(el){
      el.style.transition.duration = '1000';
      el.style.opacity = .5
    },
    afterEnter(el){
      el.style.opacity = .8
    },
    showModel(){
        this.toggle = true
    },
    closeModel(){
      this.toggle = false
    },
  },
  created(){
      this.classMap = ['decrease','discount','special','invoice','guarantee'];
  },
  components:{
      star
  }
}
</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #header{
    color:#fff;
    background: rgba(7,17,27,.4);
    position: relative;
    overflow: hidden;
  }
  #header .top{
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
  }
  .top > .image,.top > .content {
    display: inline-block;
    vertical-align: top;
  }
  .top > .image img {
    border-radius: 2px;
  }
  .top > .content {
    font-size: 14px;
    margin-left: 16px;
  }
  .content .title {
    margin: 2px 0 8px 0;
  }
  .content .title .brand {
    vertical-align: top;
    display: inline-block;
    width:30px;
    height: 18px;
    background: url('brand@2x.png') no-repeat;
    background-size: 30px 18px;
  }
  .content .title .name {
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
  .content .desc {
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }
  .content .support{}
  .content .support .icon{
    display: inline-block;
    width:12px;
    height:12px;
    margin-right: 4px;
    background-size: 12px;
    background-repeat: no-repeat;
  }
  .decrease{
    background: url('decrease_1@2x.png');
  }
  .discount{
    background: url('discount_1@2x.png');
  }
  .guarantee{
    background: url('guarantee_1@2x.png');
  }
  .invoice{
    background: url('invoice_1@2x.png');
  }
  .special{
    background: url('special_1@2x.png');
  }
  .content .support .text{
    font-size: 12px;
    line-height: 12px;
    vertical-align: top;
  }
  .support-count {
    position: absolute;
    right:12px;
    bottom: 18px;
    padding: 0px 8px;
    height: 24px;
    line-height: 24px;
    background: rgba(0,0,0,.2);
    text-align: center;
    border-radius: 14px;
  }
  .support-count .count{
    font-size: 10px;
  }
  .bottom {
    height: 28px;
    line-height: 28px;
    padding: 0 12px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    background: rgba(7,17,27,.2);
  }
  .bottom .tittle {
    display: inline-block;
    width: 22px;
    height: 12px;
    background: url('bulletin@2x.png') no-repeat;
    background-size: 22px 12px;
  }
  .bottom .text {
    font-size: 10px;
    margin: 0 4px;
    vertical-align: top;
  }
  #header .bg{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(5px);
  }
  .supportDetail {
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 100;
    background: rgba(7,17,27,0.8)
  }
  /*弹层过渡效果*/
  .supportDetail .detailWrapper {
    min-height: 100%;
    width:100%;
  }
  .supportDetail .detailWrapper .detailMain{
    margin-top: 64px;
    padding-bottom: 64px;
    text-align: center;
  }
  .supportDetail .detailClose {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear:both;
    font-size: 32px;
    text-align: center;
  }
  .starWrapper {
    margin-top: 16px;
    padding-bottom: 16px;
  }
  .detailMain .title {
    display: flex;
    width:80%;
    margin: 28px auto 24px auto
  }
  .detailMain .title .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255,255,255,.2);
  }
  .detailMain .title .text {
    font-size: 14px;
    font-weight: 700;
    padding: 0 12px;
  }
  .detailMain .supports {
    width: 80%;
    margin: 0 auto;
  }
  .detailMain .supports .list-item {
    padding: 0 12px;
    font-size: 0;
    margin-bottom: 12px;
    text-align: left;
  }
  .detailMain .supports .list-item:nth-last-of-type(1) {
    margin-bottom: 0;
  }
  .detailMain .supports .list-item .icon {
    display: inline-block;
    width:16px;
    height:16px;
    margin-right: 6px;
    background-size: 16px;
    background-repeat: no-repeat;
    vert-align: top;
  }
  .supports .decrease{
    background: url('decrease_1@3x.png');
  }
  .supports .discount{
    background: url('discount_1@3x.png');
  }
  .supports .guarantee{
    background: url('guarantee_1@3x.png');
  }
  .supports .invoice{
    background: url('invoice_1@3x.png');
  }
  .supports .special{
    background: url('special_1@3x.png');
  }
  .detailMain .supports .list-item .text {
    font-size: 12px;
    line-height: 16px;
    vertical-align: top;
  }
  .detailMain .bulletin {
    width: 80%;
    margin: 0 auto;
  }
  .detailMain .bulletin p {
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }

</style>
