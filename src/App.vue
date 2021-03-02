<template>
  <div id="app">
<!--    <div style="background-color: #ffffffe0;">-->
    <el-row type="flex" align="middle" style="height: 10vh;">
      <el-col :span="3">
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                style="height: 10vh; width: 90%;"/>
      </el-col>
      <el-col :span="15">
        <el-row v-if="$route.path == '/' || userinfo.id == ''" style="font-size: 28px; font-weight: 500; letter-spacing: 2px;" type="flex" align="middle" justify="start">
          明星大侦探学生选课成绩管理系统
        </el-row>
        <el-row v-else-if="$route.path == '/Author'" style="font-size: 28px; font-weight: 500; letter-spacing: 2px;" type="flex" align="middle" justify="start">
          嘻嘻
        </el-row>
        <el-breadcrumb v-else-if="$route.path == '/People'" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">系统首页</el-breadcrumb-item>
          <el-breadcrumb-item>人员管理</el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-else separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">系统首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ (
            $route.path == '/CourseSel' ||
            $route.path == '/CourseOpen' ||
            $route.path == '/CourseEdit' ||
            $route.path == '/CourseAll' ||
            $route.path.includes('/CourseDetail')
            )? '选课管理' : '成绩管理' }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ (
            $route.path == '/CourseSel' ||
            $route.path == '/CourseOpen' ||
            $route.path == '/CourseEdit' ||
            $route.path == '/CourseAll' ||
            $route.path.includes('/CourseDetail'))?
            (
            $route.path == '/CourseSel'? '学生选课' :
            $route.path == '/CourseOpen'? '开课管理' :
            $route.path == '/CourseAll'? '课程一览' : '选课情况') :
            (
            $route.path == '/GradeQuery'? '成绩查询' :
            $route.path == '/GradeAll'? '成绩大表' : '成绩录入') }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$route.path.includes('/CourseDetail')">课程详情</el-breadcrumb-item>
          <el-breadcrumb-item v-else-if="$route.path.includes('/GradeDetail')">成绩详情</el-breadcrumb-item>
          <el-breadcrumb-item v-else></el-breadcrumb-item>
          <el-breadcrumb-item v-if="$route.path.includes('/CourseDetail') || $route.path.includes('/GradeDetail')"></el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col v-if="userinfo.id != ''" :span="6" type="flex" align="middle" justify="end">
        <el-row>
          <el-col :span="12" align="right">
            <span style="font-size: 12px; font-weight: 200; margin-right: 20px;">你好，{{ userinfo.id }}</span>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" @click="modify = true">
              修改密码
            </el-button>
            <el-dialog title="修改密码" :visible.sync="modify">
              <el-row>
                <el-input v-model="oldPwd" show-password style="width: 70%; margin: 10px;" placeholder="请输入旧密码"></el-input>
              </el-row>
              <el-row>
                <el-input v-model="newPwd" show-password style="width: 70%; margin: 10px;" placeholder="请输入新密码"></el-input>
              </el-row>
              <el-row>
                <el-button @click="modifyPwd" type="primary" style="margin: 10px;" :disabled="(newPwd == '' || oldPwd == '' || nosubmit)">修改密码</el-button>
              </el-row>
            </el-dialog>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" @click="logout">
              登出
            </el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col v-else :span="6" type="flex" align="middle" justify="end">
        <el-row>
          <el-col :span="12" align="right">
            <span style="font-size: 12px; font-weight: 200; margin-right: 20px; text-align: right;">请先登录</span>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" @click="modify = true" disabled>
              修改密码
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" @click="logout" disabled>
              登出
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" align="top">
      <el-col :span="3">
        <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                style="min-height: 90vh; height: 100%; width: 90%;"
                router>
          <el-menu-item index="/">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span>系统首页</span>
            </template>
          </el-menu-item>
          <el-submenu index="/Course">
            <template slot="title">
              <i class="el-icon-date"></i>
              <span slot="title">选课管理</span>
            </template>
            <el-menu-item v-show="!userinfo.type" index="/CourseSel">学生选课</el-menu-item>
            <el-menu-item v-show="userinfo.type" index="/CourseOpen">开课管理</el-menu-item>
            <el-menu-item v-show="userinfo.type" index="/CourseEdit">选课情况</el-menu-item>
            <el-menu-item index="/CourseAll">课程一览</el-menu-item>
          </el-submenu>
          <el-submenu index="/Grade">
            <template slot="title">
              <i class="el-icon-data-line"></i>
              <span slot="title">成绩管理</span>
            </template>
            <el-menu-item v-show="!userinfo.type" index="/GradeQuery">成绩查询</el-menu-item>
            <el-menu-item v-show="!userinfo.type" index="/GradeAll">成绩大表</el-menu-item>
            <el-menu-item v-show="userinfo.type" index="/GradeEdit">成绩录入</el-menu-item>
          </el-submenu>
          <el-menu-item v-show="userinfo.type" index="/People">
            <i class="el-icon-user"></i>
            <span slot="title">人员管理</span>
          </el-menu-item>
          <el-menu-item index="/Author">
            <i class="el-icon-ice-cream-round"></i>
            <span slot="title">项目说明</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <el-row v-if="userinfo.id == ''" type="flex" align="middle" style="height: 80vh;">
          <el-col :span="8" align="left" style="margin-top: -10vh;">
            <div id="login">
              <el-row>
                <el-input class="input" placeholder="" v-model="loginform.usr">
                  <template slot="prepend">学工号</template>
                </el-input>
              </el-row>
              <el-row>
                <el-input class="input" placeholder="" v-model="loginform.pwd" show-password>
                  <template slot="prepend">密码</template>
                </el-input>
              </el-row>
              <el-row  style="margin-top: 5vh;">
                <el-button type="primary" @click="login" style="margin-left: 10px;" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
              </el-row>
            </div>
          </el-col>
          <el-col :span="16">
<!--            <el-card style="width: 97%; min-height: 70vh; background-color: #FFFFFF80; border-color: #FFFFFF80;"></el-card>-->
          </el-col>
        </el-row>
        <router-view v-else :userid="userinfo.id" :usertype="userinfo.type" style="display: inline-block; min-height: 80vh;"></router-view>
        <el-row type="flex" align="middle" justify="center" style="height: 10vh;">
          <a class="beian" href="https://beian.miit.gov.cn/" target="_blank" style="margin-right: 20px;">沪ICP备20015145号-1</a>
          <a class="beian" target="_blank"
             href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402008390"
             style="display: inline-block;">
            <img src="./assets//beian.png" style="float: left; margin-right: 10px;"/>
            <p class="beian"
               style="float: left; height: 20px; line-height: 20px; margin: 0px 0px 0px 5px;">沪公网安备 31010402008390号</p>
          </a>
        </el-row>
      </el-col>
    </el-row>
<!--  </div>-->
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'App',
    components: {

    },
    data() {
      return {
        oldPwd: '',
        newPwd: '',
        modify: false,
        nosubmit: false,
        fullscreenLoading: false,
        userinfo: {
          id: '',
          type: false,
        },
        loginform: {
          usr: '',
          pwd: '',
        }
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      login() {
        let that = this;
        that.fullscreenLoading = true;
        axios({
          method: 'post',
          url: 'http://localhost:5000/login',
          data: that.loginform,
        }).then((response) => {
          console.log(response)
          if (response.data.status == 'success') {
            that.$message({
              message: '登录成功',
              type: 'success'
            });
            that.userinfo.id = response.data.id;
            that.userinfo.type = response.data.type;
            that.fullscreenLoading = false;
          } else {
            that.fullscreenLoading = false;
            that.$message({
              message: '学工号或密码错误',
              type: 'error'
            });
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      modifyPwd() {
        let that = this;
        that.nomodify = true;
        let modifyForm = {
          id: that.userinfo.id,
          usertype: that.userinfo.type,
          oldpwd: that.oldPwd,
          newpwd: that.newPwd,
        };
        axios({
          method: 'post',
          url: 'http://localhost:5000/modifypwd',
          data: modifyForm,
        }).then((response) => {
          console.log(response)
          if (response.data == 'success') {
            that.$message({
              message: '修改成功',
              type: 'success'
            });
            that.nomodify = false;
            let routeUrl = this.$router.resolve({
              path: '/',
            });
            window.open(routeUrl.href, '_self');
          } else if (response.data == 'oldpwdwrong') {
            that.$message({
              message: '旧密码错误',
              type: 'error'
            });
            that.nomodify = false;
          } else {
            that.$message({
              message: '未知错误',
              type: 'error'
            });
            that.nomodify = false;
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      logout() {
        this.fullscreenLoading = true;
        let routeUrl = this.$router.resolve({
            path: '/',
        });
        window.open(routeUrl.href, '_self');
      }
    },
    mounted() {
      this.$notify({
        title: '测试用账号',
        dangerouslyUseHTMLString: true,
        message: '<h4>教师账号</h4><span>工号 10000001</span><br><span>密码 mztxy123</span>' +
                 '<br><h4>学生账号</h4><span>学号 10720001</span><br><span>密码 mztxy123</span>' +
                 '<h3>欢迎体验～</h3>',
        duration: 0
      });
    }
  }
</script>

<style>
  html {
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    background-image: url("https://yijunstudio-1257435281.cos.ap-shanghai.myqcloud.com/yjs_1B263B_40.png");
    background-size: auto 190%;
    background-position: 20vw -20vh;
    background-repeat: no-repeat;
    height: 100vh;
  }
  body {
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    /*background-color: #ffffffe0;*/
    /*height: 100vh;*/
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*background-color: #ffffffe0;*/
    height: 100%;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
    /*margin-top: 60px;*/
    /*background-image: url("https://yijunstudio-1257435281.cos.ap-shanghai.myqcloud.com/yjs_1B263B.png");*/
    /*background-size: auto 190%;*/
    /*background-position: 20vw -20vh;*/
    /*background-repeat: no-repeat;*/
  }
  .beian {
    /*color: #99a9bf;*/
    color: #2c3e50;
    font-size: 12px;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  .el-sub-menu, .el-menu-item, .is-active {
    min-width: 0px !important;
  }
  .input {
    width: 20vw;
    margin: 1vh;
  }
  .el-input-group__prepend {
    width: 40px;
    background-color: #fefefe;
    text-align: justify;
  }
  .el-divider--horizontal {
    margin: 1.5vh 0;
  }
</style>
