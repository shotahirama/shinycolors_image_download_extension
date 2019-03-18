chrome.extension.onMessage.addListener((request, sender, sendResponse)=> {
    var canvas = document.getElementsByTagName("canvas");
    if(canvas.length > 0){
        var c1 = canvas[0];
        var ms = c1.captureStream(60);
        var track = ms.getVideoTracks()[0];
        let imageCapture = new ImageCapture(track);
        var cc = c1.cloneNode();
        var dataURL = "";
        imageCapture.grabFrame().then((imageBitmap) => {
            cc.getContext('2d').drawImage(imageBitmap, 0, 0);
            cc.toBlob((blob)=>{
                var url = (window.URL || window.webkitURL);
                var dataUrl = url.createObjectURL(blob);
                track.stop();
                chrome.runtime.sendMessage({
                    type: "dataurl",
                    dataurl: dataUrl,
                    imagename: request.imagename,
                    directoryname: request.directoryname,
                });
            });
        }).catch(console.error);
    }
    sendResponse({});
});