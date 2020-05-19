<template>
  <div class="m-container-small m-padded-tb-big">
    <div class="ui container">
      <form class="ui form">
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">名称</label>
            <input type="text" :style="{color:data.color}" v-model="data.name" placeholder="分类名称" />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <label class="ui teal basic label">颜色</label>
            <input type="text" v-model="data.color" placeholder="分类颜色" />
          </div>
        </div>
        <div class="ui right aligned container">
          <button type="button" class="ui button" onclick="window.history.go(-1)">返回</button>
          <button type="button" @click="randomColor()" class="ui orange button">随机</button>
          <button type="button" @click="tagPost()" class="ui teal submit button">提交</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { randomColor } from "utils/randomColor";
export default {
  name: "TagsInput",
  components: {},
  data() {
    return {
      data: {
        name: "",
        id: "",
        color: ""
      }
    };
  },
  mounted() {},
  activated() {
    if (this.$route.query.gid) {
      this.getTagById(this.$route.query.gid);
    }
  },
  deactivated() {
    //组件停用时
    this.data.id = null;
    this.data.name = null;
    this.data.color = null;
  },
  computed: {},
  methods: {
    //随机颜色
    randomColor() {
      this.data.color = randomColor(256);
    },
    //修改获取
    getTagById(id) {
      $.get({
        url: "tag",
        data: { id: id },
        success: res => {
          this.data.id = res.id;
          this.data.name = res.name;
          this.data.color = res.color;
        }
      });
    },
    //上传
    tagPost() {
      $.post({
        url: "tags",
        data: this.data,
        success: res => {
          if (res === 0) {
            this.$router.back(-1);
          } else {
            console.log(res, "tagsInput");
          }
        }
      });
    }
  }
};
</script>

<style scoped>
</style>