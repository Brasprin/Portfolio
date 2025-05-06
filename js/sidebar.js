
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
            setupToggleButtons();
        })
        .catch(error => console.error("Error loading mobile sidebar:", error));
});

// Setup both toggle buttons
function setupToggleButtons() {
    const regularToggleButton = document.getElementById('sidebarToggle');
    const mobileToggleButton = document.getElementById('mobile-sidebarToggle');
    const mobileSidebar = document.getElementById('mobile-sidebar');

    // Regular sidebar toggle
    if (regularToggleButton && mobileSidebar) {
        regularToggleButton.addEventListener('click', function () {
            mobileSidebar.classList.toggle('show');
        });
    }
    
    // Mobile sidebar toggle
    if (mobileToggleButton && mobileSidebar) {
        mobileToggleButton.addEventListener('click', function () {
            mobileSidebar.classList.toggle('show');
        });
    }
    
    // Check if we have at least one of the toggle buttons
    if ((regularToggleButton || mobileToggleButton) && mobileSidebar) {
        document.addEventListener('click', function(event) {
            if (!mobileSidebar.contains(event.target) && 
                event.target !== regularToggleButton &&
                event.target !== mobileToggleButton && 
                mobileSidebar.classList.contains('show')) {
                mobileSidebar.classList.remove('show');
            }
        });
    } else {
        console.error("Toggle buttons or sidebar not found.");
    }
}