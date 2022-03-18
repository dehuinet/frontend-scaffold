import mobileLog from 'mx-general.macros/dist/log-sync.macro';
import {ajaxGet} from './utils';
interface DomainIdsRes {
    message: string;
    data: Vuex.Domain[];
}
export const getDomainIds = ({commit}: Vuex.ActionContext<Vuex.State, Vuex.State>/* , payload */): Promise<Vuex.Domain[]> => ajaxGet<DomainIdsRes>('/mxapproval/api_admin/v2/approval/oauth/domainIds').then(response => {
    if (response.data.message === 'OK') {
        const {data: {data: result}} = response;
        mobileLog.info('/mxapproval/api_admin/v2/approval/oauth/domainIds', result);
        commit('setDomains', result);
        return result;
    }
    throw response.data.message;
});
