
const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    if(detections.length > 0) {

       let message = document.getElementsByClassName("message");
       for(let i=0;i<message.length;i++) {
          message[i].innerHTML="Started!"
       }

        let det = detections[0].expressions;
        Object.keys(det).forEach(emotion => {
          if(det[emotion] > 0.9) {
              //console.log(emotion);
            	snakeOnChange(emotion);
          }
        })
    } else {
      snakeOnChange("NOT DETECTING")
    }
  }, 500);
})