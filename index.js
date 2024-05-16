// Copyright 2024 Brian Wo. All rights reserved
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

"use strict";

import fs from "node:fs";
import { getFilteredUrlFromFeed } from "./filter.js";
import { extract } from "@extractus/article-extractor";

const rssHeader =
  '<?xml version="1.0" encoding="UTF-8"?> <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0" xmlns:cc="http://cyber.law.harvard.edu/rss/creativeCommonsRssModule.html"> <channel> <title>Hacktuber News</title> <link>https://brainwo.github.io/hacktubernews</link> <description>Aggregate blog posts discussed in tech YouTube videos.</description>';
const rssFooter = "</channel></rss>";

const outputFile = "feed.xml";

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
    `${rssHeader}${rssItem
      .filter((rssItem) => rssItem != "")
      .join("")}${rssFooter}`
  );
}

Promise.all(getNewsUrl(feedList))
  .then((source) => source.flat())
  .then((flatten) =>
    Promise.all(
      [...new Set(flatten)].map(async (link) => {
        let result = "";
        try {
          const extractedData = await extract(link);
          if (extractedData != null) {
            result += "<item>";
            result += `<title>${extractedData.title}</title>`;
            result += `<description>${extractedData.description}</description>`;
            result += `<link>${link}</link>`;
            result += `<content:encoded><![CDATA[${extractedData.content}]]></content:encoded>`;
            result += "</item>";
          }
        } catch (err) {
        } finally {
          return result;
        }
      })
    ).then((rssItem) => writeToFile(rssItem))
  );
