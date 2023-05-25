Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90,
});
camera=document.getElementById("camera");

Webcam.attach('#camera')
prediction_1="";
prediction_2="";
function TakeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>'
    }
  );
}

console.log('ml5 version', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/D3e69uCYE/model.json', modelLoaded);
function modelLoaded(){
    console.log("model loaded!");
}

function speak(){
    var synth =window.speechSynthesis;
    speak_data1="The first prediction is-"+prediction_1;
    speak_data2="The second prediction is-"+prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function Check() {
    img=document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}

function gotResult(error,results) {
if(error){
    console.error(error);
} else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    document.getElementById("result_emotion_name2").innerHTML=results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();
    if(results[0].label==happy){
        document.getElementById("update_emoji").innerHTML="&#128522;"
    }
    if(results[0].label==sad){
        document.getElementById("update_emoji").innerHTML="&#128546;"
    }
    if(results[0].label==angry){
        document.getElementById("update_emoji").innerHTML="&#128545;"
    }
    if(results[1].label==happy){
        document.getElementById("update_emoji2").innerHTML="&#128522;"
    }
    if(results[1].label==sad){
        document.getElementById("update_emoji2").innerHTML="&#128546;"
    }
    if(results[1].label==angry){
        document.getElementById("update_emoji2").innerHTML="&#128545;"
    }
}
}