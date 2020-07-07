var neo4j = require('neo4j-driver');

// Local Login Info
const neoRoute = 'bolt://localhost:7687';
const username = 'neo4j';
const password = 'pass';

var driver = neo4j.driver(
    neoRoute,
    neo4j.auth.basic(username, password)
);


var session = driver.session({
    // database: "CanCities"
});

function login(route, username, password){
  if(driver){
    driver.close();
    alert("Closed driver!");
  }
  driver = neo4j.driver(
    route,
    neo4j.auth.basic(username, password)
  );
  session = driver.session();
  alert("Completed login.");
}

function performQuery(query, dataFields){

  return session
    .run(query, 
      {
        //Parameters would go here
      })
    .then(result => {
      try{
      let queryResult = parseRecords(result.records, dataFields);
      //alert("Query Results: \n" + JSON.stringify(queryResult));
      return queryResult;
      } catch(err){
      throw new Error("error parsing records: " + err.message)
      }

      //TODO: Remove these console logs
      // Console log the output
      // console.log("\n\n\n\n\n\n\n");
      // console.log("======= RESULTS =========");
      // console.log(JSON.stringify(result));
      // result.records.forEach(record => {
      //     console.log("Record:")
      //   console.log(record)
      //   console.log(record.toObject());
      // })

    })
    .catch(error => {
      throw new Error("Error performing Neo4J Query - " + error.message);
    })
}

function parseRecords(records, dataFields){
    let firstRecord = records[0];
    if(!firstRecord){
        throw new Error('No records detected');
    }
    for(let i = 0; i<dataFields.length ; i++)
        dataFields[i].name = firstRecord.keys[i];
    
    // console.log("======= The Data Fields Are ======");
    // console.log(dataFields);

    //TODO: Add better type validation?
    let dataRows = [];
    records.forEach(record =>{
        let myData = [];
        record._fields.forEach(field =>{
            if(neo4j.isInt(field))
                field = neo4j.integer.toNumber(field);
            myData.push(field);
        });
        dataRows.push(myData);
    })
    // console.log("========= The completed data is ===========");
    // console.log(dataRows);
    return {
      fields: dataFields,
      rows: dataRows
    };
}

export default performQuery;
export { login };