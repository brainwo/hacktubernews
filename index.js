// Copyright 2024 Brian Wo. All rights reserved
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

"use strict";

import fs from "node:fs";
import { getFilteredUrlFromFeed } from "./filter.js";
import { extract } from "@extractus/article-extractor";
import Mustache from "mustache";

const outputFile = "feed.xml";

const feedTemplate = fs.readFileSync("feed_template.xml.mustache", "utf8");
const feedList = fs.readFileSync("feed_list.txt", "utf8").trim().split("\n");

function getNewsUrl(feedList) {
  return feedList.map(async (list) => {
    const response = await fetch(list);
    const text = await response.text();
    return getFilteredUrlFromFeed(text);
  });
}

function writeToFile(rssItem) {
  fs.writeFileSync(
    outputFile,
    Mustache.render(feedTemplate, { items: rssItem })
  );
}

Promise.all(getNewsUrl(feedList))
  .then((source) => source.flat())
  .then((flatten) =>
    Promise.all(
      [...new Set(flatten)].map(async (link) => {
        try {
          return await extract(link);
        } catch (err) {
          return null;
        }
      })
    )
      .then((rssItem) => rssItem.filter((e) => e !== null))
      .then((rssItem) => writeToFile(rssItem))
  );
