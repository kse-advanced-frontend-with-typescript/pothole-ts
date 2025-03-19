# How to Add Jest test framework

- install `jest` 
```bash
npm i jest --save-dev
npm i @types/jest --save-dev
npm i ts-jest --save-dev
npm i cross-env --save-dev
```

- update `package.json`, change `scripts -> test`   
```json
...
"scripts": {
   "test": "cross-env NODE_OPTIONS=--experimental-vm-modules jest --detectOpenHandles" 
    ...
}
...
```

- create `tsconfig.test.json` file
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noUnusedParameters": false,
    "noUnusedLocals": false,
    "allowUnusedLabels": true,
    "outDir": "dist"
  }
}
```

See https://github.com/kse-advanced-frontend-with-typescript/pothole-ts/commit/0ce4d3b139d4f4f9866fc2ad7fadfa0d91239b63 for more details


# How to config .env

```bash
npm install dotenv --save
npm install dotenv-webpack --save-dev
```

- extend `webpack.config.js` to use `new Dotenv()` in plugin section 

```js
...
const Dotenv = require('dotenv-webpack');
...
plugins: [
    ...
    new Dotenv()
]
...

```
