<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="iconfont icon-caigou-xianxing"></i>
          </div>
        </div>
        <div class="price">
          ¥ 0
        </div>
        <div class="desc">
          另需配送费 {{deliveryPrice}}元
        </div>
      </div>
      <div class="content-right">
        <div class="pay">
          ¥ {{minPrice}}元起送
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      deliveryPrice: {
          type: Number,
          default: 0
      },
      minPrice:{
        type: Number,
        default: 0
      }
    }
  };
</script>

<style scoped>
  /*!*@import "../../static/css/iconfont.css";*! ??????*/
  .shopcart {
    position: fixed;
    left:0;
    bottom:0;
    z-index: 50;
    width:100%;
    height: 48px;
  }
  .shopcart .content {
    display: flex;
    background: #141d27;
  }
  .shopcart .content .content-left{
    flex:1;
  }
  .content-left .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #141d27;
  }
  .content-left .logo-wrapper .logo {
    width:100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
    text-align: center;
  }
  .content-left .logo-wrapper .logo .iconfont {
    font-size: 24px;
    color: #80858a;
    line-height: 44px;
  }
  .content-left .price {
    font-size: 16px;
    font-weight: 700;
    color: rgba(255,255,255,.4);
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin-top: 12px;
    box-sizing: border-box;
    padding-right: 12px;
    border-right: 1px solid rgba(255,255,255,.1);
  }
  .content-left .desc {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0 12px;
    font-size: 12px;
    color: rgba(255,255,255,.4);
  }
  .shopcart .content .content-right{
    flex: 0 0 105px;
    width:105px;
  }
  .shopcart .content .content-right .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255,255,255,.4);
    background: #2b333b;
  }
</style>
