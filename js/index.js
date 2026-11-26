function abrirArticle() {
  const articulos = document.querySelectorAll('article'); // Todos los artículos

  articulos.forEach((articulo) => {
    const articleInfo = articulo.querySelector('.article__info'); // Contenedor que cambiará de tamaño
    const triggerTexto = articulo.querySelector('.article__info__texto'); // Elemento que recibe el clic

    if (!articleInfo || !triggerTexto) return; // Si falta alguno de los dos, evita errores

    // Indicamos que el texto es clickable
    triggerTexto.style.cursor = 'pointer';

    triggerTexto.addEventListener('click', () => {
      const isCollapsed = !articleInfo.classList.contains('abierto');

      if (isCollapsed) {
        articleInfo.classList.add('abierto');
      } else {
        articleInfo.classList.remove('abierto');
      }
    });
  });
}

function toggleIcono(selector, nombre) {
  const contenedores = document.querySelectorAll(selector); // Todos los elementos que reciben el clic

  contenedores.forEach((contenedor) => {
    const [iconoNormal, iconoActivo] = contenedor.querySelectorAll('.article__icon');
    if (!iconoNormal || !iconoActivo) return; // Si faltan los iconos, evita errores

    // Estado inicial: solo se ve el icono normal
    iconoNormal.style.display = 'block';
    iconoActivo.style.display = 'none';

    // Indicamos que el elemento es clickable
    contenedor.style.cursor = 'pointer';

    contenedor.addEventListener('click', () => {
      const isInactive = iconoActivo.style.display === 'none';

      if (isInactive) {
        iconoNormal.style.display = 'none';
        iconoActivo.style.display = 'block';
        console.log(`${nombre}: +1 añadido`);
      } else {
        iconoNormal.style.display = 'block';
        iconoActivo.style.display = 'none';
        console.log(`${nombre}: +1 quitado`);
      }
    });
  });
}

function iniciarCarruseles() {
  document.querySelectorAll('article').forEach((articulo) => {
    const contenedor = articulo.firstElementChild; // Contenedor de la imagen
    const track = contenedor.querySelector('.carrusel__track');
    const btnPrev = contenedor.querySelector('.carrusel__btn--prev');
    const btnNext = contenedor.querySelector('.carrusel__btn--next');
    const dotsBox = contenedor.querySelector('.carrusel__dots');
    if (!track || !btnPrev || !btnNext || !dotsBox) return;

    const total = track.children.length;
    let actual = 0;

    if (total < 2) {
      contenedor.classList.add('carrusel--single');
      return;
    }

    // Puntos
    const dots = Array.from({ length: total }, (_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir a la imagen ${i + 1}`);
      dot.addEventListener('click', () => irA(i));
      dotsBox.appendChild(dot);
      return dot;
    });

    function irA(indice) {
      actual = (indice + total) % total; // da la vuelta al llegar al final
      track.style.transform = `translateX(-${actual * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('activo', i === actual));
    }

    btnPrev.addEventListener('click', () => irA(actual - 1));
    btnNext.addEventListener('click', () => irA(actual + 1));

    // Deslizar con el dedo en móvil
    let inicioX = null;
    track.addEventListener('touchstart', (e) => {
      inicioX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
      if (inicioX === null) return;
      const dx = e.changedTouches[0].clientX - inicioX;
      if (Math.abs(dx) > 40) irA(actual + (dx < 0 ? 1 : -1));
      inicioX = null;
    });

    irA(0);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  iniciarCarruseles();
  abrirArticle();
  toggleIcono('.article__idea', 'Idea');
  toggleIcono('.article__guardar', 'Guardar');
});