Zepto(function ($) {

    $.fn.display = function() {
        return this.css({  'visibility': 'visible' });
    };

    var duration = 1000;

    document.addEventListener("impress:stepenterstart", function (event) {

        console.log(event.target.id);
        switch (event.target.id) {

            case 'landing':
                $(document.body).animate({ 'background-color': '#55bd00' }, duration, 'ease-out');
                break;

            case 'previous-company-4':
                $('#previous-company-4 p')
                    .display()
                    .addClass('rotating-10');
                break;

            case 'previous-company-3':
                $('#previous-company-3 p')
                    .display()
                    .addClass('rotating-10');
                $(document.body).animate({ 'background-color': '#565656' }, duration, 'ease-out');
                break;

            case 'previous-company-2':
                $('#previous-company-2 p')
                    .display()
                    .addClass('rotating10');
                $(document.body).animate({ 'background-color': '#565656' }, duration, 'ease-out');
                break;

            case 'previous-company-1':
                $(document.body).animate({ 'background-color': '#565656' }, duration, 'ease-out');
                break;

            case 'previous-job-1':
                $(document.body).animate({ 'background-color': '#565656' }, duration, 'ease-out');
                break;
            case 'previous-job-2':
            case 'previous-job-3':
            case 'previous-job-4':
            case 'previous-job-5':
            case 'previous-job-6':
                $('#' + event.target.id + ' p').display();
                break;

        }

    });

    impress().init();

});

