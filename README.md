#kepler4Neo

kepler4Neo is an application that lets you easily transfer data from a [Neo4J](https://neo4j.com/) database on to a [kepler.gl](https://kepler.gl/) map. Use kepler4Neo to quickly build dynamic visualisations of your geospatial Neo4J data.

## Features

kepler4Neo provides a user interface at the bottom of the webpage. You can use this interface to connect to your Neo4J database and send queries to add data to your map. The kepler.gl map instance remains unaltered, allowing you to take advantage of all its visualisation features.

#### Connect to Neo4J
Connect to any active Neo4J database by inputting the database URI and credentials from the 'Connect to database' screen. 

#### Perform Query
Send a cypher query to your current Neo4J database

## Usage

Run the website at localhost:3000 using `npm start`. Connect to the Neo4J database of your choice.

Within the Neo4J Query box, input your cypher query. Ensure that you are using descriptive names for your return types.
`MATCH (c:City) RETURN c.name as cityName, c.population AS population, c.latitude AS latitude, c.longitude AS longitude `

Now, specify a name and an ID for your data. The data name will be the name of your dataset within kepler.gl. The ID uniquely identifies the dataset you are uploading - if you would like to overwrite it in the future, you can perform another query using the same ID.

Finally, specify the return types of the data that you expect your cypher query to return. Ensure the return types appear in the order that your cypher query would return them.

Once you have correctly filled every field, press submit and your data will automatically upload to the kepler.gl map. 

### Data Formating

Your data from Neo4J should be formatted according to [kepler.gl specifications](https://docs.kepler.gl/docs/user-guides/b-kepler-gl-workflow/a-add-data-to-the-map).

## License

This project uses a MIT license. 

