// JavaScript script that is executed only when DOM is loaded
// Uses JQuery

$(document).ready(function () {
    const amenityIds = {}; // Dictionary to store Amenity IDs

    // Listen for changes on input checkbox tags
    $('input[type="checkbox"]').change(function () {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if (this.checked) {
            // Add Amenity ID to the variable
            amenityIds[amenityId] = amenityName;
        } else {
            // Remove Amenity ID from the variable
            delete amenityIds[amenityId];
        }

        // Update the h4 tag with the list of checked Amenities
        const amenitiesList = Object.values(amenityIds).join(', ');
        $('.amenities h4').text(amenitiesList);
    });
});

// static/scripts/2-hbnb.js

$(document).ready(function () {
    // Listen for changes on input checkbox tags (same code as before)

    // Request API status
    $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});

// static/scripts/3-hbnb.js

$(document).ready(function () {
    // Listen for changes on input checkbox tags (same code as before)

    // Request places search
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            // Loop through the places and create article tags
            for (const place of data) {
                const article = $('<article>');
                // Set the content of the article tag (you can modify this based on your requirements)
                article.html(`<div class="title">${place.name}</div><div class="price_by_night">$${place.price_by_night}</div>`);
                $('.places').append(article);
            }
        }
    });
});

// static/scripts/4-hbnb.js

$(document).ready(function () {
    // Listen for changes on input checkbox tags (same code as before)

    // When the button tag is clicked
    $('button').click(function () {
        // Get the list of Amenity IDs checked
        const amenityIds = [];
        $('input[type="checkbox"]:checked').each(function () {
            amenityIds.push($(this).data('id'));
        });

        // Send a new POST request to places_search with the list of Amenity IDs checked
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: amenityIds }),
            success: function (data) {
                // Loop through the places and create article tags (similar to before)
                for (const place of data) {
                    const article = $('<article>');
                    // Set the content of the article tag
                    article.html(`<div class="title">${place.name}</div><div class="price_by_night">$${place.price_by_night}</div>`);
                    $('.places').append(article);
                }
            }
        });
    });
});

// static/scripts/100-hbnb.js

$(document).ready(function () {
    // Listen for changes on input checkbox tags (same code as before)

    // When the button tag is clicked
    $('button').click(function () {
        // Get the list of Amenity IDs checked (same code as before)

        // Get the list of State and City IDs checked
        const stateIds = [];
        const cityIds = [];
        $('input[type="checkbox"]:checked').each(function () {
            const id = $(this).data('id');
            const name = $(this).data('name');
            if (name.startsWith('State')) {
                stateIds.push(id);
            } else if (name.startsWith('City')) {
                cityIds.push(id);
            }
        });

        // Send a new POST request to places_search with the list of Amenity, City, and State IDs checked
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({
                amenities: amenityIds,
                states: stateIds,
                cities: cityIds
            }),
            success: function (data) {
                // Loop through the places and create article tags (similar to before)
                for (const place of data) {
                    const article = $('<article>');
                    // Set the content of the article tag
                    article.html(`<div class="title">${place.name}</div><div class="price_by_night">$${place.price_by_night}</div>`);
                    $('.places').append(article);
                }
            }
        });
    });
});

