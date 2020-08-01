const dgraph = require("dgraph-js");

module.exports.createData = async(dgraphClient, entry) => {
    const transaction = dgraphClient.newTxn();
    try{
        const mutationBase = {
            uid: entry.uid,
            question_name: entry.questionName,
            question_text: entry.text,
        };
        const mutation = new dgraph.Mutation();
        mutation.setSetJson(mutationBase);
        const results = await transaction.mutate(mutation);
        await transaction.commit();
        return results;
    } catch (err){
        console.log(err);
        await transaction.discard();
        return null;
    }
}