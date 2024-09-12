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
  "https://frontendmasters.com",
];

/**
 * @typedef {Object} FilteredUrl
 * @property {string} source
 * @property {string} url
 * @property {string} date
 */

/**
 * Return urls of article and what video it's from
 * @param {string} feed
 * @return {FilteredUrl[]}
 */
export function getFilteredUrlFromFeed(feed) {
  return JSON.parse(toJson(feed), { sanitize: false })
    ["feed"]["entry"].map((entry) => ({
      video: entry["media:group"]["media:content"]["url"],
      published: entry["published"],
      urls: extractUrls(`${entry["media:group"]["media:description"]}`),
    }))
    .flat()
    .reduce((acc, curr) => {
      if (typeof curr["urls"] === "undefined") return acc;
      curr["urls"]
        .filter(
          (url) =>
            !blockedUrls.some((e) => url.startsWith(e)) ||
            url.startsWith("https://www.youtube.com/watch") ||
            (url.includes("status") &&
              (url.includes("twitter.com") || url.includes("x.com")))
        )
        .forEach((url) =>
          acc.push({ source: curr.video, date: curr.published, url: url })
        );
      return acc;
    }, new Array());
}
