/**
 * Updates the expiration model data on a content item.
 * 
 * <p>This script should be placed in the Data Dictionary/Scripts space in the repository 
 * so that it can be set to run automatically when content is updated, via an 'update' 
 * content rule. It can also be run against a folder item using Explorer's Run Action dialogue, or from
 * Share using the <a href="http://code.google.com/p/share-extras/wiki/ExecuteScriptAction">Execute Script add-on</a>.</p>
 */

/**
 * Main script entry point
 * 
 * @return  null
 */
function main()
{
   if (document.hasAspect("pl:status"))
   {
      validityPeriod = parseInt(document.properties["pl:validityPeriod"]);
      var day = 1000*60*60*24;
      var month = 7*4.35;
      var now = new Date();
      var then = new Date(now.getTime() + Math.floor(validityPeriod * month) * day);
      document.properties["cm:to"] = then;

      // Update owner if it does not exist
      if (!document.hasAspect("cm:ownable"))
      {
         document.addAspect("cm:ownable");
         document.properties["cm:owner"] = document.properties["cm:creator"];
      }
      
      document.save();
   }
}
main();