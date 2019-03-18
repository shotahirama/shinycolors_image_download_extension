chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(tab.url.includes('https://shinycolors.enza.fun/')){
        chrome.pageAction.show(tabId);
    }
});

function getSaveNamefromStorage() {
    return new Promise((resolve) => {
        chrome.storage.sync.get({
            SaveName: 'shinycolors_screenshot',
            DirectoryName: 'shinycolors_screenshot',
        }, (item) => {
            resolve(item);
        });
    });
}

chrome.pageAction.onClicked.addListener(()=>{
    chrome.tabs.getSelected(null, (tab) =>{
        (async() => {
            const useritem = await getSaveNamefromStorage();
            chrome.tabs.sendMessage(tab.id, {
                imagename: useritem.SaveName,
                directoryname: useritem.DirectoryName,
            }, null);
        })();
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.type == "dataurl"){
        var savedirectory = message.directoryname;
        if(savedirectory != ""){
            savedirectory += "/";
        }
        chrome.downloads.download({
            url: message.dataurl,
            filename: savedirectory + message.imagename + '.png'
        });
    }
});