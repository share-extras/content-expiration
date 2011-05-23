<#-- Renders a hidden date form field for edit and create modes only -->
<#-- Render like 2010-05-02T19:47:00.000+01:00 -->
<#assign fieldValue = date>
<#if form.mode == "edit" || form.mode == "create">
   <input type="hidden" name="${field.name}" value="${fieldValue?string("yyyy-MM-dd'T'HH:mm:ss.SSS")}${fieldValue?string("Z")?substring(0,3)}:${fieldValue?string("Z")?substring(3)}" />
</#if>
