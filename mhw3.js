function onBooksJson(json) {
    console.log('JSON ricevuto');
    // Svuotiamo la libreria
    const library = document.querySelector('#page');
    library.innerHTML = '';
    // Leggi il numero di risultati
    let num_results = json.count;
    // Mostriamone al massimo 10
    if(num_results > 24)
      num_results = 24;
      
    // Processa ciascun risultato
    for(let i=0; i<num_results; i++)
    {

      const doc = json.results[i]
      const title = doc.title;
      const author = doc.authors[0].name;

      const clickable = document.createElement('a');
      if(doc.formats["text/html; charset=utf-8"] == undefined) {
        clickable.href = doc.formats["text/html"];
      }
      else clickable.href = doc.formats["text/html; charset=utf-8"];

      const book = document.createElement('div');
      book.classList.add('book');
     

      const cover = document.createElement('img');
      cover.src = doc.formats["image/jpeg"];

      const caption = document.createElement('p');
      caption.textContent = title;
      caption.classList.add('title');
      const writer = document.createElement('p');
      writer.textContent = author;
      writer.classList.add('author');

      clickable.appendChild(cover);
      book.appendChild(clickable);
      book.appendChild(caption);
      library.appendChild(book);
      
    }
  }

  function onPetJson(json) {
    console.log('JSON Pet ricevuto');
    console.log(json);
    // Svuotiamo la libreria
    const view = document.querySelector('#petspace');
    view.innerHTML = '';

    const results = json.animals
    for(result of results)
    {
    console.log(result);
    if(result.primary_photo_cropped != null)
    {
      const immagine = result.primary_photo_cropped.medium;
      const album = document.createElement('div');
      album.classList.add('album');
      const img = document.createElement('img');
      img.src = immagine;
      album.appendChild(img);
      view.appendChild(album);
    }
    }
  
    
  }

  function openNav() {
    document.getElementById("mySidepanel").style.width = "20%";
  }
  
  /* Set the width of the sidebar to 0 (hide it) */
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }

  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
  function searchBooks(event)
  {
    event.preventDefault();
    const input = document.querySelector('[data-books]');
    const value = encodeURIComponent(input.value);
    rest_url = 'https://gutendex.com/books?search=' + value;
    console.log('URL: ' + rest_url);
    fetch(rest_url).then(onResponse).then(onBooksJson);
    }

function searchPets(event) {

      event.preventDefault();
      const input = document.querySelector('[data-pet]');
      const value = encodeURIComponent(input.value);
      
			const status = 'adoptable'
			fetch('https://api.petfinder.com/v2/animals?type=' + value + '&status=' + status, 
			{
				headers: {
					'Authorization': token_data.token_type + ' ' + token_data.access_token,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(onResponse).then(onPetJson);
		
}

function getToken(json)
{
	token_data = json;
	console.log(json);
}

function onTokenResponse(response) {
  return response.json();
}

function homeFunc(event) {
  const url = 'https://gutendex.com/books?search=dostoyevsky';
  fetch(url).then(onResponse).then(onBooksJson);
}

const home = document.querySelector('[data-button = home');
home.addEventListener('click', homeFunc);
const shify = document.querySelector("#shyfi");
shify.addEventListener('click', homeFunc);

const formbooks = document.querySelector('#booksearch');
formbooks.addEventListener('submit', searchBooks);

const formpets = document.querySelector('#petsearch');
formpets.addEventListener('submit', searchPets);

const url = 'https://gutendex.com/books?search=dostoyevsky';
fetch(url).then(onResponse).then(onBooksJson);

//chiedo venia...
const key_petfinder = '7enQNVqjn3UjEq6n01Y4vqEkx6rnN2dPy2gCSbORSFp1DlzXFT'
const secret_petfinder = 'ooIVyIMsx0g8KEMWO49rVwPRqPNwL9VaixniYJF6'
const pet_api_endpoint_token = 'https://api.petfinder.com/v2/oauth2/token' 
const pet_api_endpoint = 'https://api.petfinder.com/v2/animals' 

let token_data;
fetch(pet_api_endpoint_token,
{
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key_petfinder + '&client_secret=' + secret_petfinder,
	headers:
	{
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}
).then(onTokenResponse).then(getToken);
  
  