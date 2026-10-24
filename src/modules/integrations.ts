import type { HttpEngine } from "../http-engine.js";
import type {
  AuthMePlayerInfo,
  BetterTeamsDetail,
  BetterTeamsListResponse,
  BetterTeamsSummary,
  CoreProtectLookupOptions,
  CoreProtectLookupResponse,
  DiscordSRVBroadcastResponse,
  DiscordSRVLinkedResponse,
  EssentialsPlayerHomesResponse,
  EssentialsPlayerInfo,
  EssentialsWarpsResponse,
  FastLoginPlayerInfo,
  GeyserPlayerInfo,
  GriefPreventionClaim,
  GriefPreventionClaimsResponse,
  LoginSecurityPlayerInfo,
  MythicMobSpawnOptions,
  MythicMobSpawnResponse,
  MythicMobsListResponse,
  NLoginPlayerInfo,
  PasswordCheckResult,
  PlanPlayerSummary,
  PlayerPointsBalanceResponse,
  PlayerPointsTransactionResult,
  ShopGuiListResponse,
  ShopGuiShopDetail,
  TabNametagResponse,
  WorldGuardRegion,
} from "../types/models.js";

export class AuthMeModule {
  constructor(private readonly http: HttpEngine) {}

  /** Gets AuthMe player auth details (registered, authenticated, lastIp, lastLoginTime). */
  getPlayerAuth(name: string): Promise<AuthMePlayerInfo> {
    return this.http.request("GET", `authme/player/${encodeURIComponent(name)}`);
  }

  /** Checks if the password matches the player's AuthMe password. */
  checkPassword(name: string, password: string): Promise<PasswordCheckResult> {
    return this.http.request(
      "POST",
      `authme/player/${encodeURIComponent(name)}/check-password`,
      { body: { password } },
    );
  }
}

export class FastLoginModule {
  constructor(private readonly http: HttpEngine) {}

  /** Checks if a player is running on a premium (Mojang-authenticated) account via FastLogin. */
  getPlayerInfo(name: string): Promise<FastLoginPlayerInfo> {
    return this.http.request("GET", `fastlogin/player/${encodeURIComponent(name)}`);
  }
}

export class NLoginModule {
  constructor(private readonly http: HttpEngine) {}

  /** Gets nLogin authentication and registration status for a player. */
  getPlayerAuth(name: string): Promise<NLoginPlayerInfo> {
    return this.http.request("GET", `nlogin/player/${encodeURIComponent(name)}`);
  }
}

export class LoginSecurityModule {
  constructor(private readonly http: HttpEngine) {}

  /** Gets LoginSecurity authentication and registration status for a player. */
  getPlayerAuth(name: string): Promise<LoginSecurityPlayerInfo> {
    return this.http.request("GET", `loginsecurity/player/${encodeURIComponent(name)}`);
  }
}

export class BetterTeamsModule {
  constructor(private readonly http: HttpEngine) {}

  /** Gets the team summary for a player by UUID or player name. */
  getPlayerTeam(uuidOrName: string): Promise<BetterTeamsSummary> {
    return this.http.request("GET", `betterteams/player/${encodeURIComponent(uuidOrName)}`);
  }

  /** Gets full details of a team by team name, including member list. */
  getTeam(name: string): Promise<BetterTeamsDetail> {
    return this.http.request("GET", `betterteams/team/${encodeURIComponent(name)}`);
  }

  /** Gets a paginated list of all teams. */
  getTeams(options: { page?: number; limit?: number } = {}): Promise<BetterTeamsListResponse> {
    return this.http.request("GET", "betterteams/teams", {
      query: { page: options.page, limit: options.limit },
    });
  }
}

export class EssentialsModule {
  constructor(private readonly http: HttpEngine) {}

  /** Gets a player's home coordinates and list from Essentials. */
  getPlayerHomes(name: string): Promise<EssentialsPlayerHomesResponse> {
    return this.http.request("GET", `essentials/player/${encodeURIComponent(name)}/homes`);
  }

  /** Gets all configured server warps from Essentials. */
  getWarps(): Promise<EssentialsWarpsResponse> {
    return this.http.request("GET", "essentials/warps");
  }

  /** Gets player state info from Essentials (nickname, afk, muted, jailed, godMode). */
  getPlayerInfo(name: string): Promise<EssentialsPlayerInfo> {
    return this.http.request("GET", `essentials/player/${encodeURIComponent(name)}/info`);
  }
}

export class GriefPreventionModule {
  constructor(private readonly http: HttpEngine) {}

  /** Gets all claims owned by a player by UUID. */
  getPlayerClaims(uuid: string): Promise<GriefPreventionClaimsResponse> {
    return this.http.request("GET", `claims/player/${encodeURIComponent(uuid)}`);
  }

  /** Gets claim details at a specific coordinate location. */
  getClaimAt(world: string, x: number, z: number): Promise<GriefPreventionClaim | null> {
    return this.http.request("GET", "claims", {
      query: { world, x, z },
    });
  }
}

export class DiscordSRVModule {
  constructor(private readonly http: HttpEngine) {}

  /** Gets Discord user ID linked to a Minecraft player UUID. */
  getLinked(uuid: string): Promise<DiscordSRVLinkedResponse> {
    return this.http.request("GET", `discordsrv/linked/${encodeURIComponent(uuid)}`);
  }

  /** Broadcasts a message to a Discord channel configured in DiscordSRV. */
  broadcast(message: string, channel: string = "global"): Promise<DiscordSRVBroadcastResponse> {
    return this.http.request("POST", "discordsrv/broadcast", {
      body: { message, channel },
    });
  }
}

export class PlayerPointsModule {
  constructor(private readonly http: HttpEngine) {}

  /** Gets points balance for a player UUID. */
  getBalance(uuid: string): Promise<PlayerPointsBalanceResponse> {
    return this.http.request("GET", `playerpoints/${encodeURIComponent(uuid)}/balance`);
  }

  /** Gives points to a player UUID. */
  pay(uuid: string, amount: number): Promise<PlayerPointsTransactionResult> {
    return this.http.request("POST", `playerpoints/${encodeURIComponent(uuid)}/pay`, {
      body: { amount },
    });
  }

  /** Deducts points from a player UUID. */
  take(uuid: string, amount: number): Promise<PlayerPointsTransactionResult> {
    return this.http.request("POST", `playerpoints/${encodeURIComponent(uuid)}/take`, {
      body: { amount },
    });
  }

  /** Sets points balance for a player UUID to an exact amount. */
  set(uuid: string, amount: number): Promise<PlayerPointsTransactionResult> {
    return this.http.request("POST", `playerpoints/${encodeURIComponent(uuid)}/set`, {
      body: { amount },
    });
  }
}

export class WorldGuardModule {
  constructor(private readonly http: HttpEngine) {}

  /** Gets all WorldGuard regions across all loaded worlds. */
  getAllRegions(): Promise<Record<string, WorldGuardRegion[]>> {
    return this.http.request("GET", "worldguard/regions");
  }

  /** Gets a specific WorldGuard region in a world. */
  getRegion(world: string, id: string): Promise<WorldGuardRegion> {
    return this.http.request(
      "GET",
      `worldguard/regions/${encodeURIComponent(world)}/${encodeURIComponent(id)}`,
    );
  }
}

export class PlanModule {
  constructor(private readonly http: HttpEngine) {}

  /** Gets analytics summary for a player from Player Analytics (Plan). */
  getPlayerSummary(uuid: string): Promise<PlanPlayerSummary> {
    return this.http.request("GET", `plan/player/${encodeURIComponent(uuid)}/summary`);
  }
}

export class GeyserModule {
  constructor(private readonly http: HttpEngine) {}

  /** Checks Bedrock status, XUID, and device info for a player via Geyser/Floodgate. */
  getPlayerInfo(uuid: string): Promise<GeyserPlayerInfo> {
    return this.http.request("GET", `geyser/player/${encodeURIComponent(uuid)}`);
  }
}

export class MythicMobsModule {
  constructor(private readonly http: HttpEngine) {}

  /** Gets all registered custom mob types from MythicMobs. */
  getMobs(): Promise<MythicMobsListResponse> {
    return this.http.request("GET", "mythicmobs/mobs");
  }

  /** Spawns a custom MythicMob at target location coordinates. */
  spawn(options: MythicMobSpawnOptions): Promise<MythicMobSpawnResponse> {
    return this.http.request("POST", "mythicmobs/spawn", {
      body: options,
    });
  }
}

export class TabModule {
  constructor(private readonly http: HttpEngine) {}

  /** Gets custom nametag prefix/suffix for a player from TAB. */
  getNametag(uuid: string): Promise<TabNametagResponse> {
    return this.http.request("GET", `tab/player/${encodeURIComponent(uuid)}/nametag`);
  }

  /** Sets custom nametag prefix/suffix for a player via TAB. */
  setNametag(
    uuid: string,
    options: { prefix?: string; suffix?: string },
  ): Promise<TabNametagResponse> {
    return this.http.request("POST", `tab/player/${encodeURIComponent(uuid)}/nametag`, {
      body: options,
    });
  }
}

export class CoreProtectModule {
  constructor(private readonly http: HttpEngine) {}

  /** Performs block and action history lookup via CoreProtect. */
  lookup(options: CoreProtectLookupOptions = {}): Promise<CoreProtectLookupResponse> {
    return this.http.request("GET", "coreprotect/lookup", {
      query: {
        time: options.time,
        user: options.user,
        limit: options.limit,
      },
    });
  }
}

export class ShopGuiModule {
  constructor(private readonly http: HttpEngine) {}

  /** Gets all configured shops from ShopGUIPlus. */
  getShops(): Promise<ShopGuiListResponse> {
    return this.http.request("GET", "shopgui/shops");
  }

  /** Gets details of a specific shop by shop ID from ShopGUIPlus. */
  getShop(id: string): Promise<ShopGuiShopDetail> {
    return this.http.request("GET", `shopgui/shop/${encodeURIComponent(id)}`);
  }
}

/**
 * Aggregates all external plugin integrations supported by NoxAeApi.
 */
export class IntegrationsModule {
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

  constructor(http: HttpEngine) {
    this.authme = new AuthMeModule(http);
    this.fastlogin = new FastLoginModule(http);
    this.nlogin = new NLoginModule(http);
    this.loginsecurity = new LoginSecurityModule(http);
    this.betterteams = new BetterTeamsModule(http);
    this.essentials = new EssentialsModule(http);
    this.griefprevention = new GriefPreventionModule(http);
    this.discordsrv = new DiscordSRVModule(http);
    this.playerpoints = new PlayerPointsModule(http);
    this.worldguard = new WorldGuardModule(http);
    this.plan = new PlanModule(http);
    this.geyser = new GeyserModule(http);
    this.mythicmobs = new MythicMobsModule(http);
    this.tab = new TabModule(http);
    this.coreprotect = new CoreProtectModule(http);
    this.shopgui = new ShopGuiModule(http);
  }
}
