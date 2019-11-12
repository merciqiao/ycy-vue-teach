<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
/*基础样式 start */
html,body,#app{
  width:100%;
  height:100%;
  overflow: hidden;
}
*{
  margin:0;
  padding: 0;
}
a{
  text-decoration: none;
}
/*基础样式 end */
</style>
