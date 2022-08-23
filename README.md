# Game Template

# **Important**: make sure to upgrade the `@play-co/*` dependencies to the latest versions after forking this template.

# Prerequisites

## Installing NodeJS v14

You can install NodeJS from there website here: https://nodejs.org/en/download/
Or you can use `nvm` and follow these instructions: https://nodejs.org/en/download/package-manager/#nvm

## Installing NPM v8

Node v14 ships with npm v6.X, you'll need npm v8 for peer dependency resolving, so upgrade it:

> npm i npm -g npm@8

## Installing FFMPEG

You can easily install FFMPEG with homebrew: `brew install ffmpeg`

## Installing ImageMagik

You can easily install ImageMagik with homebrew: `brew install imagemagick`

# Replicant

Replicant is our backend tech, check out the [Replicant repo] for more info.

To get a new project setup with a deployed backend, reach out to #coretech-support on Slack.

# Github Package Permissions

-   [Create a Personal Development Token](https://github.com/settings/tokens) that has the repo and read:packages permissions (note: only those two permissions)
-   Run npm login --registry=https://npm.pkg.github.com --scope=@play-co
    -   username: \<github username\>
    -   password: \<your token\>

### Basic Browser Simulator

1. `npm run start`
2. Browse to [Devkit Simulator]
3. To simulate more than one player, navigate to https://localhost:8020/webpack-dev-server/?profile=player1 (player1 can be replaced with any player id you like) (you may need to allow invalid certificates for resources loaded from localhost.)

Notes:

-   Simulates dev environment by default, see `configs/envs/developmentLocal`.
-   In this mode, we mock Facebook Instant Games, and store things like your PlayerID and platform storage in `localStorage`, where it can be edited to easily test specific scenarios or player states.
-   Clearing your `localStorage` is a quick and easy way to test the game as a brand new player.

### Facebook Browser Simulator

1. `npm run start:fb`
2. Browse to [Facebook Simulator]

Notes:

-   Simulates production environment by default, see `configs/envs/developmentFacebook`.
-   In this mode, you're able to test against your real Facebook account and player data; it's the closest you can come to testing in production without actually testing in production.
-   If you have any issues, check the [Facebook Local Server Guide].

### Building

See `package.json` for a list of available commands under the `scripts` section.
See the `configs/` folder for a list of environment files referenced in those scripts.

# Optional Integrations

## Airtable

Run `npm run airtable` to generate assets from Airtable data (see [the docs](https://docs.dev.gc-internal.net/airtable-config/index.html)). Edit `build-scripts/airtable.ts` for
more info.

## Figma

Run `npm run figma` to generate UI assets from Figma using [Pigma]. Edit the `figma` script in
`package.json` to set a different URL and other export options.

[amplitude]: https://analytics.amplitude.com/
[replicant repo]: https://github.com/play-co/replicant
[facebook api cheat sheet]: https://docs.google.com/spreadsheets/d/1PQh3Lj2JnXVRI39-GnBW4Udzsmt-1uA66IE-RBL0MUQ/edit?usp=sharing
[devkit simulator]: http://localhost:8000/
[facebook simulator]: https://www.facebook.com/embed/instantgames/1142363212765654/player?game_url=https://localhost:8000/
[facebook local server guide]: https://developers.facebook.com/docs/games/instant-games/test-publish-share
[pigma]: https://github.com/play-co/pigma
