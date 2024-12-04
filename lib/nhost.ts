import { NhostClient } from "@nhost/nhost-js";

export const nhost = new NhostClient({
  subdomain: "localhost", // NHost subdomain
  region: "",             // Kosongkan jika self-host
});
