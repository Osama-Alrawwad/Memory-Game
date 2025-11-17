let duration = 1000;
let blockContainer = document.querySelector(".game-blocks");
let blocks = Array.from(blockContainer.children);
let ordarRange = Array.from(Array(blocks.length).keys());
let btn = document.querySelector(".splash-screen span"),
  splashScreen = document.querySelector(".splash-screen"),
  nameInput = document.querySelector(".splash-screen input");
let timeLeft = 60;
let countdownEl = document.querySelector("#countdown span");
let resStr = "";
let restartBtn = document.querySelector(".restart-screen .restart");
let resText = document.querySelector(".restart-screen h2 span");
let trise = document.querySelector(".data-info .tries span");
let timerInterval;
nameInput.focus();

btn.onclick = function () {
  let yourName = nameInput.value;
  if (yourName == null || yourName == "") {
    yourName = "Unknown";
    document.querySelector(".data-info .name span").innerHTML = yourName;
  } else {
    document.querySelector(".data-info .name span").innerHTML = yourName;
  }
  splashScreen.style.display = "none";
  blocks.forEach((block, index) => {
    block.classList.add("is-flipped");
  });
  let Show_card = setTimeout(() => {
    blocks.forEach((block, index) => {
      block.classList.remove("is-flipped");
    });
  }, duration / 2);
  startTimer();
};

shuffle(ordarRange);
blocks.forEach((block, index) => {
  block.style.order = ordarRange[index];
  block.addEventListener("click", () => {
    flipped(block);
  });
});
function flipped(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let checkFlipped = blocks.filter((ele) =>
    ele.classList.contains("is-flipped")
  );
  if (checkFlipped.length === 2) {
    //stop
    stopClick();
    cheackMath(checkFlipped[0], checkFlipped[1]);
  }
}
function shuffle(array) {
  let cur = array.length,
    temp,
    rand;
  while (cur > 0) {
    rand = Math.floor(Math.random() * cur);
    cur--;
    temp = array[cur];
    array[cur] = array[rand];
    array[rand] = temp;
  }
  return array;
}
function stopClick() {
  blockContainer.classList.add("no-click");
  setTimeout(() => {
    blockContainer.classList.remove("no-click");
  }, duration);
}
function cheackMath(firstBlock, secuondBlock) {
  if (firstBlock.dataset.pic === secuondBlock.dataset.pic) {
    firstBlock.classList.remove("is-flipped");
    secuondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("is-match");
    secuondBlock.classList.add("is-match");
  } else {
    trise.innerHTML = parseInt(trise.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secuondBlock.classList.remove("is-flipped");
    }, duration);
  }
  if (parseInt(trise.innerHTML) >= 10) {
    resStr = "lose";
    resultFinish(resStr);
  }
  let isFinished = blocks.every((block) =>
    block.classList.contains("is-match")
  );
  if (isFinished) {
    resStr = "Win";
    resultFinish(resStr);
  }
}

function resultFinish(resStr) {
  clearInterval(timerInterval);
  blocks.forEach((block) => block.classList.remove("is-match"));
  document.querySelector(".restart-screen").style.display = "flex";
  if (resStr === "Win") {
    resText.innerHTML = resStr;
    resText.style.color = "green";
  } else {
    resText.innerHTML = resStr;
    resText.style.color = "red";
  }
  document.querySelector(".restart-screen h3 span").innerHTML =
    trise.textContent;
  restartBtn.addEventListener("click", () => location.reload());
}
function startTimer() {
  timerInterval = setInterval(() => {
    countdownEl.innerHTML = timeLeft < 10 ? "0" + timeLeft : timeLeft;
    timeLeft--;
    if (timeLeft < 10) {
      countdownEl.style.color = "red";
    }
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      resStr = "Lose";
      resultFinish(resStr);
    }
  }, 1000);
}

