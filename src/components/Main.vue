<template>
  <div class="main" style="width: 100%;">
    <div style="width: 100%; display: inline-block; vertical-align: middle; text-align: left;">
      <br>
      <h2>
        作者 Yijun @ YijunStudio
      </h2>
      <h3>
        AKA 珺姐也是裙子
      </h3>
      <br>
      <h3>
        本项目为上海大学2020-2021学年冬季学期《数据库原理(1)》期末大作业。
      </h3>
      <h4>
        前端使用Vue.js、Element-UI；<br>
        后端使用Flask、Pymysql；<br>
        数据库使用TencentMySQL；<br>
        服务器使用CentOS7、NginX。
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: {
    userid: String,
    usertype: Boolean,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
