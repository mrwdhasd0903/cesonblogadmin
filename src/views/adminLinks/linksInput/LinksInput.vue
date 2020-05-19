<template>
  <div class="m-container-small m-padded-tb-big">
    <div class="ui container">
      <form class="ui form">
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">名称</label>
            <input type="text" v-model="data.name" placeholder="外链名称" />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">地址</label>
            <input type="text" v-model="data.link" placeholder="外链地址" />
          </div>
        </div>
        <div class="ui right aligned container">
          <button type="button" class="ui button" onclick="window.history.go(-1)">返回</button>
          <button type="button" @click="linkPost()" class="ui teal submit button">提交</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinksInput",
  components: {},
  data() {
    return {
      data: {
        name: "",
        link: "",
        id: ""
      }
    };
  },
  mounted() {},
  activated() {
    if (this.$route.query.lid) {
      this.getLinkById(this.$route.query.lid);
    }
  },
  deactivated() {
    //组件停用时
    this.data.id = null;
    this.data.name = null;
    this.data.link = null;
  },
  computed: {},
  methods: {
    //修改获取
    getLinkById(id) {
      $.get({
        url: "link",
        data: { id: id },
        success: res => {
          this.data.id = res.id;
          this.data.name = res.name;
          this.data.link = res.link;
        }
      });
    },
    //上传
    linkPost() {
      $.post({
        url: "links",
        data: this.data,
        success: res => {
          if (res == 0) {
            this.$router.back(-1);
          } else {
            console.log(res, "linksinput");
          }
        }
      });
    }
  }
};
</script>

<style scoped>
</style>