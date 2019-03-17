chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(tab.url.includes('https://shinycolors.enza.fun/')){
        chrome.pageAction.show(tabId);
    }
});

chrome.pageAction.onClicked.addListener(()=>{
    chrome.tabs.getSelected(null, (tab) =>{
        chrome.tabs.sendMessage(tab.id, {action: "img"}, (response)=>{

        });
    });
});