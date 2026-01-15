document.addEventListener("DOMContentLoaded", () => {

  const herName = "Chocolate";
  const specialMoment = "that quiet night in november";

  const textEl = document.getElementById("text");
  const choicesEl = document.getElementById("choices");
  const bgMusic = document.getElementById("bgMusic");
  const hintEl = document.querySelector(".hint");
  const secretEl = document.querySelector(".secret");

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

  function resetTextState() {
    textEl.className = ""; // 🔥 RESET TOTAL
  }

  function changeSceneText(newText, afterChange) {
    choicesEl.innerHTML = "";
    resetTextState();

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
        addBtn("I walked toward you", walkToward);
        addBtn("I walked away", walkAway);
      }
    );
  }

  function addBtn(text, action) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = action;
    choicesEl.appendChild(btn);
  }

  function walkToward() {
    changeSceneText(
`You looked at me.
And somehow, everything felt quieter.`,
      () => addBtn("Continue", doubtScene)
    );
  }

  function walkAway() {
    changeSceneText(
`I left.
Nothing happened.
And yet… something was missing.`,
      () => addBtn("Go back", startStory)
    );
  }

  function doubtScene() {
    changeSceneText(
`Not everything after that was easy.
There were days I questioned myself.
Especially after ${specialMoment}.`,
      () => {
        addBtn("I stayed", finalScene);
        addBtn("I gave up", giveUpScene);
      }
    );
  }

  function giveUpScene() {
    changeSceneText(
`This is where the story ends.
Too early.`,
      () => addBtn("Try again", doubtScene)
    );
  }

  function finalScene() {
    changeSceneText(
`I realized something.
No matter how many times I rewind the story…
I still choose you.`,
      () => addBtn("Read this", messageScene)
    );
  }

  // === ENDING (MODE KHUSUS) ===
  function messageScene() {
    choicesEl.innerHTML = "";
    resetTextState();

    textEl.textContent =
`I’m not perfect.
I don’t promise a flawless story.

But if I’m given a choice—
I’d still walk toward you.

Every time, ${herName}.`;

    textEl.classList.add("ending");

    if (hintEl) {
      hintEl.classList.remove("hidden");
      setTimeout(() => hintEl.classList.add("show"), 1200);
    }
  }

  setTimeout(() => {
    addBtn("Begin", startStory);
  }, 2000);

  if (hintEl) {
    hintEl.addEventListener("click", () => {
      hintEl.classList.remove("show");
      hintEl.classList.add("hidden");

      if (secretEl) {
        secretEl.classList.remove("hidden");
        setTimeout(() => secretEl.classList.add("show"), 300);
      }

      // 🎬 FINAL CINEMATIC
    setTimeout(() => {
      fadeOutMusic();
      document.getElementById("fadeToBlack").classList.add("show");
    }, 3500);
    });
  }

});

function fadeOutMusic() {
  let vol = bgMusic.volume;
  const fade = setInterval(() => {
    if (vol > 0.02) {
      vol -= 0.02;
      bgMusic.volume = vol;
    } else {
      bgMusic.volume = 0;
      bgMusic.pause();
      clearInterval(fade);
    }
  }, 200);
}
