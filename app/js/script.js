var url = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json';

const main = document.getElementById('main');


fetch(url)
    .then(response => response.json())
    .then(data => generatePerson(data))



function generatePerson(data) {
    let html = '';


    const persons = data.photographers;


    persons.forEach((person, index) => {
        const personImg = person.portrait;
        const photographerName = person.name;
        const city = person.city;
        const country = person.country;
        const tagline = person.tagline;
        const price = person.price



        html += `
            <div class="card" >
                <img class="card-img" src="img/PhotographersID/${personImg}" />
                <div class="card-content">
                    <h2 class="card-name">${photographerName} </h2>
                    <p class="card-city">${city}, ${country}</p>
                    <p class="card-tagline">${tagline}</p>
                    <p class="card-price">$${price}/day</p>
                    <ul id="tags-${index}">
                                       
                    </ul>
                </div>
            </div>
        `




        // console.log(html);
    });
    main.innerHTML = html;


    generateTags(persons);
}


// function generateTags(data) {
//     let htmlTags = '';
//     const photographers = data;
//     console.log(photographers);

//     photographers.forEach((photographer, index) => {
//         const tags = photographer.tags;

//         htmlTags += `
//             <li>
//                 <a href="#">#${tag}</a>
//             </li>
//             `
//     }

//     // console.log(tags);
// });
// }
    //     const tags = person.tags;

    //     tags.forEach(tag => {
    //         htmlTags += `
    //         <li>
    //             <a href="#">#${tag}</a>
    //         </li>
    //         `
    //     )
    // };



