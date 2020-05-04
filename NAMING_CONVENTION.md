# 1) Download the ESLint[https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint] and Prettier[https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode] for VScode

# 2) Install the ESLint and Prettier libraries into our project. In your project’s root directory, you will want to run:

```
npm install -D eslint prettier
```

# 3) Install the Airbnb config. If you’re using npm 5+, you can run this shortcut to install the config and all of its dependencies:

```
npx install-peerdeps --dev eslint-config-airbnb
```

# 4) Install eslint-config-prettier (disables formatting for ESLint) and eslint-plugin-prettier (allows ESLint to show formatting errors as we type)

```
npm install -D eslint-config-prettier eslint-plugin-prettier
```

# 5) Create .eslintrc.json file in your project’s root directory:

```
{
  "extends": ["airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  },
}
```

# 6) Create .prettierrc file in your project’s root directory. This will be where you configure your formatting settings. I have added a few of my own preferences below, but I urge you to read more about the Prettier config file

```
{
  "printWidth": 100,
  "singleQuote": true
}
```

# 7) The last step is to make sure Prettier formats on save. Insert "editor.formatOnSave": true into your User Settings in VSCode.