# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```


Scripts for WSL2 environment:
"start": "CHOKIDAR_USEPOLLING=true react-scripts start",
"test": "CHOKIDAR_USEPOLLING=true react-scripts test",

.env.development file contents:
REACT_APP_WEBSOCKET_URL=ws://localhost:8000
PORT=8000

Running the test environment (Jest in PowerShell)
$env:NODE_ENV="test" ; node ./src/index.js

To reset the db for testing: 
http://localhost:8001/api/debug/reset
