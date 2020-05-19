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
  name: "AdminLinks",
  components: { Crumbs },
  data() {
    return {
      menuList: [
        {
          name: "发布",
          link: "/links/input"
        },
        {
          name: "列表",
          link: "/links/list"
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