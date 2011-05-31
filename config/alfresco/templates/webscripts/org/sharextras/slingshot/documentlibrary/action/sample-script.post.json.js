<import resource="classpath:/alfresco/templates/webscripts/org/alfresco/slingshot/documentlibrary/action/action.lib.js">

/**
 * Execute script against files action
 * @method POST
 */

/**
 * Entrypoint required by action.lib.js
 *
 * @method runAction
 * @param p_params {object} Object literal containing files array
 * @return {object|null} object representation of action results
 */
function runAction(p_params)
{
   var result,
      assetNode = p_params.destNode,
      scriptName = json.get("scriptName"),
      scriptResults,
      scriptNode;
   
   // Must have script name
   if (scriptName == null)
   {
      status.setCode(status.STATUS_BAD_REQUEST, "No script provided");
      return;
   }
   
   scriptResults = search.query({
      query: "PATH:\"/app:company_home/app:dictionary/app:scripts/cm:" + search.ISO9075Encode(scriptName) + "\"",
      language: "lucene"
   });
   if (scriptResults.length == 1)
   {
      scriptNode = scriptResults[0];
   }

   // Must have script node
   if (scriptNode == null)
   {
      status.setCode(status.STATUS_NOT_FOUND, "Script " + scriptName + " not found");
      return;
   }
   
   // Must have a single file
   if (!assetNode)
   {
      status.setCode(status.STATUS_BAD_REQUEST, "No file");
      return;
   }

   try
   {
      result =
      {
         nodeRef: assetNode.nodeRef,
         action: "execute-script",
         success: false
      }
      result.id = assetNode.name;
      result.type = assetNode.isContainer ? "folder" : "document";
      
      // Execute the JavaScript file against the node
      var scriptAction = actions.create("script");
      scriptAction.parameters["script-ref"] = scriptNode;
      scriptAction.execute(assetNode);
      
      result.success = true;
   }
   catch (e)
   {
      result.success = false;
   }

   return [result];
}

/* Bootstrap action script */
main();
