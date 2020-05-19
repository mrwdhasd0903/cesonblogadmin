<template>
  <div class="m-container-small m-padded-tb-massive" style="max-width: 30em !important;">
    <div class="ur container">
      <div class="ui middle aligned center aligned grid">
        <div class="column">
          <h2 class="ui teal image header">
            <div class="content">管理后台登录</div>
          </h2>
          <form class="ui large form">
            <div class="ui segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="user icon"></i>
                  <input type="text" v-model="data.username" placeholder="用户名" />
                </div>
              </div>
              <div class="field">
                <div class="ui left icon input">
                  <i class="lock icon"></i>
                  <input type="password" v-model="data.password" placeholder="密码" />
                </div>
              </div>
              <button type="button" @click="login" class="ui fluid large teal button">登 录</button>
            </div>
            <div v-if="isShowMsg">
              <div class="ui error mini message"></div>
              <div class="ui mini negative message">用户名和密码错误</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLogin",
  components: {},
  data() {
    return {
      isShowMsg: false,
      data: {
        username: "",
        password: ""
      }
    };
  },
  activated() {
    this.setNav(false);
    document.onkeydown = e => {
      if (e.keyCode == 13) {
        this.login();
      }
    };
  },
  deactivated() {
    this.setNav(true);
    document.onkeydown = null;
  },
  inject: ["setNav"],
  mounted() {},
  computed: {},
  methods: {
    login() {
      $.post({
        url: "login",
        data: this.data,

        success: res => {
          this.isShowMsg = res;
          console.log(res);
          if (res === 0) {
            this.$router.push("/blogs");
          } else {
          }
          this.data.username = "";
          this.data.password = "";
        }
      });
    }
  }
};
</script>

<style scoped>
</style>