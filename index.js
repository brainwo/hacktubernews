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

const feedTemplate = fs.readFileSync("templates/feed.xml.mustache", "utf8");
const pageTemplate = fs.readFileSync("templates/index.html.mustache", "utf8");

const feedList = fs.readFileSync("feed_list.txt", "utf8").trim().split("\n");

/**
 * @typedef {import("./src/filter.js").FilteredUrl} FilteredUrl
 */

/**
 * @typedef {Object} FlattenedUrl
 * @property {string} url
 * @property {string[]} dates
 * @property {string[]} sources
 */

/**
 * Fetch feeds and return filtered URLs mentioned in the feed
 * @param {string[]} feedList
 * @return {Promise<FilteredUrl[]>}
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
    Mustache.render(feedTemplate, {
      items: rssItem,
      updated: function () {
        return this.dates.at(-1);
      },
    })
  );
  fs.writeFileSync(
    pageOutput,
    Mustache.render(pageTemplate, {
      items: rssItem,
      hostname: function () {
        return this.article.url.split("/")[2];
      },
      shortTitle: function () {
        return this.article.title.split(/[|—–]/)[0].trim();
      },
    })
  );
}

/**
 * Flatten URLs into unique set
 * @param {FlattenedUrl} acc
 * @param {FilteredUrl} curr
 * @return {FlattenedUrl}
 */
function getUniqueUrl(acc, curr) {
  let prevSources = [];
  let prevDates = [];
  let dates = [];
  if (acc[curr["url"]] != undefined) {
    prevSources = acc[curr["url"]]["sources"];
    prevDates = acc[curr["url"]]["dates"];
    if (Date.parse(prevDates) < Date.parse(curr["date"])) {
      dates = [...prevDates, curr["date"]];
    } else {
      dates = [curr["date"], ...prevDates];
    }
  }
  acc[curr["url"]] = {
    url: curr["url"],
    sources: [...prevSources, curr["source"]],
    dates: dates.length === 0 ? [curr["date"]] : dates,
  };
  return acc;
}

Promise.all(getNewsUrl(feedList))
  .then((source) => source.flat())
  .then((flattenData) =>
    Promise.all(
      [...Object.values(flattenData.reduce(getUniqueUrl, new Object()))].map(
        async (link) => {
          try {
            return {
              article: await extract(link["url"]),
              dates: link["dates"],
              sources: link["sources"],
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
          .sort((a, b) => Date.parse(b["dates"][0]) - Date.parse(a["dates"][0]))
          .filter((e) => e["article"] !== null)
      )
      .then((rssItem) => writeToFile(rssItem))
  );
