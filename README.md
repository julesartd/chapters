# Project Setup

## Prerequisites
- Node.js
- npm
- MongoDB Atlas account or a local MongoDB server

## Installation
1. Clone the repository:  
   `git clone https://github.com/julesartd/chapters`
2. Navigate to the project directory:  
   `cd chapters`
3. Install the dependencies:  
   `npm install`

## Configuration
1. Navigate to the config directory:  
   `cd config`
2. Open the `database.js` file and replace the `MONGO_URI` with your MongoDB connection string:
   ```js
   module.exports.MONGO_URI = "your-mongodb-connection-string"
