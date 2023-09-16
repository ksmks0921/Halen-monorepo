# halen-monorepo

## Introduction

## First Things First
After you clone this repo and cd into the the root directory, run the following commands

- We need Yarn 2 installed globally
  - check if you have it already: `yarn --version`
  - install if needed: `npm i -g yarn@berry`

- To use Yarn 2
  - run in your project root: `yarn set version berry`

- Install dependencies for all packages: 
  - run in your project root: `yarn` 

- Load Yarn tools:
  - run in your project root: `yarn plugin import workspace-tools`


## Build
Run the following commands from the root of the monorepo.
- If you want to compile all the packages: `yarn build`
- If you want to compile one package: `yarn workspace SERVICE_NAME build`



## Tests
Run the following commands from the root of the monorepo.
- If you want to run tests in all the packages: `yarn test`
- If you want to run tests in one package: `yarn workspace SERVICE_NAME test`


## Prettier Format
Run the following commands from the root of the monorepo.
- If you want to run prettier formatting in all the packages: `yarn format`
- If you want to run tests in one package: `yarn workspace SERVICE_NAME format`


## Eslint
Run the following commands from the root of the monorepo.
- If you want to fix linting issues in all the packages: `yarn lint:fix`
- If you want to run tests in one package: `yarn workspace SERVICE_NAME lint:fix`


## Run The Services
Run the following commands from the root of the monorepo.

### For the compile code:
- If you want to start all the packages: `yarn start`
- If you want to start one package: `yarn workspace SERVICE_NAME start`

### For the typescript code in watch mode:
- If you want to start all the packages: `yarn dev`
- If you want to start one package: `yarn workspace SERVICE_NAME dev`


## Debugging


## Api Documentation
For each service, the swagger docs are available at the local path: `http://localhost:PORT/api`, where the PORT is the value from the `.env.example` of that service

## HTTP Collection
- A collection of http requests for each endpoint in each Rest service is availabe under the `collections` folder
- Make sure to open the `halen-monorepo` as a workspace in vscode
- Open your workspace file and make sure the contents look similar to the provided `halen.code-workspace-example` file
- Make sure to update the http collection as you add new services and endpoints
- Make sure to update the `halen.code-workspace-example` file as you add new services


## Contributing Code

#### Naming conventions
For code contribution guidelines, follow the [Naming Conventions](https://gethalen.atlassian.net/wiki/spaces/EBPAP/pages/54755329/Code+Contribution+Guidelines#Naming-Conventions)


### NestJS Services
#### Adding new Microservice
-- TODO

#### Adding Modules to a Microservice
-- TODO



### AWS Serverless Applications
- install the following tools globally:
  - (Optional) AWS CLI:
    - [AWS CLI Download Instructions](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
  - Serverless Framework:
    - https://www.serverless.com/framework/docs/providers/aws/guide/deploying/
    - https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-deploying.html
 
- configure aws Access Key and Secret for your LOCAL, and DEV
  - type `aws configure --profile local` and provide the `local` credentials from the AWS Secrets Manager
  - type `aws configure --profile dev` and provide the `dev-env` credentials from the AWS Secrets Manager 

- deploy
  - for local deployment, run: `yarn serverless:offline`

  - deployment to the cloud environments happen automatically via the gitlab ci (see `gitlab-ci-yml` file)
  - but if you are an admin/devOp, and need to manually deploy it to dev, then run: `yarn serverless`

- check deployed apis in the AWS console
  - [AWS API Gateway console](https://us-east-1.console.aws.amazon.com/apigateway/main/apis?region=us-east-1)
  - [AWS Lambda Console](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/applications)
  
- check the logs in AWS CloudWatch
  - [AWS CloudWatch Console](https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups)


#### Merge Requests Guidelines
Once you are ready to push your changes, 
- create a branch following the [Naming Conventions](https://gethalen.atlassian.net/wiki/spaces/EBPAP/pages/54755329/Code+Contribution+Guidelines#Naming-Conventions), 
- push the branch to Gitlab and [create an MR following these guidelines](https://gethalen.atlassian.net/wiki/spaces/EBPAP/pages/54755329/Code+Contribution+Guidelines#Stage%3A-Pushing-to-Gitlab)
