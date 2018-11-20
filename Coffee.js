const http = require('http');
const Blockchain = require('./blockchain');
const Block = require('./block')

function Coffee(){ 

    let blockchain = new Blockchain();

    Object.defineProperty(this,'blockchain',{
        get: function(){return blockchain;}
    });
}

Coffee.prototype.addBlock = function(index, obj){
    console.log('Mining block...')
    blockchain.addBlock(new Block(index,Date.now(),obj));    
}

Coffee.prototype.initServer = function(port){
    const server = http.createServer((req,res)=>{

        if(req.url ==='/api/coffeechain'){
            res.write(JSON.stringify(blockchain,null,4));
            res.end();
        }    
    
        if(req.url ==='/api/coffeechain/check'){
            res.write(JSON.stringify(`Is blockchain valid: ${blockchain.isChainValid()}`));
            res.end();
        }
    });   

    server.listen(port);
    console.log('Listening on port 3000...');
}

module.export.add = this;

