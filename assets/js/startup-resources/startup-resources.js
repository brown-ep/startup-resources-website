$(document).ready(function () {
    function TEvent(content, heading, filters) {
        this.content = content;
        this.heading = heading;
        this.filters = filters;
    }
    var events = [
        new TEvent("<li class=\"is-hidden timeline-item centered\">" +
                   "<h3>Innovate on the Hill Picnic</h3><hr>" +
                   "<p>See <a href=\"https://www.facebook.com/events/1638688863109744/\" target=\"_blank\">event details</a>.</p><hr>" + 
                   "<time>September 9, 2016</time></li>",
                   "Sept 2016",
                   [".organizations", ".social", ".design", ".conferences", ".ideation"]),
        new TEvent("<li class=\"is-hidden timeline-item centered\">" +
                   "<h3>A Better World by Design</h3><hr>" +
                   "<p>Learn more and sign up <a href=\"http://betterworldxdesign.com/\" target=\"_blank\">here</a>.</p><hr>" + 
                   "<time>September 23-25, 2016</time></li>",
                   "Sept 2016",
                   [".organizations", ".conferences", ".design", ".ideation"]),
        new TEvent("<li class=\"is-hidden timeline-item centered\">" +
                   "<h3>Startup at Brown</h3><hr>" +
                   "<p>Apply <a href=\"http://startupatbrown.org/\" target=\"_blank\">here</a> by September 25.</p><hr>" + 
                   "<time>October 1, 2016</time></li>",
                   "Oct 2016",
                   [".learning", ".conferences", ".ideation"]),
        new TEvent("<li class=\"is-hidden timeline-item centered\">" +
                   "<h3>Synapse NYC</h3><hr>" +
                   "<p>More information <a href=\"https://www.facebook.com/events/970311843022532/\" target=\"_blank\">here</a>.</p><hr>" + 
                   "<time>January 24-26, 2017</time></li>",
                   "Jan 2017",
                   [".conferences", ".ideation"]),
        new TEvent("<li class=\"is-hidden timeline-item centered\">" +
                   "<h3>Hack at Brown</h3><hr>" +
                   "<p>Application and more information <a href=\"http://2017.hackatbrown.org/\" target=\"_blank\">here</a>.</p><hr>" + 
                   "<time>February 4-5, 2017</time></li>",
                   "Feb 2017",
                   [".initiatives", ".organizations", ".ideation", ".prototyping", ".testing"]),
        new TEvent("<li class=\"is-hidden timeline-item centered\">" +
                   "<h3>Innovation Dojo Applications Due</h3><hr>" +
                   "<p>Apply <a href=\"https://brownepinnovationdojo.wufoo.com/forms/z1b6va7q1ixc12w/\" target=\"_blank\">here</a>.</p><hr>" + 
                   "<time>February 11, 2017</time></li>",
                   "Feb 2017",
                   [".initiatives", ".social", ".design", ".learning", ".ideation", ".prototyping", ".testing", ".funding"]),
        new TEvent("<li class=\"is-hidden timeline-item centered\">" +
                   "<h3>B-Lab Applications Due</h3><hr>" +
                   "<p>See <a href=\"https://www.brown.edu/initiatives/summer-b-lab/\" target=\"_blank\">here</a> for information and updates on the application process.</p><hr>" + 
                   "<time>February 17, 2017</time></li>",
                   "Feb 2017",
                   [".social", ".initiatives", ".prototyping", ".launching", ".testing"]),
        new TEvent("<li class=\"is-hidden timeline-item centered\">" +
                   "<h3>ChangeFest</h3><hr>" +
                   "<p>Sign up and more information <a href=\"http://changefest.co/\" target=\"_blank\">here</a>.</p><hr>" + 
                   "<time>April 22, 2017</time></li>",
                   "Apr 2017",
                   [".initiatives", ".organizations", ".ideation", ".prototyping", ".testing"])
    ];

    function createTimeline(eventsList) {
        var prevMonth = null;
        var htmlContent = "";
        $.each(eventsList, function (index, event) {
            if (event.heading !== prevMonth) {
                if (prevMonth != null) {
                    htmlContent += "</ul>";
                }
                htmlContent += "<h2>" + event.heading + "</h2><ul class=\"timeline-items\">";
            }
            htmlContent += event.content;
            prevMonth = event.heading;
        });
        htmlContent += "</ul>";
        $('#timeline-container .timeline').html(htmlContent);
        $('.timeline').timelify();
    }
    createTimeline(events);


    function filterTimeline(filter) {
        if (filter === "*") {
            createTimeline(events);
        } else {
            var filtered = $.grep(events, function (n, i) {
                return $.inArray(filter, n.filters) >= 0;
            });
            createTimeline(filtered);
        }
    }

    /* FILTERING */
    if ($('#projects').length > 0) {
        var $container = $('#projects');

        $container.imagesLoaded(function () {
            $container.isotope({
                // options
                animationEngine: 'best-available',
                itemSelector: '.item-thumbs',
                layoutMode: 'fitRows'
            });
        });

        var $stepContainer = $('#steps-container'),
            $steps = $stepContainer.find('.step');

        var $optionSets = $('#options .option-set'),
            $optionLinks = $optionSets.find('a');


        /* Stage filtering */

        $steps.click(function () {
            var $this = $(this);
            var options;
            if ($this.hasClass('active')) {
                $this.removeClass('active');
                $("[data-option-value='*']").addClass('selected');
                options = {},
                    key = 'filter',
                    value = '*';
                // parse 'false' as false boolean
                value = value === 'false' ? false : value;
                options[key] = value;
                if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                    // changes in layout modes need extra logic
                    changeLayoutMode($this, options)
                } else {
                    // otherwise, apply new options
                    $container.isotope(options);
                }
                filterTimeline("*");
            } else {
                // reset all the filters
                $optionSets.find('.selected').removeClass('selected');
                $('#steps-container').find('.active').removeClass('active');

                $this.addClass('active');
                options = {},
                    key = 'filter',
                    value = $this.attr('data-option-value');
                // parse 'false' as false boolean
                value = value === 'false' ? false : value;
                options[key] = value;
                if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                    // changes in layout modes need extra logic
                    changeLayoutMode($this, options)
                } else {
                    // otherwise, apply new options
                    $container.isotope(options);
                }
                filterTimeline($this.attr('data-option-value'));
            }
        });

        /* Type filtering */

        $optionLinks.click(function () {
            var $this = $(this);
            // don't proceed if already selected
            if ($this.hasClass('selected')) {
                return false;
            }
            var $optionSet = $this.parents('.option-set');
            $optionSet.find('.selected').removeClass('selected');
            $('#steps-container').find('.active').removeClass('active');
            $this.addClass('selected');

            // make option object dynamically, i.e. { filter: '.my-filter-class' }
            var options = {},
                key = $optionSet.attr('data-option-key'),
                value = $this.attr('data-option-value');
            // parse 'false' as false boolean
            value = value === 'false' ? false : value;
            options[key] = value;
            if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                // changes in layout modes need extra logic
                changeLayoutMode($this, options)
            } else {
                // otherwise, apply new options
                $container.isotope(options);
            }
            filterTimeline($this.attr('data-option-value'));
            return false;
        });
    }
});
