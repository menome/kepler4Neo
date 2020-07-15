import parseRecords from "./recordParser.js";

var neo4j = require('neo4j-driver');

// Local Login Info (Only used for login at launch. Edit to change what database you attempt to login to at launch)
const neoRoute = 'bolt://localhost:7687';
const startUsername = 'neo4j';
const startPassword = 'pass';

var driver = neo4j.driver(
  neoRoute,
  neo4j.auth.basic(startUsername, startPassword)
);

var session = driver.session({
  // database: "CanCities"
});

/**
 * Logs into the database, returning an object that represents what type of 
 * @param {string} route - The URI route of the database to connect to
 * @param {string} username - The username to connect with 
 * @param {string} password - the password to connect with
 */
async function login(route, username, password) {
  if (driver) {
    driver.close();
  }

  try {
    driver = neo4j.driver(
      route,
      neo4j.auth.basic(username, password)
    );
  } catch (err) {
    throw new Error(err.message);
  }

  // Case: Login was successful
  function disp(obj) {
    return {
      type: "success",
      code: "login"
    }
  }

  //Case: login was unsuccessful
  function errHandle(obj) {
    return {
      type: "error",
      code: obj.code
    }
  }

  session = driver.session();
  return driver.verifyConnectivity().then(disp).catch(errHandle);
  //TODO: Decide if we want:
  // - Custom Resolver
  // - Encryption (default: none)
  // - MaxConnectionLifetime (default: 1 hr)
}

/**
 * Sends a query to Neo4J, then returns the parsed results.
 * @param { string } query - The cypher query to send to Neo4J
 * @param {*} dataFields - An array of objects that represent the expected data return types
 */
function performQuery(query, dataFields) {
  return session
    .run(query,
      {
        //Parameters would go here
      })
    .then(result => {
      try {
        let queryResult = parseRecords(result.records, dataFields);
        return queryResult;
      } catch (err) {
        throw new Error(err.message)
      }

    })
    .catch(error => {
      throw new Error("Error performing Neo4J Query - " + error.message);
    })
}

export default performQuery;
export { login };