const openBtn = document.getElementById("open-case");
const lock = document.getElementById("lock-screen");
const caseFile = document.getElementById("case-file");
const typewriter = document.getElementById("typewriter");

const message = "Investigation complete. The evidence proves one thing: Roudah is unforgettable.";

openBtn.addEventListener("click", () => {
  lock.classList.remove("active");
  caseFile.classList.remove("hidden");
  setTimeout(type, 400);
});

let i = 0;
function type(){
  if(i < message.length){
    typewriter.textContent += message.charAt(i);
    i++;
    setTimeout(type, 42);
  }
}

const revealItems = document.querySelectorAll(".panel, .card, .gift, .voucher");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.animate(
        [{opacity:0, transform:"translateY(24px)"}, {opacity:1, transform:"translateY(0)"}],
        {duration:700, easing:"ease-out", fill:"forwards"}
      );
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.15});

revealItems.forEach(el => {
  el.style.opacity = 0;
  observer.observe(el);
});
