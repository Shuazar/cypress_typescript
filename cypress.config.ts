import { defineConfig } from 'cypress';
import pg from 'pg';
const { Pool } = pg;
require('dotenv').config()

const localEnv = {
  "domain": "localhost:8080",
  "description": "This is my local machine!",
  "protocol": "http://",
  "subDirectory": "helloworld",
  dbConfig: {
    user: "postgres",
    host: "127.0.0.1",
    database: "cypress",
    password: "Qaz1234",
    port: "5432",
  },
};

const testEnv = {
  "domain": "test1.domain.com",
  "description": "This is the awesome stage environment",
  "protocol": "https://",
  "subDirectory": "/helloworld",
  dbConfig: {
    user: "postgres",
    host: "127.0.0.1",
    database: "cypress",
    password: "Qaz1234",
    port: "5432",
  },
};

const envConfig = (environment:any) => {
    switch(environment) {
        case 'local': return localEnv;
        case 'test':
        default: return testEnv;
    }
};

export default defineConfig({
  projectId: "hp9orx",
  // env:{
  //   ...envConfig(process.env.ENVIRONMENT), // override with the environment configuration based on the value passed in CI (e.g. ENVIRONMENT=test)
  //   grepFilterSpecs: true,
  // },
  env:{
    test:{
      dbConfig: {
        user: "postgres",
        host: "127.0.0.1",
        database: "cypress",
        password: "Qaz1234",
        port: "5432",
      },
      baseUrl:"test.com"
    },
    local:{
      baseUrl:"local.com",
      dbConfig: {
        user: "postgres",
        host: "127.0.0.1",
        database: "cypress",
        password: "Qaz1234",
        port: "5432",
      },
    },
    production:{
      baseUrl:"local.com",
      dbConfig: {
        user: "postgres",
        host: "127.0.0.1",
        database: "cypress",
        password: "Qaz1234",
        port: "5432",
      },
    }
  },
  e2e: {
    baseUrl: "https://www.automationteststore.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        //create a task - take 2 params, first being config, second is sql
        READFROMDB({ dbConfig, sql }) {
          //create a client using argument object
          const client = new Pool(dbConfig);
          return client.query(sql);
          //Return result from the sql
        },
      });
    },
   
  },
});
