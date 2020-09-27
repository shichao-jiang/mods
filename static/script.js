var video = document.querySelector("#videoElement");
var cloick = false;
var cyka = document.getElementById('timer');
var picture;
var tigger = 400;

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(function(stream) {
        video.srcObject = stream
        video.play();
    }).catch(function(error) {
        console.log(error);
    });
}

var imagee = document.getElementById('sadge'),
    sadge = imagee.getContext('2d');

document.getElementById('image').addEventListener('load', function() {
});



function disppic() {
    picture = sadge.drawImage(video, image.width / 2, image.height / 2, 200, 200, 0, 0, 28, 28);
}

function oink() {
    if (cloick === false) {
        cloick = true;
    } else {
        cloick = false;
    }
}

setInterval(() => {
    if (cloick === true) {
        tigger -= 1;
        if (tigger === 1) {
                sadge.scale(1, 1);
                picture = sadge.drawImage(video, 0, 0, 128, 128);

                function runPyScript(){
                  var jqXHR = $.ajax({
                      type: "POST",
                      url: "/upload/",
                      async: false,
                      data: { file: imagee.toDataURL("image/png", 0).split(",")[1]}
                  });

                  return jqXHR.responseText;
              }
              result = runPyScript();
              document.getElementById('outBox').innerHTML = result;
              if (result == "No Mask"){
                document.getElementById("outBox").style.color = "red";
                document.getElementById("outBox").style.border = "2px solid red";
            } else if (result == "Correct") {
                document.getElementById("outBox").style.color = "green";
                document.getElementById("outBox").style.border = "2px solid green";
            } else {
                document.getElementById("outBox").style.color = "black";
                document.getElementById("outBox").style.border = "2px dashed black";
            }
              tigger = 400;
        } 
        cyka.innerHTML = tigger / 1000;
    } 
    else {
        tigger = 400;
        cyka.innerHTML = tigger / 1000;
    }

}, 1);