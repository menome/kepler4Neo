var neo4j = require('neo4j-driver');

/**
 * Parses the records that were returned from the Neo4J query, formatting them into an object
 * that can be uploaded to kepler.gl. Performs some additional type validation depending on the
 * type of data that is expected.
 * @param {*} records - Records returned raw from Neo4J query.
 * @param {*} dataFields - "header" for return object. Specifies what type of data each row is expected to be.
 */
function parseRecords(records, dataFields) {

    //TODO: Decide if there is a better way to validate this data. Is it possible that the first record may have a different number of keys than rest of data? 
    let firstRecord = records[0];
    if (!firstRecord) {
      throw new Error('No records detected');
    }
    if(dataFields.length > firstRecord.keys.length){
        throw new Error('Expected more return types from query than recieved. Ensure the fields in Select Data Types match the expected return from your query.');
    }
    if(dataFields.length < firstRecord.keys.length){
        throw new Error('Recieved more return types from query than expected. Ensure the fields in Select Data Types match the expected return from your query.');
    }
    for (let i = 0; i < dataFields.length; i++)
      dataFields[i].name = firstRecord.keys[i];
  
    let dataRows = [];
    records.forEach(record => {
      let myData = [];
      record._fields.forEach((field, i) => {
        var type = dataFields[i].type;

        // Performs additional validation based on the type of data expected.
        // TODO: Ensure geojson works
        // TODO: Add checks for boolean and timestamp data types?
        switch (type) {
          case "integer":
            if (neo4j.isInt(field)) {
              field = neo4j.integer.toNumber(field);
            }
            break;
          case "real":
            if (neo4j.isInt(field)) {
              field = neo4j.integer.toNumber(field);
            }
            break;
          case "date":
            if (neo4j.isDate(field)) {
              field = field.year + "/" + field.month + "/" + field.day;
            } else {
              field = field.toString();
            }
            break;
          case "geojson":
            // Do nothing
            break;
          default:
            field = field.toString();
            break;
        }

        myData.push(field);
      });
      dataRows.push(myData);
    })

    return {
      fields: dataFields,
      rows: dataRows
    };
  }

  export default parseRecords;