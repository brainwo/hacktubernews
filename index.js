// Copyright 2024 Brian Wo. All rights reserved
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

"use strict";

import fs from "node:fs";
import { getFilteredUrlFromFeed } from "./src/filter.js";
import { extract } from "@extractus/article-extractor";
import Mustache from "mustache";

const outputPath = "public";
const feedOutput = `${outputPath}/feed.xml`;
const pageOutput = `${outputPath}/index.html`;

const feedTemplate = fs.readFileSync("feed.xml.mustache", "utf8");
const pageTemplate = fs.readFileSync("index.html.mustache", "utf8");

const feedList = fs.readFileSync("feed_list.txt", "utf8").trim().split("\n");

/**
 * Fetch feeds and return filtered URLs mentioned in the feed
 * @param {string[]} feedList
 * @return {Promise<string[]>}
 */
function getNewsUrl(feedList) {
  return feedList.map(async (list) => {
    const response = await fetch(list);
    const text = await response.text();
    return getFilteredUrlFromFeed(text);
  });
}

/**
 * Render RSS using template and write it to `outputFile`
 * @param {ArticleData[]} rssItem
 */
function writeToFile(rssItem) {
  fs.writeFileSync(
    feedOutput,
    Mustache.render(feedTemplate, { items: rssItem })
  );
  fs.writeFileSync(
    pageOutput,
    Mustache.render(pageTemplate, {
      items: rssItem,
      hostname: function () {
        return this.url.split("/")[2];
      },
    })
  );
}

Promise.all(getNewsUrl(feedList))
  .then((source) => source.flat())
  .then((flattenData) =>
    Promise.all(
      [...flattenData.reduce((acc, curr) => acc.add(curr), new Set())].map(
        async (link) => {
          try {
            return {
              article: await extract(link["url"]),
              date: link["date"],
            };
          } catch (err) {
            return null;
          }
        }
      )
    )
      .then((rssItem) =>
        rssItem
          .filter((e) => e !== null)
          .sort(
            (a, b) =>
              new Date(b["date"]).getTime() - new Date(a["date"]).getTime()
          )
          .filter((e) => e["article"] !== null)
          .map((e) => e["article"])
      )
      .then((rssItem) => writeToFile(rssItem))
  );
