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

async function callCapture(tab){
    const useritem = await getSaveNamefromStorage();
    chrome.tabs.sendMessage(tab.id, {
        imagename: useritem.SaveName,
        directoryname: useritem.DirectoryName,
    }, null);
}

chrome.pageAction.onClicked.addListener(()=>{
    chrome.tabs.getSelected(null, (tab) =>{
        callCapture(tab);
    });
});

chrome.commands.onCommand.addListener(command => {
    if(command == 'capture_command'){
        chrome.tabs.query({active: true, currentWindow: true}, results=>{
            if(results[0].url.includes('https://shinycolors.enza.fun/')){
                callCapture(results[0]);
            }
        });
    }
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