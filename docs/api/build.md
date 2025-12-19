# Using the API

The API is packaged as a JAR file and will be required to be on your classpath in order for your plugins to reference it within RuneLite. You
generally have two options for this:

- Include the API in your build process and bundle the API as a "fat jar" in with your plugin classes
- Hijack the RuneLite bootstrap process as part of a launcher to pull in the API dependency when RuneLite starts

This document isn't intended to cover integrating the API into your plugin build and release process. The API will come packaged as a
standard JAR file. How you choose to integrate and provide the API to your plugins is up to your build process.

## Gradle Example (Simple)

Although we recommend using the [Github packages approach](#gradle-example-recommended) to access the API since it is more reliable, [Jitpack](https://jitpack.io/) can get you set up with
the Kraken API without a personal access token.

```groovy
plugins {
    id 'java'
    id 'application'
}

// Replace with the package version of the API you need
def krakenApiVersion = 'X.Y.Z'

allprojects {
    apply plugin: 'java'
    repositories {
        maven { url 'https://jitpack.io' }
    }
}


dependencies {
    compileOnly group: 'com.github.cbartram', name:'kraken-api', version: krakenApiVersion
    // ... other dependencies
}
```

## Gradle Example (Recommended)

To use the API jar file in your plugin project you will need to either:
- `export GITHUB_ACTOR=<YOUR_GITHUB_USERNAME>; export GITHUB_TOKEN=<GITHUB_PAT`
- or add the following to your `gradle.properties` file: `gpr.user=your-github-username gpr.key=your-personal-access-token`

More information on generating a GitHub Personal Access token can [be found below](#authentication).

###  Authentication

Since the API packages are hosted on [GitHub Packages](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages) you will
need to generate a [Personal Access Token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens?versionId=free-pro-team%40latest&productId=packages&restPage=learn-github-packages%2Cintroduction-to-github-packages) on GitHub
to authenticate and pull down the API.

You can generate a GitHub PAT by navigating to your [GitHub Settings](https://github.com/settings/personal-access-tokens)
and clicking "Generate new Token." Give the token a unique name and optional description with read-only access to public repositories. Store the token
in a safe place as it won't be viewable again. It can be used to authenticate to GitHub and pull Kraken API packages.

> :warning: Do **NOT** share this token with anyone.
> 
```groovy
plugins {
    id 'java'
    id 'application'
}


// Replace with the package version of the API you need
def krakenApiVersion = 'X.Y.Z'

allprojects {
    apply plugin: 'java'
    repositories {
        // You must declare this maven repository to be able to search and pull Kraken API packages
        maven {
            name = "GitHubPackages"
            url = uri("https://maven.pkg.github.com/cbartram/kraken-api")
            credentials {
                username = project.findProperty("gpr.user") ?: System.getenv("GITHUB_ACTOR")
                password = project.findProperty("gpr.key") ?: System.getenv("GITHUB_TOKEN")
            }
        }

        // Jitpack is an alternative means of accessing the API Jar file
        maven { url 'https://jitpack.io' }
    }
}


dependencies {
    compileOnly group: 'com.github.cbartram', name:'kraken-api', version: krakenApiVersion
    implementation group: 'com.github.cbartram', name:'shortest-path', version: '1.0.3'
    // ... other dependencies
}
```

## Maven Build Example

Here is an example of a Maven `pom.xml` using the Kraken API.

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="
           http://maven.apache.org/POM/4.0.0
           https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>kraken-client</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <!-- Replace with the package version of the API you need -->
        <kraken.api.version>X.Y.Z</kraken.api.version>
    </properties>

    <repositories>
        <repository>
            <id>github</id>
            <name>GitHubPackages</name>
            <url>https://maven.pkg.github.com/cbartram/kraken-api</url>
            <releases><enabled>true</enabled></releases>
            <snapshots><enabled>true</enabled></snapshots>
        </repository>
    </repositories>

    <dependencies>
        <dependency>
            <groupId>com.github.cbartram</groupId>
            <artifactId>kraken-api</artifactId>
            <version>${kraken.api.version}</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>com.github.cbartram</groupId>
            <artifactId>shortest-path</artifactId>
            <version>1.0.3</version>
        </dependency>
    </dependencies>
    
    <!-- Rest of your build goes here -->
    
    <!-- Configure GitHub Packages authentication -->
    <distributionManagement>
        <repository>
            <id>github</id>
            <name>GitHubPackages</name>
            <url>https://maven.pkg.github.com/cbartram/kraken-api</url>
        </repository>
    </distributionManagement>
</project>
```

Since Maven doesn't support inline credentials like Gradle does you will need to edit your `~/.m2/settings.xml` file with the following:

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                              https://maven.apache.org/xsd/settings-1.0.0.xsd">
  
  <servers>
    <!-- GitHub Packages authentication -->
    <server>
      <id>github</id>
      <username>${env.GITHUB_ACTOR}</username>
      <password>${env.GITHUB_TOKEN}</password>
    </server>
  </servers>

  <profiles>
    <profile>
      <id>github</id>
      <repositories>
        <repository>
          <id>github</id>
          <url>https://maven.pkg.github.com/cbartram/kraken-api</url>
          <releases><enabled>true</enabled></releases>
          <snapshots><enabled>true</enabled></snapshots>
        </repository>
      </repositories>
    </profile>
  </profiles>

  <activeProfiles>
    <activeProfile>github</activeProfile>
  </activeProfiles>
</settings>
```

## API Versioning

Each release of the API will publish a new semantic version. You can check the latest versions of the [API here](https://github.com/cbartram/kraken-api/releases).
