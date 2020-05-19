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
  name: "",
  components: { Crumbs },
  data() {
    return {
      menuList: [
        {
          name: "发布",
          link: "/contact/input"
        }
      ]
    };
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style scoped>
</style>