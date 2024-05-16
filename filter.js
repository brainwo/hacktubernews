// Copyright © 2024 Brian Wo <45139213+brainwo@users.noreply.github.com>
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
