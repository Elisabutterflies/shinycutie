function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks, box1;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(userPrefersDark ? 'dark' : 'light');
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});


function updateClock() {
            let now = new Date();
            let hours = String(now.getHours()).padStart(2, '0');
            let minutes = String(now.getMinutes()).padStart(2, '0');
            let seconds = String(now.getSeconds()).padStart(2, '0');

            let timeString = `${hours}:${minutes}:${seconds}`;
            document.getElementById("clock").textContent = timeString;
        }

        setInterval(updateClock, 1000);
        updateClock(); // Run immediately on load
        		


function generateTinyCalendar() {
            const today = new Date();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

            let calendarHTML = `<h3>${monthNames[currentMonth]} ${currentYear}</h3>`;
            calendarHTML += '<div class="days">';

            for (let day = 1; day <= daysInMonth; day++) {
                const isToday = (day === today.getDate()) ? "today" : "";
                calendarHTML += `<div class="day ${isToday}">${day}</div>`;
            }

            calendarHTML += '</div>';
            document.getElementById("calendar").innerHTML = calendarHTML;
        }

        generateTinyCalendar();
