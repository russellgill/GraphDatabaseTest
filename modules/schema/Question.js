const dgraph = require("dgraph-js");

module.exports.Question = () => {
    const schema = `
        questionName: string@index(exact) .
        text: string .
        related: [uid] @reverse .
    `;
    const operation = dgraph.Operation();
    return operation.setSchema(schema);
}