# GraphDatabaseTest
Testing the Dgraph client in Node.js

### Running

To initialize the database, download Dgraph and run it's core in one terminal:

```
dgraph alpha --lru_mb 1024
```

And in another terminal, run the following to initalize the load-balancer and clustering:
```
dgraph zero
```

To install Proof-Of-Concept, clone the repository and run
```
npm install && node Test.js
```
