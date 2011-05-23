function processExpiredContentData(data, maxItems)
{
   var store = [],
      contents = data.items,
      item;
   
   for (var i = 0, len = contents.length; i < len; i++)
   {
      item = contents[i];
      if (store.length < maxItems)
      {
         // convert createdOn, modifiedOn and to fields to date
         if (item.createdOn)
         {
            item.createdOn = new Date(item.createdOn);
         }
         if (item.modifiedOn)
         {
            item.modifiedOn = new Date(item.modifiedOn);
         }
         if (item.to)
         {
            item.to = new Date(item.to);
         }
         if (!item.browseUrl)
         {
            switch (item.type)
            {
               case "document":
                  item.browseUrl = "document-details?nodeRef=" + item.nodeRef;
                  break;
               case "blogpost":
                  item.browseUrl = "blog-postview?postId=" + item.name;
                  break;
               case "wikipage":
                  item.browseUrl = "wiki-page?title=" + item.name;
                  break;
               case "forumpost":
                  item.browseUrl = "discussions-topicview?topicId=" + item.name;
                  break;
               case "link":
                  item.browseUrl = "links-view?linkId=" + item.name;
                  break;
               case "datalistitem":
                  item.browseUrl = "data-lists?list=" + item.name;
                  break;
            }
         }
         store.push(item);
      }
   }
   
   return store;
}