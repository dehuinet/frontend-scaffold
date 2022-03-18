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
import {computed, defineComponent, onMounted, ref} from '@vue/composition-api';
import mobileLog from 'mx-general.macros/dist/log-sync.macro';
import {mxApis} from '../store/utils';
interface Domain {
    title: string;
    desc?: string;
    src?: string;
}
export default defineComponent({
    name: 'VantCaDemo',
    setup(props, context){
        const store = context.parent.$store;
        const append = (list: Domain[], domain: Vuex.Domain): Domain[] => {
            list.push({
                title: domain.name
            });
            if (domain.children) {
                list.push(...domain.children.reduce(append, []));
            }
            return list;
        };
        // data
        const currentUser = ref(null);
        // computed
        const domains = computed((): Domain[] => {
            const rs = store.state.domains.reduce(append, []);
            if (currentUser.value) {
                rs.unshift({
                    title: currentUser.value.name,
                    desc: `${currentUser.value.dept_name} - ${currentUser.value.mobile}`,
                    src: currentUser.value.avatar_url
                });
            }
            return rs;
        });
        // lifecycles
        onMounted(async () => {
            const [user, token] = await Promise.all([
                mxApis.currentUser,
                mxApis.getSSOToken('survey')
            ]);
            mobileLog.log('currentUser', user);
            currentUser.value = user;
            await alertAsync(`SSO Token: ${token}`);
            await new Promise(resolve => setTimeout(resolve, 500));
            await alertAsync(`NODE_ENV: ${process.env.NODE_ENV}`);
        });
        return {
            // data
            currentUser,
            // computed
            domains,
            // methods
            async onClick(domain): Promise<void>{
                mobileLog.log('选中', domain);
                await alertAsync(`选中 ${domain.title}`);
                throw new Error(`选中 ${domain.title}`);
            }
        };
    }
});
</script>
<style lang="less" scoped>
/* nothing */
</style>
