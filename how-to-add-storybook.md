# How to add Storubook

## Install Storybook

Install dependencies, it will automatically detect TS and webpack configuration.

```bash
npx storybook@latest init
```

## Modify Webpack config for Storybook




```bash
npm install --save-dev @storybook/addon-styling-webpack
```

Extend existing `./storybook/main.ts` webpack config to support CSS modules

```ts
...
{
  name: '@storybook/addon-styling-webpack',
  options: {
    rules: [
      // Replaces existing CSS rules with given rule
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              modules: {
                localIdentName: '[local]--[name]--[hash:base64:5]'
              }
            }
          }
        ]
      }
    ]
  }
}
...
```

