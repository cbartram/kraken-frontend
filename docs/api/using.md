# Using the API

The API is designed around RuneLite and as such expects to be running within the context of the RuneLite client. Trying to run
the API on its own will generally result it strange dependency errors with Guice or issues finding implementations for much of 
RuneLite's own API interfaces.

### API Design & Methodology

The Kraken API was designed from the ground up to leverage the software design pattern of dependency injection. This is the exact same
pattern adopted by RuneLite to ensure that plugins get exactly what they need to run from RuneLite and nothing more. As the developer you will
declare to your script what you need from the Kraken API and the dependencies will be directly injected into your script at runtime. For example a mining script
which clicks a rock may need information from the API for:

- Interacting with Game Object through the `GameObjectService`
- Checking if the inventory is full with the`InventoryService`
- Sleeping during downtime using the `SleepService`

```java
@Slf4j
public class ClickRockAction {

    @Inject
    private SleepService sleepService;
    
    @Inject
    private GameObjectService gameObjectService;
    
    @Inject
    private InventoryService inventoryService;
    

    @Subscribe
    private void onItemContainerChanged(ItemContainerChanged e) {
        if (e.getContainerId() == InventoryID.INV) {
            // ...
        }
    }
    
    public boolean performAction() {
        GameObject nearestRock = gameObjectService.findReachableObject("Iron rocks", true, 5, client.getLocalPlayer().getWorldLocation(), true, "Mine");

        if (nearestRock == null) {
            log.info("No available iron rocks found, waiting for respawn");
            return false;
        }
        
        if (gameObjectService.interact(nearestRock, "Mine")) {
            sleepService.sleepUntil(() -> context.isPlayerMining(client.getLocalPlayer()), RandomService.between(1200, 2000));
            return true;
        } else {
            return false;
        }
    }
     // ... 
}
```

Dependency injection ensures that your script classes remain lightweight, testable, and easy to debug.

### Script Structure

There are 2 main structures you can use for actually writing scripts with the Kraken API,
although, you can implement other ways of maintaining script state if you'd like!

1. Extending the basic `Script` class
2. Behavior Trees

#### Extending the Script Class

For simple plugins, most users will want to extend the `Script` class which provides helpful methods like `onStart()`, `onLoop()`, and `onEnd()` for
managing script state. You can opt to implement a Finite State Machine (FSM) pattern for your scripts where, when certain conditions are met
the script transitions to a state and performs an action. For example a mining script may have:

States:
- IDLE: Initial state, ready to begin mining
- FINDING_ROCKS: Searching for available mining rocks
- MOVING_TO_ROCKS: Walking to the selected mining location
- MINING: Actively mining ore from rocks
- INVENTORY_FULL: Inventory is full, need to bank
- MOVING_TO_BANK: Walking to the bank
- BANKING: Depositing ore into bank
- ERROR: Something went wrong, needs intervention

and governing logic like:

IDLE → FINDING_ROCKS → MOVING_TO_ROCKS → MINING → INVENTORY_FULL → MOVING_TO_BANK → BANKING → FINDING_ROCKS → ...

This approach has several benefits:

- Clear Logic Flow: Easy to understand and debug bot behavior
- Error Handling: Structured approach to handle failures
- Maintainability: Simple to add new states or modify existing ones
- Predictable Behavior: Bot actions are deterministic based on current state
- Logging: Easy to track state transitions for debugging

Extending the `Script` class gives you a blank slate to work with,
giving your freedom to determine how your script operates with the Kraken API.

#### Behavior Trees

As you move to making more complex scripts you may run into issues with large FSM's that make managing states difficult to debug. This is where Behavior Trees come
into play. Traditionally, behavior trees have been used to give depth to A.I. enemies in video games, however, the Kraken API includes a foundation for creating
scripts using Behavior Trees. This document won't cover the mechanics behind behavior trees in detail however, you can check out the [Kraken Example Mining Plugin](https://github.com/cbartram/kraken-example-plugin)
to see a fully implemented example of a Behavior tree based script.

Behavior trees are one of those things where you don't need them until you do. You may eventually get to a point in your script where the state transitions
become too complex and unwieldy to maintain which is why the Kraken API provides this programming paradigm to you!

### Packets & Reflection

When the API starts it will dynamically get the latest version of the Packet Utils jar file and load the plugin. This plugin
enables the API to use network packets to communicate directly with OSRS servers for an alternate way of interacting with the game client.

Most of the `Service` classes have two different methods for game interaction.
There are standard interaction methods like `interact()` and there are reflection interaction methods which will always end with `reflect`.
For example `wieldReflect()` will use reflection to wield the item instead of packets. Both means of interaction accomplish the same goal
using differing strategies. 
