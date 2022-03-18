import mobileLog from 'mx-general.macros/dist/log-sync.macro';
// =========== Vue Launcher ===========
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import {Plugin as FragmentPlugin} from 'vue-fragment';
import isMobile from 'ismobilejs';
import App from './App.vue';
import router from './router';
import axiosPlugin from './axios';
import vantPlugin from './vant';
import store from './store';
import moment from './moment';
import {mobileUtils} from './store/utils';

const machine = isMobile(navigator.userAgent);
if (machine.apple.device) {
    document.documentElement.style.webkitUserSelect = 'none';
    document.documentElement.style.webkitTouchCallout = 'none';
    document.documentElement.classList.add('iphone-device');
}

Vue.config.productionTip = false;
Vue.config.performance = process.env.NODE_ENV !== 'production';

Vue.use(VueCompositionApi);
Vue.use(FragmentPlugin);
Vue.use(vantPlugin);
Vue.use(moment);
Vue.use(axiosPlugin);

// =========== Vue Launcher ===========
new Vue({
    router,
    store,
    components: {App},
    template: '<App />'
}).$mount('#app');

mobileUtils.waitUtilContextReady.then(() => {
    window.dispatchEvent(new CustomEvent('mx-console.show.by.gesture'));
});
window.addEventListener('resize', () => {
    const dom = document.querySelector('html');
    if (dom) {
        if (window.innerHeight / screen.availHeight < .75) {
            dom.classList.add('virtual-keyboard');
        } else {
            dom.classList.remove('virtual-keyboard');
        }
    }
    store.commit('setWindowSize', {
        width: window.innerWidth,
        height: window.innerHeight
    });
});
