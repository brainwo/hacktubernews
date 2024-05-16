// Copyright 2024 Brian Wo. All rights reserved
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

import extractUrls from "extract-urls";
import { toJson } from "xml2json";

const blockedUrls = [
  "https://t3.gg",
  "https://youtube.com",
  "https://www.youtube.com",
  "https://discord.gg",
  "https://www.reddit.com",
  "https://bit.ly",
  "https://turso.tech",
  "https://twitch.tv",
  "https://boot.dev",
  "https://x.com",
  "https://twitter.com",
  "https://www.threads.net",
  "http://cleancoder.com",
];

export function getFilteredUrlFromFeed(feed) {
  return extractUrls(
    JSON.parse(toJson(feed), { sanitize: false })
      ["feed"]["entry"].map(
        (entry) => entry["media:group"]["media:description"]
      )
      .toString()
  ).filter(
    (url) =>
      !blockedUrls.some((e) => url.startsWith(e)) ||
      url.startsWith("https://www.youtube.com/watch") ||
      (url.includes("status") &&
        (url.includes("twitter.com") || url.includes("x.com")))
  );
}
