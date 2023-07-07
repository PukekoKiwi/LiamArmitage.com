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
    var filePath = `l10n/${lang === 'en' ? 'english' : 'japanese'}/${filename}_${lang}.json`;
  
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