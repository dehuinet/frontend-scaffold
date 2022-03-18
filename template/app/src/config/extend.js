var fs = require('fs')
fs.existsSync('index.js') && fs.unlinkSync('index.js');
fs.readdir(__dirname,function(err,files) {
    if(err){
        console.log(err)
    }
    let filesData = [];
    Array.from(files).forEach(item => {
        if(/\.json$/.test(item)){
             filesData.push(fs.readFileSync(item, "utf-8"))       
        }
    })
    const result =  filesData.reduce((acc,curr) => {
        curr = JSON.parse(curr);
        let namespace = curr.namespace;
        let apis = curr.api.map(item => {
            return {
                ...item,
                apiNamespace: namespace
            }
        })
        return acc.concat(apis)
    },[])
    const data = `
        const apiJson = ${JSON.stringify(result)};
        export default apiJson;
    `
    fs.writeFile('index.js',data,function(err){
        if (err) { throw new Error('error')}
    })
},)


