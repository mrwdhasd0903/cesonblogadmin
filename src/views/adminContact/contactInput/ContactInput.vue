<template>
  <div class="m-container-small m-padded-tb-big">
    <div class="ui container">
      <form class="ui form">
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">邮箱</label>
            <input type="text" v-model="contact.email" placeholder="邮箱" />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">微信支付QRcode</label>
            <input type="text" v-model="contact.payByWechat" placeholder="微信支付" />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">支付宝QRcode</label>
            <input type="text" v-model="contact.payByZhi" placeholder="支付宝" />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">QQ</label>
            <input type="text" v-model="contact.qq" placeholder="QQ" />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">微信</label>
            <input type="text" v-model="contact.wechat" placeholder="微信" />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">微信QRcode</label>
            <input type="text" v-model="contact.wechatCode" placeholder="微信QRcode" />
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
export default {
  name: "ContactInput",
  components: {},
  data() {
    return {
      contact: {}
    };
  },
  computed: {},
  activated() {
    this.getContact();
  },
  methods: {
    //获取
    getContact() {
      $.get({
        url: "contacts",
        success: res => {
          res[0] && (this.contact = res[0]);
        }
      });
    },
    //上传
    post() {
      $.post({
        url: "contacts",
        data: this.contact,
        success: res => {
          if (res === 0) {
            this.getContact();
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