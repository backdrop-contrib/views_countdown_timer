(function ($) {
    $(document).ready(function () {
        $('.views-countdown-timer').each(function () {
            var timerElement = $(this);
            var eventTimeUTC = Number(timerElement.data('time')); // Get UTC timestamp
            var siteTimezone = document.getElementById("timezoneElement").dataset.timezone;

            // Dynamically detect the correct local offset
            function getCurrentOffset() {
                return -new Date().getTimezoneOffset() / 60;
            }

            // Convert event time to local time dynamically
            var currentOffset = getCurrentOffset();
            var eventTimeLocal = eventTimeUTC + (currentOffset * 60 * 60 * 1000); // Apply the correct offset

            // Countdown function
            function updateCountdown() {
                var now = new Date().getTime();
                var remaining = eventTimeLocal - now;

                if (remaining < 0) {
                    timerElement.html('<p>Event Started</p>');
                    clearInterval(countdown);
                } else {
                    var days = Math.floor(remaining / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((remaining / (1000 * 60 * 60)) % 24); // Corrected
                    var minutes = Math.floor((remaining / (1000 * 60)) % 60); // Extract remaining minutes
                    var seconds = Math.floor((remaining / 1000) % 60); // Extract remaining seconds

                    var countdownText = '<div class="countdown-timer">' +
                        `<span class='countdown-days'>${days} day${days !== 1 ? "s" : ""}, </span> ` +
                        `<span class='countdown-hours'>${hours} hour${hours !== 1 ? "s" : ""}, </span> ` +
                        `<span class='countdown-minutes'>${minutes} minute${minutes !== 1 ? "s" : ""}, </span>` +
                        `<span class='countdown-seconds'>${seconds} second${seconds !== 1 ? "s" : ""}</span>` +
                        '</div>';

                    timerElement.html(countdownText);
                }
            }

            // Run the update function every second
            var countdown = setInterval(updateCountdown, 1000);
            updateCountdown(); // Initial call to prevent delay
        });
    });
})(jQuery);