// Copyright 2024 Brian Wo. All rights reserved
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

import fs from "node:fs";

import { getFilteredUrlFromFeed } from "./filter.js";

const theoFeed = fs.readFileSync("test_examples/theo.xml", "utf8").toString();
const primeFeed = fs.readFileSync("test_examples/prime.xml", "utf8").toString();

test("Filter Theo feed", () =>
  expect(getFilteredUrlFromFeed(theoFeed)).toStrictEqual([
    {
      source: "https://www.youtube.com/v/DhfeXfF_W4w?version=3",
      url: "https://playground.react.dev",
    },
    {
      source: "https://www.youtube.com/v/DhfeXfF_W4w?version=3",
      url: "https://react.dev/learn/react-compiler",
    },
    {
      source: "https://www.youtube.com/v/DhfeXfF_W4w?version=3",
      url: "https://www.youtube.com/watch?v=PYHBHK37xlE",
    },
    {
      source: "https://www.youtube.com/v/DhfeXfF_W4w?version=3",
      url: "https://github.com/facebook/react/pull/29061",
    },
    {
      source: "https://www.youtube.com/v/FFxhkWk3I7U?version=3",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Popover_API",
    },
    {
      source: "https://www.youtube.com/v/FFxhkWk3I7U?version=3",
      url: "https://twitter.com/chancethedev/status/1789037040161747361",
    },
    {
      source: "https://www.youtube.com/v/FFxhkWk3I7U?version=3",
      url: "https://web.dev/blog/popover-api",
    },
    {
      source: "https://www.youtube.com/v/FFxhkWk3I7U?version=3",
      url: "https://codepen.io/web-dot-dev/pen/RwOvjrv",
    },
    {
      source: "https://www.youtube.com/v/FFxhkWk3I7U?version=3",
      url: "https://developer.chrome.com/blog/anchor-positioning-api",
    },
    {
      source: "https://www.youtube.com/v/aOk67eT3fpg?version=3",
      url: "https://phoenixframework.org/blog/phoenix-liveview-1.0-released",
    },
    {
      source: "https://www.youtube.com/v/ZV7S337wJ18?version=3",
      url: "https://uploadthing.com",
    },
    {
      source: "https://www.youtube.com/v/ZV7S337wJ18?version=3",
      url: "https://medium.com/@maciej.pocwierz/how-an-empty-s3-bucket-can-make-your-aws-bill-explode-934a383cb8b1",
    },
    {
      source: "https://www.youtube.com/v/ZV7S337wJ18?version=3",
      url: "https://twitter.com/jeffbarr/status/1787844682216792163",
    },
    {
      source: "https://www.youtube.com/v/KuPu4OTIaT8?version=3",
      url: "https://twitter.com/StackOverflow/status/1787467736097939562",
    },
    {
      source: "https://www.youtube.com/v/KuPu4OTIaT8?version=3",
      url: "https://twitter.com/t3dotgg/status/1787596365008380306",
    },
    {
      source: "https://www.youtube.com/v/KuPu4OTIaT8?version=3",
      url: "https://observablehq.com/@ayhanfuat/the-fall-of-stack-overflow",
    },
    {
      source: "https://www.youtube.com/v/1gZmkpsVGkk?version=3",
      url: "https://danielnagy.me/posts/Post_tsr8q6sx37pl",
    },
    {
      source: "https://www.youtube.com/v/PAf6NjyCnrI?version=3",
      url: "https://twitter.com/acdlite/status/1785691330988986587",
    },
    {
      source: "https://www.youtube.com/v/a-K2C3sf1_Q?version=3",
      url: "https://planetscale.com/blog/the-problem-with-using-a-uuid-primary-key-in-mysql",
    },
    {
      source: "https://www.youtube.com/v/AKNH7mXciEM?version=3",
      url: "https://twitter.com/sebastienlorber/status/1783114423894233235",
    },
    {
      source: "https://www.youtube.com/v/AKNH7mXciEM?version=3",
      url: "https://github.com/facebook/react/pull/28896",
    },
    {
      source: "https://www.youtube.com/v/AKNH7mXciEM?version=3",
      url: "https://nextjs.org/docs/app/api-reference/functions/unstable_cache",
    },
    {
      source: "https://www.youtube.com/v/b23x_IWIb4c?version=3",
      url: "https://twitter.com/edgedatabase/status/1782485844814647402",
    },
    {
      source: "https://www.youtube.com/v/b23x_IWIb4c?version=3",
      url: "https://www.edgedb.com/blog/we-can-do-better-than-sql#null-a-bag-of-surprises",
    },
    {
      source: "https://www.youtube.com/v/Toar450Gk5Y?version=3",
      url: "https://twitter.com/ajassy/status/1785293612835823716",
    },
    {
      source: "https://www.youtube.com/v/Toar450Gk5Y?version=3",
      url: "https://twitter.com/leeerob/status/1785498474462560309",
    },
    {
      source: "https://www.youtube.com/v/75Hv0RUFIrQ?version=3",
      url: "https://github.blog/2024-04-29-github-copilot-workspace/",
    },
    {
      source: "https://www.youtube.com/v/75Hv0RUFIrQ?version=3",
      url: "https://supermaven.com/",
    },
    {
      source: "https://www.youtube.com/v/MS1W7UqrX3I?version=3",
      url: "https://ielm.io/blog/turbo",
    },
    {
      source: "https://www.youtube.com/v/rg3zgQ3xBRc?version=3",
      url: "https://adrianroselli.com/2024/03/the-ultimate-ideal-bestest-base-font-size-that-everyone-is-keeping-a-secret-especially-chet.html",
    },
  ]));

test("Filter ThePrimeTime feed", () =>
  expect(getFilteredUrlFromFeed(primeFeed)).toStrictEqual([
    {
      source: "https://www.youtube.com/v/cXw4mZZXJNU?version=3",
      url: "https://openai.com/index/hello-gpt-4o/",
    },
    {
      source: "https://www.youtube.com/v/T7WBIPSZ87g?version=3",
      url: "https://www.youtube.com/watch?v=0uQ3bkiW5SE",
    },
    {
      source: "https://www.youtube.com/v/fPYSh680ZBY?version=3",
      url: "https://www.youtube.com/watch?v=3obM5OaOpHQ",
    },
    {
      source: "https://www.youtube.com/v/ik-jAjYFVz0?version=3",
      url: "https://www.sophiajt.com/search-for-easier-safe-systems-programming/",
    },
    {
      source: "https://www.youtube.com/v/tvrZ5XraB7s?version=3",
      url: "https://sqlite.org/draft/whybytecode.html",
    },
    {
      source: "https://www.youtube.com/v/DucriSA8ukw?version=3",
      url: "https://www.youtube.com/watch?v=pnnx1bkFXng",
    },
    {
      source: "https://www.youtube.com/v/OWggTcVgiNg?version=3",
      url: "https://medium.com/@maciej.pocwierz/how-an-empty-s3-bucket-can-make-your-aws-bill-explode-934a383cb8b1",
    },
    {
      source: "https://www.youtube.com/v/KRD5jiYUOhk?version=3",
      url: "https://breckyunits.com/ckmeans.html",
    },
    {
      source: "https://www.youtube.com/v/Qatdg5bJCGE?version=3",
      url: "https://twitter.com/hyprturing/status/1784426156659453977",
    },
    {
      source: "https://www.youtube.com/v/ModLKm6nomk?version=3",
      url: "https://www.theverge.com/2024/4/30/24145838/rabbit-r1-android-app-pixel-6a",
    },
    {
      source: "https://www.youtube.com/v/P2gJdbb3Pec?version=3",
      url: "https://env.fail/posts/firewreck-1/",
    },
    {
      source: "https://www.youtube.com/v/P2gJdbb3Pec?version=3",
      url: "https://env.fail/about",
    },
    {
      source: "https://www.youtube.com/v/6SNQlSRAqAY?version=3",
      url: "https://www.youtube.com/watch?v=aWfYxg-Ypm4",
    },
  ]));
