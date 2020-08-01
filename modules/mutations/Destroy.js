const { getDB } = require('../graphDatabase');
const dgraph = require("dgraph-js");

module.exports.Destroy = async(dgraphClient) => {
    const op = new dgraph.Operation();
    op.setDropAll(true);
    await dgraphClient.alter(op);
    console.log("Destroyed Data Entries");
}
