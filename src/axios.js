import axios from "axios";
import Element from "element-ui";
import router from './router'
import store from './store'

axios.defaults.baseURL = 'http://127.0.0.1:8081'
    // axios.defaults.baseURL = 'http://172.20.10.4:8081'

// 前置拦截
axios.interceptors.request.use(config => {
    return config
})

// 后置拦截
axios.interceptors.response.use(response => {
        let res = response.data

        console.log("===============")
        console.log(res)
        console.log("===============")

        if (res.code === 200) {
            Element.Message({
                showClose: true,
                message: response.data.message,
                type: 'success',
                duration: 2000
            })
            return response
        } else if (res.code === 201) {
            return response
        } else if (res.code / 100 === 4){
            Element.Message({
                showClose: true,
                message: response.data.message,
                type: 'error',
                duration: 2000
            })
            console.log("response")
            return Promise.reject(response.data.message)
        }
    },
    error => {
        console.log(error)
        if (error.response.status === 401) {
            store.commit('REMOVE_INFO')
            router.push('/login')
        } else {
            error.message
        }
        Element.Message({
            showClose: true,
            message: error.response.data.message,
            type: 'error',
            duration: 2000
        });
        console.log("error")
        return Promise.reject(error)

    })