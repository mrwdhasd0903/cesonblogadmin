<template>
  <div class="ui attached pointing menu">
    <div class="ui container">
      <div class="right menu">
        <router-link
          tag="a"
          v-for="(item,index) in menuList"
          :to="item.link"
          :key="index"
          class="item"
          :class="{active:$route.path==item.link}"
        >{{item.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Crumbs",
  components: {},
  props: {
    menuList: {
      type: "array",
      default: [
        {
          name: "发布",
          link: "/blogs/input"
        },
        {
          name: "列表",
          link: "/blogs/list"
        }
      ]
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
</style>