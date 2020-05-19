<template>
  <div class>
    <crumbs :menuList="menuList"></crumbs>
    <router-view></router-view>
  </div>
</template>

<script>
import Crumbs from "components/crumbs/Crumbs";
export default {
  name: "AdminTypes",
  components: { Crumbs },
  data() {
    return {
      menuList: [
        {
          name: "发布",
          link: "/types/input"
        },
        {
          name: "列表",
          link: "/types/list"
        }
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
</style>