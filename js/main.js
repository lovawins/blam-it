const downloadButton = document.getElementById('btn-download');
const videoEl = document.getElementById('me');
const captureMsgEl = document.getElementById('captureMsg')
const filterBtn = document.getElementsByClassName('filterBtn')
// const countdownSeconds = document.getElementsByClassName('countdown')

function hideCountdown() {
  const countdownSeconds = document.getElementById('countdown')
  countdownSeconds.classList.add("hide");
}

function showCountdown() {
  const countdownSeconds = document.getElementById('countdown')
  countdownSeconds.classList.remove("hide");
}

hideCountdown()
removeFilterButtons();
hideDownloadBtn();
hideGoBack();

function countDown() {
  showCountdown() 
var seconds = document.getElementById("countdown").textContent;
var countdown = setInterval(function() {
    seconds--;
    document.getElementById("countdown").textContent = seconds;
    if (seconds <= 0) clearInterval(countdown);
}, 1000);
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js')
        .then(() => console.log('Registered service worker'))
        .catch((error) => console.log('Error register service worker ', error));
    }
}

registerServiceWorker(); 

// Denna funktion använder kameran och lägger in det i elementet #me
async function getMedia() {

    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true});
      const videoElem = document.querySelector('#me');
      videoElem.srcObject = stream;
      videoElem.addEventListener('loadedmetadata', () => {
        videoElem.play();
      })
    } catch (error) {
        console.log(error);
    }
  }

  function countdown() {
    countDown()
    setTimeout(function(){  captureImage(stream); }, 3000);
  }

  // Tar kort
async function captureImage(stream) {
    const mediaTrack = stream.getVideoTracks()[0];
    videoEl.remove()
    const captureImg = new ImageCapture(mediaTrack);
    const photo = await captureImg.takePhoto()
    const imgUrl = URL.createObjectURL(photo);
    document.querySelector('#photo').src = imgUrl;
    captureMsgEl.innerHTML = capturedMsg();
    hideCamera();
    hideCountdown() 
    showFilterBtns();
    showGoBack();
    showDownloadBtn();
  }

  document.querySelector('#addImage').addEventListener('click', event => {
    // Här ska nedräkningen läggas
      countdown()
})

function capturedMsg() {
let msg = ["Nice pic! Now try a filter &#128525;", "That's hot as Paris Hilton would have said. Try one of the filters now &#128526;" ,
"Cute pic babe! Add a filter and you're good to go. &#128527;",
"Wow, lookin good! Try a filter and it will be the cherry on the top &#128521;",
"Great shot! Now add a filter &#127752;",
"Ohlala! Try to add a filter and you will SLAY! &#127752;"
 ]
 const a = msg[Math.floor(Math.random() * msg.length )]
 return a; 
}
 
function goBack() {
  location.reload();
}

// FILTERS
function greyScale() {
    Caman("#photo", function () {
      this.revert()
        this.greyscale().render();
      });
    }

    // Ta bort filter 
    function removeFilter() {
      Caman("#photo", function () {
        this.revert()
      });
    }
    
    function gamma() {
      Caman("#photo", function () {
        this.revert()
        this.gamma(1.5).render();
        });
      }
  

      function sonnebrise() {
        Caman("#photo", function () {
          this.revert()
          this.brightness(10);
          this.contrast(20);
          this.render();
        });
      }

function emoKid() {
  Caman('#photo', function (){
    // this.revert()
    this.brightness(30);
    this.contrast(90);
    this.sepia(120);
    this.saturation(-90);
    this.render();
  });
}

function pinkBubbleGum() {
  Caman('#photo', function (){
    this.revert()
    this.brightness(40);
    this.contrast(90);
    this.sepia(120);
    this.saturation(-90);
    this.colorize("#FF69B4", 50);
    this.render();
  });
}

function greenBubbleGum() {
  Caman('#photo', function (){
    this.revert()
    this.brightness(40);
    this.contrast(90);
    this.sepia(120);
    this.saturation(-90);
    this.colorize("#39ff14", 50);
    this.render();
  });
}

function cottonCandy() {
  Caman("#photo", function () {
    // this.revert()
    this.brightness(15);
    this.colorize("#FF69B4", 50);
    this.render();
  });
}

function invert() {
  Caman("#photo", function () {
    this.revert()
    this.invert();
    this.colorize("#39ff14", 50);
    this.render();

  });
}


// kollar om offline: här ska  knappen disablas (doesnt make any sense though men stog i uppgiften att det skulle vara så lmao XD)
if (!navigator.onLine) {
}

if (navigator.onLine) {
downloadButton.addEventListener('click', () => {
    let canvas = document.getElementById("photo");
    let dataURL = canvas.toDataURL('image/png');
    downloadButton.href = dataURL;
});
}

function removeFilterButtons() {
const buttons = document.querySelectorAll('.filterBtn');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.add('hide');
}
};

function showFilterBtns() {
  const buttons = document.querySelectorAll('.filterBtn');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('hide');
}
}

function hideDownloadBtn() {
  let element = document.getElementById("btn-download");
  element.classList.add("hide");
}

function showDownloadBtn() {
  let element = document.getElementById("btn-download");
  element.classList.remove("hide");
}

function hideGoBack(){
  let btn = document.getElementById("goBack");
  btn.classList.add("hide");
} 

function showGoBack(){
  let btn = document.getElementById("goBack");
  btn.classList.remove("hide");
} 

function hideCamera() {
  let element = document.getElementById('addImage');
  element.parentNode.removeChild(element);
}

getMedia()
