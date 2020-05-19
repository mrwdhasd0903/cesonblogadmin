<template>
  <div class="m-container-small m-padded-tb-big">
    <div class="ui container">
      <form class="ui form">
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">名称</label>
            <input type="text" v-model="data.name" placeholder="分类名称" />
          </div>
        </div>
        <div class="ui right aligned container">
          <button type="button" class="ui button" onclick="window.history.go(-1)">返回</button>
          <button type="button" @click="typePost()" class="ui teal button">提交</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "TypesInput",
  components: {},
  data() {
    return {
      data: {
        name: "",
        id: ""
      }
    };
  },
  mounted() {
    if (this.$route.query.tid) {
      this.getTypeById(this.$route.query.tid);
    }
  },
  computed: {},
  methods: {
    //修改获取
    getTypeById(id) {
      $.get({
        url: "type",
        data: { id: id },
        success: res => {
          this.data.id = res.id;
          this.data.name = res.name;
        }
      });
    },
    //上传
    typePost() {
      $.post({
        url: "types",
        data: this.data,
        success: res => {
          if (res === 0) {
            this.$router.push("/types/list");
          } else {
            console.log(res,"typesTnput");
          }
        }
      });
    }
  }
};
</script>

<style scoped>
</style>