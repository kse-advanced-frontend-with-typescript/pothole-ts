# How to configure cypress with screenshot testing

1. install Cypress ([see](https://docs.cypress.io/app/get-started/install-cypress))
```bash
npm install cypress --save-dev 
```
2. Install `cypress-match-screenshot`  ([see](https://github.com/julianburr/cypress-match-screenshot)) 
```bash
npm install cypress-match-screenshot --save-dev 
```
3. Add `"cy": "cypress open"` to `scripts` section in `package.json`
```bash
npm run cy
```
4. Add `require('cypress-match-screenshot').register()` to `cypress/support/commands.ts`
5. Start Cypress
```bash
npm run cy
```
