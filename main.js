var song = "";
left_wristX = 0;
left_wristY = 0;
right_wristX = 0;
right_wristY = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(750, 750);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', got_poses);
}

function modelLoaded(){
    console.log("PoseNet is initialized.");
}

function got_poses(results){
    if(results.length > 0){
        console.log(results);
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x = " + left_wristX + "left wrist y = " + left_wristY);
        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x = " + right_wristX + "Right wrist y = " + right_wristY);
    }

}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("purple");
    stroke("purple");

    if(score_left_wrist > 0){
        circle(left_wristX, left_wristY, 20);
        inNumberlefty = Number(left_wristY);
        remove_decimal = floor(inNumberlefty);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}