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

