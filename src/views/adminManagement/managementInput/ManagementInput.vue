<template>
  <div class="m-container-small m-padded-tb-big">
    <div class="ui container">
      <form class="ui form">
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">昵称</label>
            <input type="text" v-model="user.nickname" placeholder="昵称" />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">头像</label>
            <input type="text" v-model="user.avatar" placeholder="头像" />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">账号</label>
            <input type="text" v-model="user.username" placeholder="账号" />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">密码</label>
            <input type="password" v-model="user.password" placeholder="密码" />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">邮箱</label>
            <input type="text" v-model="user.email" placeholder="邮箱" />
          </div>
        </div>
        <div class="ui right aligned container">
          <button type="button" @click="post()" class="ui teal submit button">提交</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ChangeDateFormat from "utils/ChangeDateFormat";
import { setCookie } from "utils/cookie";
export default {
  name: "ManagementInput",
  components: {},
  data() {
    return {
      user: {}
    };
  },
  activated() {
    this.getUser();
  },
  computed: {},
  methods: {
    //日期序列化
    ChangeDateFormat(date) {
      return ChangeDateFormat(date);
    },
    //获取
    getUser() {
      $.get({
        url: "getuser",
        success: res => {
          this.user = res;
        }
      });
    },
    //上传
    post() {
      $.post({
        url: "postuser",
        data: this.user,
        success: res => {
          if (res === 0) {
            this.getUser();
            setCookie("user", JSON.stringify(this.user));
            window.location.reload();
            console.log("修改成功");
          } else {
            console.log(res, "contacts");
          }
        }
      });
    }
  }
};
</script>

<style scoped>
</style>