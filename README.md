# GraphDatabaseTest
Testing the DGraph System

### Running

To initialize the database, download Dgraph and run in one terminal:

```
dgraph alpha --lru_mb 1024
```

And in another terminal, run:
```
dgraph zero
```

To install Proof-Of-Concept, clone the repository and run
```
npm install && node Test.js
```
