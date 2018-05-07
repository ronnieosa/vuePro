<template>
  <div id="app">
    <vHeader :seller="seller"></vHeader>
    <vTab></vTab>
    <router-view :seller="seller"/>
  </div>
</template>

<script>
  import header from './components/Header.vue'
  import tabs from './components/Tab.vue'

export default {
  name: 'app',
  data(){
      return {
          seller:{}
      }
  },
  mounted(){
      this.getSellerData()
  },
  methods:{
    getSellerData(){
      const _this = this;
      this.$http.get('/api/seller').then((res)=>{
        _this.seller = res.data.data;
//        console.log(res.data.data)
      })
    }
  },
  components:{
      vHeader: header,
      vTab: tabs
  }
}
</script>

<style>

</style>
