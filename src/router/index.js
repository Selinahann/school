import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'
Vue.use(VueRouter)

export const menu = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home'),
    meta: {
      title: '系统首页',
      icon: ''
    }
  },
  {
    path: '/educational',
    name: 'Educational',
    component: () => import('@/views/content'),
    meta: {
      title: '教务管理',
      icon: ''
    },
    children: [
      {
        path: '/educational/majors',
        name: 'EducationalMajors',
        component: () => import('@/views/educational/majors'),
        meta: {
          title: '专业管理',
          icon: ''
        }
      },
      {
        path: '/educational/majors/:id',
        name: 'EducationalMajorsDetail',
        component: () => import('@/views/educational/majorsDetail'),
        meta: {
          title: '专业详情',
          icon: '',
          hideMenu: true
        }
      },
      {
        path: '/educational/questions',
        name: 'Questions',
        component: () => import('@/views/educational/questions'),
        meta: {
          title: '题库管理',
          icon: ''
        }
      },
      {
        path: '/educational/student',
        name: 'EducationalStudent',
        component: () => import('@/views/educational/student'),
        meta: {
          title: '学生管理',
          icon: ''
        }
      },
      {
        path: '/educational/paper',
        name: 'EducationalPaper',
        component: () => import('@/views/educational/paper'),
        meta: {
          title: '试卷管理',
          icon: ''
        }
      },
      {
        path: '/educational/paper/create',
        name: 'EducationalPaperCreate',
        component: () => import('@/views/educational/createPaper'),
        meta: {
          title: '创建试卷',
          icon: '',
          hideMenu: true
        }
      }
    ]
  },
  {
    path: '/academic',
    name: 'Academic',
    component: () => import('@/views/content'),
    meta: {
      title: '学管中心',
      icon: ''
    },
    children: [
      {
        path: '/academic/room',
        name: 'AcademicRoom',
        component: () => import('@/views/academic/room'),
        meta: {
          title: '教室管理',
          icon: ''
        }
      },
      {
        path: '/academic/class',
        name: 'AcademicClass',
        component: () => import('@/views/academic/class'),
        meta: {
          title: '班级管理',
          icon: ''
        }
      },
      {
        path: '/academic/class/:id',
        name: 'AcademicClassDetail',
        component: () => import('@/views/academic/classDetail'),
        meta: {
          title: '班级详情',
          icon: '',
          hideMenu: true
        }
      }
    ]
  },
  {
    path: '/enterprise',
    name: 'Enterprise',
    component: () => import('@/views/content'),
    meta: {
      title: '学校管理',
      icon: ''
    },
    children: [
      {
        path: '/enterprise/architectures',
        name: 'EnterpriseArchitectures',
        component: () => import('@/views/enterprise/architectures'),
        meta: {
          title: '组织架构',
          icon: ''
        }
      },
      {
        path: '/enterprise/role',
        name: 'EnterpriseRole',
        component: () => import('@/views/enterprise/role'),
        meta: {
          title: '角色管理',
          icon: ''
        }
      },
      {
        path: '/enterprise/employee',
        name: 'EnterpriseEmployee',
        component: () => import('@/views/enterprise/employee'),
        meta: {
          title: '员工管理',
          icon: ''
        }
      }
    ]
  }
]
const routes = [
  {
    path: '/',
    component: () => import('@/layout/BaseLayout'),
    redirect: '/home',
    children: menu
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const views = store.state.user.views
//   if (!views.includes(to.name)) {
//     // alert('没有权限访问')
//     next(false)
//   } else {
//     next()
//   }
//   // if (views.length <= 0) {
//   //   next(false)
//   // } else {
//   //   next()
//   // }
//   // if (to.name)
// })

export default router
