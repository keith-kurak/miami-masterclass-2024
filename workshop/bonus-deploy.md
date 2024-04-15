# BONUS: Deploy to web and mobile

### Goals
Deploy your universal frontend/backend app to the web, and deploy a native mobile frontend that uses the same backend to Android and iOS.

### Tasks
- Deploy your fullstack Expo Router app as an Express.js app
- Use EAS Build to build your mobile app
- Maybe also use EAS Update to update your mobile app code as fast (or maybe faster) as you would your web app

### Links
- [API Routes deployment](https://docs.expo.dev/router/reference/api-routes/#deployment) - Vercel and Netlify also supported.
- [EAS Build](https://docs.expo.dev/build/introduction/)

# How I did it

## Web deploy

1. Follow the Express.js guide
[Express.js deployment guide](https://docs.expo.dev/router/reference/api-routes/#express).

Follow these directions and you'll end up being able to run your web app in a local Express server. You could copy this to the cloud and it would work. But, which cloud?

2. Deploy to Fly.io
Web infra is generally over my head. A bunch of people on Reddit said that [Fly.io](https://fly.io/) was good for hosting Express apps, so I rolled with that.

I followed Fly's instructions for installing the `flyctl` CLI. Then I could run `flyctl launch` to login, setup the Fly project, and create the **Dockerfile** and **fly.toml** file.

This doesn't result in a working deployment right off the bat. This is because Fly's dockerfile is setup just fine for a dedicated Node app, but not for a universal app like ours.

3. Tweak Fly's defaults
Fly's Docker setup made assumptions that my Node.js app would run from an **app** folder, after being built in a **build** folder. Actually, it's built in a **dist** folder and **app** is used by the Expo Router routes, while the Node.js app is run from the root folder (via **server.js**). I also needed to adjust how the dependencies are installed, as Express and related dependencies are `devDependencies`, so they don't get included in the native app.

I could have been more efficient with this, but I kept things basic by making my working directory the root of my project. I copied everything over that wasn't ignored, restored __all__ dependencies, and ran a custom `start-server` NPM script (as `start` was already used by Expo for starting a dev server).

#### package.json
```diff
"scripts": {
+ "start-server": "node server.js",
+ "deploy-web": "npx expo export -p web && flyctl deploy"
```

#### Dockerfile
```go
# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.19.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /

# Set production environment
ENV NODE_ENV="production"

# Final stage for app image
FROM base

COPY --link . .

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
# Force NODE_ENV to development to install devDependencies, bringing in Express, etc.
RUN NODE_ENV=development npm ci

# RUN npx expo export -p web

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start-server" ]
```

**.dockerignore** already had a lot of sensible defaults (I'm guessing Fly copies it from **.gitignore**). I needed to remove **dist** from there, as I ran into a Tailwind-related build error when trying to run `npx expo export -p web` on Fly's Docker runner (we're looking into this). So, as you can see from my `deploy-web` command above, I run the web export locally and then deploy to Fly.

#### .dockerignore
```diff
- dist/
```

4. Other Fly.io stuff
Because my app is using local disk storage, I ran `flyctl storage create` and named a volume "storage". I added an entry to **fly.toml** to mount this:
```
[mounts]
  source = "storage"
  destination = "/storage"
```

If you didn't do this, the deploy of this app would still work, but the "database" would reset itself every time you redeployed.

**Try it:** Run `web-deploy`. Go to your new website! Frontend and backend should work.

## Mobile deploy

1. Setup Expo Application Services (EAS)

Create an account at [expo.dev](https://expo.dev), then `npm install -g eas-cli` to install the EAS CLI.

Run `eas build:configure`, and it'll:
- assign an EAS project ID in your **app.json**.
- create an **eas.json** file with common build profiles.

You can follow the [EAS Build](https://docs.expo.dev/build/introduction/) documentation for how to use these profiles to make test and production builds, including Apple credentials and deployment to TestFlight.

To test this quickly, I made a "pretend" production profile that built for Android APK and iOS simulator (allowing me to bypass most app signing):
```json
"production:pretend": {
  "distribution": "internal",
  "ios": {
    "simulator": true
  }
}
```

2. Set your web API URL
Update **app.json** with the `origin` URL that matches your newly-deployed website on Fly.io:
```json
 "plugins": [
  [
    "expo-router",
    {
      "origin": "https://miami-masterclass-2024.dev/"
    }
  ]
],
```

3. Run EAS Build

```
eas build --profile production:pretend --platform all
```
This will get your an iOS simulator build and an Android APK that you can install on a device or emulator. Run the app, and watch it use the API features that are built into the web app.

## EAS Update??

Wouldn't it be nice if we could update mobile app code as quickly as we do on web? Just push it to a file server, y'know? Well, we can by adding [EAS Update](https://docs.expo.dev/eas-update/introduction/) to the mix, which allows our mobile app to download new JavaScript code from the web when your app starts up.

## See the solution
Switch to branch: `03-api-routes-solution`

Also, [check out the PR](https://github.com/keith-kurak/miami-masterclass-2024/pull/4).