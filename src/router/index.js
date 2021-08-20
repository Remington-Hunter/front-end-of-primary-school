import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Greeter.vue'),
    },
    {
        path: '/questionnaire_type',
        name: 'Questionnaire_type',
        component: () =>
            import ('../views/Questionnaire_type')
    },
    {
        path: '/personInfo',
        name: 'PersonInfo',
        component: () =>
            import ('../views/PersonInfo.vue'),
    },
    {
        path: '/mine',
        name: 'Mine',
        component: () =>
            import ('../views/Mine/Mine.vue'),
        children: [{
            path: '',
            component: () =>
                import ('../views/Mine/Children/Questionnaires.vue')
        },{
          path: '/deleted',
          component: () =>
              import ('../views/Mine/Children/DeletedQuest.vue')
      }
    ]
    },
     {
      path: '/normalquestion',
      name: 'Normalquestion',
      component: ()=>import('../views/questionnaire/NormalQuestion.vue')
    }      
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router