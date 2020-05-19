<template>
  <div class="m-container-samll m-padded-tb-big">
    <div class="ui container">
      <table class="ui compact teal table">
        <thead>
          <tr>
            <th></th>
            <th>名称</th>
            <th>地址</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in linkPage.content" :key="'linkList'+index">
            <td>{{index}}</td>
            <td>{{item.name}}</td>
            <td>{{item.link}}</td>
            <td>
              <a @click="editorLink(item.id)" class="ui mini teal basic button">编辑</a>
              <a @click="deleteLink(item.id)" class="ui mini red basic button">删除</a>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="6">
              <div class="ui mini pagination menu">
                <a @click="pageTo(-1)" v-if="!linkPage.first" class="item">上一页</a>
                <a @click="pageTo(+1)" v-if="!linkPage.last" class="item">下一页</a>
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
  name: "LinksList",
  components: {},
  data() {
    return {
      pageData: {
        size: 10,
        page: 0
      },
      linkPage: {}
    };
  },
  computed: {},
  activated() {
    this.getLinkPage();
  },
  methods: {
    //跳页
    pageTo(a) {
      this.pageData.page = this.pageData.page + a;
      this.getLinkPage();
    },
    //分页获取
    getLinkPage() {
      $.get({
        url: "linksByPage",
        data: this.pageData,
        success: res => {
          this.linkPage = res;
        }
      });
    },
    //删除
    deleteLink(id) {
      $.get({
        url: "dlinks",
        data: { id: id },
        success: res => {
          if (res === 0) {
            this.getLinkPage();
            console.log("删除成功");
          } else {
            console.log(res, "linksList");
          }
        }
      });
    },
    //编辑跳转
    editorLink(id) {
      this.$router.push({
        path: "/links/input",
        query: {
          lid: id
        }
      });
    },
    //添加跳转
    addTag() {
      this.$router.push("/links/input");
    }
  }
};
</script>

<style scoped>
</style>