(function (document) {
    'use strict';

    var progressbar = document.querySelector('div.progressbar div');
    var progress    = document.querySelector('div.progress');

    function updateProgressbar(slideId) {
        var slideNumber = stepids.indexOf(slideId);
        if (null !== progressbar) {
            progressbar.style.width = (100 / (stepids.length - 1) * (slideNumber)).toFixed(2) + '%';
        }

        if (null !== progress) {
            progress.innerHTML = slideNumber + '/' + (stepids.length - 1);
        }
    }

    var stepids = [];

    // wait for impress.js to be initialized
    document.addEventListener("impress:init", function (event) {
        var steps = event.detail.steps;
        for (var i = 0; i < steps.length; i++) {
            stepids[i + 1] = steps[i].id;
        }
    });

    if (null !== progressbar || null !== progress) {
        document.addEventListener("impress:stepenter", function (event) {
            updateProgressbar(event.target.id);
        });
    }

})(document);
