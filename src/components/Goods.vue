<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,$index) in goods" class="menu-item" :class="{'current':currentIndex===$index}" @click="scrollMenu($index)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper">
      <ul>
        <li v-for="(item,index) in goods" class="goods-list goods-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt=""/>
              </div>
              <div class="content">
                <h2 class="title">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></Shopcart>
  </div>
</template>
<script>
//  滚动插件引入
  import BScroll from "better-scroll";
  import Shopcart from "./Shopcart";
  export default {
      props: {
          seller: {
              type: Object
          }
      },
      data:()=>{
          return {
              goods:[],
              listHeight:[],
              scrollY:0
          }
      },
      components:{
        Shopcart
      },
      created(){
        this.getGoodsData();
        this.classMap = ['decrease','discount','special','invoice','guarantee'];
      },
      computed:{
          //实时计算所在区间currentIndex
          currentIndex(){
              for(let i=0;i<this.listHeight.length;i++){
                  let height1 = this.listHeight[i];
                  let height2 = this.listHeight[i+1];
                  if(!height2 || this.scrollY>=height1 && this.scrollY<height2){
                    return i;
                  }
              }
              return 0;
          }
      },
      methods:{
        scrollMenu(index){
          const goodsList = document.querySelectorAll('.goods-list-hook');
          const targetArea=goodsList[index];
          this.goodsScroll.scrollToElement(targetArea,300);
        },
        getGoodsData(){
          const _this = this;
          this.$http.get('/api/goods').then((res)=>{
              _this.goods =  res.data.data;
//              dom渲染在$nextTick()之后,所以要等dom渲染好以后再进行操作,需要写在$nextTick回调中
              _this.$nextTick(()=>{
              _this._initScroll();
              _this._calculateHeight();
            })
          })
        },
        _initScroll(){
            const menuWrapper = document.querySelector('.menu-wrapper');
            const goodsWrapper = document.querySelector('.goods-wrapper');
            this.menuScroll = new BScroll(menuWrapper,{
//                betterScroll插件阻止了元素默认事件,手动开启
                click:true
            });
             this.goodsScroll = new BScroll(goodsWrapper,{
              probeType:3
            });
            this.goodsScroll.on('scroll',(pos)=>{
               this.scrollY = Math.abs(Math.round(pos.y));
//               console.log(this.scrollY)
            })
        },
        _calculateHeight(){
            const liItem = document.querySelectorAll('.goods-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for(let i=0;i < liItem.length;i++){
                let item = liItem[i];
                height+= item.clientHeight;
                this.listHeight.push(height);
//                console.log(this.listHeight)
            }
        }
      }
  }
</script>
<style scoped>
  .current {
    position: relative;
    margin-top: -1px;
    background: #fff;
    font-weight: bold;
  }

  .goods {
    display: flex;
    position: absolute;
    top: 175px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
  }
  .goods .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }
  .goods .goods-wrapper {
    flex: 1;      /*flex: 1 1 0%;*/
  }
  .menu-item {
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding: 0 12px
  }
  .menu-item .text {
    display: table-cell;
    vertical-align: middle;
    width: 56px;
    font-size: 12px;
    border-bottom: 1px solid #ededed;
  }
  .menu-item .icon{
    display: inline-block;
    width:12px;
    height:12px;
    margin-right: 2px;
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
  .goods-list > .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147,153,159);
    background: #f3f5f7;
  }
  .food-item {
    display: flex;
    margin:18px;
    padding-bottom: 18px;
    border-bottom: 1px solid #ededed;
  }
  .food-item:nth-last-of-type(1) {
    border-bottom: 0;
    margin-bottom: 0;
  }
  .food-item > .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }
  .food-item > .content {
    flex: 1
  }
  .food-item > .content .title{
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .food-item > .content .desc{
    display: block;
    margin-bottom: 8px;
    line-height: 12px;
    height:12px;
    width: 210px;
    font-size: 10px;
    color: rgb(147,153,159);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .food-item > .content .extra {
    line-height: 10px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .food-item > .content .extra .count{
    margin-right: 12px;
  }
  .food-item > .content .price {
    font-weight: 700;
    line-height: 24px;
  }
  .food-item > .content .price .now {
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240,20,20);
  }
  .food-item > .content .price .old {
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147,153,159);
  }
</style>
