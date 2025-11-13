# Kraken Frontend

The frontend application for Kraken plugins.

## Building 

To build the full application first:

- Generate and copy javadocs to the `javadocs` directory from the [Kraken API](https://github.com/cbartram/kraken-api/)'s `lib/build/docs` directory
- Run `npm run docs:build` to build the Vitepress docs
- Run `npm run build` to build the React application
- Commit and push the files and open a PR
- Merge the PR and the CircleCI build process will handle building and deploying to the cluster