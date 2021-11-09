const { MongoClient } = require("mongodb");

async function main(){

   const uri = "mongodb+srv://user1:user1pass@cluster0.hbwrn.mongodb.net/rental_agency?retryWrites=true&w=majority";

   const client = new MongoClient(uri);

   try{
   await client.connect();

   createListing(client,{
      name: "Mario",
      client_id: "boo1123",
      password: "provatech",
   })

  } catch(e){
   console.error(e);
    } finally{
       await client.close();
    }
}

main().catch(console.error);

async function createListing(client, newListing){
   const result = await client.db("rental_agency").collection("clients").insertOne(newListing);

   console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client){
   const databasesList = await client.db().admin().listDatabases();

   console.log("Databases: ");
   databasesList.databases.forEach(db =>{
      console.log(`  - ${db.name}` )
   })
}
 
/*async function findOneListeningByName(client, nameOfListing){
   const result = await client.db("rental_agency").collection("clients")
   .findOne({name: nameOfListing});

   if (result){
       console.log(`Found a listing in the collection with the name '
       ${nameOfListing}' `);
       console.log(result); 
    }else{
        console.log(`No listing found`)};
    }*/