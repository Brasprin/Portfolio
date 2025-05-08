$(document).ready(function() {
    loadSidebars();
});

async function loadSidebars() {
    // Load sidebar
    $("#sidebar-container").load("components/sidebar.html", function() {
    });

    // Load mobile sidebar
    $("#mobileSidebar-container").load("components/mobileSidebar.html", function() {
        setupToggleButtons();
    });
}

// Setup sidebar toggle buttons
async function setupToggleButtons() {
    const $mobileSidebar = $("#mobile-sidebar");
    
    // Regular sidebar toggle
    $("#sidebarToggle").on('click', function() {
        $mobileSidebar.toggleClass('show');
    });
    
    // Mobile sidebar toggle
    $("#mobile-sidebarToggle").on('click', function() {
        $mobileSidebar.toggleClass('show');
    });
    
    // Check if we have at least one of the toggle buttons
    $(document).on('click', function(event) {
        if (!$(event.target).closest('#mobile-sidebar').length && 
            !$(event.target).is('#sidebarToggle') &&
            !$(event.target).is('#mobile-sidebarToggle') && 
            $mobileSidebar.hasClass('show')) {
            $mobileSidebar.removeClass('show');
        }
    });
}