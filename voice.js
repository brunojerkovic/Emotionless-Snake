const btn = document.getElementById("but");
const content = document.getElementById("content");

try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;   //selects which one is avalible in out browsers
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        console.log("voice is activated");
    }

    recognition.onresult = function(event) {
        const current = event.resultIndex;

        const transcript = event.results[current][0].transcript.trim();

        let paragraphReset = document.getElementsByClassName("pVoice");
        for(let i=0;i<paragraphReset.length;i++) {
            paragraphReset[i].innerHTML = transcript;
        }
        
        let words = transcript.split(" ");
        for(let i=0;i<words.length;i++) {
            if(words[i]==="reset")
                init();
        }
        
    }
    
    recognition.start();

} catch(e) {
    alert("Stop using Internet Explorer. The year 2000 is long gone.");
}