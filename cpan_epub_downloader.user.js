// ==UserScript==
// @name        CPAN ePub Downloader
// @namespace   http://tekiomo.hatenablog.com/
// @description Generate button to get the ePub from CPAN module page.
// @include     http://search.cpan.org/*.pod
// @include     http://search.cpan.org/*.pm
// @updateURL   https://github.com/tekiomo/CPAN_ePub_Downloader/raw/master/cpan_epub_downloader.user.js
// @version     0.1
// @license     MIT License
// @author      tekiomo
// ==/UserScript==
(function() {
    var title = document.getElementsByTagName('title')[0] || null;

    if (!title) {
        return;
    }

    var module_name = title.text.split(' ')[0];

    var button = document.createElement('button');
    button.innerHTML = 'get ePub by PerlyBook';
    button.addEventListener('click', function() {
        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', 'http://perlybook.org/');
        document.body.appendChild(form);

        [{name: 'in_text',
          type: 'hidden',
          value: module_name},
         {name: 'EPUB',
          type: 'hidden',
          value: 'EPUB'},
         {name: 'book_selection',
          type: 'hidden',
          value: 'distribution'}].forEach(function(item) {
            var input = document.createElement('input');
            input.setAttribute('name', item.name);
            input.setAttribute('value', item.value);
            input.setAttribute('type', item.type);
            form.appendChild(input);
        });

        form.submit();
    });

    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';

    document.body.appendChild(button);
})();
