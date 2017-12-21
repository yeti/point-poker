## Getting Started

### Prerequisites

This project requires node.js and npm to run. The recommended node version is `v8.1.2`.

If you have `nvm` installed, you can run

```bash
nvm use
```

which will pull the correct version of node from the `.nvmrc` file.

### Installation

With node installed, carefully type this in your terminal and hit enter:

```bash
npm install
```

Note: The postinstall npm script will run a production build - this is a crucial step for Heroku deployments.

### Doing a Production Build

To do a production build, run:

```bash
npm run build
```

This will run tests then compile the project. It will also copy everything from the `src/build/` into the `public/` folder.

### Running Prod

Note: A prerequisite for this step is having done a production build beforehand.

To start the production server, run:

```bash
npm start
```

This will start the production server on port 4200.

### Running Dev

To start your dev environment, run:

```bash
npm run dev
```

This will start a webpack dev server with hot-reloading on port 4200.

### Running Storybook

To start storybook, run:

```bash
npm run storybook
```

It will kick off a server on port 6006.
