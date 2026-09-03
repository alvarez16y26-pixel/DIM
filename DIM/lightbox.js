document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Imagen ampliada');
    lightbox.innerHTML = '<button class="image-lightbox-close" type="button" aria-label="Cerrar imagen ampliada">&times;</button><img class="image-lightbox-content" alt="">';
    document.body.appendChild(lightbox);

    const enlargedImage = lightbox.querySelector('.image-lightbox-content');
    const closeButton = lightbox.querySelector('.image-lightbox-close');
    let previousImage = null;

    function closeLightbox() {
        lightbox.hidden = true;
        document.body.classList.remove('lightbox-open');
        if (previousImage) previousImage.focus();
    }

    function openLightbox(image) {
        previousImage = image;
        enlargedImage.src = image.currentSrc || image.src;
        enlargedImage.alt = image.alt || 'Imagen ampliada';
        lightbox.hidden = false;
        document.body.classList.add('lightbox-open');
        closeButton.focus();
    }

    document.addEventListener('click', function (event) {
        const image = event.target.closest('img');
        if (image && !image.classList.contains('image-lightbox-content')) openLightbox(image);
        if (event.target === lightbox || event.target === closeButton) closeLightbox();
    });

    document.addEventListener('keydown', function (event) {
        const image = event.target.closest && event.target.closest('img');
        if (image && !image.classList.contains('image-lightbox-content') && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            openLightbox(image);
        }
        if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });

    document.querySelectorAll('img').forEach(function (image) {
        if (!image.classList.contains('image-lightbox-content')) {
            image.classList.add('image-lightbox-trigger');
            image.setAttribute('tabindex', '0');
            image.setAttribute('role', 'button');
            image.setAttribute('aria-label', 'Ampliar ' + (image.alt || 'imagen'));
        }
    });
});
