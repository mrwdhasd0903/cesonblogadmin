<template>
  <nav class="ui inverted attached segment m-padded-tb-mini m-shadow-small">
    <div class="ui container">
      <div class="ui inverted secondary stackable menu">
        <h2 class="ui teal header item">小王后台</h2>
        <a
          v-for="(item, index) in routerList"
          :key="'routerList'+index"
          @click="navjump(item.jump)"
          :class="{active:$route.path.indexOf(item.jump)!=-1}"
          class="m-item item m-mobile-hide"
        >
          <i class="mini icon" :class="item.ico"></i>
          {{item.name}}
        </a>
        <div class="right m-item m-mobile-hide menu">
          <div class="ui dropdown item">
            <div class="text">
              <img class="ui avatar image" :src="user.avatar" />
              {{user.nickname}}
            </div>
            <i class="dropdown icon"></i>
            <div @click="logout" class="menu">
              <span class="item">退出登陆</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a class="ui menu toggle black icon button m-right-top m-mobile-show">
      <i class="sidebar icon"></i>
    </a>
  </nav>
</template>

<script>
import { setCookie, getCookie } from "utils/cookie";
export default {
  name: "NavBar",
  components: {},
  data() {
    return {
      user: {
        nickname: "",
        avatar: "",
        email: ""
      },
      routerList: [
        { name: "博客", ico: "home", jump: "/blogs" },
        { name: "分类", ico: "idea", jump: "/types" },
        { name: "标签", ico: "tags", jump: "/tags" },
        { name: "外链", ico: "linkify", jump: "/links" },
        { name: "访问记录", ico: "flag", jump: "/traffic" },
        { name: "联系信息", ico: "address book outline", jump: "/contact" },
        { name: "管理员", ico: "user plus", jump: "/management" }
      ]
    };
  },
  created() {},
  mounted() {
    //获取头像和名称
    if (this.$route.path != "/") {
      $.get({
        url: "getuser",
        success: res => {
          this.user = res;
          console.log(res);
          setCookie("user", JSON.stringify(res));
        },
        error: res => {
          console.log(res, "navBar");
        }
      });
    } else if (getCookie("user")) {
      this.user = JSON.parse(getCookie("user"));
    }
    //注销菜单
    $(".ui.dropdown").dropdown({
      on: "hover"
    });
    //汉堡按钮
    $(".menu.toggle").click(function() {
      $(".m-item").toggleClass("m-mobile-hide");
    });
  },
  computed: {},
  methods: {
    navjump(link) {
      if (this.$route.path.indexOf(link)) {
        this.$router.push(link);
      }
    },
    logout() {
      $.get({
        url: "logout",
        success: res => {
          if (res) {
            this.$router.push("/login");
          }
        }
      });
    }
  }
};
</script>

<style scoped>
</style>