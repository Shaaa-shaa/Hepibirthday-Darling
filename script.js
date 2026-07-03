"use strict";

/*
  Letters Between the Clouds
  HTML, CSS, and vanilla JavaScript only.

  Music note:
  Replace SONG_URL with an authorized hosted audio source.
  Direct download links may fail due to CORS, expiry, or copyright restrictions.
*/
const SONG_URL = "[masstamilan.dev](https://www.masstamilan.dev/downloader/Vorn9rvGBXmAWKpQzrHplw/1783189043/d128_cdn/8122/MjAwMTplNjg6NTQwNDoyMGU2OmUwMmE6NDEzMDo2ODc1OjgwZGE=)";

const pages = Array.from(document.querySelectorAll(".page"));
const sky = document.getElementById("sky");
const stars = document.getElementById("stars");
const sparkles = document.getElementById("sparkles");
const confettiLayer = document.getElementById("confetti");
const fireworksLayer = document.getElementById("fireworks");
const heartRain = document.getElementById("heartRain");
const transitionLayer = document.getElementById("cloudTransition");
const transitionText = document.getElementById("transitionText");
const toast = document.getElementById("toast");

const musicChoice = document.getElementById("musicChoice");
const playSongBtn = document.getElementById("playSongBtn");
const silentBtn = document.getElementById("silentBtn");
const musicPlayer = document.getElementById("musicPlayer");
const song = document.getElementById("song");
const toggleMusic = document.getElementById("toggleMusic");
const muteMusic = document.getElementById("muteMusic");

const startBtn = document.getElementById("startBtn");
const paperPlane = document.getElementById("paperPlane");
const bird = document.getElementById("bird");
const moon = document.getElementById("moon");

const memoryEnvelopeArea = document.getElementById("memoryEnvelopeArea");
const memoryReader = document.getElementById("memoryReader");
const memoryTitle = document.getElementById("memoryTitle");
const memoryText = document.getElementById("memoryText");
const nextMemoryBtn = document.getElementById("nextMemoryBtn");
const memoryDoneBtn = document.getElementById("memoryDoneBtn");

const stickyNotes = document.getElementById("stickyNotes");
const stickySecret = document.getElementById("stickySecret");

const candles = document.getElementById("candles");
const blowCandlesBtn = document.getElementById("blowCandlesBtn");
const afterCakeBtn = document.getElementById("afterCakeBtn");

const finalTypewriter = document.getElementById("finalTypewriter");
const finalMessage = document.getElementById("finalMessage");
const restartBtn = document.getElementById("restartBtn");

let currentPage = "landing";
let cloudClicks = 0;
let openedStickyCount = 0;
let idleTimer = null;
let typedBuffer = "";
let finalTyped = false;
let activeMemoryIndex = 0;
let openedMemories = 0;

const memories = [
  {
    title: "Our First Meeting",
    intro: "(It all began somewhere I never expected...)",
    text: [
      "It all began somewhere I never expected : a temple.",
      "Out of all the places in the world, that's where our paths first crossed. At that moment, neither of us knew that a simple meeting would slowly become one of the most meaningful chapters of our lives.",
      "Looking back now, it's funny how life quietly introduces people into our lives before we even realize how important they'll become.",
      "And honestly... if I could relive that day, I'd still choose it, knowing it would lead me to you."
    ]
  },
  {
    title: "The Tuition Staircase",
    text: [
      "I don't think anyone else would understand why a simple staircase means so much to me.",
      "We used to arrive 30 minutes early just to spend time together before tuition started.",
      "That staircase became our little world.",
      "We talked about everything and nothing at the same time.",
      "Those weren't just tuition days... they were our quiet little dates.",
      "And somehow, the simplest place became one of my favourite places in the world."
    ]
  },
  {
    title: "The First Hug",
    text: [
      "It happened inside a parked car.",
      "Nothing planned. Nothing special on the outside.",
      "But when you hugged me so tightly, everything inside me felt calm.",
      "Safe. Protected. At home.",
      "Even now, your hugs still feel like that.",
      "And every time we're apart, I find myself missing that feeling more than I can explain."
    ]
  },
  {
    title: "Our Movie Dates",
    text: [
      "You always think I'm not paying attention during movies.",
      "But the truth is... I'm usually paying more attention to you.",
      "I notice your small gestures, the way you hold my hand, your reactions, your quiet moments.",
      "Most of the movie becomes background noise.",
      "Because sitting next to you is always the best part."
    ]
  }
];

const stickyNoteData = [
  { emoji: "🧸", text: "I notice the way you always wait for me." },
  { emoji: "🩵", text: "I notice how your face lights up when you're excited." },
  { emoji: "🐣", text: "I notice how gently you hold my hand." },
  { emoji: "🕊️", text: "I notice how safe I feel around you." },
  { emoji: "☁️", text: "I notice the little things you don't even realize you're doing." },
  { emoji: "✨", text: "I notice how your little gestures stay in my heart." },
  { emoji: "🧸", text: "I notice how being around you makes everything softer." },
  { emoji: "🩵", text: "I notice how much I miss you even after a small goodbye." },
  { emoji: "🐣", text: "I notice how your smile changes my whole day." },
  { emoji: "☁️", text: "I notice how you became my favourite kind of peace." }
];

const finalLetterText = `Happy Birthday, my bebiiboyyy 🩵

Thank you for walking into my life and making ordinary moments feel extraordinary.

Thank you for every laugh, every hug, every conversation, every movie date and every little gesture that made me appreciate you a little more each day.

I hope this year brings you everything you've been working so hard for.

I hope you always find reasons to smile.

I hope life is gentle with you.

I hope you never forget how deeply loved you are.

No matter where life takes us...

One thing will always stay the same.

I'll always be cheering for you.

Happy Birthday, my favourite person. 🩵`;

function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.toggle("active", page.id === pageId);
  });

  currentPage = pageId;
  window.scrollTo({ top: 0, behavior: "smooth" });

  sky.classList.toggle("sunset", pageId === "letterSeven");
  sky.classList.toggle("night", pageId === "finalLetter" && finalTyped);

  if (pageId === "letterFive") {
    sky.style.filter = "saturate(0.88)";
  } else {
    sky.style.filter = "";
  }

  if (pageId === "finalLetter" && !finalTyped) {
    startFinalLetter();
  }
}

function cloudWipe(nextPageId, text = "") {
  transitionText.textContent = text || "";
  transitionLayer.classList.add("active");

  setTimeout(() => {
    showPage(nextPageId);
  }, 850);

  setTimeout(() => {
    transitionLayer.classList.remove("active");
  }, 2500);
}

function showToast(message, duration = 3200) {
  toast.textContent = message;
  toast.classList.remove("hidden");

  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.add("hidden");
  }, duration);
}

function createSparkles() {
  for (let i = 0; i < 55; i += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 9}s`;
    sparkles.appendChild(sparkle);
  }
}

function createStars() {
  for (let i = 0; i < 90; i += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    stars.appendChild(star);
  }
}

function launchConfetti(amount = 90) {
  const colors = ["#82CFFF", "#5DB8FF", "#FFFFFF", "#FFEBAA", "#C8E6FF"];

  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.width = `${6 + Math.random() * 8}px`;
    piece.style.height = `${8 + Math.random() * 12}px`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.9}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    confettiLayer.appendChild(piece);

    setTimeout(() => piece.remove(), 4800);
  }
}

function launchFireworks(amount = 8) {
  for (let i = 0; i < amount; i += 1) {
    setTimeout(() => {
      const firework = document.createElement("span");
      firework.className = "firework";
      firework.style.left = `${12 + Math.random() * 76}%`;
      firework.style.top = `${12 + Math.random() * 46}%`;
      fireworksLayer.appendChild(firework);

      setTimeout(() => firework.remove(), 1300);
    }, i * 220);
  }
}

function rainHearts(amount = 42) {
  for (let i = 0; i < amount; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart-piece";
    heart.textContent = "🩵";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${1.1 + Math.random() * 1.4}rem`;
    heart.style.animationDelay = `${Math.random() * 1.2}s`;
    heartRain.appendChild(heart);

    setTimeout(() => heart.remove(), 4800);
  }
}

function setupMusic() {
  song.src = SONG_URL;
  song.volume = 0.55;

  playSongBtn.addEventListener("click", async () => {
    musicChoice.classList.add("hidden");
    musicPlayer.classList.remove("hidden");

    try {
      await song.play();
      toggleMusic.textContent = "⏸";
    } catch (error) {
      toggleMusic.textContent = "▶";
      showToast("The song could not start from this link, but the journey can still continue. 🩵");
    }
  });

  silentBtn.addEventListener("click", () => {
    musicChoice.classList.add("hidden");
    musicPlayer.classList.remove("hidden");
    toggleMusic.textContent = "▶";
  });

  toggleMusic.addEventListener("click", async () => {
    if (song.paused) {
      try {
        await song.play();
        toggleMusic.textContent = "⏸";
      } catch (error) {
        showToast("This audio source may not allow playback here. Try an authorized embeddable source.");
      }
    } else {
      song.pause();
      toggleMusic.textContent = "▶";
    }
  });

  muteMusic.addEventListener("click", () => {
    song.muted = !song.muted;
    muteMusic.textContent = song.muted ? "🔇" : "🔊";
  });
}

function setupLanding() {
  startBtn.addEventListener("click", () => {
    const envelope = document.querySelector(".hero-envelope");
    envelope.classList.add("open");
    launchConfetti(70);

    setTimeout(() => {
      cloudWipe("letterOne");
    }, 950);
  });
}

function renderMemories() {
  memoryEnvelopeArea.innerHTML = "";

  memories.forEach((memory, index) => {
    const button = document.createElement("button");
    button.className = "memory-mini";
    button.type = "button";
    button.innerHTML = `
      <span class="mini-icon">💌</span>
      <span class="mini-title">${memory.title}</span>
    `;
    button.addEventListener("click", () => openMemory(index, button));
    memoryEnvelopeArea.appendChild(button);
  });
}

function openMemory(index, button) {
  activeMemoryIndex = index;
  const memory = memories[index];

  button.classList.add("opened");
  memoryTitle.textContent = memory.title;

  const intro = memory.intro ? `<p>${memory.intro}</p>` : "";
  memoryText.innerHTML = intro + memory.text.map((line) => `<p>${line}</p>`).join("");

  memoryReader.classList.remove("hidden");

  if (!button.dataset.counted) {
    button.dataset.counted = "true";
    openedMemories += 1;
  }

  nextMemoryBtn.textContent = openedMemories >= memories.length ? "🩵 Finish This Cloud →" : "🩵 Keep Floating →";
}

function setupMemories() {
  renderMemories();

  nextMemoryBtn.addEventListener("click", () => {
    memoryReader.classList.add("hidden");

    if (openedMemories >= memories.length) {
      memoryDoneBtn.classList.remove("hidden");
      launchConfetti(45);
      return;
    }

    const buttons = Array.from(document.querySelectorAll(".memory-mini"));
    const nextButton = buttons.find((button) => !button.dataset.counted);

    if (nextButton) {
      nextButton.focus();
      showToast("Another envelope is waiting for you. ☁️");
    }
  });

  memoryDoneBtn.addEventListener("click", () => {
    cloudWipe("letterThree");
  });
}

function renderStickyNotes() {
  stickyNotes.innerHTML = "";

  stickyNoteData.forEach((note, index) => {
    const button = document.createElement("button");
    button.className = "sticky-note";
    button.type = "button";
    button.style.setProperty("--tilt", `${index % 2 === 0 ? -2 : 2}deg`);
    button.innerHTML = `
      <span class="sticky-front">${note.emoji}</span>
      <span class="sticky-content">${note.text}</span>
    `;

    button.addEventListener("click", () => {
      if (!button.classList.contains("opened")) {
        button.classList.add("opened");
        openedStickyCount += 1;

        if (openedStickyCount === stickyNoteData.length) {
          stickySecret.classList.remove("hidden");
          rainHearts(30);
        }
      }
    });

    stickyNotes.appendChild(button);
  });
}

function setupCake() {
  for (let i = 0; i < 26; i += 1) {
    const candle = document.createElement("span");
    candle.className = "candle";
    candle.innerHTML = `<span class="flame"></span>`;
    candles.appendChild(candle);
  }

  blowCandlesBtn.addEventListener("click", () => {
    document.querySelectorAll(".candle").forEach((candle) => candle.classList.add("out"));
    launchConfetti(130);
    launchFireworks(9);
    sky.classList.add("sunset");
    blowCandlesBtn.classList.add("hidden");
    afterCakeBtn.classList.remove("hidden");
  });

  afterCakeBtn.addEventListener("click", () => {
    cloudWipe("finalLetter");
  });
}

function startFinalLetter() {
  finalTyped = true;
  finalTypewriter.textContent = "";
  finalMessage.classList.add("hidden");

  let index = 0;
  const speed = 38;

  const interval = setInterval(() => {
    finalTypewriter.textContent += finalLetterText.charAt(index);
    index += 1;

    if (index >= finalLetterText.length) {
      clearInterval(interval);

      setTimeout(() => {
        sky.classList.remove("sunset");
        sky.classList.add("night");

        if (!song.paused) {
          song.volume = 0.75;
        }

        launchFireworks(5);
      }, 700);

      setTimeout(() => {
        finalMessage.classList.remove("hidden");
      }, 1700);
    }
  }, speed);
}

function setupNavigation() {
  document.querySelectorAll(".next-page").forEach((button) => {
    button.addEventListener("click", () => {
      cloudWipe(button.dataset.next);
    });
  });

  restartBtn.addEventListener("click", () => {
    transitionText.textContent = "Returning to the sky...";
    transitionLayer.classList.add("active");

    setTimeout(() => {
      resetJourney();
      showPage("landing");
    }, 1300);

    setTimeout(() => {
      transitionLayer.classList.remove("active");
    }, 2900);
  });
}

function resetJourney() {
  currentPage = "landing";
  finalTyped = false;
  openedMemories = 0;
  activeMemoryIndex = 0;
  openedStickyCount = 0;
  finalTypewriter.textContent = "";
  finalMessage.classList.add("hidden");
  memoryReader.classList.add("hidden");
  memoryDoneBtn.classList.add("hidden");
  sky.classList.remove("sunset", "night");
  sky.style.filter = "";

  document.querySelectorAll(".memory-mini").forEach((button) => {
    button.classList.remove("opened");
    delete button.dataset.counted;
  });

  document.querySelectorAll(".sticky-note").forEach((button) => {
    button.classList.remove("opened");
  });

  stickySecret.classList.add("hidden");

  document.querySelectorAll(".candle").forEach((candle) => {
    candle.classList.remove("out");
  });

  blowCandlesBtn.classList.remove("hidden");
  afterCakeBtn.classList.add("hidden");
}

function setupEasterEggs() {
  document.querySelectorAll(".cloud-clickable").forEach((cloud) => {
    cloud.addEventListener("click", () => {
      cloudClicks += 1;

      if (cloudClicks === 5) {
        rainHearts(55);
        showToast("Blue hearts are raining from the clouds. 🩵");
      }
    });
  });

  paperPlane.addEventListener("click", () => {
    showToast("Thank you for choosing me every day.");
    rainHearts(22);
  });

  moon.addEventListener("click", () => {
    if (sky.classList.contains("night")) {
      showToast("The moon is beautiful tonight... just like this moment.");
    }
  });

  document.addEventListener("keydown", (event) => {
    typedBuffer += event.key.toLowerCase();
    typedBuffer = typedBuffer.slice(-8);

    if (typedBuffer === "iloveyou") {
      rainHearts(95);
      showToast("The whole sky heard you. 🩵");
      typedBuffer = "";
    }
  });
}

function resetIdleTimer() {
  window.clearTimeout(idleTimer);

  idleTimer = window.setTimeout(() => {
    bird.style.animation = "none";
    bird.style.right = "22%";
    bird.style.top = "24%";
    bird.textContent = "🕊️";
    showToast("Some moments are worth slowing down for.", 4200);

    setTimeout(() => {
      bird.style.right = "";
      bird.style.top = "";
      bird.style.animation = "birdFly 35s linear infinite 8s";
    }, 6000);
  }, 60000);
}

function setupIdle() {
  ["mousemove", "keydown", "click", "touchstart", "scroll"].forEach((eventName) => {
    window.addEventListener(eventName, resetIdleTimer, { passive: true });
  });

  resetIdleTimer();
}

function setupParallax() {
  window.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 12;
    const y = (event.clientY / window.innerHeight - 0.5) * 12;

    document.querySelectorAll(".glass").forEach((card) => {
      card.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
  });
}

function init() {
  createSparkles();
  createStars();
  setupMusic();
  setupLanding();
  setupMemories();
  renderStickyNotes();
  setupCake();
  setupNavigation();
  setupEasterEggs();
  setupIdle();
  setupParallax();
  showPage("landing");
}

init();
