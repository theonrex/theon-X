# Theon-X


` Theon-X is a website built with Next.js and Express.js that provides live news and cryptocurrency prices. `

### Features
- [x] Live news using the Cryptopanic API
- [x] Live cryptocurrency prices using the CoinGecko API


### Getting Started
Prerequisites
Before you get started, make sure you have the following requirements installed on your machine:

- Node.js
- npm
### Installation
Clone this repository to your local machine:
Copy code
   ```sh
git clone https://github.com/theonrex/theon-X 

```

### Navigate to the project directory:

```sh
cd theon-x 

```
 ## Install the dependencies:
Copy code
```sh
npm install

```
Create a file called .env in the root of the project and add the following environment variables:
Copy code
```sh
CRYPTOPANIC_API_KEY=YOUR_API_KEY

```

Replace YOUR_API_KEY with your actual API keys for Cryptopanic.

Start the development server:
Copy code
```sh
npm run dev

```
The website should now be running at http://localhost:3000.

Deployment
To deploy theon-x to a production environment, follow these steps:

Build the production version of the website:
```sh
npm run build

```

## Built With
* [Next.js -](https://nextjs.org/)  A framework for building server-rendered React applications
* [Express.js -](https://expressjs.com/) A web framework for Node.js
* [Cryptopanic API -](https://cryptopanic.com/developers/api/) A cryptocurrency news API
* [CoinGecko API -](https://www.coingecko.com/api/documentations/v3) A cryptocurrency price API





