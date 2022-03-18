'use strict';

module.exports = {
    root: true,
    globals: {
        axios: false,
        elastic: false,
        MXCommon: false,
        process: false,
        require: false,
        WifiWizard: false,
        MXLocation: false,
        MXWebui: false,
        MXContacts: false,
        MXShare: false,
        MXChat: false,
        alertAsync: false,
        confirmAsync: false,
        $: false
    },
    extends: [
        'minxing/eslint-config-vue-ts.js'
    ],
    settings: {
        polyfills: [ // 添加 polyfill，请参考 https://github.com/amilajack/eslint-plugin-compat#adding-polyfills
            'CustomEvent',
            'document.hidden',
            'FormData',
            'Array.isArray',
            'Object.entries',
            'Object.assign',
            'screen.availHeight',
            'WeakSet',
            'Promise',
            'Reflect'
        ]
    },
    rules: {
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/unbound-method': 'off'
    }
};
