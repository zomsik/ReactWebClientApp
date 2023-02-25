# Statistics site

Website presents statistics of marriages and divorces in individual provinces based on the population density of a given province. The data is downloaded via API from the local data bank from the website of the Central Statistical Office (Polish GOV site).

Project fully uses MERN stack - MongoDB + Express.js + React.js + Node.js.

## How do I use it?

Open [this site](https://zomsik.github.io/ReactWebClientApp/ "Live demo") hosted on github pages.

### `OR`

1. Clone this repository.
```sh
git clone https://github.com/zomsik/ReactWebClientApp.git
```
2. Enter project folder.
```sh
cd ReactWebClientApp/
```
3. Install all required node modules.
```sh
npm install
```
4. Run the project with:
```sh
npm start
```

# Server  side
Server uses Node.js, Express.js and Moongose to work. It is hosted on free Microsoft Azure Server so it take some times to receive first response from server. After that it works very efficiently.

Code of the server side is [here](https://github.com/zomsik/ExpressServer "Server side repository").
