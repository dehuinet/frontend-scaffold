import moment from 'moment';
moment.locale('zh');
export default {
    install(Vue: Vue.VueConstructor): void{
        Vue.prototype.$moment = moment;
    }
};
