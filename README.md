js_i18n
=======
Simple JavaScript library to internationalise html files

Usage
=======
Include in your HTML file:

    <script src="i18n.js"></script>

Then initialize somehow after page load:

    i18n.init();
    i18n.translate_document();

Translate single keys:

    var msg = i18n.t('my_key');
