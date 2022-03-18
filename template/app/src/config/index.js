/* eslint-disable */
      const apiJson = [{"apiName":"chat","apiCategory":"通用","apiKeyWords":"聊天，发起聊天","apiTitle":"向用户发起聊天接口","params":[{"key":"loginNames","type":"Array<string>","defaultValue":[],"description":"用户的登录名数组"}],"apiNamespace":"MXChat"},{"apiName":"ajax","apiCategory":"ajax相关","apiKeyWords":"ajax,请求","apiTitle":"发起AJAX请求(远程地址的API)","params":[{"key":"params","type":"interface<Params>"}],"interface":{"Params":{"type":{"type":"enum<ApiType>","description":"发起请求的方式","defaultValue":"GET"},"url":{"type":"string","description":"发起请求API的链接","defaultValue":"/api/v1/users?limit=1","required":true},"dataType":{"type":"string","description":"???","defaultValue":""},"async":{"type":"boolean","description":"请求是否异步","defaultValue":true},"complete":{"type":"success","responseType":"object","description":"请求结束的回调（无论是否出错）"},"success":{"type":"success","description":"函数成功的回调(返回类型取决于你调的API)","responseType":"object"},"error":{"type":"fail","description":"函数失败的回调","responseType":"object"}}},"enum":{"ApiType":[{"description":"GET","value":"GET"},{"description":"POST","value":"POST"},{"description":"PUT","value":"PUT"},{"description":"DELETE","value":"DELETE"}]},"apiNamespace":"MXCommon"},{"apiName":"getClientInfo","apiCategory":"通用","apiKeyWords":"版本,客户端,信息","apiTitle":"获取客户端相关信息","params":[{"key":"params","type":"interface<Params>"}],"interface":{"Params":{"onSuccess":{"type":"success","description":"函数成功的回调","responseType":"object"}}},"apiNamespace":"MXCommon"},{"apiName":"getSSOToken","apiCategory":"通用","apiKeyWords":"sso,token","apiTitle":"根据AppID获取当前用户的sso_token接口","params":[{"key":"APP_ID","type":"string","description":"应用ID","defaultValue":"","required":true},{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"string"}],"apiNamespace":"MXCommon"},{"apiName":"getServerUrl","apiCategory":"通用","apiKeyWords":"服务器,url,地址","apiTitle":"获取服务器地址接口","params":[{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"string"}],"apiNamespace":"MXCommon"},{"apiName":"getCurrentUser","apiCategory":"通用","apiKeyWords":"用户，当前用户","apiTitle":"获取当前用户数据接口","params":[{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"string"}],"apiNamespace":"MXCommon"},{"apiName":"download","apiCategory":"通用","apiKeyWords":"下载，下载附件","apiTitle":"点击下载附件接口","params":[{"key":"url","type":"string","description":"要下载的附件地址","defaultValue":"","required":true},{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"object"},{"key":"onError","type":"fail","description":"函数失败的回调","responseType":"object"}],"apiNamespace":"MXCommon"},{"apiName":"getPersonInfo","apiCategory":"通用","apiKeyWords":"用户，信息，用户信息","apiTitle":"获取用户信息","params":[{"key":"loginName","type":"string","description":"要获取的用户的登录名","defaultValue":"","required":true},{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"object"}],"apiNamespace":"MXCommon"},{"apiName":"viewPersonInfo","apiCategory":"通用","apiKeyWords":"用户，用户信息","apiTitle":"查看用户信息","params":[{"key":"loginName","type":"string","description":"实际登陆用户的登录名","defaultValue":"","required":true},{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"object"},{"key":"onError","type":"fail","description":"函数失败的回调","responseType":"object"}],"apiNamespace":"MXCommon"},{"apiName":"call","apiCategory":"通用","apiKeyWords":"呼叫，联系","apiTitle":"联系，打电话","params":[{"key":"number","type":"number","description":"要呼叫用户的电话","defaultValue":"","required":true}],"apiNamespace":"MXCommon"},{"apiName":"scanQRCode","apiCategory":"扫一扫","apiKeyWords":"扫一扫","apiTitle":"调起敏行扫一扫接口","params":[{"key":"needResult","type":"boolean","description":"扫描结果是否由敏行处理","defaultValue":false},{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"object"},{"key":"onError","type":"fail","description":"函数失败的回调","responseType":"object"}],"apiNamespace":"MXCommon"},{"apiName":"lanuchApp","apiCategory":"应用交互","apiKeyWords":"应用，交互，应用交互","apiTitle":"根据appid启动应用接口","params":[{"key":"appID","type":"string","description":"这里的appid为创建应用时的应用id","defaultValue":"","required":true},{"key":"params","type":"string","defaultValue":"","description":"参数，可以将其传递到将要启动的插件应用的url上","required":true},{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"object"},{"key":"onError","type":"fail","description":"函数失败的回调","responseType":"object"}],"apiNamespace":"MXCommon"},{"apiName":"uploadImage","apiCategory":"文件","apiKeyWords":"文件，上传","apiTitle":"上传图片接口","description":" 注意: 调用上传接口前需调用上面的三个接口中的一个，以确保获取到'localId'，这样才能进行上传","params":[{"key":"localId","type":"string","description":"图片的本地localId","defaultValue":"","required":true},{"key":"isShowSchedule","type":"boolean","description":"是否显示进度条","defaultValue":false,"required":true},{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"object"},{"key":"onError","type":"fail","description":"函数失败的回调","responseType":"object"}],"apiNamespace":"MXCommon"},{"apiName":"browseImages","apiCategory":"文件","apiKeyWords":"图片，预览","apiTitle":"预览图片","params":[{"key":"localId","type":"string","description":"图片的本地localId","defaultValue":"","required":true},{"key":"isSave","type":"boolean","description":"预览的图片是否保存在本地","defaultValue":false}],"apiNamespace":"MXCommon"},{"apiName":"openUrlPage","apiCategory":"通用","apiKeyWords":"打开，网页，web","apiTitle":"打开一个新窗口","params":[{"key":"url","type":"string","description":"要打开窗口的url","required":true,"defaultValue":""}],"apiNamespace":"MXCommon"},{"apiName":"getWaterMarkUrl","apiCategory":"通用","apiKeyWords":"水印，地址，url","apiTitle":"获取水印的url","params":[{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"string"}],"apiNamespace":"MXCommon"},{"apiName":"addEventListener","apiCategory":"截屏","apiKeyWords":"开始截屏","apiTitle":"开始截屏","params":[{"key":"params","type":"interface<Params>"}],"interface":{"Params":{"eventType":{"type":"string","description":"传的参数，使用时定义","defaultValue":""},"onSuccess":{"type":"success","description":"函数成功的回调","responseType":"object"},"onFail":{"type":"fail","description":"函数失败的回调","responseType":"object"}}},"apiNamespace":"MXCommon"},{"apiName":"removeEventListener","apiCategory":"截屏","apiKeyWords":"结束截屏","apiTitle":"结束截屏","description":" 结束截屏","params":[{"key":"params","type":"interface<Params>"}],"interface":{"Params":{"eventType":{"type":"string","description":"传的参数，使用时定义","defaultValue":""},"onSuccess":{"type":"success","description":"函数成功的回调","responseType":"object"},"onFail":{"type":"fail","description":"函数失败的回调","responseType":"object"}}},"apiNamespace":"MXCommon"},{"apiName":"enableWebViewScreenShot","apiCategory":"截屏","apiKeyWords":"允许截屏","apiTitle":"允许截屏","description":" 允许截屏，只有安卓系统存在这个接口","params":[{"key":"params","type":"interface<Params>"}],"interface":{"Params":{"onSuccess":{"type":"success","description":"函数成功的回调","responseType":"object"},"onFail":{"type":"fail","description":"函数失败的回调","responseType":"object"}}},"apiNamespace":"MXCommon"},{"apiName":"disableWebViewScreenShot","apiCategory":"截屏","apiKeyWords":"禁止截屏","apiTitle":"禁止截屏","description":" 禁止截屏，只有安卓系统存在这个接口","params":[{"key":"params","type":"interface<Params>"}],"interface":{"Params":{"onSuccess":{"type":"success","description":"函数成功的回调","responseType":"object"},"onFail":{"type":"fail","description":"函数失败的回调","responseType":"object"}}},"apiNamespace":"MXCommon"},{"apiName":"chooseFile","apiCategory":"文件","apiKeyWords":"选文件,照相机,相册","apiTitle":"获取文件API","params":[{"key":"count","type":"number","description":"选择照片的个数","range":[1,9],"defaultValue":1,"required":true},{"key":"source","type":"Array<enum<Source>>","description":"选择照片的来源","defaultValue":[],"required":true},{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"object"},{"key":"onError","type":"fail","description":"函数失败后的回调","responseType":"object"}],"enum":{"Source":[{"description":"媒体库","value":"album"},{"description":"相机","value":"camera"}]},"apiNamespace":"MXCommon"},{"apiName":"selectUser","apiCategory":"通用","apiKeyWords":"选人, 人","apiTitle":"获取通讯录人员及部门数据接口(单选)","apiDescription":"部门选人","params":[{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"object"},{"key":"enableSelectDept","type":"boolean","description":"是否可以选中部门","defaultValue":true},{"key":"cutomDeptReferencesIDS","type":"Array<string>","description":"自定义部门id","defaultValue":null},{"key":"personalContactEnable","type":"boolean","description":"是否可以选中常用联系人","defaultValue":true},{"key":"canSelectSelf","type":"boolean","description":"是否可以选中自己","defaultValue":false},{"key":"selectedUsers","type":"Array<number>","description":"已经选择的人员id","defaultValue":null},{"key":"adminPermission","type":"boolean","description":"是否开启权限认证","defaultValue":true}],"apiNamespace":"MXContacts"},{"apiName":"selectUser","apiCategory":"通用","apiKeyWords":"选人, 人","apiTitle":"获取通讯录人员及部门数据接口(单选,对象参数)","apiDescription":"部门选人","params":[{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"object"},{"key":"enableSelectDept","type":"boolean","description":"是否可以选中部门","defaultValue":true},{"key":"cutomDeptReferencesIDS","type":"Array<string>","description":"自定义部门id","defaultValue":null},{"key":"personalContactEnable","type":"boolean","description":"是否可以选中常用联系人","defaultValue":true},{"key":"canSelectSelf","type":"boolean","description":"是否可以选中自己","defaultValue":false},{"key":"selectedUsers","type":"Array<number>","description":"已经选择的人员id","defaultValue":null},{"key":"adminPermission","type":"boolean","description":"是否开启权限认证","defaultValue":true}],"apiNamespace":"MXContacts"},{"apiName":"selectUsers","apiCategory":"通用","apiKeyWords":"选人, 多选","apiTitle":"获取通讯录人员及部门数据接口(多选)","params":[{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"object"},{"key":"enableSelectDept","type":"boolean","description":"是否可以选中部门","defaultValue":true},{"key":"cutomDeptReferencesIDS","type":"Array<string>","description":"自定义部门id","defaultValue":null},{"key":"personalContactEnable","type":"boolean","description":"是否可以选中常用联系人","defaultValue":true},{"key":"canSelectSelf","type":"boolean","description":"是否可以选中自己","defaultValue":false},{"key":"selectedUsers","type":"Array<number>","description":"已经选择的人员id","defaultValue":null},{"key":"adminPermission","type":"boolean","description":"是否开启权限认证","defaultValue":true}],"apiNamespace":"MXContacts"},{"apiName":"showFaceInformation","apiCategory":"人脸","apiKeyWords":"人脸注册","apiTitle":"人脸注册","params":[{"key":"params","type":"interface<Params>"}],"interface":{"Params":{"userName":{"type":"string","description":"姓名","defaultValue":"","required":true},"documentType":{"type":"enum<DocumentType>","description":"证件类型","defaultValue":"1"},"documentNum":{"type":"string","description":"证件号码","defaultValue":""},"success":{"type":"success","description":"函数成功的回调","responseType":"object"},"error":{"type":"fail","description":"函数失败的回调","responseType":"object"}}},"enum":{"DocumentType":[{"description":"无证件","value":"0"},{"description":"居民身份证","value":"1"},{"description":"户口簿","value":"2"},{"description":"护照","value":"3"},{"description":"军人证","value":"4"},{"description":"港澳台通行证","value":"5"},{"description":"武警身份证","value":"6"},{"description":"边民出入境通行证","value":"7"},{"description":"士兵证","value":"14"},{"description":"其他","value":"21"},{"description":"员工号","value":"99"}]},"apiNamespace":"MXFaceRecognition"},{"apiName":"faceRegistrationSearch","apiCategory":"人脸","apiKeyWords":"人脸注册信息查询","apiTitle":"人脸注册信息查询","params":[{"key":"params","type":"interface<Params>"}],"interface":{"Params":{"userName":{"type":"string","description":"姓名","defaultValue":"","required":true},"documentType":{"type":"enum<DocumentType>","description":"证件类型","defaultValue":"1"},"documentNum":{"type":"string","description":"证件号码","defaultValue":""},"success":{"type":"success","description":"函数成功的回调","responseType":"object"},"error":{"type":"fail","description":"函数失败的回调","responseType":"object"}}},"enum":{"DocumentType":[{"description":"无证件","value":"0"},{"description":"居民身份证","value":"1"},{"description":"户口簿","value":"2"},{"description":"护照","value":"3"},{"description":"军人证","value":"4"},{"description":"港澳台通行证","value":"5"},{"description":"武警身份证","value":"6"},{"description":"边民出入境通行证","value":"7"},{"description":"士兵证","value":"14"},{"description":"其他","value":"21"},{"description":"员工号","value":"99"}]},"apiNamespace":"MXFaceRecognition"},{"apiName":"showFaceContrast","apiCategory":"人脸","apiKeyWords":"人脸对比","apiTitle":"人脸对比","params":[{"key":"params","type":"interface<Params>"}],"interface":{"Params":{"userName":{"type":"string","description":"姓名","defaultValue":"","required":true},"documentType":{"type":"enum<DocumentType>","description":"证件类型","defaultValue":"1"},"documentNum":{"type":"string","description":"证件号码","defaultValue":""},"success":{"type":"success","description":"函数成功的回调","responseType":"object"},"error":{"type":"fail","description":"函数失败的回调","responseType":"object"}}},"enum":{"DocumentType":[{"description":"无证件","value":"0"},{"description":"居民身份证","value":"1"},{"description":"户口簿","value":"2"},{"description":"护照","value":"3"},{"description":"军人证","value":"4"},{"description":"港澳台通行证","value":"5"},{"description":"武警身份证","value":"6"},{"description":"边民出入境通行证","value":"7"},{"description":"士兵证","value":"14"},{"description":"其他","value":"21"},{"description":"员工号","value":"99"}]},"apiNamespace":"MXFaceRecognition"},{"apiName":"getLocation","apiCategory":"地理位置相关","apiKeyWords":"GPS,定位，地理位置","apiTitle":"获取地理位置接口","params":[{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"object"},{"key":"onError","type":"fail","description":"函数失败后的回调","responseType":"object"},{"key":"isGpsOnly","type":"boolean","description":"是否仅用GPS定位","defaultValue":false}],"apiNamespace":"MXLocation"},{"apiName":"shareToChat","apiCategory":"分享","apiKeyWords":"分享，分享到敏行，自定义","apiTitle":"分享到敏信及自定义分享内容接口","params":[{"key":"title","type":"string","defaultValue":"","description":"分享的标题"},{"key":"image_url","type":"string","defaultValue":"","description":"缩略图的url"},{"key":"url","type":"string","defaultValue":"","description":"分享的url"},{"key":"app_url","type":"string","defaultValue":"","description":"app_url,原生的页面。如果是分享的html页面，该字段设置为空"},{"key":"description","type":"string","defaultValue":"","description":"分享的描述"},{"key":"source_id","type":"string","defaultValue":"","description":"资源id,比如应用商店中的应用的id,或者公众号的id"},{"key":"source_type","type":"Array<enum<Source>>","defaultValue":[],"description":"ocu-公众号  app-应用商店里的应用"},{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"object"}],"enum":{"Source":[{"description":"公众号","value":"ocu"},{"description":"应用商店里的应用","value":"app"}]},"apiNamespace":"MXShare"},{"apiName":"shareToCircle","apiCategory":"分享","apiKeyWords":"分享，分享到工作圈，自定义","apiTitle":"分享到工作圈及自定义分享内容接口","params":[{"key":"title","type":"string","defaultValue":"","description":"分享的标题"},{"key":"image_url","type":"string","defaultValue":"","description":"缩略图的url"},{"key":"url","type":"string","defaultValue":"","description":"分享的url"},{"key":"app_url","type":"string","defaultValue":"","description":"app_url,原生的页面。如果是分享的html页面，该字段设置为空"},{"key":"description","type":"string","defaultValue":"","description":"分享的描述"},{"key":"source_id","defaultValue":"","type":"string","description":"资源id,比如应用商店中的应用的id,或者公众号的id"},{"key":"source_type","type":"Array<enum<Source>>","defaultValue":[],"description":"ocu-公众号  app-应用商店里的应用"},{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"object"}],"enum":{"Source":[{"description":"公众号","value":"ocu"},{"description":"应用商店里的应用","value":"app"}]},"apiNamespace":"MXShare"},{"apiName":"hideOptionMenu","apiCategory":"界面相关","apiKeyWords":"界面，分享，隐藏","apiTitle":"隐藏右上角分享按钮接口","params":[],"apiNamespace":"MXWebui"},{"apiName":"showOptionMenu","apiCategory":"界面相关","apiKeyWords":"界面，分享，显示","apiTitle":"显示右上角分享按钮接口","params":[],"apiNamespace":"MXWebui"},{"apiName":"setCustomHeaderMenu","apiCategory":"界面相关","apiKeyWords":"自定义，文字","apiTitle":"自定义右上角显示文字","params":[{"key":"CustomMenu","type":"string","description":"右上角显示文字","defaultValue":"[{ title: '刷新', key: 'refresh', icon: '' }]","required":true}],"apiNamespace":"MXWebui"},{"apiName":"setWebViewTitle","apiCategory":"界面相关","apiKeyWords":"自定义，标题栏","apiTitle":"设置页面上部标题栏","params":[{"key":"Title","type":"string","description":"标题栏显示文字","defaultValue":"","require":true}],"apiNamespace":"MXWebui"},{"apiName":"showWebViewTitle","apiCategory":"界面相关","apiKeyWords":"显示，标题栏","apiTitle":"显示页面上部标题栏接口","params":[{"key":"Title","type":"string","description":"标题栏显示文字","defaultValue":""}],"apiNamespace":"MXWebui"},{"apiName":"hideToolbar","apiCategory":"界面相关","apiKeyWords":"界面，工具栏，隐藏","apiTitle":"隐藏页面下部工具栏接口","params":[],"apiNamespace":"MXWebui"},{"apiName":"showToolbar","apiCategory":"界面相关","apiKeyWords":"界面，工具栏，显示","apiTitle":"显示页面下部工具栏接口","params":[],"apiNamespace":"MXWebui"},{"apiName":"closeWindow","apiCategory":"界面相关","apiKeyWords":"界面，关闭","apiTitle":"关闭当前页面","params":[],"apiNamespace":"MXWebui"},{"apiName":"disableBackKey","apiCategory":"界面相关","apiKeyWords":"界面，禁用，安卓，back","apiTitle":"禁用安卓back键","params":[],"apiNamespace":"MXWebui"},{"apiName":"setNavBgColor","apiCategory":"界面相关","apiKeyWords":"导航栏，背景颜色，设置","apiTitle":"设置导航栏背景颜色接口","params":[{"key":"bgcolor","type":"string","description":"导航栏背景颜色","defaultValue":""}],"apiNamespace":"MXWebui"},{"apiName":"setPopupMenuBgColor","apiCategory":"界面相关","apiKeyWords":"菜单，右上角， 背景颜色，设置","apiTitle":"设置右上角菜单背景颜色接口","params":[{"key":"bgcolor","type":"string","description":"右上角菜单背景颜色","defaultValue":""}],"apiNamespace":"MXWebui"},{"apiName":"getCurrentBSSID","apiCategory":"通用","apiKeyWords":"wifi，mac，客户端","apiTitle":"获取客户端连接wifi的mac地址","params":[{"key":"onSuccess","type":"success","description":"函数成功的回调","responseType":"object"}],"apiNamespace":"WifiWizard"}];
      export default apiJson;
