const intro = document.getElementById("intro");
const main = document.getElementById("main");
const openFile = document.getElementById("openFile");
const typing = document.getElementById("typing");
const petals = document.querySelector(".petals");
const glow = document.querySelector(".cursor-glow");

const introLine = "A birthday mystery for the girl who loves tulips, matcha, Disney, Marvel, and stories that keep you guessing.";

for(let i=0;i<42;i++){
  const p = document.createElement("span");
  p.textContent = i % 5 === 0 ? "🌷" : "❀";
  p.style.left = Math.random()*100 + "vw";
  p.style.animationDuration = 8 + Math.random()*14 + "s";
  p.style.animationDelay = Math.random()*12 + "s";
  p.style.fontSize = 12 + Math.random()*20 + "px";
  petals.appendChild(p);
}

document.addEventListener("mousemove", e=>{
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

openFile.addEventListener("click", () => {
  openFile.classList.add("crack");
  setTimeout(() => {
    intro.classList.add("hidden");
    main.classList.remove("hidden");
    typeText();
  }, 720);
});

let t = 0;
function typeText(){
  if(t < introLine.length){
    typing.textContent += introLine[t++];
    setTimeout(typeText, 34);
  }
}

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.15});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const clueReveal = document.getElementById("clueReveal");
const secretNote = document.getElementById("secretNote");
const openedClues = new Set();

document.querySelectorAll(".clue-card").forEach((btn, index)=>{
  btn.addEventListener("click",()=>{
    btn.classList.add("opened");
    openedClues.add(index);
    clueReveal.textContent = btn.dataset.clue;
    clueReveal.animate(
      [{opacity:0, transform:"translateY(14px)"},{opacity:1, transform:"translateY(0)"}],
      {duration:440, easing:"ease-out"}
    );
    if(openedClues.size === 6){
      secretNote.classList.remove("hidden");
      secretNote.animate(
        [{opacity:0, transform:"scale(.96)"},{opacity:1, transform:"scale(1)"}],
        {duration:620, easing:"ease-out"}
      );
    }
  });
});

const giftPanel = document.getElementById("giftPanel");
const gifts = {
  books: {
    title: "📚 Apple Books Fund — AED 250",
    body: "For your next mysteries, detective cases, scary stories, and plot twists. I picked a few recommendations below, but the library is yours to build.",
    status: "Apple gift card sent privately ❤️"
  },
  disney: {
    title: "🎬 Disney+ — 1 Month",
    body: "For Disney comfort nights, Marvel marathons, and every story you want to disappear into when you need something cozy.",
    status: "Access details sent privately ❤️"
  },
  matcha: {
    title: "🍵 Beanz Matcha Fund",
    body: "Official detective fuel for emergency matcha cravings, sweet little café moments, and days that need something comforting.",
    status: "Sent through Beanz ❤️"
  }
};

document.querySelectorAll(".gift-card").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".gift-card").forEach(g=>g.classList.remove("opened"));
    btn.classList.add("opened");
    const gift = gifts[btn.dataset.gift];
    giftPanel.innerHTML = `
      <h3>${gift.title}</h3>
      <p>${gift.body}</p>
      <span class="status-pill">${gift.status}</span>
    `;
    giftPanel.animate(
      [{opacity:0, transform:"translateY(16px)"},{opacity:1, transform:"translateY(0)"}],
      {duration:520, easing:"ease-out"}
    );
  });
});
