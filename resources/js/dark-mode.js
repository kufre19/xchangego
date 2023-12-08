const themeToggleBtn = document.getElementById("theme-toggle");
const darkThemeIcon = document.getElementById("theme-toggle-dark-icon");
const lightThemeIcon = document.getElementById("theme-toggle-light-icon");
const logo = document.getElementById("logo");

// Determine initial theme based on local storage and user's preferred color scheme
const isDarkMode =
    localStorage.getItem("color-theme") === "dark" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches;

// Set initial theme
setTheme(isDarkMode);

// Toggle theme on button click
themeToggleBtn.addEventListener("click", function () {
    const isDarkMode = document.documentElement.classList.toggle("dark");
    localStorage.setItem("color-theme", isDarkMode ? "dark" : "light");
    toggleThemeIcons(isDarkMode);
    document.dispatchEvent(new Event("dark-mode"));
});

// Toggle theme icons based on current theme
function toggleThemeIcons(isDarkMode) {
    if (isDarkMode) {
        darkThemeIcon.classList.add("hidden");
        lightThemeIcon.classList.remove("hidden");
        logo.src = "/assets/images/logoIcon/logo-dark.png";
    } else {
        darkThemeIcon.classList.remove("hidden");
        lightThemeIcon.classList.add("hidden");
        logo.src = "/assets/images/logoIcon/logo.png";
    }
}

// Set theme based on boolean value
function setTheme(isDarkMode) {
    document.documentElement.classList.toggle("dark", isDarkMode);
    toggleThemeIcons(isDarkMode);
}
