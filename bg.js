chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(tab.url.includes('https://shinycolors.enza.fun/')){
    // || tab.url.includes('https://oregl.u-kon.pw/gl/18/')){
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

// async function callCapture(tab){
async function callCapture(){
    const useritem = await getSaveNamefromStorage();
    chrome.tabs.query({active: true, currentWindow: true}, results => {
        chrome.tabs.sendMessage(results[0].id, {
            imagename: useritem.SaveName,
            directoryname: useritem.DirectoryName,
        }, null);
    });
}

chrome.pageAction.onClicked.addListener(()=>{
    // chrome.tabs.getSelected(null, (tab) =>{
        // callCapture(tab);
    // });
    callCapture();
});

chrome.commands.onCommand.addListener(command => {
    if(command == 'capture_command'){
        // chrome.tabs.query({active: true, currentWindow: true}, results=>{
        //     if(results[0].url.includes('https://shinycolors.enza.fun/')){
        //         callCapture(results[0]);
        //     }
        // });
        callCapture();
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.type == "request_screenshot"){
        callCapture();
    } else if(message.type == "dataurl"){
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

chrome.runtime.onInstalled.addListener(()=>{
    chrome.contextMenus.create({
        title: 'ShinyColors ScreenShot',
        contexts: ['all'],
        id: 'ScreenShot',
        documentUrlPatterns: [
            'https://shinycolors.enza.fun/*'
            // 'https://oregl.u-kon.pw/gl/*'
        ]
    });
});

chrome.contextMenus.onClicked.addListener((itemData)=>{
    // chrome.tabs.query({active: true, currentWindow: true}, results=>{
        // callCapture(results[0]);
    // });
    callCapture();
});