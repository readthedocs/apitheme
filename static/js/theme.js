/* Read the Docs API theme */

var util = require('./util.js'),
    jquery = $ = global.jQuery = require('jquery'),
    waypoints = require('waypoints');

function StickyHeadingHandler() {
    this.init();
}

StickyHeadingHandler.prototype.use_current = function () {
    this.wrapper.empty();
    if (this.elements.length) {
        var element = this.elements[this.elements.length - 1],
            inner = $('<div class="inner"></div>');
        element.clone().contents().appendTo(inner);
        inner.appendTo(this.wrapper);
    }
};

StickyHeadingHandler.prototype.init = function () {
    this.elements = [];
    this.wrapper = $('<div class="heading-fixed"></div>');
    $('div.content').append(this.wrapper);
};

/* Use query to select elements to add new Waypoint triggers. On these triggers,
 * call the callback `cb`. This callback is called with the following:
 *
 * cb(element, enter/exit callback);
 *
 */
StickyHeadingHandler.prototype.add_profile = function (query, cb) {
    var heading = this;

    // Create two waypoints for each block element, one at the top and one
    // offset to the bottom.
    $(query).each(function () {
        var element = $(this),
            enter_callback = function (elem) {
                if (elem) {
                    heading.elements.push(elem);
                }
            },
            exit_callback = function (elem) {
                if (heading.elements.length) {
                    heading.elements.pop();
                }
            },
            top_waypoint = new window.Waypoint({
                element: element,
                offset: function () {
                    return heading.wrapper.outerHeight();
                },
                handler: function (direction) {
                    if (direction == 'down') {
                        cb(element, enter_callback);
                    }
                    else {
                        cb(element, exit_callback);
                    }
                    heading.use_current();
                }
            });
            bottom_waypoint = new window.Waypoint({
                element: element,
                offset: function () {
                    return 0 - this.adapter.outerHeight() + heading.wrapper.outerHeight();
                },
                handler: function (direction) {
                    if (direction == 'down') {
                        cb(element, exit_callback);
                    }
                    else {
                        cb(element, enter_callback);
                    }
                    heading.use_current();
                }
            });
    })
};

$(document).ready(function () {
    var sticky_heading = new StickyHeadingHandler();

    sticky_heading.add_profile('dl.class', function (elem, cb) {
        var heading = elem.children('dt').first();
        if (heading) {
            cb(heading);
        }
    });

    sticky_heading.add_profile('div.content div.section', function (elem, cb) {
        var heading = elem.children('h1,h2,h3,h4,h5,h6').first();
        if (heading) {
            cb(heading);
        }
    });

    // TODO clean this up
    function scroll_to_id(id) {
        id = id.replace(/\./g, '\\.');
        var elem = $(id);
        if (elem && elem.offset()) {
            // TODO make this not a scalar 50px
            $('html, body').scrollTop(elem.offset().top - 50);
        }
    }

    $('a').on('click', function (event) {
        if (this.hash && this.hash.startsWith('#')) {
            if (history.pushState) {
                history.pushState(null, null, this.hash);
                scroll_to_id(this.hash);
            }
            else {
                location.hash = this.hash;
            }
            event.preventDefault();
        }
    });

    $(window).on('hashchange', function () {
        setTimeout(function () { scroll_to_id(window.location.hash) }, 25);
    });
    if (window.location.hash) {
        setTimeout(function () { scroll_to_id(window.location.hash) }, 25);
    }
});
