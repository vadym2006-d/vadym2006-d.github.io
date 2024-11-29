const jsonURL = 'locales/en.json';

const header = document.querySelector('header');
const section = document.querySelector('section');

async function fetchHeroes() {
  try {
    const response = await fetch(jsonURL);
    const data = await response.json();
    populateHeader(data);
    showHeroes(data);
  } catch (error) {
    console.error('Помилка завантаження JSON:', error);
  }
}

function populateHeader(data) {
  const h1 = document.createElement('h1');
  h1.textContent = data.squadName;
  header.appendChild(h1);

  const p = document.createElement('p');
  p.textContent = `Hometown: ${data.homeTown} // Formed: ${data.formed}`;
  header.appendChild(p);
}

function showHeroes(data) {
  const heroes = data.members;

  heroes.forEach(hero => {
    const article = document.createElement('article');

    const h2 = document.createElement('h2');
    h2.textContent = hero.name;
    article.appendChild(h2);

    const pIdentity = document.createElement('p');
    pIdentity.textContent = `Secret identity: ${hero.secretIdentity}`;
    article.appendChild(pIdentity);

    const pAge = document.createElement('p');
    pAge.textContent = `Age: ${hero.age}`;
    article.appendChild(pAge);

    const pPowers = document.createElement('p');
    pPowers.textContent = 'Superpowers:';
    article.appendChild(pPowers);

    const ul = document.createElement('ul');
    hero.powers.forEach(power => {
      const li = document.createElement('li');
      li.textContent = power;
      ul.appendChild(li);
    });
    article.appendChild(ul);

    section.appendChild(article);
  });
}

fetchHeroes();
