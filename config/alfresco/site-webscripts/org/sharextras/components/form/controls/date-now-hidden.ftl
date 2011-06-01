<#-- Renders a hidden date form field for edit and create modes -->
<#-- Render like 2010-05-02T19:47:00.000+01:00 -->
<#assign fieldValue = date>
<#if form.mode == "view">
   <div class="form-field">
      <div class="viewmode-field">
         <#if field.mandatory && field.value == "">
            <span class="incomplete-warning"><img src="${url.context}/res/components/form/images/warning-16.png" title="${msg("form.field.incomplete")}" /><span>
         </#if>
         <span class="viewmode-label">${field.label?html}:</span>
         <span class="viewmode-value"><#if field.value == "">${msg("form.control.novalue")}<#else>${xmldate(field.value)?string(viewFormat)}</#if></span>
      </div>
   </div>
<#elseif form.mode == "edit" || form.mode == "create">
   <input type="hidden" name="${field.name}" value="${fieldValue?string("yyyy-MM-dd'T'HH:mm:ss.SSS")}${fieldValue?string("Z")?substring(0,3)}:${fieldValue?string("Z")?substring(3)}" />
</#if>
