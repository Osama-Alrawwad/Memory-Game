let btn = document.querySelector(".splash-screen span");
btn.onclick = function () {
  let yourName = prompt("Whats Your Name");
  if (yourName == null || yourName == "") {
    yourName = "Unknown";
    document.querySelector(".data-info .name span").innerHTML = yourName;
  } else {
    document.querySelector(".data-info .name span").innerHTML = yourName;
  }
  document.querySelector(".splash-screen").remove();
};

let duration = 1000;
let blockContainer = document.querySelector(".game-blocks");
let blocks = Array.from(blockContainer.children);
let ordarRange = Array.from(Array(blocks.length).keys());

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
  let trise = document.querySelector(".data-info .tries span");
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
}
