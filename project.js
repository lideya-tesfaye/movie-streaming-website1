
const API_BASE = 'http://localhost:4000/api';

const videoModal = document.getElementById("videoModal");
const youtubePlayer = document.getElementById("youtubePlayer");
const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", () => {
  youtubePlayer.src = "";
  videoModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === videoModal) {
    youtubePlayer.src = "";
    videoModal.style.display = "none";
  }
});

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.classList.add("movie-card");
  card.style.width = "325px";
  card.style.height = "200px";
  card.style.margin = "10px";
  card.style.borderRadius = "15px";
  card.style.backgroundImage = `url(${movie.posterUrl})`;
  card.style.backgroundSize = "cover";
  card.style.position = "relative";

  const btn = document.createElement("button");
  btn.textContent = "watch";
  btn.style.display = "none";
  btn.style.width = "70px";
  btn.style.height = "35px";
  btn.style.borderRadius = "15px";
  btn.style.backgroundColor = "rgb(7, 124, 7)";
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.position = "absolute";
  btn.style.top = "50%";
  btn.style.left = "50%";
  btn.style.transform = "translate(-50%, -50%)";
  btn.style.cursor = "pointer";

  const text = document.createElement("p");
  text.innerHTML = `<b>${movie.title}</b><br>${movie.description}`;
  text.style.display = "none";
  text.style.opacity = "0.7";
  text.style.color = "white";
  text.style.padding = "10px";
  text.style.position = "absolute";
  text.style.bottom = "0";
  text.style.backgroundColor = "rgba(0,0,0,0.7)";
  text.style.width = "100%";

  card.appendChild(btn);
  card.appendChild(text);


  card.addEventListener("mouseenter", () => {
    btn.style.display = "block";
    text.style.display = "block";
  });
  card.addEventListener("mouseleave", () => {
    btn.style.display = "none";
    text.style.display = "none";
  });

 
  btn.addEventListener("click", () => {
    youtubePlayer.src = movie.trailerUrl + "?autoplay=1";
    videoModal.style.display = "flex";
  });

  return card;
}


async function loadContent(sectionId, endpoint) {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`);
    const data = await res.json();

    const section = document.getElementById(sectionId);
    section.innerHTML = `<p style="font-weight:bold; font-size:25px; color:white; margin:20px;">${endpoint.toUpperCase()}</p>`;

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "20px";
    container.style.marginLeft = "20px";

    data[endpoint].forEach(movie => {
      const card = createMovieCard(movie);
      container.appendChild(card);
    });

    section.appendChild(container);
  } catch (err) {
    console.error(`Failed to load ${endpoint}:`, err);
  }
}


const signInModal = document.getElementById("signInModal");
const signInBtn = document.getElementById("one");
const closeSignInBtn = document.querySelector(".close-signin");
const signInForm = document.getElementById("signInForm");

signInBtn.addEventListener("click", () => {
  signInModal.style.display = "flex";
});

closeSignInBtn.addEventListener("click", () => {
  signInModal.style.display = "none";
});

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signInForm.querySelector('input[type="text"]').value;
  const password = signInForm.querySelector('input[type="password"]').value;

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert(`Welcome ${data.user.name}`);
      signInForm.reset();
      signInModal.style.display = "none";
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Server error");
  }
});


loadContent("movies", "movies");
loadContent("series", "series");
loadContent("short-movies", "short-movies");
loadContent("trailers", "trailers");
