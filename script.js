const openBtn = document.getElementById("open-case");
const lock = document.getElementById("lock-screen");
const caseFile = document.getElementById("case-file");
const typewriter = document.getElementById("typewriter");
const petals = document.querySelector(".petals");

const message = "Investigation complete. The evidence proves one thing: Roudah is unforgettable.";

for(let i=0;i<26;i++){
  const p = document.createElement("span");
  p.textContent = i % 3 === 0 ? "🌷" : "❀";
  p.style.left = Math.random()*100 + "vw";
  p.style.animationDuration = 9 + Math.random()*12 + "s";
  p.style.animationDelay = Math.random()*10 + "s";
  p.style.fontSize = 14 + Math.random()*18 + "px";
  petals.appendChild(p);
}

openBtn.addEventListener("click", () => {
  lock.classList.add("hidden");
  caseFile.classList.remove("hidden");
  setTimeout(type, 350);
});

let i = 0;
function type(){
  if(i < message.length){
    typewriter.textContent += message[i];
    i++;
    setTimeout(type, 38);
  }
}

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  })
},{threshold:.16});

document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const reveal = document.getElementById("gift-reveal");
const gifts = {
  novels: {
    title: "📚 Apple Books Fund — AED 250",
    body: "A birthday library fund for the girl who loves crime, detectives, scary stories, and every mystery worth solving.",
    label: "Apple Gift Card",
    code: "Sent separately for your safety ❤️",
    note: "Use it for Apple Books and choose the novels that pull you into another world. I picked some recommendations for you above."
  },
  disney: {
    title: "🎬 Disney+ — One Month",
    body: "For Disney comfort nights, Marvel marathons, and all the stories you can escape into whenever you want.",
    label: "Disney+ Access",
    code: "Login details sent separately for your privacy ❤️",
    note: "I subscribed using my number, so I will send the login details privately instead of putting them on a public website."
  },
  matcha: {
    title: "🍵 Beanz Matcha Fund",
    body: "Official detective fuel. Reserved for emergency matcha cravings and sweet little coffee shop moments.",
    label: "Beanz Matcha Gift",
    code: "Sent separately in the Beanz app ❤️",
    note: "Your Beanz matcha gift will arrive separately through the Beanz app."
  }
};

document.querySelectorAll(".gift-box").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const gift = gifts[btn.dataset.gift];
    reveal.innerHTML = `
      <h3>${gift.title}</h3>
      <p>${gift.body}</p>
      <div class="redeem-card">
        <div class="code-box">
          <span class="code-label">${gift.label}</span>
          <span class="code-value">${gift.code}</span>
        </div>
        <button class="copy-btn" data-code="${gift.code}">Copy Code</button>
        <p class="redeem-note">${gift.note}</p>
      </div>
    `;
    reveal.animate([{opacity:0, transform:"translateY(14px)"},{opacity:1, transform:"translateY(0)"}],{duration:450,easing:"ease-out"});
    const copyBtn = reveal.querySelector(".copy-btn");
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.code);
        copyBtn.textContent = "Copied ✓";
      } catch {
        copyBtn.textContent = "Copy manually";
      }
    });
  });
});
