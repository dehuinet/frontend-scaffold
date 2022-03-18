/* cordova context 在 Web Worker 内，并不可以访问。
   importScripts('./worker-prepare.js', './cordova.js?mxinject'); */
interface Wrapper {
    id: number;
    data?: unknown;
}
interface Member {
    children: unknown[];
}
self.addEventListener('message', event => {
    const {id, data: {action, data/* , extraData */}} = event.data;
    const wrapper: Wrapper = {id};
    if (action === 'sum+member+count') {
        const data_ = data as Member[];
        const reduce = (sum: number, element: Member): number => {
            if (Array.isArray(element.children)) {
                sum += element.children.reduce(reduce, 0);
            }
            return sum + 1;
        };
        const sum = data_.reduce(reduce, 0);
        wrapper.data = {sum};
    }
    self.postMessage(wrapper);
});
