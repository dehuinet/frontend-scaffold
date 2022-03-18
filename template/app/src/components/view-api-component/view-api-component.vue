<template>
    <div>
        <div v-if="api.apiDescription" v-html="api.apiDescription"></div>
        <type-component v-for="(item, index) in paramsList" :key="index" v-if="item.type" @handleChange="handleChange"
            :paramsInfo="item" :apiKey="item.key"></type-component>

        <div v-if="!api.params">该接口没有参数！</div>

        <div>
            <van-button @click="runCode" type="info">测试</van-button>
            <van-button @click="showCode" type="info">查看当前代码</van-button>

            <div v-if="isShow">
                <pre v-html="currentCode"></pre>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Button, Notify } from 'vant';
    import typeComponent from "../type-component/type-component.vue";
    Vue.use(Button);
    Vue.use(Notify);
    function isArray(sth) {
        return Object.prototype.toString.call(sth) === '[object Array]';
    }
    function isObj(sth) {
        return Object.prototype.toString.call(sth) === '[object Object]';
    }

    function isInterfaceParams(type) {
        return /interface<.*>$/i.test(type);
    }

    function getInterfaceName(type) {
        return type.replace(/interface</i, '').replace(/>$/, '');
    }

    function isEnumType(type) {
        return /enum<.*>$/i.test(type);
    }

    function getTypeInEnum(type) {
        return type.replace(/enum</i, '').replace(/>$/, '');
    }

    // 判断是否为数组类型
    function isArrayType(type) {
        return /array<.*>$/i.test(type);
    }

    // 获取数组那的类型
    function getTypeInArray(type) {
        return type.replace(/array</i, '').replace(/>$/, '');
    }

    // 是否为联合类型
    function isUnionType(type) {
        return /\|/.test(type);
    }

    // 是否为基础类型
    function isBaseType(type) {
        return ['string', 'boolean', 'number'].indexOf(type.toLocaleLowerCase()) > -1;
    }


    export default {
        props: ['api'],
        data() {
            return {
                params: [],
                paramsList: [],
                isShow: false,
                currentCode: '',
            };
        },
        components: {
            typeComponent
        },

        watch: {
            api: {
                immediate: true,
                handler(newVal) {
                    console.log(newVal, "newVal")
                    this.paramsList = this.dataToParams(newVal.params).map(item => ({
                        ...item,
                        ...this.addFormParams(item.type, item)
                    }));
                }
            }
        },
        methods: {
            dataToParams(initialParams) {
                const vm = this;
                return initialParams.reduce((acc, cur) => {
                    if (isInterfaceParams(cur.type)) {
                        return [...acc, ...vm.formatInterfaceParamsToArr(cur.type, vm.api.interface)]
                    }
                    return [...acc, {
                        ...cur,
                        value: vm.initValue(cur)
                    }];
                }, []);
            },

            formatInterfaceParamsToArr(type, _interface) {
                const interfaceName = getInterfaceName(type);
                const interfaceContent = _interface[interfaceName];
                if (isObj(interfaceContent)) {
                    return Object.keys(interfaceContent).map(key => ({
                        ...interfaceContent[key],
                        key,
                        value: this.initValue(interfaceContent[key])
                    }));
                }
            },
            initValue(params) {
                const { type, defaultValue } = params;
                if (!defaultValue) return defaultValue;
                if (isBaseType(type) || isEnumType(type)) {
                    return defaultValue;
                }
                if (isArrayType(type)) {
                    const typeInArray = getTypeInArray(type);
                    if (isBaseType(typeInArray)) {
                        return defaultValue.join(',');
                    } else {
                        return defaultValue;
                    }
                }
            },

            addFormParams(type, apiParams) {
                if (isBaseType(type)) {
                    if (type === 'boolean') {
                        return {
                            formType: 'switch'
                        }
                    }
                    if (apiParams.range) {
                        return {
                            formType: 'slider',
                            min: apiParams.range[0],
                            max: apiParams.range[1],
                        }
                    }
                    return {
                        formType: 'input',
                    }
                }
                if (isArrayType(type)) {
                    const typeInArray = getTypeInArray(type);
                    if (isEnumType(typeInArray)) {
                        const typeInEnum = getTypeInEnum(typeInArray);
                        return {
                            formType: 'checkbox',
                            options: this.api.enum[typeInEnum]
                        }
                    }
                    return this.addFormParams(typeInArray, apiParams);
                }

                if (isEnumType(apiParams.type)) {
                    const typeInEnum = getTypeInEnum(apiParams.type);
                    return {
                        formType: 'radio',
                        options: this.api.enum[typeInEnum]
                    }
                }
                return {};
            },
            formatResult(paramsItem, needFn) {
                if (['success', 'fail'].indexOf(paramsItem.type) > -1) {
                    if (needFn) {
                        return function (ret) {
                            if (paramsItem.responseType === 'object') {
                                alert(JSON.stringify(ret));
                            } else {
                                alert(ret)
                            }
                        };
                    }
                    return paramsItem.type === 'success' ? 'successFn' : 'failFn'
                }

                if (isArrayType(paramsItem.type)) {
                    let { value } = this.paramsList.find(item => item.key === paramsItem.key);
                    const typeInArray = getTypeInArray(paramsItem.type);
                    if (isBaseType(typeInArray)) {
                        value = value ? value.split(',') : [];
                        if (typeInArray === 'number') {
                            value = value.map(v => parseInt(v, 10));
                        }
                        return value;
                    }
                    return value;
                }
                if (isInterfaceParams(paramsItem.type)) {
                    const interfaceName = getInterfaceName(paramsItem.type);
                    const interfaceContent = this.api.interface[interfaceName];
                    const interfaceResult = Object.keys(interfaceContent).reduce((ret, key) => {
                        const { value } = this.paramsList.find(item => item.key === key);
                        if (['success', 'fail'].indexOf(interfaceContent[key].type) > -1 || (value !== undefined && value !== null)) {
                            ret[key] = this.formatResult({
                                ...interfaceContent[key],
                                key,
                            }, needFn);
                        }
                        return ret;
                    }, {});
                    return interfaceResult;
                }
                if (isBaseType(paramsItem.type) || isEnumType(paramsItem.type)) {
                    const { value } = this.paramsList.find(item => item.key === paramsItem.key);
                    return value;
                }
            },
            getResultArgs(needFn) {
                return this.api.params.reduce((acc, item) => {
                    return [...acc, this.formatResult(item, needFn)];

                }, []);
            },
            runCode() {
                const args = this.getResultArgs(true);
                if (window[this.api.apiNamespace] && window[this.api.apiNamespace][this.api.apiName]) {
                    window[this.api.apiNamespace][this.api.apiName](...args);

                } else {
                    Notify({ type: 'danger', message: `当前版本不存在${this.api.apiNamespace}.${this.api.apiName}方法！` });
                }
            },
            showCode() {

                this.isShow = !this.isShow;
                if (this.isShow) {
                    const args = this.getResultArgs(false);
                    this.currentCode =
                        `${this.api.apiNamespace}.${this.api.apiName}(${args.map(arg => {
                            if (isObj(arg)) {
                                return `${Object.keys(arg).reduce((retStr, key) => {
                                    return `${retStr}
    ${key}: ${arrOrBaseToString(arg[key])},`;
                                }, `{`)}
}`;
                            } else {
                                return arrOrBaseToString(arg);
                            }
                        })})`
                }
            },
            couldRun() {
                if (this.isArray(this.params)) {
                    this.api.params.forEach((el, index) => {
                        if (el.required) {
                            if (
                                this.isArray(this.params[index]) &&
                                this.params[index].length == 0
                            ) {
                                alert(`${el.key}是必填参数！`);
                                return false;
                            } else if (!this.params[index]) {
                                alert(`${el.key}是必填参数！`);
                                return false;
                            }
                        }
                    });
                } else {
                    for (let params in this.api.params) {
                        if (this.api.params[params].required) {
                            if (
                                this.isArray(this.params[params]) &&
                                this.params[params].length == 0
                            ) {
                                alert(`${params}是必填参数！`);
                                return false;
                            } else if (!this.params[params]) {
                                alert(`${params}是必填参数！`);
                                return false;
                            }
                        }
                    }
                }

                return true;
            },

            getCallBack(type, resType) {
                if (["success", "fail", "subscribe"].indexOf(type) != -1) {
                    console.log(type + resType);
                    if (resType.indexOf("Array") != -1 || resType.indexOf("object") != -1) {
                        return eval('res => alert(JSON.stringify(res))');
                        // 这里如果不用eval，查看代码打印出来会带一大串webpack的东西
                    } else {
                        return eval('res => alert(res)');
                    }
                } else {
                    return;
                }
            },

            handleChange(params, name, index) {
                console.log('params, name, index =>', params, name, index);
                // this.paramsList = this.paramsList.map(item => {
                //     return item.
                // })
            },

            isArray(obj) {
                return Object.prototype.toString.call(obj) === "[object Array]";
            }
        }
    };
    function arrOrBaseToString(arg) {
        if (isArray(arg)) {
            const content = arg.reduce((acc, cur) => {
                if (typeof cur === 'string') {
                    cur = `"${cur}"`;
                }
                return `${acc},${cur}`;
            }, '').replace(/^,/, '');
            return `[${content}]`;
        }
        if (typeof arg === 'string') {
            if (['successFn', 'failFn'].indexOf(arg) > -1) {
                return arg;
            }
            return `"${arg}"`;
        }
        return arg;
    }
</script>

<style scoped>
    .input-action {
        display: block;
        width: 30%;
    }

    .muse-item>>>.mu-item {
        padding: 0;
    }
</style>