(function($) {

    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $footer = $('#footer'),
        $main = $('#main'),
        settings = {
            parallax: true,
            parallaxFactor: 20
        };

    // Breakpoints.
    breakpoints({
        xlarge:  ['1281px',  '1800px'],
        large:   ['981px',   '1280px'],
        medium:  ['737px',   '980px'],
        small:   ['481px',   '736px'],
        xsmall:  [null,      '480px']
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Touch?
    if (browser.mobile) {
        $body.addClass('is-touch');
        window.setTimeout(function() {
            $window.scrollTop($window.scrollTop() + 1);
        }, 0);
    }

    // Footer.
    breakpoints.on('<=medium', function() {
        $footer.insertAfter($main);
    });

    breakpoints.on('>medium', function() {
        $footer.appendTo($header);
    });

    // Header Parallax.
    if (browser.name === 'ie' || browser.mobile) {
        settings.parallax = false;
    }

    if (settings.parallax) {
        breakpoints.on('<=medium', function() {
            $window.off('scroll.strata_parallax');
            $header.css('background-position', '');
        });

        breakpoints.on('>medium', function() {
            $header.css('background-position', 'left 0px');
            $window.on('scroll.strata_parallax', function() {
                $header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
            });
        });

        $window.on('load', function() {
            $window.triggerHandler('scroll');
        });
    }

    // Main Sections: Two.
    // Lightbox gallery.
    $window.on('load', function() {
        // Map image hrefs to project URLs
        var projectMap = {
            'images/fulls/gan.png': 'gan-for-mnist.html',
            'images/fulls/autoencoder.png': 'autoencoder-for-fashionmnist.html',
            'images/fulls/vae.jpg': 'vae-for-mnist.html',
            'images/fulls/Conditional-GAN-CGAN-architecture.png': 'conditional-gan-for-mnist.html',
            'images/fulls/cycleGAN.png': 'cycle-gan-for-mnist.html',
            'images/fulls/diff.jpg': 'diffusion-for-mnist.html',
            'images/fulls/vit_architecture.png': 'vision-transformer-for-mnist.html',
            'images/fulls/pixelcnn_architecture.png': 'pixelcnn-for-mnist.html',
            'images/fulls/llm.jpg': 'llm.html',
            'images/fulls/controlnet.jpg': 'controlnet-for-fashion.html'
        };

        $('#two').poptrox({
            caption: function($a) { return $a.next('h3').text(); },
            overlayColor: '#2c2c2c',
            overlayOpacity: 0.85,
            popupCloserText: '×',
            popupLoaderText: '••••',
            selector: '.work-item a.image',
            usePopupCaption: true,
            usePopupDefaultStyling: false,
            usePopupEasyClose: false,
            usePopupNav: true,
            usePopupLoader: true,
            preload: true,
            windowMargin: (breakpoints.active('<=small') ? 0 : 50),
            onPopupOpen: function() {
                var imageHref = this.element.attr('href');
                console.log('Poptrox onPopupOpen - href:', imageHref);
                if (!projectMap[imageHref]) {
                    console.warn('No project mapping for image:', imageHref);
                }
                var projectHref = projectMap[imageHref] || '#';
                $('.poptrox-popup').append(
                    '<a href="' + projectHref + '" class="button go-to-project">Go to Project</a>'
                );
            },
            onPopupClose: function() {
                $('.poptrox-popup .go-to-project').remove();
            }
        });
    });

})(jQuery);