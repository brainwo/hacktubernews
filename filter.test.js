// Copyright 2024 Brian Wo. All rights reserved
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

import { feed as theoFeed } from "./test_examples/theo";
import { feed as primeFeed } from "./test_examples/prime";
import { getFilteredUrlFromFeed } from "./filter.js";

test("Filter Theo feed", () =>
  expect(getFilteredUrlFromFeed(theoFeed)).toStrictEqual([
    "https://planetscale.com/blog/the-problem-with-using-a-uuid-primary-key-in-mysql",
    "https://www.youtube.com/watch?v=aWfYxg-Ypm4",
    "https://twitter.com/sebastienlorber/status/1783114423894233235",
    "https://github.com/facebook/react/pull/28896",
    "https://nextjs.org/docs/app/api-reference/functions/unstable_cache",
    "https://twitter.com/edgedatabase/status/1782485844814647402",
    "https://www.edgedb.com/blog/we-can-do-better-than-sql#null-a-bag-of-surprises",
    "https://twitter.com/ajassy/status/1785293612835823716",
    "https://twitter.com/leeerob/status/1785498474462560309",
    "https://github.blog/2024-04-29-github-copilot-workspace/",
    "https://supermaven.com/",
    "https://ielm.io/blog/turbo",
    "https://adrianroselli.com/2024/03/the-ultimate-ideal-bestest-base-font-size-that-everyone-is-keeping-a-secret-especially-chet.html",
    "https://nodejs.org/en/blog/release/v22.0.0",
    "https://openjsf.org/blog/nodejs-22-available",
    "https://nodejs.org/en/blog/announcements/v22-release-announce",
    "https://github.com/apple/corenet",
    "https://huggingface.co/collections/apple/openelm-pretrained-models-6619ac6ca12a10bd0d0df89e",
    "https://www.ftc.gov/news-events/news/press-releases/2024/04/ftc-announces-rule-banning-noncompetes",
    "https://www.hashicorp.com/blog/hashicorp-joins-ibm",
    "https://opentofu.org/blog/our-response-to-hashicorps-cease-and-desist/",
    "https://newsroom.ibm.com/2024-04-24-IBM-to-Acquire-HashiCorp-Inc-Creating-a-Comprehensive-End-to-End-Hybrid-Cloud-Platform",
    "https://react.dev/blog/2024/04/25/react-19",
    "https://lisyarus.github.io/blog/programming/2023/02/21/exponential-smoothing.html",
    "https://mrbruh.com/chattr/",
    "https://env.fail/posts/firewreck-1/",
    "https://kibty.town/blog/chattr/",
  ]));

test("Filter ThePrimeTime feed", () =>
  expect(getFilteredUrlFromFeed(primeFeed)).toStrictEqual([
    "https://www.youtube.com/watch?v=pnnx1bkFXng",
    "https://medium.com/@maciej.pocwierz/how-an-empty-s3-bucket-can-make-your-aws-bill-explode-934a383cb8b1",
    "https://breckyunits.com/ckmeans.html",
    "https://twitter.com/hyprturing/status/1784426156659453977",
    "https://www.theverge.com/2024/4/30/24145838/rabbit-r1-android-app-pixel-6a",
    "https://env.fail/posts/firewreck-1/",
    "https://www.youtube.com/watch?v=aWfYxg-Ypm4",
    "https://www.youtube.com/watch?v=pkotufZchjE&t=11s",
    "https://faultlore.com/blah/c-isnt-a-language/",
    "https://twitter.com/iavins/status/1774464622067679738",
    "https://www.youtube.com/watch?v=bP5uH7TWiUs",
    "https://www.freecodecamp.org/news/solid-principles-explained-in-plain-english/",
  ]));
