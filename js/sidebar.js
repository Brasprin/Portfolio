<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", initSidebars);

function loadInto(selector, url) {
  return new Promise((resolve, reject) => {
    $(selector).load(url, function (response, status, xhr) {
      if (status === "error") reject(xhr?.statusText || "Load error");
      else resolve();
    });
  });
}

  async function initSidebars() {
    try {
      await Promise.all([
  loadInto("#sidebar-container", "/components/sidebar.html"),
      loadInto("#mobileSidebar-container", "/components/mobileSidebar.html"),
      ]);
      document.documentElement.classList.add("sidebars-ready");
      setupToggleButtons();
      if (window.htmx) wireSpaNav();
    } catch (e) {
      console.error("Failed to load sidebars:", e);
      document.querySelectorAll("#sidebar-container,#mobileSidebar-container")
        .forEach(n => n.style.visibility = "visible");
    }
  }

function setupToggleButtons() {
  const $mobileSidebar = $("#mobile-sidebar");
  $("#sidebarToggle").off("click").on("click", () => $mobileSidebar.toggleClass("show"));
  $("#mobile-sidebarToggle").off("click").on("click", () => $mobileSidebar.toggleClass("show"));
  $(document).off("click.sidebar").on("click.sidebar", (event) => {
    if (
      !$(event.target).closest("#mobile-sidebar").length &&
      !$(event.target).is("#sidebarToggle") &&
      !$(event.target).is("#mobile-sidebarToggle") &&
      $mobileSidebar.hasClass("show")
    ) {
      $mobileSidebar.removeClass("show");
    }
  });
}

function wireSpaNav() {
  $("#sidebar-container, #mobileSidebar-container").on("click", "a[data-partial]", function (e) {
    e.preventDefault();
    const partial = this.getAttribute("data-partial");
    const url = this.getAttribute("href") || "/";
    htmx.ajax("GET", partial, {
      target: "#content",
      swap: "innerHTML",
      history: "push",
      path: url
    });
  });
=======

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
>>>>>>> parent of 2954ee7 (Working with forms (CHECKPOINT))
}