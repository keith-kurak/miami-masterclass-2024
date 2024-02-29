# React Miami 2024 Masterclass: Expo Router
Workshop exercises for Web, Mobile, and API, All Together: Universal Full Stack Apps in Expo Router for React Miami 2024

## How to use this repo
1. Do the prerequisite setup steps below.
2. Clone this repo. You'll start working right on `main`.
3. Open up the **workshop** folder in this repo to see what to do. Start at module "01".
4. Do the modules.

# Prerequisites (do before workshop)

## Installation/ setup steps
(adapted from https://docs.expo.dev/get-started/installation/)
Bring your laptop! You will write code with it. If you regularly do JavaScript development, you likely have many of these installed on your machine already.

### Install Expo prerequisites
1. [Node.js LTS release](https://nodejs.org/en/) (version 18 or higher)
2. [Git](https://git-scm.com/). The [Github Desktop app](https://desktop.github.com/) installs this for you- that's what I use.
3. Highly recommended: [Visual Studio Code](https://code.visualstudio.com/download). Any text editor will do, but my examples will be in VS Code.
### Download Expo Go (highly-recommended)
7. Download the "Expo Go" app on your phone from the App Store or Play Store.
### Clone/fork the demo project and restore dependencies (recommended!)
*It's a good idea to restore dependencies in case the network goes wonky during the session! Fork AND clone the repo if you'd like to push anything you do to Github. Just cloning it is fine, too, if you just want to keep everything local.

9. Click "Fork" at the top of this page to fork the repo.
10. Clone your fork (easy way: click the green "Code" button, then "Open in Github Desktop").
11. `cd` to the folder and run `npm install`.
12. Run `npx expo login` and login with your Expo account.

## Considerations for specific setups
- Beyond installing tools like Node and Git, you should not need admin access on your machine.
- However, if you run into network, installation, or phone issues, this entire workshop can be done without a phone or simulator. You can run the app in your web browser instead of a phone.

## Platform-specific tips
#### Tips for Windows
- Expo instructions for Windows 11 (PowerShell and WSL-compatible): https://docs.expo.dev/get-started/installation/#windows-terminal-support

## Verifying that everything is working
We will walk through this during the workshop, but you can also try it ahead of time to be sure that everything is installed correctly.
(adapted from https://docs.expo.dev/get-started/create-a-new-app/ - see for troubleshooting tips)
1. In the demo project folder, run `npm install`.
2. Run `npx expo start`.
3. Scan the QR code in the terminal. On iOS, scan the code with the Camera app. On Android, scan the code with the Expo Go app.
4. Alternatively (or in addition to), you can press 'w' to run the app in your browser.
