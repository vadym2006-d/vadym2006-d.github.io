let currentLang = 'en';

async function loadTranslations(lang) {
  try {
    const response = await fetch(`locales/${lang}.json`);
    return await response.json();
  } catch (error) {
    console.error('Помилка завантаження файлу перекладу:', error);
    return null;
  }
}

async function updateContent() {
  const translations = await loadTranslations(currentLang);

  if (!translations) return;
  
  document.querySelector('h1').textContent = translations.title;
  document.querySelector('p').textContent = translations.subtitle;
  document.getElementById('languageSwitchBtn').textContent = translations.button;

  const heroesSection = document.getElementById('heroes');
  heroesSection.innerHTML = ''; // Очищуємо вміст перед оновленням

  for (const key in translations) {
    if (key.startsWith('hero')) {
      const hero = translations[key];
      const article = document.createElement('article');
      article.innerHTML = `
        <h2>${hero.name}</h2>
        <p>${hero.identity}</p>
        <p>${hero.age}</p>
        <ul>${hero.powers.map(power => `<li>${power}</li>`).join('')}</ul>
      `;
      heroesSection.appendChild(article);
    }
  }
}

document.getElementById('languageSwitchBtn').addEventListener('click', async () => {
  currentLang = currentLang === 'en' ? 'uk' : 'en';
  await updateContent();
});

document.addEventListener('DOMContentLoaded', updateContent);
