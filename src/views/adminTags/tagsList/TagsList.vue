<template>
  <div class="m-container-small m-padded-tb-big">
    <div class="ui container">
      <table class="ui compact teal table">
        <thead>
          <tr>
            <th></th>
            <th>名称</th>
            <th>颜色</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tagPage.content" :key="'tagList'+index">
            <td>{{index}}</td>
            <td>{{item.name}}</td>
            <td :style="{'color':item.color}">{{item.color}}</td>
            <td>
              <a @click="editorTag(item.id)" class="ui mini teal basic button">编辑</a>
              <a @click="tagDelete(item.id)" class="ui mini red basic button">删除</a>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="6">
              <div class="ui mini pagination menu">
                <a @click="pageTo(-1)" v-if="!tagPage.first" class="item">上一页</a>
                <a @click="pageTo(+1)" v-if="!tagPage.last" class="item">下一页</a>
              </div>
              <a @click="addTag()" class="ui mini right floated teal basic button">新增</a>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagsList",
  components: {},
  data() {
    return {
      pageData: {
        size: 10,
        page: 0
      },
      tagPage: {}
    };
  },
  computed: {},
  mounted() {},
  activated() {
    this.getTagPage();
  },
  methods: {
    //跳页
    pageTo(a) {
      this.pageData.page = this.pageData.page + a;
      this.getTagPage();
    },
    //分页获取
    getTagPage() {
      $.get({
        url: "tags",
        data: this.pageData,
        success: res => {
          this.tagPage = res;
        }
      });
    },
    //编辑跳转
    editorTag(id) {
      this.$router.push({
        path: "/tags/input",
        query: {
          gid: id
        }
      });
    },
    addTag() {
      this.$router.push("/tags/input");
    },
    tagDelete(id) {
      console.log(id);
    }
  }
};
</script>

<style scoped>
</style>