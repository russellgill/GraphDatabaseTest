const dgraph = require("dgraph-js");

module.exports.createRelation = async(db, entryID, relationID, existingRelation) => {
    const transaction = db.newTxn();
    if (existingRelation){
        console.log("Yikes, that was not supposed to happen... YET");
    } else{
        try{
            const mutationBase = {
                uid: entryID,
                question_text: 'I have Updated',
                answer_paths: {
                    uid: relationID
                },
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
}