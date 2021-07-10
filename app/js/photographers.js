var url = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json';

const photographer = document.getElementById('photographer');
const album = document.getElementById('album');
const modalContent = document.getElementById('modal-content');

///////////////////////////////////////////////////////////////
//  Contact form


const closeBtn = document.querySelector('.close-contact');
const contactBtn = document.querySelector('.card-contact');
const form = document.querySelector('.form__container');
const formSubmit = document.querySelector('#form-submit');
const header = document.querySelector('.header-wrapper-photographer');
const sortNav = document.querySelector('.sort-nav');

const formPhotographerName = document.querySelector('#formPhotographerName');
const firstName = document.querySelector('#first');
const lastName = document.querySelector('#last');
const email = document.querySelector('#email');
const message = document.querySelector('#messageField');



// Sort Album
let orderAlphabet = [];
let orderDate = [];
let orderLikes = [];

// Likes
let price = 0;
const pricePerDay = document.querySelector('#priceperday');
let likes = 0;
let likesCountPage = 0;


// Fetch 
function organizer(photographerNumber) {

    fetch(url)
        .then(response => response.json())
        .then(data => generatePerson(data, photographerNumber));
}

function generatePerson(data, photographerNumber) {
    let html = '';
    formSpan = '';

    // change number of photographer
    const person = data.photographers[photographerNumber];
    const personImg = person.portrait;
    const photographerName = person.name;
    const city = person.city;
    const country = person.country;
    const tagline = person.tagline;
    price = person.price;

    html += `
            <div class="card-info ">
                <div class="card-content">
                    <h1 class="card-name" role="Heading h1">${photographerName} </h1>
                    <p class="card-city" role="text">${city}, ${country}</p>
                    <p class="card-tagline" role="text">${tagline}</p>
                    <ul class="card-tags" role="Links">`;

    // Adding tags 
    for (let tags of person.tags) {
        html += '<li>#' + tags + '</li>';
    };

    html += `                             
                    </ul>
                    <div class="card-contact-container">
                        <button class="card-contact" onclick="openForm()" role="Button">Contact me</button>
                    </div>
                </div>
                <img role="Image" class="card-img" src="img/PhotographersID/${personImg}" alt="${photographerName}" />
                
            </div>
        `

    photographer.innerHTML = html;

    // Getting the photograherName for the form
    formSpan = `${photographerName}`;

    formPhotographerName.innerHTML = formSpan;


    generateAlbum(data, photographerNumber);

}


function generateAlbum(data, photographerNumber) {
    let html = '';
    let j = 1;      // number for tracking => gallery
    let personId = data.photographers[photographerNumber]["id"];     // Person ID 
    let fileName = data.photographers[photographerNumber]["name"];
    const media = data.media;

    // list for sort()
    let list = [];

    html += `<div class="album-container">`;



    for (let i = 0; i < media.length; i++) {
        // Test if data.photographers.id === data.media[i]["photographerID"]
        if (personId === media[i]["photographerId"]) {
            // list for sort 
            list.push(media[i]);


            let img = media[i]["image"];

            let title = media[i]["title"];
            let likes = media[i]["likes"];
            let mediaId = media[i]['id']

            // Test if img is defined it should be a video
            if (img === undefined) {

                html += `<div id="${mediaId}">`;
                html += `<a href="#" poster=""onclick="openModal(); currentSlide(` + [j] + `)">`;
                html += `<img role="Video Link" class="hover-shadow" alt="${title}" src="img/${fileName}/${title}.jpg"></a>`;
                html += `<div class="img-description"><p>${title}</p>`;
                html += `<div class="heart-container"><p class="zeroLikes">${likes}</p><embed  role="Image" alt="likes" aria-label="likes" class="heart" src="img/heartRed.svg"></div></div>`;
                html += `</div>`;



                j++;
            }
            else {
                // add the img html with caption

                html += `<div id="${mediaId}">`;
                html += `<img role="Image Link" class="hover-shadow" alt="${title}" src="img/${fileName}/${img}" onclick="openModal();currentSlide(` + [j] + `)"  />`;
                html += `<div class="img-description"><p>${title}</p>`;
                html += `<div class="heart-container"><p class="zeroLikes">${likes}</p><embed role="Image" alt="likes" aria-label="likes" class="heart" src="img/heartRed.svg"></div></div>`;
                html += `</div>`
                j++;

            }


        }
    }
    html += `</div>`;

    album.innerHTML = html;

    generateModalLightbox(data, personId, fileName);

    generateSortList(list);
    generateLikeCount(list);


}


function generateModalLightbox(data, personId, fileName) {



    const media = data.media;
    let html = '';
    let j = 1;       // number for tracking => gallery
    for (let i = 0; i < media.length; i++) {
        if (personId === media[i]["photographerId"]) {
            let img = media[i]["image"];
            let title = media[i]["title"];
            let video = media[i]["video"];

            // if img undefined it should be an video
            if (img === undefined) {
                html += `<div id="light" class="mySlides"currentSlide(` + [j] + `)>`;
                html += `<video controls alt="${title}">
                    <source src="img/${fileName}/${video}" type="video/mp4"></source>
                    </video>`;
                html += `<div class="caption-container">`;
                html += `<p id="caption">${title}</p>`;
                html += `</div>`;
                html += `</div>`;

                j++;
            } else {
                // add the img html 
                html += `<div class="mySlides" role="Dialog" aria-label="image closeup view" aria-modal="true">`;
                html += `<img role="Image"  class="" alt="${title}" src="img/${fileName}/${img}" currentSlide(` + [j] + `)/>`;
                html += `<div class="caption-container">`;
                html += `<p id="caption">${title}</p>`;
                html += `</div>`;
                html += `</div>`;

                j++;
            }
        }
    }


    // next / previous controls
    html += `<a class="prev" role="Linke" alt="Previous Image" onclick="plusSlides(-1)">&#10094</a>`;
    html += `<a class="next" role="Link" alt="Next Image" onclick="plusSlides(1)">&#10095</a>`;


    modalContent.innerHTML = html;
}






// Like Count

function generateLikeCount(list) {
    for (let i = 0; i <= list.length; i++) {
        likes = likes + list[i].likes; // count likes for picture
        let id = list[i].id; // div id

        // Select parent div with id traverse DOM down to .heart-container
        // Plus 1 to count
        document.getElementById(id).lastChild.lastChild.addEventListener("click", () => {
            // p tag from heart-container plus 1
            let paragraph = document.getElementById(id).lastChild.lastChild.firstChild;
            if (paragraph.className === 'zeroLikes') {
                paragraph.innerHTML = list[i].likes + 1;
                likesCountPage++;
                pricePerDay.firstChild.innerHTML = `<div>${likes + likesCountPage}<span><img src="img/heart.svg"></span></div>`;
                paragraph.className = 'oneLike';
            } else {
                likesCountPage--;
                paragraph.innerHTML = list[i].likes;
                paragraph.className = 'zeroLikes';
                pricePerDay.firstChild.innerHTML = `<div>${likes + likesCountPage}<span><img src="img/heart.svg"></span></div>`;
            }


        });

    }
}

setTimeout(
    function generatePricePerDay() {

        let html = `<div>${likes}<span><img src="img/heart.svg"></span></div>`;
        html += `<div>${price}$ / Day</div>`;


        pricePerDay.innerHTML = html;
    }, 1000
);






// Form open


function openForm() {

    if (form.style.display = 'none') {
        form.style.display = 'flex';
        header.style.display = 'none';
        photographer.style.display = 'none';
        album.style.display = 'none';
        sortNav.style.display = 'none';


    }
}
function closeForm() {
    if (header.style.display = 'none') {
        form.style.display = 'none';
        photographer.style.display = '';
        header.style.display = '';
        album.style.display = '';
        sortNav.style.display = '';
    }
}

// Form sign up // successCount
formSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(firstName.value);
    console.log(lastName.value);
    console.log(email.value);
    console.log(message.value);


    firstName.value = "";
    lastName.value = "";
    email.value = "";
    message.value = "";
})






///////////////////////////////////////////////////
//  Sort album => likes, date, title

function generateSortList(list) {
    orderAlphabet = list.slice().sort((a, b) => {
        if (a.title > b.title) {
            return 1
        } else {
            return -1
        }
    })
    orderDate = list.slice().sort((a, b) => {
        if (a.date > b.date) {
            return 1
        } else {
            return -1
        }
    })
    orderLikes = list.slice().sort((a, b) => {
        if (a.likes < b.likes) {
            return 1
        } else {
            return -1
        }
    })
}

function sortBy(data) {
    for (i = 0; i <= data.length; i++) {
        let id = data[i].id;

        document.getElementById(id).style.order = i;

    }
}




// Open the Modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {

    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}
