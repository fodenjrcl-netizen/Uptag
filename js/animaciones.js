// Animación de entrada para el encabezado principal
window.addEventListener("DOMContentLoaded", () => {
  const encabezado = document.querySelector("header");
  encabezado.style.opacity = 0;
  encabezado.style.transform = "translateY(-20px)";
  encabezado.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  setTimeout(() => {
    encabezado.style.opacity = 1;
    encabezado.style.transform = "translateY(0)";
  }, 100);
});
const principal = document.querySelector("main");
principal.style.opacity = 0;
principal.style.transform = "translateY(20px)";
principal.style.transition = "opacity 0.8s ease, transform 0.8s ease";
setTimeout(() => {
  principal.style.opacity = 1;
  principal.style.transform = "translateY(0)";
}, 300);

// Animación de entrada para cada sección
document.querySelectorAll("details").forEach((detail) => {
  const summary = detail.querySelector("summary");
  const content = detail.querySelector("div");

  if (!summary || !content) return;

  // Estilos iniciales
  content.style.overflow = "hidden";
  content.style.maxHeight = "0px";
  content.style.opacity = "0";
  content.style.transition = "max-height 0.6s ease, opacity 0.6s ease";

  // Interceptar clic en summary
  summary.addEventListener("click", (e) => {
    e.preventDefault();

    const isOpen = detail.hasAttribute("open");

    if (isOpen) {
      // Animar cierre
      content.style.maxHeight = content.scrollHeight + "px"; // necesario para que el cierre se inicie desde altura real
      content.style.opacity = "0";
      content.style.transition = "max-height 0.6s ease, opacity 0.4s ease";
      setTimeout(() => {
        content.style.maxHeight = "0px";
      }, 50); // pequeña pausa para que el navegador reconozca el cambio
      setTimeout(() => {
        detail.removeAttribute("open");
      }, 600); // espera a que termine la animación
    } else  { 
      // Abrir y animar
      detail.setAttribute("open", true);

// Esperar dos frames para asegurar que el contenido se haya renderizado completamente
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const fullHeight = content.scrollHeight;
    content.style.transition = "max-height 0.6s ease, opacity 0.6s ease";
    content.style.maxHeight = fullHeight + "px";
    content.style.opacity = "1";
  });
});
    }
  });
} );