<import resource="/org/sharextras/components/expired-content.lib.js">

model.expiredContent = [];

// read config - use default values if not found
var maxItems = 50,
    conf = new XML(config.script);
if (conf != null && conf["max-items"] != null)
{
   maxItems = parseInt(conf["max-items"]);
}
var result = remote.call("/extras/slingshot/user/" + encodeURIComponent(user.name) + "/expired-content?maxResults=50");
if (result.status == 200)
{
   // Create javascript objects from the server response
   var data = eval('(' + result + ')');
   
   // Create the template model
   model.expiredContent = processExpiredContentData(data, 50);
   model.numExpiredContent = model.expiredContent.length;
}
else
{
   model.html = "<p>An error occurred</p>";
}
