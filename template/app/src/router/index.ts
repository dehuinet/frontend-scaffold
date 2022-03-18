import 'core-js/es/promise';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'VantCaDemo',
            component(): Promise<Vue.Import>{
                return import(/* webpackChunkName: "VantCaDemo" */'@/components/VantCaDemo.vue');
            }
        }, {
            path: '/oa',
            name: 'VantOaDemo',
            component(): Promise<Vue.Import>{
                return import(/* webpackChunkName: "VantOaDemo" */'@/components/VantOaDemo.vue');
            }
        }
    ]
});
