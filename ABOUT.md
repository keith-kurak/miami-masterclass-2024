# Art Thing 2
A demo of Expo Router v3 with API Routes using the Cleveland Museum of Art Open Access API

App concept: you download this thing before visiting the museum to preview the art you'll see there and "fav" the works you would like to scope out when you visit.
## Stuff it does
- Lists departments inside the museum
- List all the works on display at the museum / where the API returns a photo for each department.
- Reads and writes "favorite" works.
- Shows all your favorited works on the "Favorites" tab.
- Shows directions and hours for the museum. If you visit the museum, let me know and I'll try to join you!
## Stuff inside
- The works of art themselves are pulled from the [Cleveland Museum of Art Open Access API](https://openaccess-api.clevelandart.org/), retrieved using TanStack query. You could use the API directly, but for reliability's sake, it's pulling from local files
- The favorites functionality is done with Expo Router API routes. Look for the +api files, one to get/ set claps for individual works, and another to read them all back for the Favorites tab. It's all going to a local data store (really just a text file) to keep things simple and self-contained.
## How to run the finished app
1. Switch to `final` branch (`main` has the beginning of the workshop)
1. Run `npm install`
2. Run `npx expo start`

## Keith's contact info
[Bird app](https://twitter.com/llamaluvr)
[LinkedIn](https://www.linkedin.com/in/keith-kurak/)
[Discord](https://chat.expo.dev)

