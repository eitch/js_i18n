var i18n = {
    resource: "messages",
    locale: null,
    bundle: null,

    detectLocale: function () {
        var locale;
        locale = navigator.language; // (Netscape - Browser Localization)
        if (!locale) {
            navigator.browserLanguage; //(IE-Specific - Browser Localized Language)
        }
        if (!locale) {
            navigator.systemLanguage; //(IE-Specific - Windows OS - Localized Language)
        }
        if (!locale) {
            navigator.userLanguage;
        }
        if (!locale) {
            locale = "en";
            console.info("Defaulting to " + locale)
        }

        if (locale.length > 2) {
            console.info("Shortening locale to top level: " + locale)
            locale = locale.substring(0, 2);
        }

        console.info("Current locale: " + locale);
        return locale;
    },

    load18n: function (locale, resource) {

        var bundle = [null];

        var client = new XMLHttpRequest();
        client.onreadystatechange = function () {
            if (client.readyState == 4) {
                if (client.status == 200) {
                    var queryResult = JSON.parse(client.responseText);
                    bundle[0] = queryResult;
                } else {
                    alert("The request did not succeed!\n\nThe response status was: " + client.status + " " + client.statusText + ".\n\nClient response: " + client.responseText);
                }
            }
        };

        var url = locale + "/" + resource + ".json";
        client.open("GET", url, false);
        client.setRequestHeader("Accept", "application/json");
        //client.setRequestHeader("Content-Type", "plain/text"); // "application/x-www-form-urlencoded"
        client.send();

        return bundle[0];
    },

    init: function () {
        if (this.locale == null) {
            this.locale = this.detectLocale();
        }
        if (this.bundle == null) {
            this.bundle = this.load18n(this.locale, this.resource);
        }
    },

    t: function (key) {
        this.init();

        var msg = this.bundle[key];
        if (msg == null)
            msg = key;

        return msg;
    },

    translate_document: function () {
        var listToI18n = document.querySelectorAll("*[data-i18n]");
        console.info("Translating " + listToI18n.length + " elements.")
        Array.prototype.slice.call(listToI18n).forEach(function (itemToI18n, index, arr) {
            var key = itemToI18n.getAttribute("data-i18n");
            if (key != null && key.length > 0) {
                var msg = i18n.t(key);
                if (msg == null || msg.length == 0) {
                    console.info("Missing translation for key: " + key);
                } else {
                    itemToI18n.innerText = msg;
                }
            }
        });
    }
}
