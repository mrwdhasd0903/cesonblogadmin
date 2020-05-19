<template>
  <div id="app">
    <nav-bar v-if="navShow"></nav-bar>
    <keep-alive>
      <router-view style="min-height:800px"></router-view>
    </keep-alive>
    <footer-bar v-if="navShow"></footer-bar>
  </div>
</template>

<script>
import "ajax/base";
import NavBar from "components/navBar/NavBar";
import FooterBar from "components/footer/Footer";
export default {
  name: "App",
  data() {
    return {
      navShow: true
    };
  },
  beforeUpdate() {
    if (this.$route.path != "/login") {
      $.get({
        url: "islogin",
        success: res => {
          if (!res && this.$route.path != "/login") {
            this.$router.push("/login");
          }
        }
      });
    }
  },
  provide() {
    return {
      setNav: this.setNav
    };
  },
  mounted() {},
  methods: {
    setNav(flag) {
      this.navShow = flag;
    }
  },
  components: { NavBar, FooterBar }
};
</script>

<style>
@import "assets/css/base.css";
@import "assets/css/me.css";
</style>

