<#macro documentLink doc, content="", linkClass="">
<#if content == "">
   <#local content=doc.displayName?html>
</#if>
<#if doc.site?has_content>
<#local siteName=doc.site.shortName>
<#if doc.type == "document">
<a href="/share/page/site/${siteName}/document-details?nodeRef=${doc.nodeRef}" title="${doc.displayName?html}" class="${linkClass}">${content}</a>
<#elseif doc.type == "wikipage">
<a href="/share/page/site/${siteName}/wiki-page?title=${doc.name}" title="${doc.displayName?html}" class="${linkClass}">${content}</a>
<#elseif doc.type == "link">
<a href="/share/page/site/${siteName}/links-view?linkId=${doc.name}" title="${doc.displayName?html}" class="${linkClass}">${content}</a>
<#elseif doc.type == "blogpost">
<a href="/share/page/site/${siteName}/blog-postview?container=${doc.container}&postId=${doc.name}" title="${doc.displayName?html}" class="${linkClass}">${content}</a>
<#elseif doc.type == "forumpost">
<a href="/share/page/site/${siteName}/discussions-topicview?container=${doc.container}&topicId=${doc.name}" title="${doc.displayName?html}" class="${linkClass}">${content}</a>
<#elseif doc.type == "datalistitem">
<a href="/share/page/site/${siteName}/data-lists?list=${doc.name}" title="${doc.displayName?html}" class="${linkClass}">${content}</a>
<#else>
<a href="/share/page/document-details?nodeRef=${doc.nodeRef}" title="${doc.displayName?html}" class="${linkClass}">${content}</a>
</#if>
<#else>
<a href="/share/page/document-details?nodeRef=${doc.nodeRef}" title="${doc.displayName?html}" class="${linkClass}">${content}</a>
</#if>
</#macro>

<#macro documentEditLink doc, content="">
<#if content == "">
   <#local content=doc.displayName?html>
</#if>
<#if doc.site?has_content>
<#local siteName=doc.site.shortName>
<#if doc.container == "documentLibrary">
<a href="/share/page/site/${siteName}/document-details?nodeRef=${doc.nodeRef}" title="${doc.displayName?html}">${content}</a>
<#else>
<a href="/share/page/document-details?nodeRef=${doc.nodeRef}" title="${doc.displayName?html}">${content}</a>
</#if>
<#else>
<a href="/share/page/document-details?nodeRef=${doc.nodeRef}" title="${doc.displayName?html}">${content}</a>
</#if>
</#macro>