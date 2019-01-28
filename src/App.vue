<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
    import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
    export default {
        name: 'app',
        data(){
            return{
                locale: zhCN,
            }
        },
    }
</script>

<style>
  *{
    padding:0px;
    margin:0px;
  }
  ul{
      list-style: none;
      padding:0px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width:100%;
    height:100%;
  }
  body{
    width:100%;
    height:100vh;
  }
</style>
