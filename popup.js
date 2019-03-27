function save_options() {
    var savename = document.getElementById('savename').value;
    var directoryname = document.getElementById('directoryname').value;
    var status = document.getElementById('status');
    if(savename == ''){
        status.textContent = 'Empty savename';
    }else{
        chrome.storage.sync.set({
            SaveName: savename,
            DirectoryName: directoryname,
        }, function() {
            chrome.storage.sync.get({
                SaveName: 'shinycolors_screenshot',
                DirectoryName: 'shinycolors_screenshot',
            }, function(items) {
                document.getElementById('savename').value = items.SaveName;
                document.getElementById('directoryname').value = items.DirectoryName;
                document.getElementById('status').textContent = 'SAVE PATH: ' + items.SaveName +'/' + items.DirectoryName + '.png';
            });
        });
    }
}

function restore_options() {
    chrome.storage.sync.get({
        SaveName: 'shinycolors_screenshot',
        DirectoryName: 'shinycolors_screenshot',
    }, function(items) {
        document.getElementById('savename').value = items.SaveName;
        document.getElementById('directoryname').value = items.DirectoryName;
        document.getElementById('status').textContent = 'SAVE PATH: ' + items.SaveName +'/' + items.DirectoryName + '.png';
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('screenshot').addEventListener('click', () => {
    chrome.runtime.sendMessage({
        type: "request_screenshot"
    });
});