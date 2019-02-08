[![Build Status](https://travis-ci.org/Billmike/PMSAPI.svg?branch=develop)](https://travis-ci.org/Billmike/PMSAPI)

# PMS-API

## Introduction

> **PMS-API** is an application built using Node, Express, PostgreSQL and Sequelize that enables users to create locations with populations for both male and female populations.

## Table of Content
- [Features in the application](#features-in-the-application)
- [Technology stack used](#technology-stack-used)
- [Getting Started](#getting-started)
- [API Docs](#api-docs)

## Features in the application

* Users can create a new location. (Location can have sub locations, and must have population values for both male and females)
* Users can update location information
* Users can delete location
* Users can fetch all locations

## Technology Stack used

* NodeJS
* ExpressJS
* PostgreSQL
* Sequelize

## Getting Started

* Before cloning the repo, make sure you have Node and PostgresQL installed on your local machine
* Clone the repo to your local machine

```sh
> $ git clone https://github.com/billmike/PMSAPI.git
```

* Change directory into the more-recipes directory

```sh
> $ cd PMSAPI
```

* Install all required dependencies by running

```sh
> $ npm install
```

* Create a database to be used with the application
* Migrate database by running

```sh
> $ sequelize db:migrate
```

* To start the application, run

```sh
> $ npm run start:dev
```

## API docs

* POST `localhost:8000/api/location`

  * To create a location, hit this endpoint via postman and supply `name`, `femalePopulation`, `malePopulation` and an optional `parentLocationId` parameter to the request body

* GET `localhost:8000/api/location/:locationId`

  * To get one location, hit this endpoint via postman and supply the `locationId` parameter in the URL.

* GET `localhost:8000/api/locations`

  * To get all locations, hit this endpoint via postman to retrieve all locations.

* PUT `localhost:8000/api/location/:locationId`

  * To edit a location and it's data, hit this route in postman and supply the `locationId` params. Provide the values to be edited in the request body.

* DELETE `localhost:8000/api/location/:locationId`

  * To delete a location, provide the locationId as a parameter to the URL.
