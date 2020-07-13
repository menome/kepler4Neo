#kepler4Neo

kepler4Neo is an application that lets you easily transfer data from a [Neo4J](https://neo4j.com/) database on to a [kepler.gl](https://kepler.gl/) map. Use kepler4Neo to quickly build dynamic visualisations of your geospatial Neo4J data.

## Features

kepler4Neo provides a user interface at the bottom of the webpage. You can use this interface to connect to your Neo4J database and send queries to add data to your map. The kepler.gl map instance remains unaltered, allowing you to take advantage of all its visualisation features.

#### Connect to a Neo4J
Connect to any active Neo4J database by inputting the database URI and credentials from the 'Connect to database' screen. 

#### Perform Query
Send a cypher query to your current Neo4J database

## Usage

Run the website at localhost:3000 using `npm start`. Connect to the Neo4J database of your choice.

Within the Neo4J Query box, input your cypher query. Ensure that you are using descriptive names for your return types.
`MATCH (c:City) RETURN c.name as cityName, c.population AS population, c.latitude AS latitude, c.longitude AS longitude `

Now, specify a name and an ID for your data. The data name will be the name of your dataset within kepler.gl. The ID uniquely identifies the dataset you are uploading - if you would like to overwrite it in the future, you can perform another query using the same ID.

Finally, specify the return types of the data that you expect your cypher query to return.
For example, the city query from above would expect the following return types:
`String
Integer
Real Number
Real Number` 
Ensure the return types appear in the order that your cypher query would return them.






This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
