<#include "/org/sharextras/components/expired-content.lib.ftl">
<#function dateFormat date><#return date?string(msg("date-format.defaultFTL"))></#function>

<script type="text/javascript">//<![CDATA[
   new Alfresco.widget.DashletResizer("${args.htmlid}", "${instance.object.id}");
//]]></script>

<div class="dashlet">
   <div class="title">${msg("header.expiredContent")}</div>
   <div class="toolbar">
      <a href="${url.context}/page/user/${user.name}/user-expired-content" class="theme-color-1">${msg("link.fullReport")}</a>
   </div>
   <div class="body scrollableList" <#if args.height??>style="height: ${args.height}px;"</#if>>
   <#if (expiredContent?size > 0)>
   <#list expiredContent as result>
   <div class="detail-list-item<#if result_index=0> first-item</#if><#if !result_has_next> last-item</#if>">
            <div>
            <div class="icon">
               <img src="${url.context}/components/images/generic-file-32.png" alt="${result.name}">
            </div>
            <div class="details">
               <h4><@documentLink doc=result linkClass="theme-color-1" /></h4>
               <div>
                  ${msg("label.modified", "<a href=\"${url.context}/page/user/${result.modifiedByUser}/profile\" class=\"theme-color-1\">${result.modifiedByUser}</a>", dateFormat(result.modifiedOn))}
               </div>
            </div>
         </div>
   </div>
   </#list>
   <#else>
   <div class="detail-list-item first-item last-item">
   <span>${msg("message.noExpiredContent")}</span>
   </div>
   </#if>
   </div>
</div>
