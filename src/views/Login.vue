<template>
  <!-- 外框 -->
  <div class="_login">
    <div class="login_inner">
      <el-form class="form" :model="formLogin" :rules="rules" ref="formLogin">
        <el-form-item>
          <h2 class="title">后台管理系统</h2>
        </el-form-item>
        <el-form-item prop="loginName">
          <el-input v-model="formLogin.loginName" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formLogin.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin">登陆</el-button>
          <div v-show="this.errorInfo.isShowError" class="error">{{this.errorInfo.text}}</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      formLogin: {
        loginName: "",
        password: ""
      },
      rules: {
        //校验
        loginName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      errorInfo: {
        text: "登陆失败,请重试",
        isShowError: false //显示错误提示
      }
    };
  },
  methods: {
    onLogin() {
      this.$refs["formLogin"].validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    login() {
      var param = {
        loginName: this.formLogin.loginName,
        password: this.formLogin.password
      };
      this.$axios
        .post("/api/shiro-api/login", param)
        .then(response => {
          var json = response.data;
          if (json.status == "SUCCESS") {
            //保存登陆信息
            var userInfo = json.data.userInfo;
            sessionStorage.setItem("userName", userInfo.userName); //用户名
            sessionStorage.setItem("token", userInfo.token); //保存秘钥
            var sysRoleVoList = json.data.sysRoleVoList;
            var position = "";
            for (var i = 0; i < sysRoleVoList.length; i++) {
              var item = sysRoleVoList[i];
              if (position == "") {
                position += item.roleName;
              } else {
                position += "|" + item.roleName;
              }
            }
            sessionStorage.setItem("position", position); //用户职位
            //登陆成功跳转主页
            this.$router.replace({ path: "/index" });
          } else {
            this.errorInfo.isShowError = true;
            this.errorInfo.text = json.message;
          }
        })
        .catch(error => {
          console.log("失败报文:", error);
          this.errorInfo.isShowError = true;
          this.errorInfo.text = "系统接口异常";
        });
    }
  }
};
</script>

<style lang="scss">
._login {
  // border: 1px solid red;
  width: 100%;
  height: 100%;
  display: flex; //flex布局
  justify-content: center; //横向居中
  align-items: center; //纵向居中
  .login_inner {
    // border: 1px solid blue;
    width: 460px;
    height: 300px;
    display: flex;
    justify-content: center;
    box-shadow: 0 0 25px #cac6c6; //阴影，x偏移，y偏移，阴影大小，颜色
    .form {
      // border: 1px solid green;
      width: 300px;
      text-align: center; //flex只能对最外层元素起作用，这里用文本内容居中实现
      .title {
        margin-top: 30px;
        color: #505458;
      }
      .error {
        color: red;
      }
    }
  }
}
</style>