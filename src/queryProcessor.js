import submitQuery from "./neo4jConnection";

async function processQuery(input) {

    let dataTypes = input.dataTypes;
    let query = input.query;
    let id = input.id;
    let name = input.name;

    try {
        validateInput(query, id, name, dataTypes);
    } catch (err) {
        throw new Error("Invalid input - " + err.message);
    }

    let dataFields = await generateDataFields(dataTypes);

    return submitQuery(query, dataFields).then(queryResult => {
        if (!queryResult) {
            throw new Error("Your query did not return a response from Neo4J. Check your query for typos.");
        }

        var mapInfo = {
            label: name,
            id: id,
            data: queryResult,
            config: {}
        }
        return mapInfo;
    }).catch(error => {
        throw new Error("Error submitting Neo4J Query - " + error.message);
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
        throw new Error("Cannot have blank query");
    }
    if (!id) {
        throw new Error("Cannot have blank ID");
    }
    if (!name) {
        throw new Error("Cannot have blank name");
    }
    if (!dataTypes || dataTypes.length === 0) {
        throw new Error("No return data types specified");
    }
}

// MATCH (c:City) RETURN c.name as cityName, c.population AS population, c.latitude AS latitude, c.longitude AS longitude
// MATCH (c:City)-[:IS_IN]->(:Province {name:"Alberta"}) RETURN c.name as cityName, c.population AS population, c.latitude AS latitude, c.longitude AS longitude
// MATCH (p:Province)-[:NEXT_TO]-(:Province {name:"Alberta"}) MATCH (c:City)-[:IS_IN]->(p) RETURN c.name as cityName, c.population AS population, c.latitude AS latitude, c.longitude AS longitude


export default processQuery;