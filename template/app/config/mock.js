/* eslint-disable no-unused-expressions */
const MockData = require('webpack-dev-server-ssoproxy-minxing/MockData');
// const {itemsBuilder} = require('webpack-dev-server-ssoproxy-minxing/helpers');
const path = require('path');
const chai = require('chai');
module.exports = new MockData(path.resolve(__dirname, 'mock.conf.json'), [{
    runAs: 'interceptor', // null | 'interceptor' | 'interpolator'
    method: 'get',
    urlPattern: '/mxapproval/api_admin/v2/approval/oauth/domainIds',
    data(req, Mock/* , mockConf */){
        chai.expect(req.query.domain_id).to.be.undefined;
        return {
            message: 'OK',
            code: 0,
            data: [{
                'id': '@INCREMENT',
                'name': '@CNAME(3)',
                'children|2-16': [{
                    id: '@INCREMENT',
                    name: '@CNAME(3)',
                    children: Mock.Random.boolean() ?
                        Mock.mock({
                            '_V_NODE_KEY_|3-8': [{
                                id: '@INCREMENT',
                                name: '@CNAME(3)'
                            }]
                        })._V_NODE_KEY_ :
                        []
                }]
            }]
        };
    }
}, {
    runAs: 'interceptor', // null | 'interceptor' | 'interpolator'
    method: 'get',
    urlPattern: '/websocket/test',
    data(req, msg/* , Mock, mockConf */){
        return 'OK. I\'ve received it.';
    }
}]);
