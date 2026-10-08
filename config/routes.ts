export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'roleAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './table-list',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: './*',
    layout: false,
    component: './exception/404',
  },

  {
    path: '/rbac',
    name: 'rbac-test-page',
    icon: 'folderOpen',
    routes: [
      {
        path: '/rbac',
        redirect: '/rbac/common',
      },
      {
        path: '/rbac/admin',
        name: 'admin-page',
        access: 'roleAdmin',
        component: './rbac/admin',
      },
      {
        path: '/rbac/common',
        name: 'common-page',
        component: './rbac/common',
      },
    ],
  },
];
