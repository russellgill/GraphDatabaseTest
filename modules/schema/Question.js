const dgraph = require("dgraph-js");

module.exports.Question = async(database) => {
    try {
        const schema = `
            question_name: string @index(exact) .
            question_text: string .
        `;
        const operation = new dgraph.Operation();
        operation.setSchema(schema);
        await database.alter(operation);
        console.log("Registered Schema");
    } catch (err){
        console.log(err);
        console.log('Failed To Register Schema');
    }
    
}