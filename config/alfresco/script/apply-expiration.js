/**
 * Add the content expiration model to a content item, or to all content items within a folder. This sets up 
 * the necessary aspects and populates properties with some initial values.
 * 
 * <p>This script should be placed in the Data Dictionary/Scripts space in the repository 
 * and can then be run against a folder item using Explorer's Run Action dialogue, or from
 * Share using the <a href="http://code.google.com/p/share-extras/wiki/ExecuteScriptAction">Execute Script add-on</a>.</p>
 * 
 * <p>It can also be set to run automatically when new content is added to a folder, via an 
 * 'inbound' content rule. This allows the expiration policy to be applied to new content items.</p> 
 */

/**
 * Default validity period in months
 */
var defaultValidityPeriod = "3M";

/**
 * Apply the model to a content item, or to all content items within a folder. For folders, 
 * the function calls itself recursively against any sub-folders.
 * 
 * @param item  The folder/document to start with
 * @return  null
 */
function processItem(item)
{
   if (item.isDocument)
   {
      processDocument(item);
   }
   else if (item.isContainer)
   {
      for (var i=0; i<item.children.length; i++)
      {
         processItem(item.children[i]);
      }
   }
}

/**
 * Apply the model to a specific document.
 * 
 * @param doc  Document to apply the model to
 * @return  null
 */
function processDocument(doc)
{
   var validityPeriod = defaultValidityPeriod;
   if (!doc.hasAspect("cm:effectivity"))
   {
      var day = 1000*60*60*24;
      var month = 7*4.35;
      var now = doc.properties.modified;
      var then = new Date(now.getTime() + parseInt(validityPeriod, 10) * month * day);
      var props = new Array(2);
      props["cm:from"] = now;
      props["cm:to"] = then;
      doc.addAspect("cm:effectivity", props);
   }
   
   if (!doc.hasAspect("pl:status"))
   {
      var props = new Array(2);
      props["pl:validityPeriod"] = validityPeriod;
      doc.addAspect("pl:status", props);
   }

   // Set document owner
   // document.setOwner() does not work for non-admin users, throws an exception
   // document.setOwner(person.properties.userName);
   if (!document.hasAspect("cm:ownable"))
   {
      document.addAspect("cm:ownable");
   }
   document.properties["cm:owner"] = person.properties.userName;
   document.save();
}

/**
 * Main script entry point
 * 
 * @return  null
 */
function main()
{
   processItem(space);
}
main();