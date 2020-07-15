import submitQuery from "./neo4jConnection";

/**
 * A function which manages the calling of a query to the connected Neo4J database.
 * Throws an error if something wrong occurs.
 * @param {*} input - An object w/ the content of the user input, which is used to perform query.
 */
async function processQuery(input) {

    let dataTypes = input.dataTypes;
    let query = input.query;
    let id = input.id;
    let name = input.name;

    validateInput(query, id, name, dataTypes);

    let dataFields = generateDataFields(dataTypes);

    return submitQuery(query, dataFields).then(queryResult => {
        if (!queryResult) {
            throw new Error("noRes");
        }

        var mapInfo = {
            label: name,
            id: id,
            data: queryResult,
            config: {}
        }
        return mapInfo;
    }).catch(error => {
        throw new Error(error.message);
    });

}

/**
 * Based on the data types specified by the user, creates a dataFields array
 of objects, which will be used by the record parser to understand what kind of data
 it is expecting to recieve from Neo4J. */
function generateDataFields(dataTypes) {
    let dataFields = [];
    for (let i = 0; i < dataTypes.length; i++)
        dataFields.push({ name: '', format: '', type: dataTypes[i] });
    return dataFields;
}

/**
 * Checks to make sure the input for the query request isn't empty. Throws errors if it is.
 * @param { string } query 
 * @param { string } id 
 * @param { string } name 
 * @param { string[] } dataTypes 
 */
function validateInput(query, id, name, dataTypes) {
    if (!query) {
        throw new Error("blankQuery");
    }
    if (!id) {
        throw new Error("blankId");
    }
    if (!name) {
        throw new Error("blankName");
    }
    if (!dataTypes || dataTypes.length === 0) {
        throw new Error("blankReturn");
    }
}

// MATCH (c:City) RETURN c.name as cityName, c.population AS population, c.latitude AS latitude, c.longitude AS longitude
// MATCH (c:City)-[:IS_IN]->(:Province {name:"Alberta"}) RETURN c.name as cityName, c.population AS population, c.latitude AS latitude, c.longitude AS longitude
// MATCH (p:Province)-[:NEXT_TO]-(:Province {name:"Alberta"}) MATCH (c:City)-[:IS_IN]->(p) RETURN c.name as cityName, c.population AS population, c.latitude AS latitude, c.longitude AS longitude

// MATCH (l:Place) RETURN l.id AS id, l.name AS name, l.homelocation.x AS latitude, l.homelocation.y AS longitude, size((:Visit)-[:LOCATED_AT]->(l)) AS numberVisits
// MATCH (v:Visit)-[:LOCATED_AT]->(l:Place) RETURN l.id AS id, l.name AS name, l.homelocation.x AS latitude, l.homelocation.y AS longitude, date(v.starttime) AS startime


export default processQuery;