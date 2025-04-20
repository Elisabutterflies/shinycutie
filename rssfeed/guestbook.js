let entries = JSON.parse(localStorage.getItem("guestbook")) || [];
        let currentPage = 0;
        const itemsPerPage = 5;

        function saveEntries() {
            localStorage.setItem("guestbook", JSON.stringify(entries));
            generateRSS(); // Update RSS feed
        }

        function displayEntries() {
            let start = currentPage * itemsPerPage;
            let end = start + itemsPerPage;
            let visibleEntries = entries.slice(start, end);

            document.getElementById("guestbook-entries").innerHTML = visibleEntries.map(entry => `
                <div class="entry">
                    <strong>${entry.name}</strong> 
                    ${entry.website ? `(<a href="${entry.website}" target="_blank">Website</a>)` : ""}
                    <p>${entry.message}</p>
                    <small>${new Date(entry.date).toLocaleString()}</small>
                </div>
            `).join("");

            document.getElementById("prev").disabled = currentPage === 0;
            document.getElementById("next").disabled = end >= entries.length;
        }

        document.getElementById("guestbook-form").addEventListener("submit", function(e) {
            e.preventDefault();

            let name = document.getElementById("name").value.trim();
            let website = document.getElementById("website").value.trim();
            let message = document.getElementById("message").value.trim();

            if (name && message) {
                entries.unshift({ name, website, message, date: new Date().toISOString() });
                saveEntries();
                displayEntries();
                document.getElementById("guestbook-form").reset();
            }
        });

        document.getElementById("prev").addEventListener("click", function() {
            if (currentPage > 0) {
                currentPage--;
                displayEntries();
            }
        });

        document.getElementById("next").addEventListener("click", function() {
            if ((currentPage + 1) * itemsPerPage < entries.length) {
                currentPage++;
                displayEntries();
            }
        });

        function generateRSS() {
            let rssContent = `<?xml version="1.0" encoding="UTF-8" ?>
            <rss version="2.0">
            <channel>
                <title>Guestbook Feed</title>
                <link>${window.location.href}</link>
                <description>Latest guestbook entries</description>`;

            entries.forEach(entry => {
                rssContent += `
                <item>
                    <title>${entry.name}</title>
                    <link>${entry.website || "#"}</link>
                    <description>${entry.message}</description>
                    <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
                </item>`;
            });

            rssContent += `</channel></rss>`;

            document.getElementById("rss-content").innerText = rssContent; // Display RSS feed
        }

        displayEntries(); // Initial load
        generateRSS(); // Generate RSS on load
