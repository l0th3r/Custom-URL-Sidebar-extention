document.addEventListener("DOMContentLoaded", function(event) {
   console.log("open COSMO");
   document.title = chrome.i18n.getMessage("extName");
   iframe = document.createElement("iframe");
   iframe.src = chrome.i18n.getMessage("extPanelURL");
   iframe.target = '_top';
   document.body.appendChild(iframe);
   iframe.contentWindow.focus();
});