<img alt="logo" height="128" src="../images/logo.png" width="128"/>

# API Access

The Kraken API which powers all the Kraken plugins is fully open source and [available here](https://github.com/cbartram/kraken-api).
The Kraken plugins themselves are not open source for obvious reasons. More information on using the API can be found below.

The Kraken API is designed to extend the RuneLite API with additional client-interaction utilities for writing automation based plugins that are compatible with RuneLite. If you are
just looking to use pre-existing plugins, you can skip this repository and head over to our website: [kraken-plugins.com](https://kraken-plugins.com).

### Prerequisites
- [Java 11+](https://adoptium.net/) (JDK required)
- [Gradle](https://gradle.org/) (wrapper included, no need to install globally)
- [Git](https://git-scm.com/)
- [RuneLite](https://runelite.net) (for testing and running plugins)

### Example Plugin Setup

In order to use the API in an actual RuneLite plugin you should check out the [Kraken Example Plugin](https://github.com/cbartram/kraken-example-plugin)
which shows a best practice usage of the API within an actual plugin.
To set up your development environment we recommend following [this guide on RuneLite's Wiki](https://github.com/runelite/runelite/wiki/Building-with-IntelliJ-IDEA).

Once you have the example plugin cloned and setup within Intellij you can run the main class in `src/test/java/ExamplePluginTest.java` to run RuneLite with
the example plugin loaded in the plugin panel within RuneLite's sidebar.

![example-plugin](../images/example-plugin.png)

### Development Workflow

1. Create a new branch from `master`
2. Implement or update your plugin/feature for the API
3. Add tests for new functionality
4. Run `./gradlew build` to verify that the API builds and tests pass
5. Commit your changes with a clear message `git commit -m "feat(api): Add feature X to Kraken API"`
6. Open a Pull Request

## Deployment

The Kraken API is automatically built and deployed via GitHub actions on every push to the `master` branch.
The latest version can be found in the [releases](https://github.com/cbartram/kraken-api/releases) section of the repository.

A deployment consists of:

- Building the API JAR
- Publishing a new version to the GitHub Releases section
    - This will be picked up by Github Packages for easy integration into other gradle projects.
- Uploading the JAR file to the Minio storage server used by the Kraken Client at runtime.
- (Optional) Updating the `bootstrap.json` in the Kraken Client to point to the latest version of the API JAR file
- (Optional) Updating the build.gradle file in the Kraken Client to use the latest version of the API JAR file

## 🛠 Built With

* [Java](https://www.java.org/) — Core language
* [Gradle](https://gradle.org/) — Build tool
* [RuneLite](https://runelite.net) — Used for as the backbone for the API

## 🔖 Versioning

We use [Semantic Versioning](http://semver.org/).
See the [tags on this repository](https://github.com/cbartram/kraken-api/tags) for available releases.