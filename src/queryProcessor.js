import submitQuery from "./neo4jConnection";

async function processQuery(input) {

    let dataTypes = input.dataTypes;
    let query = input.query;
    let id = input.id;
    let name = input.name;

    validateInput(query, id, name, dataTypes);

    let dataFields = await generateDataFields(dataTypes);

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

//Populates data fields array.
//TODO: Specify standard format for Date and Timestamp data?
function generateDataFields(dataTypes) {
    let dataFields = [];
    for (let i = 0; i < dataTypes.length; i++)
        dataFields.push({ name: '', format: '', type: dataTypes[i] });
    return dataFields;
}

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



/**
 * Logs into the database, returning an object that represents what type of 
 * @param {string} route - The URI route of the database to connect to
 * @param {string} username - The username to connect with 
 * @param {string} password - the password to connect with
 */