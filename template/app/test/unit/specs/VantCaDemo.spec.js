import Vue from 'vue';
import VantCaDemo from '@/components/VantCaDemo';

describe('VantCaDemo.vue', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(VantCaDemo);
        const vm = new Constructor().$mount();
        expect(vm.$el.querySelector('.hello h1').textContent)
            .to.equal('Welcome to Your Vue.js App');
    });
});
