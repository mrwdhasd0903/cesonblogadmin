<template>
  <div class="m-padded-tb-big">
    <div class="ui container">
      <div class="ui secondary segment form">
        <div class="inline fields">
          <div class="field">
            <input type="text" name="query" v-model="data.query" placeholder="时间戳" />
          </div>
          <div class="field">
            <button type="button" @click="getPageTraffic()" class="ui mini teal basic button">
              <i class="search icon"></i>搜索
            </button>
          </div>
          <div class="field">
            总记录
            <h2 class="ui orange header m-inline-block">{{pageTraffic.totalElements}}</h2>共
            <h2 class="ui orange header m-inline-block">{{pageTraffic.totalPages}}</h2>页
            当前第
            <h2 class="ui orange header m-inline-block">{{pageTraffic.number+1}}</h2>页
          </div>
        </div>
      </div>

      <div id="table-container">
        <table class="ui compact teal table">
          <thead>
            <tr>
              <th></th>
              <th>时间</th>
              <th>ip</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pageTraffic.content" :key="'pageTraffic'+index">
              <td v-text="index"></td>
              <td v-text="ChangeDateFormat(item.createTime)"></td>
              <td v-text="item.ip"></td>
              <td>
                <a @click="trafficDelete(item.id)" class="ui mini red basic button">删除</a>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="7">
                <div class="ui min pagination menu">
                  <a @click="pageTo(-1)" v-if="!pageTraffic.first" class="item">上一页</a>
                  <a @click="pageTo(+1)" v-if="!pageTraffic.last" class="item">下一页</a>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ChangeDateFormat from "utils/ChangeDateFormat";
export default {
  name: "TrafficList",
  components: {},
  data() {
    return {
      data: {
        size: 10,
        page: 0,
        query: ""
      },
      pageTraffic: {}
    };
  },
  mounted() {
    this.getPageTraffic();
  },
  computed: {},
  methods: {
    //跳页
    pageTo(a) {
      this.data.page = this.data.page + a;
      this.getPageTraffic();
    },
    //日期序列化
    ChangeDateFormat(date) {
      return ChangeDateFormat(date);
    },
    //分页条件查询
    getPageTraffic() {
      $.get({
        url: "trafficByCreateTime",
        data: this.data,
        success: res => {
          this.pageTraffic = res;
        }
      });
    },
    //删除
    trafficDelete(id) {
      $.post({
        url: "dtraffic",
        data: { id: id },
        success: res => {
          if (res === 0) {
            this.getPageTraffic();
            console.log("删除成功");
          } else {
            console.log(res, "dtraffic");
          }
        }
      });
    }
  }
};
</script>

<style scoped>
</style>