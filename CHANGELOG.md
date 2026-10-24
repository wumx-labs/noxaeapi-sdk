# Changelog — @wumx-labs/noxaeapi-sdk

All notable changes to the `@wumx-labs/noxaeapi-sdk` package will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/).

---

## [0.6.0] - 2026-10-24

### 🚀 Major Additions — 16 Plugin Integrations Suite
* Added comprehensive `IntegrationsModule` and direct client properties for all 16 supported external plugins:
  - **Auth Systems**:
    - `client.authme` (`client.integrations.authme`) — AuthMe Reloaded player info & password verification (`getPlayerAuth`, `checkPassword`).
    - `client.fastlogin` (`client.integrations.fastlogin`) — FastLogin premium/Mojang-verified status lookup (`getPlayerInfo`).
    - `client.nlogin` (`client.integrations.nlogin`) — nLogin player authentication & registration (`getPlayerAuth`).
    - `client.loginsecurity` (`client.integrations.loginsecurity`) — LoginSecurity auth details (`getPlayerAuth`).
  - **Teams & Guilds**:
    - `client.betterteams` (`client.integrations.betterteams`) — BetterTeams player team lookup (`getPlayerTeam`), team details (`getTeam`), and paginated team listings (`getTeams`).
  - **Server Utility**:
    - `client.essentials` (`client.integrations.essentials`) — EssentialsX player homes (`getPlayerHomes`), server warps (`getWarps`), and player status flags (`getPlayerInfo`).
    - `client.discordsrv` (`client.integrations.discordsrv`) — Discord linked account resolution (`getLinked`) and channel broadcasts (`broadcast`).
    - `client.plan` (`client.integrations.plan`) — Player Analytics (Plan) player session and telemetry summaries (`getPlayerSummary`).
    - `client.geyser` (`client.integrations.geyser`) — Geyser & Floodgate Bedrock player detection, XUID, and device info (`getPlayerInfo`).
    - `client.tab` (`client.integrations.tab`) — TAB nametag prefix/suffix retrieval (`getNametag`) and updates (`setNametag`).
  - **Economy & Region Protection**:
    - `client.playerpoints` (`client.integrations.playerpoints`) — PlayerPoints balance check (`getBalance`), points grant (`pay`), points deduction (`take`), and exact point setting (`set`).
    - `client.griefprevention` (`client.integrations.griefprevention`) — Player land claims (`getPlayerClaims`) and coordinate claim queries (`getClaimAt`).
    - `client.worldguard` (`client.integrations.worldguard`) — All world regions (`getAllRegions`) and region details (`getRegion`).
    - `client.coreprotect` (`client.integrations.coreprotect`) — Block and action history audit lookups (`lookup`).
    - `client.shopgui` (`client.integrations.shopgui`) — ShopGUIPlus shop catalogs (`getShops`) and shop item details (`getShop`).
  - **Custom Content**:
    - `client.mythicmobs` (`client.integrations.mythicmobs`) — Mob catalog listing (`getMobs`) and coordinate-based mob spawning (`spawn`).

### 📦 Types & Packaging
* Added strong TypeScript interfaces for all integration models in `src/types/models.ts`.
* Exported all new integration modules and types through the package root `src/index.ts`.
* Updated dual-format bundle builds: ESM (`dist/index.js`), CommonJS (`dist/index.cjs`), and TypeScript declaration files (`dist/index.d.ts`, `dist/index.d.cts`).

---

## [0.5.2] - 2026-10-23
* Added `IdentityModule` for resolving player network identities and local server UUIDs.
* Fixed native `fetch` binding in `HttpEngine` for non-Node runtimes.

---

## [0.5.0] - 2026-10-20
* Added `LuckPermsModule` for comprehensive player permission and group management.
* Added player profile one-call resolution in `LeaderboardModule`.
* Added `NoxAeApiNetworkHubClient` for NoxAeApi-Velocity network hub push architecture.
