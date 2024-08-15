# URL Checker Backend Service

## Overview

This is a TypeScript-based backend service built with Express that checks the availability of a list of URLs and provides endpoints to query reachable URLs ordered by priority or by specific priority number.

## Endpoints

- **GET** `/urls/reachable`: Returns reachable URLs ordered by priority (1 is highest).
- **GET** `/urls/reachable/:priority`: Returns reachable URLs filtered by priority number.

## Running the Project

Install dependencies:
npm install

Run the server:
npm run dev

Run the tests:
npm test