const routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  component: () => import('views/adminLogin/AdminLogin')
}, {
  path: '/blogs',
  component: () => import('views/adminBlogs/AdminBlogs'),
  children: [{
    path: '',
    redirect: 'list'
  }, {
    path: 'list',
    component: () => import('views/adminBlogs/blogsList/BlogsList')
  }, {
    path: 'input',
    component: () => import('views/adminBlogs/blogsInput/BlogsInput')
  }, {
    path: 'comment',
    component: () => import('views/adminBlogs/blogsComment/BlogsComment')
  }]
}, {
  path: '/management',
  component: () => import("views/adminManagement/AdminManagement"),
  children: [{
    path: '',
    redirect: 'input'
  }, {
    path: 'input',
    component: () => import("views/adminManagement/managementInput/ManagementInput")
  }]
}, {
  path: '/links',
  component: () => import('views/adminLinks/AdminLinks'),
  children: [{
    path: '',
    redirect: 'list'
  }, {
    path: 'list',
    component: () => import('views/adminLinks/linksList/LinksList')
  }, {
    path: 'input',
    component: () => import('views/adminLinks/linksInput/LinksInput')
  }]
}, {
  path: '/contact',
  component: () => import("views/adminContact/AdminContact"),
  children: [{
    path: '',
    redirect: 'input'
  }, {
    path: 'input',
    component: () => import("views/adminContact/contactInput/ContactInput")
  }]
}, {
  path: '/traffic',
  component: () => import('views/adminTraffic/AdminTraffic'),
  children: [{
    path: '',
    redirect: 'list'
  }, {
    path: 'list',
    component: () => import('views/adminTraffic/trafficList/TrafficList')
  }]
}, {
  path: '/tags',
  component: () => import('views/adminTags/AdminTags'),
  children: [{
    path: '',
    redirect: 'list'
  }, {
    path: 'list',
    component: () => import('views/adminTags/tagsList/TagsList')
  }, {
    path: 'input',
    component: () => import('views/adminTags/tagsInput/TagsInput')
  }]
}, {
  path: '/types',
  component: () => import('views/adminTypes/AdminTypes'),
  children: [{
    path: '',
    redirect: 'list'
  }, {
    path: 'list',
    component: () => import('views/adminTypes/typesList/TypesList')
  }, {
    path: 'input',
    component: () => import('views/adminTypes/typesInput/TypesInput')
  }]
}]

const router = new VueRouter({
  routes,
  mode: "history",
})

router.beforeEach((to, from, next) => {
  next()
})

export default router