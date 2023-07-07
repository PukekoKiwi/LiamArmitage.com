// Global variables
var currentLang = 'en'; // Default language
var fonts = {
    'en': 'Roboto',
    'ja': 'Klee One'
};

// Function to switch language from English to Japanese and vice versa
function switchLanguage() {
    currentLang = (currentLang === 'en') ? 'ja' : 'en';
    return currentLang;
}

// Function to handle translation of website based on selected language
function translateWebsite(filename) {
    // Switch language
    var lang = switchLanguage();
  
    // Adjust the file paths to match the directory structure
    var filePath = `../l10n/${lang === 'en' ? 'english' : 'japanese'}/${filename}_${lang}.json`;
  
    // Fetch the corresponding language file
    fetch(filePath)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        // Translate each element in the file and update the text in the website
        translateElement(data);
        // Change the font based on the language
        document.body.style.fontFamily = fonts[lang];
    });
}

// Recursive function to handle nested objects for translation
function translateElement(data, parentKey = '') {
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'object') {  // If value is an object, recurse on nested objects
            translateElement(value, `${parentKey}${parentKey ? '.' : ''}${key}`);
        } else {
            let fullKey = `${parentKey}${parentKey ? '.' : ''}${key}`;
            let element = document.querySelector(`[data-i18n="${fullKey}"]`);
            // If element exists, replace the innerHTML with the translated value
            if (element) {
                element.innerHTML = value;
            } else {
                console.warn(`Element with i18n key "${fullKey}" not found`);
            }
        }
    }
}

/////////////////////////////////////////////

// Function to filter project types
function filterProjects(type) {
    const projectItems = document.querySelectorAll(".project-item"); // Get all project items

    projectItems.forEach((projectItem) => {
        if (type === "all") {  // If type is 'all', display all projects
            projectItem.style.display = "flex";
        } else {  // Else, display only projects of the selected type
            if (projectItem.classList.contains(type)) {
                projectItem.style.display = "flex";
            } else {
                projectItem.style.display = "none";
            }
        }
    });
}

/////////////////////////////////////////////

// Get the "scroll to top" button
const scrollToTopBtn = document.getElementById("scroll-to-top");

// Add an event listener for scroll
window.addEventListener("scroll", () => {
    // If user scrolls more than a third of the window height, show the "scroll to top" button
    if (window.pageYOffset > window.innerHeight / 3) {
        scrollToTopBtn.classList.add("show");
    } else {  // Else, hide the button
        scrollToTopBtn.classList.remove("show");
    }
});

// Function to scroll to top smoothly
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}
