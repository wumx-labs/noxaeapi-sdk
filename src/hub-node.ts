import type { HttpRequester, HttpRequestOptions } from "./http-engine.js";
import { PlayersModule } from "./modules/players.js";
import { EconomyModule } from "./modules/economy.js";
import { ServerModule } from "./modules/server.js";
import { WorldsModule } from "./modules/worlds.js";
import { PluginsModule } from "./modules/plugins.js";
import { AdvancementsModule, PlaceholdersModule } from "./modules/misc.js";
import { LuckPermsModule } from "./modules/luckperms.js";
import { NoxAuthModule } from "./modules/noxauth.js";
import { IdentityModule } from "./modules/identity.js";
import { SkillsModule } from "./modules/skills.js";
import { LeaderboardModule } from "./modules/leaderboard.js";
import { NetworkModule } from "./modules/network.js";
import type { NetworkHubModule } from "./modules/network-hub.js";
import {
  IntegrationsModule,
  AuthMeModule,
  FastLoginModule,
  NLoginModule,
  LoginSecurityModule,
  BetterTeamsModule,
  EssentialsModule,
  GriefPreventionModule,
  DiscordSRVModule,
  PlayerPointsModule,
  WorldGuardModule,
  PlanModule,
  GeyserModule,
  MythicMobsModule,
  TabModule,
  CoreProtectModule,
  ShopGuiModule,
} from "./modules/integrations.js";

/**
 * An `HttpRequester` that never calls `fetch` itself — every `request()`
 * is rerouted through `NetworkHubModule.forward(nodeId, ...)`, which rides
 * the hub's existing WebSocket connection to that backend node instead of
 * hitting it over HTTP directly. This is the only piece that knows about
 * forwarding; every module built on top of it is unmodified and unaware
 * its calls aren't going straight out over the wire.
 */
class ForwardingHttpEngine implements HttpRequester {
  constructor(
    private readonly hubNetwork: NetworkHubModule,
    private readonly nodeId: string,
  ) {}

  request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    path: string,
    opts: HttpRequestOptions = {},
  ): Promise<T> {
    return this.hubNetwork.forward<T>(this.nodeId, method, path, opts);
  }
}

/**
 * A per-node view of a `NoxAeApiNetworkHubClient`, returned by its
 * `.node(id)` method. Exposes the exact same resource modules as a direct
 * `NoxAeApiClient` (`players`, `economy`, `server`, ...), so anything that
 * works against a backend server directly — including the CLI's reflection
 * based `<resource> <action>` dispatch — works identically here. The only
 * difference is every request rides the hub's existing connection to that
 * node (`network/forward`) instead of a direct HTTP call, so this works
 * even for nodes with no REST port reachable from wherever the CLI runs.
 *
 * Cheap to construct — doesn't validate that `nodeId` is currently
 * registered on the hub. Calls against an unregistered or offline node
 * fail the way `NetworkHubModule.forward` itself fails (typically 404 from
 * the hub, since it has nothing registered under that ID).
 *
 * No `connect()` here (unlike `NoxAeApiClient`) — a forwarded node has no
 * directly reachable `baseUrl` to open a second WebSocket against; console
 * tail / event streaming for a specific node isn't available through the
 * hub today.
 */
export class NoxAeApiHubNodeClient {
  readonly players: PlayersModule;
  readonly identity: IdentityModule;
  readonly economy: EconomyModule;
  readonly server: ServerModule;
  readonly worlds: WorldsModule;
  readonly plugins: PluginsModule;
  readonly advancements: AdvancementsModule;
  readonly placeholders: PlaceholdersModule;
  readonly luckperms: LuckPermsModule;
  readonly noxauth: NoxAuthModule;
  readonly skills: SkillsModule;
  readonly leaderboards: LeaderboardModule;
  readonly network: NetworkModule;

  /** Comprehensive external plugin integrations suite. */
  readonly integrations: IntegrationsModule;
  readonly authme: AuthMeModule;
  readonly fastlogin: FastLoginModule;
  readonly nlogin: NLoginModule;
  readonly loginsecurity: LoginSecurityModule;
  readonly betterteams: BetterTeamsModule;
  readonly essentials: EssentialsModule;
  readonly griefprevention: GriefPreventionModule;
  readonly discordsrv: DiscordSRVModule;
  readonly playerpoints: PlayerPointsModule;
  readonly worldguard: WorldGuardModule;
  readonly plan: PlanModule;
  readonly geyser: GeyserModule;
  readonly mythicmobs: MythicMobsModule;
  readonly tab: TabModule;
  readonly coreprotect: CoreProtectModule;
  readonly shopgui: ShopGuiModule;

  constructor(
    hubNetwork: NetworkHubModule,
    readonly nodeId: string,
  ) {
    const http = new ForwardingHttpEngine(hubNetwork, nodeId);
    this.players = new PlayersModule(http);
    this.identity = new IdentityModule(http);
    this.economy = new EconomyModule(http);
    this.server = new ServerModule(http);
    this.worlds = new WorldsModule(http);
    this.plugins = new PluginsModule(http);
    this.advancements = new AdvancementsModule(http);
    this.placeholders = new PlaceholdersModule(http);
    this.luckperms = new LuckPermsModule(http);
    this.noxauth = new NoxAuthModule(http);
    this.skills = new SkillsModule(http);
    this.leaderboards = new LeaderboardModule(http);
    this.network = new NetworkModule(http);

    this.integrations = new IntegrationsModule(http);
    this.authme = this.integrations.authme;
    this.fastlogin = this.integrations.fastlogin;
    this.nlogin = this.integrations.nlogin;
    this.loginsecurity = this.integrations.loginsecurity;
    this.betterteams = this.integrations.betterteams;
    this.essentials = this.integrations.essentials;
    this.griefprevention = this.integrations.griefprevention;
    this.discordsrv = this.integrations.discordsrv;
    this.playerpoints = this.integrations.playerpoints;
    this.worldguard = this.integrations.worldguard;
    this.plan = this.integrations.plan;
    this.geyser = this.integrations.geyser;
    this.mythicmobs = this.integrations.mythicmobs;
    this.tab = this.integrations.tab;
    this.coreprotect = this.integrations.coreprotect;
    this.shopgui = this.integrations.shopgui;
  }
}
