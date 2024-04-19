# Module 01: Hello, Router!

### Goal
Run the app and start exploring file-based routing by adding a few routes of your own.

### Concepts
- Adding routes in Expo Router
- Navigating to routes in Expo Router
- How layout files can customize the behavior of routes

### Tasks
- Get the app running on your local machine, displaying on your phone, simulator, or web browser
- Add the "visit" route and push to it from the main tabs
- Add a second tab, "Favorites" and customize the icon

# Exercises

## Exercise 1: Add the "Visitors info" screen
<img src="./assets/01/add-modal.gif" alt="animated" width="200"/>
Let's add a screen- a simple static route that opens a screen with info about visiting the museum. There's already a button in the navbar. We just need to add the screen.

### What happens you navigate to a route that doesn't exist?
**Try out the button in the navbar.** What happens?

This could have been an error, but instead, Expo Router serves a fallback to an unmatched route from the **+not-found.tsx** file.

<!-- TODO: unmatched route syntax in template doesn't match docs, investigate: https://docs.expo.dev/router/error-handling/#unmatched-routes -->

### Add the missing route
The URL for the Visit screen will be `/visit`, so we need to add a file called **visit.tsx** to the root navigation folder (**/app**).

1. The new screen is premade for you in the **new-screens** folder. Copy **visit.tsx** to **app**.
2. **Try it**: Press the button in the navbar. Does the screen appear?

## Exercise 2: Add the "Favorites" tab.
It'll be pretty empty for now, but let's add a second tab that will eventually fill up with our "favorite" artwork, the stuff we want to see when we visit the museum.

Tabs aren't like your typical routes. Instead of pushing screens on top of each other with links (the default "stack" arrangement), they arrange themselves in a group where each tab can be accessed via a button in a bar. How does Expo Router know to arrange screens as tabs instead of a stack?

Two concepts make this happen:
- **route groups**: The parenthesis around `(tabs)` indicate that it's a route group. It's a way to indicate a relationship between routes without putting them in a folder that shows up as a segment of the URL.
- **layout files**: Each folder/group can have a **_layout.tsx** file. This is not its own route, but it is executed whenever the user navigates to a route inside the folder. It can define special rules about how to display the screens in the folder, code to execute prior to displaying the screen, etc.

In **app/(tabs)/_layout.tsx**, a tabs layout is defined and returned. This means that all the screens inside **(tabs)** will appear as tabs in the tab bar.

**Already see the tab?** If you're on the desktop web version, you might already see a favorites icon in the top left. I hastily-added a responsive layout that bypasses the tab bar. Shrink your window horizontally until you don't see that anymore, and this'll make more sense.

### Adding the tab
1. The new tab is premade for you in the **new-screens** folder. Copy **new-screens/(tabs)/two.tsx** to **app/(tabs)**.
2. **Try it out**: You should see a second tab and be able to navigate to it.

But... it's not named favorites, and the icon doesn't look right. Let's fix that.

### Sprucing up that tab
We can use the layout file to add information about how to display the new tab, including what icon to show.

Update **app/(tabs)/_layout.tsx** to define properties for the new tab:
```diff _layout.tsx
/>
+  <Tabs.Screen
+    name="two"
+    options={{
+      title: "Favorites",
+      tabBarIcon: ({ color }) => (
+        <TabBarIcon type="FontAwesome" name="star" color={color} />
+     ),
+    }}
+  />
</Tabs>
```

<details>
  <summary>Expand to just get just the added code for easy copying</summary>

  ```tsx
  <Tabs.Screen
   name="two"
   options={{
    title: "Favorites",
     tabBarIcon: ({ color }) => (
      <TabBarIcon type="FontAwesome" name="star" color={color} />
    ),
   }}
  />
  ```

</details>

**Try it**: Your tab should be called "Favorites" and should have a star icon now.

## See the solution
Switch to branch: `01-hello-router-solution`

## Next exercise
[Exercise 2](02-dynamic-routes.md)