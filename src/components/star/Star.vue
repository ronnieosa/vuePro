<template>
  <div class="star">
    <span v-for="(item,index) in itemClass" class="star-item" :class="item"></span>
  </div>
</template>
<script>
  const LENGTH = 5;
  const STATE_ON = 'on';
  const STATE_OFF = 'off';
  const STATE_HALF = 'half';

  export default {
    props: {
        score: {
            type: Number
        }
    },
    computed:{
      itemClass(){
          let result = [];
          let score = Math.floor(this.score * 2) / 2;
          let isFloat = score % 1 !==0;
          let isInt = Math.floor(score);
          for(let i = 0;i < isInt;i++){
            result.push(STATE_ON)
          }
          if(isFloat){
            result.push(STATE_HALF)
          }
          while(result.length < LENGTH){
            result.push(STATE_OFF)
          }
          return result;
      }
    }
  }
</script>
<style scoped>
  .star .star-item {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: 20px;
    margin-right: 20px;
  }
  .star .star-item:nth-last-of-type(1) {
    margin-right: 0;
  }
  /*星星状态地址*/
  .on {
    background: url('star48_on@2x.png') no-repeat;
  }
  .off{
    background: url('star48_off@2x.png') no-repeat;
  }
  .half {
    background: url('star48_half@2x.png') no-repeat;
  }
</style>
