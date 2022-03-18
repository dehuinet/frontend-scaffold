self.window = self;
self.window.Event = function () {};
self.window.prompt = function () {};
self.window.innerHeight = 1;
self.history = {};
self.document = {
    addEventListener: function () {
        self.addEventListener.apply(self, arguments);
    },
    querySelector: function () {},
    getElementsByTagName: function () {
        return [];
    },
    createElement: function () {
        return {
            pathname: "",
            setAttribute: function () {}
        };
    },
    createEvent: function () {
        return {
            initEvent: function () {}
        };
    },
    documentElement: {
        style: {
            transition: ""
        }
    },
    head: {
        children: [],
        appendChild: function (child) {
            importScripts(child.src);
            child.onload();
        }
    },
    body: {
        classList: {
            add: function () {}
        }
    },
    dispatchEvent: function(){
        self.dispatchEvent.apply(self, arguments);
    }
};
setTimeout(function(){
    self.dispatchEvent(new Event('online'));
}, 500);
setTimeout(function(){
    self.dispatchEvent(new Event('DOMContentLoaded'));
}, 1800);