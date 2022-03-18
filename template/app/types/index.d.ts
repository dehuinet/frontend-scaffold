declare module "*.vue" {
    import Vue, {ComponentOptions} from 'vue';
    const component: ComponentOptions<Vue>;
    export default component;
}
declare module "*.ico" {
    const content: string;
    export default content;
}
declare module "vue-fragment" {
    import Vue, {ComponentOptions, PluginObject} from 'vue';
    export const Fragment: ComponentOptions<Vue>;
    export const Plugin: PluginObject<never>;
    const obj: {
        Fragment: typeof Fragment,
        Plugin: typeof Plugin
    };
    export default obj;
}
interface Window {
    __mxMacroHooks__: MxMacroLogHooks;
}
type DialogAction = 'confirm' | 'cancel';
interface Window {
    alertAsync(message: string, title?: string): Promise<DialogAction>;
    confirmAsync(message: string, title?: string): Promise<DialogAction>;
}
declare function alertAsync(message: string, title?: string): Promise<DialogAction>;
declare function confirmAsync(message: string, title?: string): Promise<DialogAction>;
interface CSSStyleDeclaration {
    webkitTouchCallout: string;
}
interface Dictionary<T = string | (string | null)[] | null | undefined>{
    [key: string]: T;
}
interface Document {
    msHidden: boolean;
    webkitHidden: boolean;
}
declare namespace NodeJS {
    interface ProcessEnv {
        CHECKNUM: {
            timestamp: number;
            version: string;
            git: {
                branchName: string;
                tagName: string;
            }
        };
        NODE_ENV: 'production' | 'development' | 'test';
        baseURL: string;
        MACRO_LOG_PRE_PROCESSOR:string;
        MACRO_LOG_TRANSFORMER: string;
        MACRO_LOG_POST_PROCESSOR: string;
        RELEASE_VERSION: string;
        STATIC: string;
    }
}
