const dgraph = require("dgraph-js");

module.exports.createData = async(dgraphClient, entry) => {
    const transaction = dgraphClient.newTxn();
    try{
        const mutationBase = {
            uid: entry.uid,
            questionName: entry.questionName,
            text: entry.string,
        };
        const mutation = new dgraph.Mutation();
        mutation.setSetJson(mutationBase);
        await transaction.mutate(mutation);
        await transaction.commit();
    } catch (err){
        console.log(err);
        await transaction.discard();
    }
}