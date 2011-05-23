<div class="form-field">
<#if field.value?? && field.value != "">
   <#if form.mode == "view">
      <div class="viewmode-field">
         <#if field.mandatory && !(field.value?is_number) && field.value == "">
            <span class="incomplete-warning"><img src="${url.context}/components/form/images/warning-16.png" title="${msg("form.field.incomplete")}" /><span>
         </#if>
         <span class="viewmode-label">${field.label?html}:</span>
         <span class="viewmode-value">
         <#if field.value?string=="3M">${msg("options.pl_validityPeriod.3M")}
         <#elseif field.value?string=="6M">${msg("options.pl_validityPeriod.6M")}
         <#elseif field.value?string=="9M">${msg("options.pl_validityPeriod.9M")}
         <#elseif field.value?string=="12M">${msg("options.pl_validityPeriod.12M")}
         <#else>${field.value?html}
         </#if>
         </span>
      </div>
   <#else>
      <label for="${fieldHtmlId}">${field.label?html}:<#if field.mandatory><span class="mandatory-indicator">${msg("form.required.fields.marker")}</span></#if></label>
      <select id="${fieldHtmlId}" name="${field.name}" tabindex="0"
             <#if field.control.params.styleClass?exists>class="${field.control.params.styleClass}"</#if>
             <#if field.description?exists>title="${field.description}"</#if>
             <#if field.disabled>disabled="true"</#if>>
         <option value="3M"<#if field.value?string=="3M"> selected="selected"</#if>>${msg("options.pl_validityPeriod.3M")}</option>
         <option value="6M"<#if field.value?string=="6M"> selected="selected"</#if>>${msg("options.pl_validityPeriod.6M")}</option>
         <option value="9M"<#if field.value?string=="9M"> selected="selected"</#if>>${msg("options.pl_validityPeriod.9M")}</option>
         <option value="12M"<#if field.value?string=="12M"> selected="selected"</#if>>${msg("options.pl_validityPeriod.12M")}</option>
      </select>
   </#if>
</#if>
</div>