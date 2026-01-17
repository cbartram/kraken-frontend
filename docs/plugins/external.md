# External Plugins

External plugins are third party plugins developed using both the Kraken and RuneLite API's which run natively
on Kraken's client. This functionality enables the Kraken client to function as a platform enabling developers to
use the [open source API](https://github.com/cbartram/kraken-api) to create plugins for the client. 

External plugins in Kraken function very similarly to exteral plugins in RuneLite. This document covers both how
to use the Kraken external plugin system and how to create and share external plugins.

> **Note:** External plugins differ from sideloaded plugins in that they do not expose JAR files and are loaded
> directly from the Kraken client.

## Using External Plugins

External plugins are loaded from "repositories". Repositories are simply directories on remote servers which
store and serve RuneLite plugin JAR files. Adding a repository in the Kraken client will load all plugins associated
with that repository. To add a repository, navigate to the Kraken plugin in the sidebar and click the "External Plugins" tab. From
there, click the "Add Repository" button and enter the URL of the repository. 

![Add Repository](../images/add-repository.png)

Sometimes, repositories can be private and require authentication. Repository developers will need to provide you an authentication
token **they generate** to authenticate with their repository and load the plugins.

Once you add a repository, you will see a list of plugins in your Kraken client plugins list which belong to the loaded
repository.

![External Plugins](../images/external-plugins.png)

# External Plugin Development

The rest of this document covers how to create, sell, and host external plugin repositories.