const API_KEY = '7Cpbu44pFRppWeV4bJaN4Dargtm12XFUgjazP9MK'
const URL_ENDPOINT = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`

// date: YYYY-MM-DD
const getApod = async (date) => {
  const URL_ENDPOINT_DATE = `${URL_ENDPOINT}&date=${date}`

  const response = await fetch(URL_ENDPOINT_DATE);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: no se pudo obtener el APOD`);
  }

  const data = await response.json();
  console.log(data)
  return data
}

const SectionInfo = (info) => {
  const mediaHTML = info.media_type === 'video'
    ? `
      <div class="mediaWrapper">
        <iframe 
          src="${info.url}" 
          title="${info.title}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          onload="this.classList.add('loaded'); this.parentElement.classList.add('loaded')">
        </iframe>
      </div>
    `
    : `
      <div class="mediaWrapper">
        <img 
          src="${info.hdurl || info.url}" 
          alt="${info.title}"
          onload="this.classList.add('loaded'); this.parentElement.classList.add('loaded')">
      </div>
    `;

  const creditHTML = info.copyright
    ? `<span class="credit">Image Credit & Copyright: ${info.copyright}</span>`
    : `<span class="credit">Image Credit: NASA</span>`;

  return `
    <div class="sectionInfo">
      ${mediaHTML}

      <div class="bodyCard">
        <div class="cardHeader">
          <span class="date">
            <i class="fa-regular fa-calendar"></i>
            ${info.date}
          </span>
        </div>

        <h1>${info.title}</h1>
        ${creditHTML}

        <p>
          ${info.explanation}
        </p>
      </div>
    </div>
  `
}

const LoadingState = () => `
  <div class="sectionInfo loading">
    <p>Cargando imagen del día...</p>
  </div>
`;

const ErrorState = (message) => `
  <div class="sectionInfo error">
    <p>${message}</p>
  </div>
`;

const renderContent = async (date) => {
  const sectionInfo = document.getElementById('sectionInfo');

  sectionInfo.innerHTML = LoadingState();

  try {
    const data = await getApod(date);

    sectionInfo.innerHTML = SectionInfo(data);

  } catch (error) {
    console.error(error);
    sectionInfo.innerHTML = ErrorState(error.message);
  }
}

const today = new Date().toISOString().split('T')[0];

renderContent(today);