// modal.js
document.addEventListener('DOMContentLoaded', function() {
    // Das Modal-Element holen
    var modal = document.getElementById('myModal');

    // Alle Bilder, die das Modal öffnen sollen
    var images = document.querySelectorAll('.blog-image-small');
    var modalImg = document.getElementById('img01');
    var captionText = document.getElementById('caption');

    images.forEach(function(img) {
        img.onclick = function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
            document.body.style.overflow = 'hidden'; // Verhindert Scrolling, wenn das Modal offen ist
        }
    });

    // Schließe-Button
    var span = document.querySelector('#myModal .close');

    // Schließe das Modal, wenn der Schließen-Button geklickt wird
    span.onclick = function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Scrolling wieder aktivieren
    }

    // Schließe das Modal, wenn außerhalb des Bildes geklickt wird
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Schließe das Modal, wenn die Escape-Taste gedrückt wird
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});