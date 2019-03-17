chrome.extension.onMessage.addListener((request, sender, sendResponse)=> {
    var canvas = document.getElementsByTagName("canvas");
    // console.log(canvas.length);
    
    if(canvas.length >0){
        var c1 = canvas[0];
        var ms = c1.captureStream(1);
        // console.log(ms);
        var track = ms.getVideoTracks()[0];
        // console.log(track);
        let imageCapture = new ImageCapture(track);
        // console.log(imageCapture);
        var cc = c1.cloneNode();
        imageCapture.grabFrame().then((imageBitmap) => {
            // console.log('Grabbed frame:', imageBitmap);
            // cc = c1.cloneNode(true);
            cc.getContext('2d').drawImage(imageBitmap, 0, 0);
            cc.toBlob((blob)=>{
                // var w  = window.open('','');
                // w.document.title = "ScreenShot";
                // w.document.body.style.margin = 0;
                // var img = new Image();
                // img.src = window.URL.createObjectURL(blob);
                // w.document.body.appendChild(img);
                // console.log(blob);
                var url = (window.URL || window.webkitURL);
                var dataUrl = url.createObjectURL(blob);
                let a = document.createElement("a");
                a.href = dataUrl;
                a.download = "shinycolors_save.png";
                a.click();
            track.stop();
            });
        }).catch(console.error);
    }   
    sendResponse({hoge: "png"});
})