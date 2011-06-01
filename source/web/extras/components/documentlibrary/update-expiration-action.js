/**
 * Document Library Sample Script action
 * 
 * @namespace Alfresco
 * @class Alfresco.doclib.Actions
 */
(function()
{
   /**
    * Name of the script below Data Dictionary/Scripts to execute, e.g. "my test script.js"
    */
   var JSCRIPT_NAME = "update-expiration.js";
   
   /**
    * Base name for message bundle strings used for success/failure messages. Messages should 
    * be defined in your own global message bundle.
    */
   var MSG_BASE = "update-expiration";
   
   /**
    * Name of the JavaScript function to be added to the Alfresco.doclib.Actions prototype,
    * e.g. onActionMyTestScript
    */
   var FN_NAME = "onActionUpdateExpiration";
   
   /**
    * Execute the update expiration script against a document.
    *
    * @method onActionUpdateExpiration
    * @param file {object} Object literal representing one or more file(s) or folder(s) to be actioned
    */
   Alfresco.doclib.Actions.prototype[FN_NAME] = function DL_onActionSampleScript(file)
   {
      var nodeRef = new Alfresco.util.NodeRef(file.nodeRef);
      
      this.modules.actions.genericAction(
      {
         success:
         {
            event:
            {
               name: "metadataRefresh"
            },
            message: this.msg("message." + MSG_BASE + ".success", file.displayName)
         },
         failure:
         {
            message: this.msg("message." + MSG_BASE + ".failure", file.displayName)
         },
         webscript:
         {
            name: "sample-script/node/{nodeRef}",
            method: Alfresco.util.Ajax.POST,
            params:
            {
               nodeRef: nodeRef.uri
            }
         },
         config:
         {
            requestContentType: Alfresco.util.Ajax.JSON,
            dataObj:
            {
               scriptName: JSCRIPT_NAME
            }
         }
      });
   };
})();
