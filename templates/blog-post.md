<%*
const title = await tp.system.prompt("Article Title (This will be the file name)");
await tp.file.rename(title);
-%>
---
title: 
title_en: <% title %>
pubDate: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
description:
tags: []
url: <% title.toLowerCase().replace(/\s+/g, '-') %>
---

<section lang="en">
this is English section.

</section>

<section lang="en">



</section>
<section lang="ja">
ここは日本語

</section>
<section lang="ja">



</section>
