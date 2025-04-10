// Testing a flipping action for countdown timer
// does not work yet. Do not enable it yet.
// This code is a modified version of the original countdown timer script.

(function ($) {
    $(document).ready(function () {
        $('.views-countdown-timer').each(function () {
            var timerElement = $(this);
            var eventTimeUTC = Number(timerElement.data('time')); // Get UTC timestamp
            var siteTimezone = document.getElementById("timezoneElement").dataset.timezone;

            // Function to detect the correct local offset
            function getCurrentOffset() {
                return -new Date().getTimezoneOffset() / 60;
            }

            // Convert event time dynamically
            var currentOffset = getCurrentOffset();
            var eventTimeLocal = eventTimeUTC + (currentOffset * 60 * 60 * 1000); // Apply offset

            // Function to flip digits
            function flipDigit(element, newValue) {
                let topHalf = element.querySelector(".top");
                let bottomHalf = element.querySelector(".bottom");

                bottomHalf.textContent = newValue; // Set new bottom value
                bottomHalf.classList.add("flip"); // Apply flip effect

                setTimeout(() => {
                    topHalf.textContent = newValue; // Set new top value
                    bottomHalf.classList.remove("flip"); // Remove flip effect after animation
                }, 600);
            }

            // Countdown function
            function updateCountdown() {
                var now = new Date().getTime();
                var remaining = eventTimeLocal - now;

                if (remaining < 0) {
                    timerElement.html('<p>Event Started</p>');
                    clearInterval(countdown);
                } else {
                    var days = Math.floor(remaining / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
                    var minutes = Math.floor((remaining / (1000 * 60)) % 60);
                    var seconds = Math.floor((remaining / 1000) % 60);

                    // Update flip clock elements
                    document.querySelectorAll(".flip-unit").forEach((unit, index) => {
                        let values = [days, hours, minutes, seconds];
                        flipDigit(unit, values[index]);
                    });

                    // Display countdown with flipping effect
                    var countdownText = `
                        <div class="flip-clock">
                            <div class="flip-unit"><div class="top">${days}</div><div class="bottom">${days}</div></div>
                            <div class="flip-unit"><div class="top">${hours}</div><div class="bottom">${hours}</div></div>
                            <div class="flip-unit"><div class="top">${minutes}</div><div class="bottom">${minutes}</div></div>
                            <div class="flip-unit"><div class="top">${seconds}</div><div class="bottom">${seconds}</div></div>
                        </div>`;

                    timerElement.html(countdownText);
                }
            }

            // Run the update function every second
            var countdown = setInterval(updateCountdown, 1000);
            updateCountdown();
        });
    });
})(jQuery);