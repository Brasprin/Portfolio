document.addEventListener("DOMContentLoaded", function () {
    fetch("components/sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("sidebar-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading sidebar:", error));

    fetch("components/mobileSidebar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("mobileSidebar-container").innerHTML = data;

        const toggleButton = document.getElementById('sidebarToggle');
        const mobileSidebar = document.getElementById('mobile-sidebar');

        if (toggleButton && mobileSidebar) {
            toggleButton.addEventListener('click', function () {
                mobileSidebar.classList.toggle('show');
            });
        } else {
            console.error("Toggle button or sidebar not found.");
        }
    })
    .catch(error => console.error("Error loading mobile sidebar:", error));

});
