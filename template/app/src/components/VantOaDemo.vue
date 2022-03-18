<template>
    <fragment>
        <van-cell-group>
            <van-cell v-for="domain of domains" :key="domain.id" :title="domain.title"
                      :icon="domain.src" :label="domain.desc" center clickable
                      @click="onClick(domain)" />
        </van-cell-group>
        <h6>页脚</h6>
    </fragment>
</template>
<script lang="ts">
import Vue from 'vue';
import mobileLog from 'mx-general.macros/dist/log-sync.macro';
import {mxApis} from '../store/utils';
interface Domain {
    title: string;
    desc?: string;
    src?: string;
}
export default Vue.extend({
    name: 'VantOaDemo',
    data(){
        return {
            currentUser: null
        };
    },
    computed: {
        domains(): Domain[]{
            const append = (list: Domain[], domain: Vuex.Domain): Domain[] => {
                list.push({
                    title: domain.name
                });
                if (domain.children) {
                    list.push(...domain.children.reduce(append, []));
                }
                return list;
            };
            const rs: Domain[] = this.$store.state.domains.reduce(append, []);
            if (this.currentUser) {
                rs.unshift({
                    title: this.currentUser.name,
                    desc: `${this.currentUser.dept_name} - ${this.currentUser.mobile}`,
                    src: this.currentUser.avatar_url
                });
            }
            return rs;
        }
    },
    methods: {
        async onClick(domain): Promise<void>{
            mobileLog.log('选中', domain);
            await alertAsync(`选中 ${domain.title}`);
            throw new Error(`选中 ${domain.title}`);
        }
    },
    async mounted(){
        const [user, token] = await Promise.all([
            mxApis.currentUser,
            mxApis.getSSOToken('survey')
        ]);
        mobileLog.log('currentUser', user);
        this.currentUser = user;
        await alertAsync(`SSO Token: ${token}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        await alertAsync(`NODE_ENV: ${process.env.NODE_ENV}`);
    }
});
</script>
<style lang="less" scoped>
/* nothing */
</style>
