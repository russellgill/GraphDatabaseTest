const dgraph = require("dgraph-js");
const grpc = require("grpc");

let _db;
const errorMessage = "No Graph Database Connection Made!";

module.exports.initGDB = async(callback) => {
    var dgraphClient;
    if (_db){
        console.log("Existing Connection Detected. Skipping Initialization");
        return await callback(null, _db);
    }
    try{
        const clientStub = new dgraph.DgraphClientStub();
        dgraphClient = new dgraph.DgraphClient(clientStub);
        console.log("DGraph Connection Established");
    } catch (err){
        return callback(err, null);
    }
    if(dgraphClient){
        _db = dgraphClient;
        return await callback(null, _db);
    } else {
        throw ReferenceError(errorMessage);
    }
}

module.exports.getDB = () => {
    if (_db){
        return _db;
    } else {
        throw ReferenceError(errorMessage)
    }
}