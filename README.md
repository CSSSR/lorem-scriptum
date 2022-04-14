# Lorem Scriptum official website

This repo contains the source code for [loremscriptum.com](https://loremscriptum.com/)

## Main commands

```bash
# Dependencies installation
$ yarn install

# Build and start development server
$ yarn dev

# Build in production mode
$ yarn build

# Image optimisation
$ yarn optimize-img

```

## Dependencies

All npm dependencies must use fixed versions in `package.json` despite using `yarn.lock`. This helps ensure reproducible builds after version upgrades.

For example:

Install dependencies:

```bash
yarn add -E <package>
```

Install devDependencies:

```bash
yarn add -DE <package>
```

It is recommended to avoid duplicated dependencies. [`yarn-deduplicate`](https://www.npmjs.com/package/yarn-deduplicate) package with the `--strategy fewer` option can help with this.

## Requirements and recommendations

All recommendations for the development environment are described in the "engines" section of the [`package.json`](./package.json) file .

## Folder Structure

    .
    ├── src # Source files
    │   ├── assets # Static files (images, icons, etc.)
    │   ├── data # Data for the templates to be included
    │   ├── fonts # Optimised fonts
    │   ├── includes # Included blocks
    │   ├── layouts # Layouts templates
    │   ├── pages # Pages templates
    │   ├── scripts # Project scripts
    │   ├── styles # Project styles
    │   │ ├── blocks # Templates for blocks
    │   │ ├── scaffolding # Common styles
    └── ...
