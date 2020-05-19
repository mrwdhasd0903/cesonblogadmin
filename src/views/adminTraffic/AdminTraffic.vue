<template>
  <div class>
    <crumbs :menuList="menuList"></crumbs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Crumbs from "components/crumbs/Crumbs";
export default {
  name: "AdminTraffic",
  components: { Crumbs },
  data() {
    return {
      menuList: [{ name: "列表", link: "/traffic/list" }]
    };
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style scoped>
</style>