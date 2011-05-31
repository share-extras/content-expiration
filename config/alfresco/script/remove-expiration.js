/**
 * Remove the content expiration model from a content item or from all content items below a folder. This removes 
 * the aspects that are used by the model.
 * 
 * <p>This script should be placed in the Data Dictionary/Scripts space in the repository 
 * and can then be run against a folder item using Explorer's Run Action dialogue, or from
 * Share using the <a href="http://code.google.com/p/share-extras/wiki/ExecuteScriptAction">Execute Script add-on</a>.</p>
 */

/**
 * Remove the model from all items within a folder. The model is removed from content items only,
 * and the function then calls itself recursively against any sub-folders.
 * 
 * @param item  The folder to start in
 * @return  null
 */
function executeAction(item)
{
   if (item.isDocument)
   {
      // Remove metadata
      if (item.hasAspect("cm:effectivity"))
      {
         item.removeAspect("cm:effectivity");
      }
      
      if (item.hasAspect("pl:status"))
      {
         item.removeAspect("pl:status");
      }
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
 * Main script entry point
 * 
 * @return  null
 */
function main()
{
   executeAction(document || space);
}
main();