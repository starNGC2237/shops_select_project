export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
    meta: {
      title: "登录",
      hidden: true,
      icon: "Promotion",
    },
  },
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "layout",
    redirect: "/home",
    meta: {
      title: "",
      hidden: false,
      icon: "Avatar",
    },
    children: [
      {
        name: "home",
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          hidden: false,
          icon: "HomeFilled",
        },
      },
    ],
  },
  {
    path: "/screen",
    component: () => import("@/views/screen/index.vue"),
    name: "screen",
    meta: {
      title: "数据大屏",
      hidden: false,
      icon: "Platform",
    },
  },

  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
      hidden: true,
    },
  },
];
export const asyncRoutes = [
  {
    path: "/product",
    component: () => import("@/layout/index.vue"),
    name: "Product",
    redirect: "/product/trademark",
    meta: {
      title: "商品管理",
      hidden: false,
      icon: "Goods",
    },
    children: [
      {
        path: "/product/trademark",
        name: "Trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        meta: {
          title: "品牌管理",
          icon: "ShoppingCart",
        },
      },
      {
        path: "/product/attr",
        name: "Attr",
        component: () => import("@/views/product/attr/index.vue"),
        meta: {
          title: "属性管理",
          icon: "ChromeFilled",
        },
      },
      {
        path: "/product/spu",
        name: "Spu",
        component: () => import("@/views/product/spu/index.vue"),
        meta: {
          title: "SPU管理",
          icon: "Calendar",
        },
      },
      {
        path: "/product/sku",
        name: "Sku",
        component: () => import("@/views/product/sku/index.vue"),
        meta: {
          title: "SKU管理",
          icon: "Orange",
        },
      },
      {
        path: "/product/product",
        name: "Product",
        component: () => import("@/views/product/product/index.vue"),
        meta: {
          title: "商品管理",
          icon: "Goods",
        },
      },
    ],
  },
  {
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    name: "Acl",
    redirect: "/acl/user",
    meta: {
      title: "权限管理",
      hidden: false,
      icon: "Lock",
    },
    children: [
      {
        name: "Acl",
        path: "/acl/user",
        component: () => import("@/views/acl/user/index.vue"),
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "User",
        },
      },
      {
        name: "Role",
        path: "/acl/role",
        component: () => import("@/views/acl/role/index.vue"),
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "MessageBox",
        },
      },
      {
        name: "Permission",
        path: "/acl/permission",
        component: () => import("@/views/acl/permission/index.vue"),
        meta: {
          title: "菜单管理",
          hidden: false,
          icon: "Monitor",
        },
      },
    ],
  },
];

export const anyRoutes = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: {
      title: "Any",
      hidden: true,
    },
  },
];
