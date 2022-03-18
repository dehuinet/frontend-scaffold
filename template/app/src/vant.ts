import {Cell, CellGroup, Dialog} from 'vant';

export default {
    install(Vue: Vue.VueConstructor): void{
        Vue.use(Cell).use(CellGroup);
        window.alertAsync = (message, title = '提示'): Promise<DialogAction> => Dialog.alert({title, message, closeOnPopstate: true});
        window.confirmAsync = (message, title = '询问'): Promise<DialogAction> => Dialog.confirm({title, message});
    }
};
