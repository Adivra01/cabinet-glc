const header = document.querySelector(".header");
const menuBtn = document.querySelector(".menu-btn");
const navlinks = document.querySelector(".navlinks");

menuBtn?.addEventListener("click", () => {
  const open = header.classList.toggle("open");
  menuBtn.textContent = open ? "×" : "☰";
  menuBtn.setAttribute("aria-expanded", String(open));
});

navlinks?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    header.classList.remove("open");
    if (menuBtn) {
      menuBtn.textContent = "☰";
      menuBtn.setAttribute("aria-expanded", "false");
    }
  }
});

document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});

const form = document.querySelector("[data-contact-form]");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = `Demande — ${data.get("service")}`;
  const body = `Bonjour,\n\nNom : ${data.get("name")}\nTéléphone : ${data.get("phone") || "Non renseigné"}\nPrestation : ${data.get("service")}\n\n${data.get("message")}\n\nCordialement,\n${data.get("name")}`;
  const whatsapp = event.submitter?.value === "whatsapp";
  const url = whatsapp ? `https://wa.me/22777476574?text=${encodeURIComponent(body)}` : `mailto:cabinetglc@outlook.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  if (whatsapp) window.open(url, "_blank", "noopener,noreferrer");
  else window.location.href = url;
  document.querySelector("[data-form-notice]").textContent = "Relisez votre message dans l’application ouverte, puis envoyez-le vous-même.";
});

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.set("[data-animate]", { opacity: 0, y: 34 });
  gsap.to("[data-animate]", {
    opacity: 1,
    y: 0,
    duration: .95,
    ease: "power3.out",
    stagger: .08,
    scrollTrigger: { trigger: "body", start: "top 82%" }
  });
  document.querySelectorAll("[data-animate]").forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: .9,
      ease: "power3.out",
      scrollTrigger: { trigger: element, start: "top 86%" }
    });
  });
  gsap.to(".hero", {
    backgroundPosition: "52% 48%",
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
  document.querySelectorAll(".magnetic").forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      gsap.to(item, {
        x: (event.clientX - rect.left - rect.width / 2) * .08,
        y: (event.clientY - rect.top - rect.height / 2) * .08,
        duration: .3
      });
    });
    item.addEventListener("mouseleave", () => gsap.to(item, { x: 0, y: 0, duration: .45, ease: "power3.out" }));
  });
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "none";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll("[data-animate]").forEach((item) => observer.observe(item));
}
