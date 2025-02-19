const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`ช้าไปละไอโง่ ${correctWord.toUpperCase()} ไง มึงไปเริ่มที่คำใหม่เลย`)
        initGame(); //calling initGame function, so the game restart
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)]; //getting random object from words
    let wordArray = randomObj.word.split(""); //splitting each letter of random word
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); //getting random number
        //shuffling and swiping word Array letters randomly
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");//passing suffeled word as wordText
    hintText.innerText = randomObj.hint; //passing random object hint as hint text
    correctWord = randomObj.word.toLowerCase(); //passing random word to correctWord
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    // console.log(randomObj);
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if(userWord !== correctWord) return alert(`ไอโง่มึงเขียนผิด! ไปเขียนให้ถูก`);
    alert(`เก่งมากไอควาย! ${userWord.toUpperCase()} ไปกันต่อ`);
    initGame();
}   
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);