# kepler4Neo

<a href='https://opensource.org/licenses/MIT'>
  <img src='https://img.shields.io/badge/License-MIT-blue.svg' alt='MIT License' />
</a>

kepler4Neo is an application that lets you easily transfer data from a [Neo4J](https://neo4j.com/) database on to a [kepler.gl](https://kepler.gl/) map. Use kepler4Neo to quickly build dynamic visualizations of your geospatial Neo4J data.

## Features

kepler4Neo provides a user interface at the bottom of the webpage. You can use this interface to connect to your Neo4J database and send queries to add data to your map. The kepler.gl map instance remains unaltered, allowing you to take advantage of all its visualization features.

#### Connect to Neo4J
Connect to any active Neo4J database by inputting the database URL and credentials from the 'Connect to database' screen.

#### Perform Query
Send a cypher query to your current Neo4J database

## Setup

1. Clone the kepler4Neo repository onto your device.
2. Retrieve a [Mapbox API token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/)
3. Create a .env file within the main directory of your kepler4Neo project.
4. Insert your mapbox API token into your .env file using the name REACT_APP_MAPBOX_API_TOKEN.
`REACT_APP_MAPBOX_API_TOKEN=<YourToken>`
5. To launch kepler4Neo, navigate to the kepler4Neo folder and type `npm start` with a command terminal.

You can input default credentials to automatically log in to a specific database whenever the app is launched. To do this, simply change the values of neoRoute, startUsername, and startPassword from within neo4jConnection.js.

## Usage

Run the website at localhost:3000 using `npm start`.

From the 'Connect to database' tab, connect to the Neo4J database of your choice. You should use a Bolt URL to connect with your Neo4J database. Once you have successfully connected you should see a success message.

Once you have connected to a database, navigate to the 'Perform Query' tab. Within the Neo4J Query box, enter your cypher query. Ensure that you are using descriptive names for your return types.

Now, specify a name and an ID for your data. The data name will be the name of your dataset within kepler.gl. The ID uniquely identifies the dataset you are uploading - if you would like to overwrite it in the future, you can perform another query using the same ID.

Finally, specify the return types of the data that you expect your cypher query to return. Ensure the return types appear in the order that your cypher query would return them.

Once you have correctly filled every field, press submit and your data will automatically upload to the kepler.gl map.

### Example

In this example, we will be using the Contact Tracing database available from [Neo4J Sandbox](https://neo4j.com/sandbox/#).
After launching the Neo4J database, we need to login.

![Login Screen](https://snipboard.io/4wNYRi.jpg)

Now, we can write our query.

![A screenshot of writing the query](https://snipboard.io/0z7VDd.jpg)

The cypher for our query is

`MATCH (v:Visit)-[:LOCATED_AT]->(l:Place) RETURN l.name AS name, l.homelocation.x AS latitude, l.homelocation.y AS longitude, v.starttime AS startime`

Once you click submit, the data should upload to your map automatically. From here, you can use kepler.gl to create dynamic data visualizations.
![The data uploaded to kepler.gl](https://snipboard.io/Oond46.jpg)


### Data Formatting

Your data from Neo4J should be formatted according to [kepler.gl specifications](https://docs.kepler.gl/docs/user-guides/b-kepler-gl-workflow/a-add-data-to-the-map).
Ensure that your returned data matches the data types available from the drop-down menu (Real Number, Date, Integer, String, GeoJSON, or Timestamp). If it doesn't, you can use Neo4J functions within your query to ensure your data is in an appropriate format.

In order to use kepler.gl's time playback feature, your temporal data must be formatted as a timestamp (dates without times cannot use time playback in the current version of kepler.gl). You can use [kepler's temporal functions](https://neo4j.com/docs/cypher-manual/current/functions/temporal/) to accomplish this. For example, to convert a date into a datetime, the following query can be used:

`WITH date({year:1984, month:10, day:11}) AS dd
RETURN datetime({date:dd, hour: 0, minute: 0, second: 0}) AS myDateTime`

This may be updated in a future version of kepler.gl.

## License

This project uses a MIT license.
