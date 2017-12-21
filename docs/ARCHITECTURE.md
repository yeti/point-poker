# Architecture

This app features a somewhat unusual architecture, stemming from needing to combine an express server with both socket.io and the webpack dev middleware.

## App Server

The app server is an [Express](https://expressjs.com/) server.

### Assets

It uses the [Express Static Gzip](https://github.com/tkoenig89/express-static-gzip) middleware to gzip assets before sending them down.

### Webpack

When in dev (ie not in production), the server uses the [Express Dev Middleware](https://github.com/webpack/webpack-dev-middleware) and [Express Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware) to watch for changes and hot-reload changes.

### Socket-io

[Socket.IO](https://socket.io/) is the real-time engine used to drive the gameplay. It hooks in to Express to expose websockets on the server.

The socket game logic lies in `lib/socket`.

## App Client

Point poker's client app is a SPA written with React.

### Routing

Routing is used to keep track of login form state (see `src/Routes.js`). This allows for deep linking to rooms:

*  `\`: Home
*  `\join`: Join screen
*  `\join\<room name>`: Join <room name>
*  `\join\<room name>\<user name>`: Play in <room name> as <user name>

### Code structure

Components are grouped in their own folder along with their styling files, storybook files, and soon to come test files.

### PWA

This is a progressive web app. It has a service worker which will cache the web app - make sure to bust the cache when you make a new release by incrementing the cache version in `src/build/serviceWorker`.

### State

All gameplay state and logic lives on the server. The client is "dumb" and holds no state or logic - it is simply a view layer. It receives the state from the server and generates the corresponding UI.

You can think of the server as being a remote "store" that a client has access to. A client can emit events, which will change the data on the server, which will be instantly reflected on the client.

Multiple clients that are connected to the same room in the game will share the same "store" on the server. Whenever a client joins the room, casts a vote, or leaves the room, the room data is updated on the server. Whenever the room data is updated, every client connected to that room receives the new data.
