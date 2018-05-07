<template>
  <div id="tab">
    <div>
      <router-link to="/goods" active-class="active">商品</router-link>
    </div>
    <div>
      <router-link to="/ratings" active-class="active">评价</router-link>
    </div>
    <div>
      <router-link to="/seller" active-class="active">商家</router-link>
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style scoped>
  .active {
    color:rgb(240,20,20);
    font-weight: bold;
  }
  #tab {
    display: flex;
    height: 40px;
    line-height: 40px;
    color: rgb(77,85,93);
    font-size: 14px;
    border-bottom: 1px solid #ededed;
  }
  #tab > div {
    text-align: center;
    flex: 1;
  }
</style>
