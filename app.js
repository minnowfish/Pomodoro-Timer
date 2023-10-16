const bells = new Audio('bell.mp3');
const startBtn = document.querySelector('.btn-start')
const session = document.querySelector('.minutes')
const studyButton = document.querySelector('#study')
const breakButton = document.querySelector('#break')
const secondDiv = document.querySelector('.seconds');
const resetButton = document.querySelector('.reset');
let setTime = '25'
let myInterval;
let totalSeconds;
let state = 'stopped';
let study = 'True';

const changeToBreakPage = () =>{
 if (study == 'True'){
    study = 'False'
    clearInterval(myInterval)
    breakButton.style.backgroundColor = "#edf7fa";
    breakButton.style.color = "rgb(31, 31, 31)"
    studyButton.style.background = "none"
    studyButton.style.color = "#edf7fa"
    session.textContent = '05'
    secondDiv.textContent = '00'
    setTime = '05'

    state = 'stopped'
    startBtn.textContent = 'START'
    resetButton.style.display = 'none';
  }
}

const changeToStudyPage = () => {
  if (study == 'False'){
    study = 'True'
    clearInterval(myInterval)
    studyButton.style.backgroundColor = "#edf7fa";
    studyButton.style.color = "rgb(31, 31, 31)"
    breakButton.style.background = "none"
    breakButton.style.color = "#edf7fa"
    session.textContent = '25'
    secondDiv.textContent = '00'
    setTime = '25'

    state = 'stopped'
    startBtn.textContent = 'START'
    resetButton.style.display = 'none';
  }
}
const updateSeconds = () => {
  const minuteDiv = document.querySelector('.minutes');


  totalSeconds--;

  let minutesLeft = Math.floor(totalSeconds/60)
  let secondsLeft = totalSeconds % 60

  if (secondsLeft<10) {
    secondDiv.textContent = '0' + secondsLeft;
  } else {
    secondDiv.textContent = secondsLeft;
  }

  if (minutesLeft<10) {
    minuteDiv.textContent = '0' + `${minutesLeft}`;
  } else {
    minuteDiv.textContent = `${minutesLeft}`
  }


  if(minutesLeft === 0 && secondsLeft === 0){
    bells.play()
    clearInterval(myInterval)
  }
}

const resetTimer = () => { 
  const minuteDiv = document.querySelector('.minutes');
  const secondDiv = document.querySelector('.seconds');

  clearInterval(myInterval); 
  
  minuteDiv.textContent = setTime;
  secondDiv.textContent = "00"
  state = 'stopped';
  startBtn.textContent = 'Start';
  resetButton.style.display = 'none';
}

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent)
    resetButton.style.display = 'inline';

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

    resetButton.addEventListener('click', resetTimer)
  }

if (study == 'True') {
  studyButton.style.backgroundColor = "#edf7fa";
  studyButton.style.color = "rgb(31, 31, 31)"
}


startBtn.addEventListener('click', appTimer);
breakButton.addEventListener('click', changeToBreakPage)
studyButton.addEventListener('click', changeToStudyPage)

