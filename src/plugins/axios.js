import Vue from 'vue'
import axios from 'axios'

// axios.defaults.baseURL = 'https://crud-vue-mp.firebaseio.com/'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'https://jsonbox.io/box_988db55c0b89307b871e/'
        })
        //Interceptar o metodo que esta sendo enviado
        // Vue.prototype.$http.interceptors.request.use(config => {
        //     console.log(config.method)
        //     return config
        // })
    }
})