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
        component: () =>
            import ('../views/Mine/Mine.vue'),
        children: [{
                path: '',
                component: () =>
                    import ('../views/Mine/Children/Questionnaires.vue')
            },
            {
                path: '/deleted',
                component: () =>
                    import ('../views/Mine/Children/DeletedQuest.vue')
            }
        ]
    },
    {
        path: '/preview',
        name: 'Preview',
        component: () =>
            import ('../views/questionnaire/Preview.vue')
    },
    {
        path: '/echarts',
        name: 'echarts',
        component: () =>
            import ('../components/Echarts.vue')
    },
    {
        path: '/edit/:type',
        name: 'Edit',
        component: () =>
            import ('../views/questionnaire/Tabs.vue')
    },
    {
        path: '/vj/:ma',
        name: 'CollectQuestion',
        component: () =>
            import ('../views/CollectQuestion.vue')
    },
    {
        path: '/crossanalysis/:id',
        name: 'crossanalysis',
        component: () =>
            import ('../views/CrossAnalysis.vue')
    },
    {
        path:'/send/:id',
        name: 'send',
        component: () => import('../views/questionnaire/Send.vue')
    },

    {
        path:'/vote',
        name:'VoteAnswer',
        component: () => import('../views/VoteAnswer.vue')
    },
    {
        path:'/stop',
        name:'Stop',
        component: () => import('../views/Stop.vue')
    },
    {
        path: '/edit1/:type',
        name: 'Edit1',
        component: () =>
            import ('../views/questionnaire/Edit.vue')
    },
    {
        path: '/try',
        name: 'Try',
        component: () =>
            import ('../views/Try.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router