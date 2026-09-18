import type { HttpEngine } from "../http-engine.js";
import type { IdentityInfo } from "../types/models.js";

/**
 * Wraps the /v1/identity/* routes.
 *
 * Resolves a username to its deterministic network-wide identityUuid and
 * returns whether the player has ever joined this backend server (along with
 * this server's localUuid).
 */
export class IdentityModule {
  constructor(private readonly http: HttpEngine) {}

  /**
   * Resolves a player's network-wide identity and local UUID status.
   *
   * Unlike players.resolve(name), this does NOT throw 404 if the player
   * has never joined this server. Instead, identityUuid is always computed
   * deterministically from the username, and hasPlayedBefore will be false
   * with localUuid: null.
   */
  get(name: string): Promise<IdentityInfo> {
    return this.http.request("GET", `identity/${encodeURIComponent(name)}`);
  }
}
