<%*
const title = await tp.system.prompt("Article Title (This will be the file name)");
await tp.file.rename(title);
-%>
---
title: 
title_en:
pubDate: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
description:
tags: []
url: <% title.toLowerCase().replace(/\s+/g, '-') %>
---

# <!--en-->

this is English section.

# <!--ja-->

ここは日本語
