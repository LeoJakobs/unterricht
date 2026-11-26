# Unterricht

Unterrichtsseiten für GitHub Pages.

## Stift-Werkzeug

`pen.js` liegt nur einmal, hier im Hauptordner. Jede Seite bindet es vor `</body>` mit einem relativen Pfad ein, z. B. aus `mathe-6/brueche/`:

    <script src="../../pen.js"></script>

Eine Änderung an `pen.js` gilt damit sofort für alle Seiten. Keine Kopien in Unterordner legen.
