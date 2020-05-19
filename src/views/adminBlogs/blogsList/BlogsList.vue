<template>
  <div class="m-padded-tb-big">
    <div class="ui container">
      <div class="ui secondary segment form">
        <div class="inline fields">
          <div class="field">
            <input type="text" v-model="data.title" name="title" placeholder="标题" />
          </div>
          <div class="field">
            <div class="ui labeled action input">
              <div class="ui type selection dropdown">
                <i class="dropdown icon"></i>
                <div class="default text">分类</div>
                <div class="menu">
                  <div
                    v-for="(item,index) in typeList"
                    :key="'type'+index"
                    class="item"
                    @click="setType(item.id)"
                  >{{item.name}}</div>
                </div>
              </div>
              <button id="clear-btn" class="ui compact button">clear</button>
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox">
              <input
                type="checkbox"
                @click="data.recommend=!data.recommend"
                :checked="data.recommend"
              />
              <label for="recommend">推荐</label>
            </div>
          </div>
          <div class="field">
            <button type="button" @click="getPageBlogs()" class="ui mini teal basic button">
              <i class="search icon"></i>搜索
            </button>
          </div>
        </div>
      </div>
      <div id="table-container">
        <table class="ui compact teal table">
          <thead>
            <tr>
              <th></th>
              <th>标题</th>
              <th>类型</th>
              <th style="white-space: nowrap;">推荐</th>
              <th>状态</th>
              <th>更新时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in pageBlogs.content" :key="'pageBlogs'+index">
              <td v-text="index"></td>
              <td v-text="item.title"></td>
              <td style="white-space: nowrap;" v-text="item.type.name"></td>
              <td v-text="item.recommend ? '是':'否'"></td>
              <td style="white-space: nowrap;" v-text="item.published ? '发布':'草稿'"></td>
              <td style="white-space: nowrap;">{{getTime(item.updateTime)}}</td>
              <td style="white-space: nowrap;">
                <a @click="blogsEditor(item.id)" class="ui mini teal basic button">编辑</a>
                <a
                  @click="commentReplay(item.id)"
                  class="ui mini teal basic button"
                >回复 | {{item.commentssize}}</a>
                <a @click="blogsDelete(item.id)" class="ui mini red basic button">删除</a>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="7">
                <div class="ui mini pagination menu">
                  <a @click="pageTo(-1)" v-if="!pageBlogs.first" class="item">上一页</a>
                  <a @click="pageTo(+1)" v-if="!pageBlogs.last" class="item">下一页</a>
                </div>
                <a @click="addBtn()" class="ui mini right floated teal basic button">新增</a>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogsList",
  components: {},
  data() {
    return {
      data: {
        size: 10, //每页大小数字
        page: 0, //当前页数数字
        title: "", //博客标题字符串
        typeId: "", //博客分类数字
        recommend: false //是否开启只看推荐布尔
      },
      typeList: [],
      pageBlogs: {}
    };
  },
  mounted() {
    $(".ui.dropdown").dropdown({
      on: "hover"
    });
    $("#clear-btn").on("click", () => {
      $(".ui.type.dropdown").dropdown("clear");
      this.data.typeId = "";
    });
    //获取分类列表
    $.get({
      url: "types",
      data: { size: 10000 },
      success: res => {
        this.typeList = res.content;
      }
    });
    //分页条件查询博客列表
    this.getPageBlogs();
  },
  computed: {},
  methods: {
    //跳页
    pageTo(a) {
      this.data.page = this.data.page + a;
      this.getPageBlogs();
    },
    //分页条件查询博客列表
    getPageBlogs() {
      $.get({
        url: "blogs",
        data: this.data,
        success: res => {
          this.pageBlogs = res;
        }
      });
    },
    //setType
    setType(id) {
      this.data.typeId = id;
      console.log(this.data);
    },
    //转换时间
    getTime(time) {
      return time.substring(0, 10);
    },
    //跳转编辑
    blogsEditor(id) {
      this.$router.push({
        path: "/blogs/input",
        query: {
          bid: id
        }
      });
    },
    //回复
    commentReplay(id) {
      this.$router.push({
        path: "/blogs/comment",
        query: {
          bid: id
        }
      });
    },
    //删除
    blogsDelete(id) {
      console.log(id);
    },
    //新增
    addBtn() {
      this.$router.push("/blogs/input");
    }
  }
};
</script>

<style scoped>
</style>