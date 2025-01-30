// Light to Dark theme switch using Astro 6.0
// https://www.youtube.com/watch?v=4ac-g4E9xxM

const body = document.querySelector('body');
const themeSwitch = document.getElementById('theme-switch');
const themeIcon = document.getElementById('theme-icon');
const darkTheme = 'dark-theme';
const darkIcon = 'brightness-3';
const lightTheme = 'light-theme';
const lightIcon = 'wb-sunny';
const preference = localStorage.getItem('theme');

if (preference != null) {
  let preferences = JSON.parse(preference);

  body.className = preferences.theme;
  themeIcon.icon = preferences.icon;
  themeSwitch.checked = preferences.icon === lightIcon;
}

themeSwitch.addEventListener('click', e => {
  if (!e.target.checked) {
    body.className = lightTheme;
    themeIcon.icon = lightIcon;

    let preferences = { theme: lightTheme, icon: lightIcon };
    localStorage.setItem("theme", JSON.stringify(preferences));
    
    return;
  }

  body.className = darkTheme;
  themeIcon.icon = darkIcon;

  let preferences = { theme: darkTheme, icon: darkIcon };
  localStorage.setItem("theme", JSON.stringify(preferences));
});
