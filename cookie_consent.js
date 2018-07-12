var prefix = 'Sam_'; // Ideally with a trailing underscore
var company_name = 'Sam'; // This populates the modal content

var landing_text = 'Sam\'s websites may request cookies to be set on your device. We uses cookies to let us know when you visit this website, how you interact with this website and to enrich your user experience. The cookies differ depending on the information we track or use, please see further explanations of these below. You can adapt your cookie preferences, although please note that blocking some types of cookies may impact your experience on this website and the services we are able to offer.';
var analytical_text = 'These cookies collect information that is used to help us understand how this website is being used, pinpoint potential improvements and monitor use of services. This analytical research is then used to enhance the user experience.';
var advertising_text = 'Google tools (map, contact form and translate tool seen on our websites) are covered under advertising cookies. We does not partner with advertisers and ad networks to display advertising on our websites and/or to manage and serve advertising on other sites.';
var user_created_text = 'The  website content manager allows users to embed code which may potentially contain cookies. Please note that these tools are accessed by the user rather than a necessary requirement of the company, for example, if a user elects to use the embed tool, the embedded code may permit or require additional cookies or tracking technologies to be employed. As we are unable to control these cookies, by default user embedded content is disabled.';
var cookie_expiration = 'Fri, 31 Aug 2018 23:59:59 GMT'; // set your cookie expiration time.

var if_not_advertising_cookies = [prefix + 'essential_only', prefix + 'agree', prefix + 'advertising', 'OTZ', 'S', '1P_JAR', 'APISID', 'SSID', 'NID', 'PREF', '_drt_', 'SID', 'SAPISID', 'id', 'HSID', 'SIDCC', 'IDE', '_psegs', 'permutive_id','permutive_session', 'PREF', 'VISITOR_INFO1_LIVE', 'YS', 'vuid', 'player', '__gads', '_ceg.s', '_ceg.u', 'continuous_play_v3', '__qca', '_uetsid'];
var if_not_analytical_cookies = [prefix + 'essential_only', prefix + 'agree', prefix + 'analytical', '_gat', '_gid', '_ga', 'AMP_TOKEN', 'CONSENT', 'NID'];

var cookie_policy_link = 'https://google.com'

// There's no need to edit anything below this line but feel free to amend the code to suit your own requirements

var cookie_categories = [prefix + 'agree', prefix + 'analytical', prefix + 'advertising', prefix + 'essential_only', prefix + 'user_created'];

var cookie_html = '<a class="open-cookie-modal"><div id="cookie-icon"></div></a><div class="cookie-consent"><div class="pull-left"><span>'+company_name+' uses cookies to ensure you get the best experience on this website.<a href="'+cookie_policy_link+'" target="_blank">Learn more</a></span></div><div class="pull-right"><a class="btn btn-decline">Dismiss</a><a class="btn btn-edit">Accept specific...</a><a class="btn btn-success">Accept all</a></div></div><div class="modal fade in" id="cookies_consent" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header bg-blue"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-times" aria-hidden="true"></i></button><h4 class="modal-title" id="exampleModalLabel">Edit cookie options</h4></div><div class="modal-body cookie-options"><div class="modal-sidebar"><div class="tab active" id="landing"><i class="fa fa-info-circle"></i><h5>How <span class="company_name"></span> Uses Cookies</h5></div><div class="tab" id="essential"><i class="fa fa-check-circle"></i><h5>Essential Website Cookies</h5></div><div class="tab" id="analytical"><i class="fa fa-pie-chart"></i><h5>Analytical Cookies</h5></div><div class="tab" id="advertising"><i class="fa fa-television"></i><h5>Advertising Cookies</h5></div><div class="tab" id="user_created"><i class="fa fa-user"></i><h5>User Embedded Cookies</h5></div><div class="tab" id="landing"><a href="'+cookie_policy_link+'" target="_blank"><i class="fa fa-file-word-o"></i><h5>Privacy & Cookies Policy</h5></a></div></div><div class="modal-main"><div class="landing-text text active"><h4>How <span class="company_name"></span> Uses Cookies</h4><p id="landing-text"></p></div><div class="essential-text text"><h4>Essential Website Cookies</h4><span class="green">Always Active</span><p id="essential-text">These cookies are strictly necessary to provide you with services available through our websites and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the websites, you cannot refuse them without impacting how our websites function. You can block or delete them by changing your browser settings, however please note that you will not be able to log in if you refuse these cookies.</p></div><div class="analytical-text text"><h4>Analytical Website Cookies</h4><span class="green"><span class="col-sm-5"><button type="button" class="btn btn-lg btn-toggle" value="0" id="analytical-cookies"><span class="handle"></span></button></span></span><p id="analytical-text"></p></div><div class="advertising-text text"><h4>Advertising Website Cookies</h4><span class="green"><span class="col-sm-5"><button type="button" class="btn btn-lg btn-toggle" value="0" id="advertising-cookies"><span class="handle"></span></button></span></span><p id="advertising-text"></p></div><div class="user_created-text text"><h4>User Embedded Cookies</h4><span class="green"><span class="col-sm-5"><button type="button" class="btn btn-lg btn-toggle" value="0" id="user_created-cookies"><span class="handle"></span></button></span></span><p id="user_created-text"></p></div></div></div><div class="modal-footer bg-blue-0_2"><a class="cheeseburger"><i class="fa fa-bars" aria-hidden="true"></i><span>Menu</span></a><button type="button" class="btn btn-default text-uppercase btn-modal-close" data-dismiss="modal"><i class="fa fa-times"></i><strong>Close</strong></button><button type="button" class="btn btn-success text-uppercase save_cookies_options"><i class="fa fa-check"></i><strong>Save</strong></button></div></div></div></div>';

$(document).ready(function() {

    $('body').append(cookie_html);

    var cookie_exists = false;

    $.each(document.cookie.split(/; */), function()  {
        var cookie = this.split('=')[0];
        if($.inArray(cookie, cookie_categories) > -1) {
            $('.cookie-consent').remove();
            $('#cookie-icon').show();
            cookie_exists = true;
        }
    });

     if (document.cookie.indexOf(prefix + "advertising") == -1 || document.cookie.indexOf(prefix + "agree") == -1) {
        $('iframe').remove();
    }

    $('.ifJS').show();

    if(cookie_exists) {
        deleteDisallowedCookies();
    } else {
        deleteNonEssentialCookies();
    }
    $('.cookie-consent').show();

    $('#cookie-icon').show();

    $('.hamburger').click(function() {
        $('.modal#cookies_consent .modal-sidebar').toggle();
    });


    if ($(window).width() < 767) {
        $('.modal-sidebar .tab').click(function() {
            $('.modal#cookies_consent .modal-sidebar').hide();
        });
    }

    $('span.green button').click(function() {
        $(this).toggleClass('active');
        $(this).attr('value', $(this).hasClass('active') ? 1 : 0);
    });

    $('.company_name').text(company_name);
    $('#landing-text').text(landing_text);
    $('#analytical-text').text(analytical_text);
    $('#advertising-text').text(advertising_text);
    $('#user_created-text').text(user_created_text);

});

$(document).on('click', '.cookie-consent .btn-success', function() {
    document.cookie = prefix + "agree=; expires=" + cookie_expiration + "; path=/";
    document.cookie = prefix + "user_created=''; expires=" + cookie_expiration + "; path=/";
    window.location.href = window.location.href;
    return false;
});

$(document).on('click', '.cookie-consent .btn-decline', function() {
    $('.cookie-consent').remove();
    $('#cookie-icon').show();
});

$(document).on('click', '.cookie-consent .pull-right a.btn-edit', function() {
    $('.cookie-consent').hide();
    $('.modal#cookies_consent').modal('show');
    checkCookies();
    $('#cookie-icon').hide();
});

$(document).on('click', 'a.open-cookie-modal', function() {
    $('.cookie-consent').hide();
    $('.modal#cookies_consent').modal('show');
    checkCookies();
    $('#cookie-icon').hide();

});

$(document).on('click', '#cookies_consent .btn-modal-close, #cookies_consent .fa-times', function() {
    $(this).closest('.modal').modal('hide');
    $('.cookie-consent').show();
    $('#cookie-icon').show();
});

$(document).on('hidden.bs.modal', function () {
    $(this).closest('.modal').modal('hide');
    $('.cookie-consent').show();
    $('#cookie-icon').show();

});

var analytical = 0;
var advertising = 0;
var user_created = 0;


function checkCookies() {

    if (document.cookie.indexOf(prefix + "analytical") >= 0) {
        analytical = 1;
    }

    if (document.cookie.indexOf(prefix + "advertising") >= 0) {
        advertising = 1;
    }

    if (document.cookie.indexOf(prefix + "user_created") >= 0) {
        user_created = 1;
    }

    if (document.cookie.indexOf(prefix + "agree") >= 0) {
        analytical = 1;
        advertising = 1;
        user_created = 1;
    }

    $('span.green #advertising-cookies').attr('value', advertising);
    $('span.green #analytical-cookies').attr('value', analytical);
    $('span.green #user_created-cookies').attr('value', user_created);
}

$(document).on('click', '.modal-sidebar .tab', function() {

    $('.modal-sidebar .tab').removeClass('active');
    $('.modal-main .text').hide();
    var clicked = $(this).attr('id');
    $('#'+clicked).addClass('active');
    $('.'+clicked+'-text').show();

    analytical = $('span.green button#analytical-cookies').val();
    advertising = $('span.green button#advertising-cookies').val();
    user_created = $('span.green button#user_created-cookies').val();

    $('span.green button#advertising-cookies').attr('value', advertising);
    $('span.green button#analytical-cookies').attr('value', analytical);
    $('span.green button#user_created-cookies').attr('value', user_created);

    if (advertising == 0) {
        $('span.green button#advertising-cookies').removeClass('active');
    } else {
        $('span.green button#advertising-cookies').addClass('active');
    }

    if (analytical == 0) {
        $('span.green button#analytical-cookies').removeClass('active');
    } else {
        $('span.green button#analytical-cookies').addClass('active');
    }

    if (user_created == 0) {
        $('span.green button#user_created-cookies').removeClass('active');
    } else {
        $('span.green button#user_created-cookies').addClass('active');
    }
});

$(document).on('click', '#cookies_consent .save_cookies_options', function() {

    analytical = $('span.green button#analytical-cookies').val();
    advertising = $('span.green button#advertising-cookies').val();
    user_created = $('span.green button#user_created-cookies').val();

    if (analytical == 1) {
        document.cookie = prefix + 'analytical=;expires=' + cookie_expiration + 'path=/';

    } else {
        $.each( if_not_analytical_cookies, function(i, val) {
            document.cookie = val + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
        });
    }

    if (advertising == 1) {
        document.cookie = prefix + 'advertising=;expires=' + cookie_expiration + 'path=/';
        document.cookie = prefix + 'essential_only=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    } else {
        $.each( if_not_advertising_cookies, function(i, val) {
            document.cookie = val + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
        });
    }

    if (user_created == 1) {
        document.cookie = prefix + 'user_created=;expires=' + cookie_expiration + 'path=/';
        document.cookie = prefix + 'essential_only=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    } else {
        document.cookie = prefix + 'user_created=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
        document.cookie = prefix + 'agree=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';

    }

    if (user_created == 0 && advertising == 0 && analytical == 0) {
        document.cookie = prefix + 'essential_only=;expires=' + cookie_expiration + 'path=/';
        document.cookie = prefix + 'agree=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
        document.cookie = prefix + 'user_created=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
        document.cookie = prefix + 'advertising=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
        document.cookie = prefix + 'analytical=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }

    $(this).closest('.modal').modal('hide');

    location.reload();
});

function deleteDisallowedCookies() {

    var splitted = document.cookie.split(/; */);

    var ag = false;

    $.each(splitted, function(i, e)  {
        var cookie = e.split('=')[0];
        if($.inArray(cookie, cookie_categories) >= 0) {
            if (e.indexOf(prefix + "agree") >= 0) {
                e = prefix + 'agree=;expires=' + cookie_expiration + 'path=/';
                e = prefix + 'essential_only=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
                ag = true;
            } else {
                if (e.indexOf(prefix + "analytical") >= 0) {
                    e = prefix + 'analytical=;expires=' + cookie_expiration + 'path=/';
                    e = prefix + 'essential_only=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
                } else {
                    $.each( if_not_analytical_cookies, function(i, val) {
                        e = val + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
                    });
                }

                if (e.indexOf(prefix + "advertising") >= 0) {
                    e = prefix + 'advertising=;expires=' + cookie_expiration + 'path=/';
                    e = prefix + 'essential_only=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
                } else {
                    $.each( if_not_advertising_cookies, function(i, val) {
                        e = val + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
                    });
                }

                if (e.indexOf(prefix + "user_created") >= 0) {
                    e = prefix + 'user_created=;expires=' + cookie_expiration + 'path=/';
                    e = prefix + 'essential_only=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';

                } else {
                    e = prefix + 'user_created=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
                    e = prefix + 'agree=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
                }
            }

        } else {
            e = prefix + 'essential_only=;expires=' + cookie_expiration + 'path=/';
            e = prefix + 'agree=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
            e = prefix + 'analytical=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
            e = prefix + 'advertising=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
            e = prefix + 'user_created=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
        }
    });
    if ((document.cookie.indexOf(prefix + "user_created") < 0 || document.cookie.indexOf(prefix + "analytical") < 0 || document.cookie.indexOf(prefix + "advertising") < 0) && ag == false){
        document.cookie = prefix + 'agree=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }
}

function deleteNonEssentialCookies() {
    $.each( if_not_analytical_cookies, function(i, val) {
        document.cookie = val + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    });
    $.each( if_not_advertising_cookies, function(i, val) {
        document.cookie = val + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    });
    document.cookie = prefix + 'agree=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    document.cookie = prefix + 'analytical=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    document.cookie = prefix + 'advertising=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    document.cookie = prefix + 'user_created=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    document.cookie = prefix + 'essential_only=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
}
