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
    wireSpaNav(); // ←make sidebar links load partials
  } catch (e) {
    console.error("Failed to load sidebars:", e);
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
}