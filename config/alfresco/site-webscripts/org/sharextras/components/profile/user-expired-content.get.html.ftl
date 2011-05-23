<#include "/org/sharextras/components/expired-content.lib.ftl">

<#function dateFormat date><#return date?string(msg("date-format.defaultFTL"))></#function>

<#macro formatContent content date type index>
   <#if content.browseUrl??>
   <li<#if (index == 0)> class="first"</#if>>
      <@documentLink doc=content content="<img src=\"${url.context}/res/components/images/generic-file-32.png\" />" linkClass="thmb" />
      <p>
         <@documentLink doc=content linkClass="theme-color-1" />
         ${content.description?html}
         <span>${msg("label.modifiedOn", dateFormat(content.modifiedOn), "<a href=\"${url.context}/page/user/${content.modifiedByUser}/profile\" class=\"theme-color-1\">${content.modifiedByUser}</a>")}, ${msg("label.expiredOn", dateFormat(content.to))}</span>
         <#if content.path?has_content><span>${msg("label.path", content.path?html)}</span></#if>
      </p>
   </li>
   </#if>
</#macro>

<#assign el=args.htmlid>
<div id="${el}-body" class="profile">
   <div id="${el}-readview">
      <div class="viewcolumn">
         <div class="header-bar">${msg("label.expiredContent")}</div>
   <#if (numExpiredContent > 0)>
         <ul class="content">
      <#list expiredContent as content>
         <@formatContent content content.modifiedOn "modifiedOn" content_index />
      </#list>
         </ul>
   <#else>
         <p>${msg("label.noExpiredContent")}</p>
   </#if>
   </div>
</div>