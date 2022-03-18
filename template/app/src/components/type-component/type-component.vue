<template>
    <div>
        <van-cell-group v-if="paramsInfo.formType === 'input'">
            <van-cell :title="paramsInfo.key" :label="paramsInfo.description" />
            <van-field v-model="paramsInfo.value" :required="paramsInfo.required" clearable
                :placeholder="paramsInfo.description" />
        </van-cell-group>

        <van-cell-group v-if="paramsInfo.formType === 'switch'">
            <van-switch-cell v-model="paramsInfo.value" :title="paramsInfo.key" />
        </van-cell-group>

        <van-cell-group v-if="paramsInfo.formType === 'checkbox'">
            <van-cell :title="paramsInfo.key" :label="paramsInfo.description" />
            <van-checkbox-group v-model="paramsInfo.value">
                <van-checkbox v-for="(item) in paramsInfo.options" :key="item.value" :name="item.value">
                    <div v-html="`${item.description} || ${item.value}`"></div>
                </van-checkbox>
            </van-checkbox-group>
        </van-cell-group>

        <van-cell-group v-if="paramsInfo.formType === 'radio'">
            <van-cell :title="paramsInfo.key" :label="paramsInfo.description" />
            <van-radio-group v-model="paramsInfo.value">
                <van-radio v-for="(item, index) in paramsInfo.options" :key="index" :name="item.value">
                    <div v-html="item.description"></div>
                </van-radio>
            </van-radio-group>
        </van-cell-group>

        <van-cell-group v-if="paramsInfo.formType === 'slider'">
            <van-cell :title="paramsInfo.key" :label="paramsInfo.description" />
            <van-slider v-model="paramsInfo.value" :min="paramsInfo.min" :max="paramsInfo.max" active-color="#2196f3"
                bar-height="4px" class="slider">
                <div slot="button" class="custom-button" v-html="paramsInfo.value"></div>
            </van-slider>
        </van-cell-group>

    </div>
</template>

<script>
    import { Field, Checkbox, CheckboxGroup, Slider, RadioGroup, Radio, SwitchCell } from 'vant';
    import Vue from 'vue';
    Vue.use(Field);
    Vue.use(Checkbox);
    Vue.use(CheckboxGroup);
    Vue.use(Slider);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(SwitchCell);

    export default {
        props: {
            apiKey: {
                default: ""
            },
            paramsInfo: {
                default: {}
            }
        },
        created() {
            console.log("paramsInfo =>" + JSON.stringify(this.paramsInfo));
        },
        data() {
            return {
                params: "",
                open: false
            };
        },
        methods: {
            itemChange(value) {
                if (this.isLegal(value)) {
                    this.$emit("handleChange", this.apiKey, this.params);
                    // if (value != "") {
                    //   this.$emit("handleChange", JSON.parse(value), this.apiKey);
                    // } else if (this.paramsInfo.range) {
                    //   this.$emit("handleChange", this.params, this.apiKey);
                    // } else if (
                    //   this.paramsInfo.type.indexOf("Array") != -1 &&
                    //   this.params !== null
                    // ) {
                    //   this.$emit("handleChange", this.params.split(","), this.apiKey);
                    // }
                }
            },

            isLegal(value) {
                if (value == "") {
                    if (this.paramsInfo["type"].indexOf("Array<number>") != -1) {
                        this.params
                            .replace(/，/g, ",")
                            .split(",")
                            .forEach(el => {
                                if (!this.isNumber(el)) {
                                    return false;
                                }
                            });
                    } else if (this.paramsInfo["type"].indexOf("number") != -1) {
                        if (!this.isNumber(this.params)) {
                            return false;
                        }
                    }
                    return true;
                } else {
                    return true;
                }
            },

            isNumber(el) {
                if (!/^[0-9]*$/.test(el)) {
                    alert(`${this.name}的类型只能是number！`);
                    return false;
                }

                return true;
            },

            check(value) {
                if (Object.prototype.toString.call(this.params) != "[object Array]") {
                    this.params = [];
                }
                if (this.params.includes(value)) {
                    let idx = this.params.indexOf(value);
                    this.params.splice(idx, 1);
                } else {
                    this.params.push(value);
                }
                this.emit();
            },

            closeBottomSheet() {
                this.open = false;
            },
            openBotttomSheet() {
                this.open = true;
            }
        }
    };
</script>

<style scoped>
    .slider {
        margin-bottom: 10px;
    }

    .custom-button {
        width: 26px;
        color: #FFF;
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        background-color: #2196F3;
        border-radius: 100px;
    }
</style>