document.addEventListener("DOMContentLoaded", () => {

  const herName = "Chocolate";
  const specialMoment = "that quiet night in november";

  const textEl = document.getElementById("text");
  const choicesEl = document.getElementById("choices");
  const bgMusic = document.getElementById("bgMusic");

  let musicStarted = false;

  function fadeInMusic() {
    bgMusic.volume = 0;
    bgMusic.play();

    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.4) {
        vol += 0.02;
        bgMusic.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 100);
  }

  function changeSceneText(newText, afterChange) {
    choicesEl.innerHTML = "";

    textEl.classList.remove("fade-in");
    textEl.classList.add("fade-out");

    setTimeout(() => {
      textEl.textContent = newText;
      textEl.classList.remove("fade-out");
      textEl.classList.add("fade-in");

      if (afterChange) afterChange();
    }, 400);
  }

  function startStory() {
    if (!musicStarted) {
      fadeInMusic();
      musicStarted = true;
    }

    changeSceneText(
      `That day, I saw you, ${herName}.
And for a moment… I froze.`,
      () => {
        const btn1 = document.createElement("button");
        btn1.textContent = "I walked toward you";
        btn1.onclick = walkToward;

        const btn2 = document.createElement("button");
        btn2.textContent = "I walked away";
        btn2.onclick = walkAway;

        choicesEl.appendChild(btn1);
        choicesEl.appendChild(btn2);
      }
    );
  }

  function walkToward() {
    changeSceneText(
      `You looked at me.
And somehow, everything felt quieter.`,
      () => {
        const btn = document.createElement("button");
        btn.textContent = "Continue";
        btn.onclick = doubtScene;
        choicesEl.appendChild(btn);
      }
    );
  }

  function walkAway() {
    changeSceneText(
      `I left.
Nothing happened.
And yet… something was missing.`,
      () => {
        const btn = document.createElement("button");
        btn.textContent = "Go back";
        btn.onclick = startStory;
        choicesEl.appendChild(btn);
      }
    );
  }

  function doubtScene() {
    changeSceneText(
      `Not everything after that was easy.
There were days I questioned myself.
Especially after ${specialMoment}.`,
      () => {
        const stayBtn = document.createElement("button");
        stayBtn.textContent = "I stayed";
        stayBtn.onclick = finalScene;

        const giveUpBtn = document.createElement("button");
        giveUpBtn.textContent = "I gave up";
        giveUpBtn.onclick = giveUpScene;

        choicesEl.appendChild(stayBtn);
        choicesEl.appendChild(giveUpBtn);
      }
    );
  }

  function giveUpScene() {
    changeSceneText(
      `This is where the story ends.
Too early.`,
      () => {
        const btn = document.createElement("button");
        btn.textContent = "Try again";
        btn.onclick = doubtScene;
        choicesEl.appendChild(btn);
      }
    );
  }

  function finalScene() {
    changeSceneText(
      `I realized something.
No matter how many times I rewind the story…
I still choose you.`,
      () => {
        const btn = document.createElement("button");
        btn.textContent = "Read this";
        btn.onclick = messageScene;
        choicesEl.appendChild(btn);
      }
    );
  }

  function messageScene() {
    changeSceneText(
      `I’m not perfect.
I don’t promise a flawless story.

But if I’m given a choice—
I’d still walk toward you.

Every time, ${herName}.`
    );
  }

  // === OPENING CINEMATIC ===
  setTimeout(() => {
    const beginBtn = document.createElement("button");
    beginBtn.textContent = "Begin";
    beginBtn.onclick = startStory;
    choicesEl.appendChild(beginBtn);
  }, 2000);

});
