function abrirArticle() {
  const articulos = document.querySelectorAll('article'); // Todos los artículos

  articulos.forEach((articulo) => {
    const articleInfo = articulo.querySelector('.article__info'); // Contenedor que cambiará de tamaño
    const triggerTexto = articulo.querySelector('.article__info__texto'); // Elemento que recibe el clic

    if (!articleInfo || !triggerTexto) return; // Si falta alguno de los dos, evita errores

    // Estado inicial del contenedor
    articleInfo.style.height = '20vh';
    articleInfo.style.overflow = 'hidden';

    // Indicamos que el texto es clickable
    triggerTexto.style.cursor = 'pointer';

    triggerTexto.addEventListener('click', () => {
      const isCollapsed = articleInfo.style.height === '20vh';

      if (isCollapsed) {
        articleInfo.style.height = 'auto';
        articleInfo.style.overflow = 'visible';
      } else {
        articleInfo.style.height = '20vh';
        articleInfo.style.overflow = 'hidden';
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

document.addEventListener('DOMContentLoaded', () => {
  abrirArticle();
  toggleIcono('.article__idea', 'Idea');
  toggleIcono('.article__guardar', 'Guardar');
});