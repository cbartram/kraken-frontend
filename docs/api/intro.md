<img alt="logo" height="128" src="../images/logo.png" width="128"/>

# API Access

The Kraken API, which powers all the Kraken plugins, is fully **open source** and [available here](https://github.com/cbartram/kraken-api)!
The Kraken plugins themselves are not open source for obvious reasons. More information on using the API can be found below.

The Kraken API is designed to extend the RuneLite API with additional client-interaction utilities for writing automation based plugins that are compatible with RuneLite. If you are
just looking to use pre-existing plugins, you can skip this document entirely and head over to our website at [kraken-plugins.com](https://kraken-plugins.com).

## Prerequisites
- [Java 11+](https://adoptium.net/) (JDK required)
- [Gradle](https://gradle.org/) (wrapper included, no need to install globally)
- [Git](https://git-scm.com/)
- [RuneLite](https://runelite.net) (for testing and running plugins)

## API Usage

The following RuneLite "plugin" is purely for an example of the API's capabilities and isn't a functioning full-fledged automation script.

```java
@PluginDescriptor(
        name = "Example",
        description = "Example plugin"
)
public class ExamplePlugin extends Plugin {
    
    @Inject
    private Context ctx;
    
    @Inject
    private BankService bank;
    
    @Inject
    private MovementService movement;
    
    @Inject
    private PrayerService prayer;
    
    @Subscribe
    private void onGameTick(GameTick e) {
      Player local = ctx.players().local().raw();
      
      if(local.isInteracting()) {
          return;
      }
      
      if(!bank.isOpen()) {
          // Open a bank
          ctx.gameObjects().withName("Bank booth").nearest().interact("Open");
      } else {
          // Withdraw a Rune Scimitar
          ctx.bank().nameContains("Rune scimitar").first().withdraw();
      }
      
      // Wield a Rune Scimitar
      ctx.equipment().withId(1333).first().wield();
      
      // Move to a new position
      movement.moveTo(new WorldPoint(1234, 5678));
      
      // Activate a protection prayer
      prayer.activatePrayer(Prayer.PROTECT_FROM_MELEE);
      
      // "Click" on a Goblin and attack it.
      ctx.npcs().withName("Goblin")
            .except(n -> n.raw().isInteracting())
            .nearest()
            .interact("Attack");
      
      
      // Take the goblin bones
      ctx.groundItems().reachable()
              .within(5)
              .filter(item -> item.name().equalIgnoreCase("bones"))
              .first()
              .take();
      
      // Bury the bones
      ctx.inventory().withName("Bones").first().interact("Bury");
    }
}
```

## Example API Plugin

To use the API in an actual RuneLite plugin, you should check out the [Kraken Example Plugin](https://github.com/cbartram/kraken-example-plugin)
which provides a complete, best-practice example of using the API within a RuneLite plugin to create a fully automated script. The example plugin
is a script that performs fully automated mining at the Varrock east mine. It supports:

- Mining iron ore
- Walking to the bank
- Opening the bank and banking the ore
- Walking back to the mine
- Repeating indefinitely

<iframe width="560" height="315" src="https://www.youtube.com/embed/nd9AM9aTinc?si=jQFcSG-GSu11K_Mv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

To set up your development environment, we recommend following [this guide on RuneLite's Wiki](https://github.com/runelite/runelite/wiki/Building-with-IntelliJ-IDEA).

Once you have the example plugin cloned and setup within Intellij, you can run the main class in `src/test/java/ExamplePluginTest.java` to run RuneLite with
the example plugin loaded in the plugin panel within RuneLite's sidebar.

![example-plugin](../images/example-plugin.png)

### Development Workflow

1. Fork the API and create a new branch from `main`
2. Implement or update your plugin/feature for the API
3. Add tests for new functionality to the API Testing plugin
4. Run `./gradlew build` to verify that the API builds and tests pass
5. Commit your changes with a clear message `git commit -m "feat(api): Add feature X to Kraken API"`
6. Open a Pull Request