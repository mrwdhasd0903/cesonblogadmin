<template>
  <div class="m-container-small m-padded-tb-big">
    <div class="ui container">
      <table class="ui compact teal table">
        <thead>
          <tr>
            <th></th>
            <th>名称</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in typePage.content" :key="'typeList'+index">
            <td>{{index}}</td>
            <td>{{item.name}}</td>
            <td>
              <a @click="editorType(item.id)" class="ui mini teal basic button">编辑</a>
              <a @click="typeDelete(item.id)" class="ui mini red basic button">删除</a>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="6">
              <div class="ui mini pagination menu" th:if="${page.totalPages}>1">
                <a @click="pageTo(-1)" v-if="!typePage.first" class="item">上一页</a>
                <a @click="pageTo(+1)" v-if="!typePage.last" class="item">下一页</a>
              </div>
              <a @click="addType()" class="ui mini right floated teal basic button">新增</a>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TypesList",
  components: {},
  data() {
    return {
      pageData: {
        size: 10,
        page: 0
      },
      typePage: {}
    };
  },
  computed: {},
  mounted() {
    this.getTypePage();
  },
  methods: {
    //跳页
    pageTo(a) {
      this.pageData.page = this.pageData.page + a;
      this.getTypePage();
    },
    //分页获取
    getTypePage() {
      $.get({
        url: "types",
        data: this.pageData,
        success: res => {
          this.typePage = res;
        }
      });
    },
    //编辑跳转
    editorType(id) {
      this.$router.push({
        path: "/types/input",
        query: {
          tid: id
        }
      });
    },
    addType() {
      this.$router.push("/types/input");
    },
    typeDelete(id) {
      console.log(id);
    }
  }
};
</script>

<style scoped>
</style>