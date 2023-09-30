const bells = new Audio('bell.mp3');
const startBtn = document.querySelector('.btn-start')
const session = document.querySelector('.minutes')
let myInterval;
let totalSeconds;
let state = 'stopped';

const updateSeconds = () => {
  const minuteDiv = document.querySelector('.minutes');
  const secondDiv = document.querySelector('.seconds');

  totalSeconds--;

  let minutesLeft = Math.floor(totalSeconds/60)
  let secondsLeft = totalSeconds % 60

  if (secondsLeft<10) {
    secondDiv.textContent = '0' + secondsLeft;
  } else {
    secondDiv.textContent = secondsLeft;
  }
  minuteDiv.textContent = `${minutesLeft}`

  if(minutesLeft === 0 && secondsLeft === 0){
    bells.play()
    clearInterval(myInterval)
  }
}

const resetTimer = () => { 
  const minuteDiv = document.querySelector('.minutes');
  const secondDiv = document.querySelector('.seconds');
  const showReset = document.querySelector('.reset');  

  clearInterval(myInterval); 
  
  minuteDiv.textContent = "25";
  secondDiv.textContent = "00"
  state = 'stopped';
  startBtn.textContent = 'Start';
  showReset.style.display = 'none';
}

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent)
    const showReset = document.querySelector('.reset');
    showReset.style.display = 'inline';

    if(state == 'stopped') {
      state = 'running';
      totalSeconds = sessionAmount * 60;
      startBtn.textContent = 'Pause';
      updateSeconds()
      myInterval = setInterval(updateSeconds, 1000);

    } else if(state == 'running'){
      state = 'paused';
      startBtn.textContent = 'Resume';
      clearInterval(myInterval)
      
    } else if (state == 'paused'){
      state = 'running';
      startBtn.textContent = 'Pause';
      myInterval = setInterval(updateSeconds, 1000);
    }

    showReset.addEventListener('click', resetTimer)
  }

startBtn.addEventListener('click', appTimer);
