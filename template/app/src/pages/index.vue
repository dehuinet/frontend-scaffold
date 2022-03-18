<template>
    <div>
        <div>
            <van-field v-model="search" placeholder="输入关键字进行搜索" />
        </div>
        <div class="types">
            <van-button size="small" style="margin-right: 5px;" type="info" v-for="(category, index) in apis_categories"
                :key="index" @click="category_fliter(category)" :text="category">
            </van-button>
        </div>

        <van-collapse v-model="activeNames" accordion>
            <van-collapse-item v-for="(api, index) in apiList" :title="`${api.apiName} || ${api.apiTitle}`"
                :name="`${api.apiName} || ${api.apiTitle}`" :key="index">
                <viewApiComponent :api="api" />
            </van-collapse-item>
        </van-collapse>
    </div>
</template>
<script>
    import viewApiComponent from '@/components/view-api-component/view-api-component';
    import apiJson from '@/config/index.js';
    import Vue from 'vue';
    import { Collapse, CollapseItem, Button, Field } from 'vant';

    Vue.use(Collapse);
    Vue.use(CollapseItem);
    Vue.use(Button);
    Vue.use(Field);
    export default {
        components: {
            viewApiComponent
        },
        data() {
            return {
                apis_categories: getCategories(apiJson),
                activeCategory: '',
                search: '',
                panel: '',
                activeNames: ''
            };
        },
        created() {
        },
        methods: {
            category_fliter(category) {
                if (this.activeCategory == category) {
                    this.activeCategory = '';
                } else {
                    this.activeCategory = category;
                }
            },
            toggle(panel) {
                this.panel = panel === this.panel ? '' : panel;
            }
        },
        computed: {
            apiList() {
                let apis = apiJson.filter(item => {
                    console.log("item", item)
                    const inCategory = this.activeCategory ? item.apiCategory === this.activeCategory : true;
                    const withSearch = this.search ? item.apiKeyWords.indexOf(this.search) > -1 : true;
                    return inCategory && withSearch;
                });
                return apis
            }
        }
    };

    function getCategories(apiJson) {
        let data = apiJson.map(item => item.apiCategory)
            .filter((item, idx, arr) => arr.indexOf(item) === idx);
        return data
    }
</script>

<style scoped>
    ul {
        list-style-type: none;
    }

    ul li {
        margin-top: 20px;
        border: 1px solid black;
    }

    .types {
        padding: 10px 20px;
    }
</style>