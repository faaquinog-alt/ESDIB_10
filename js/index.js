function abrirArticle() {
  const articleInfo = document.getElementById('article__info'); // Contenedor que cambiará de tamaño
  const triggerTexto = document.getElementById('article__info__texto'); // Elemento que recibe el clic

  if (!articleInfo || !triggerTexto) return; // Si falta alguno de los dos, evita errores

  // Estado inicial del contenedor
  articleInfo.style.height = '20vh';
  articleInfo.style.overflow = 'hidden';
  
  // Indicamos que el texto es clickable
  triggerTexto.style.cursor = 'pointer'; 

  // El evento escucha solo el clic en "article__info__texto"
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
}

document.addEventListener('DOMContentLoaded', abrirArticle);