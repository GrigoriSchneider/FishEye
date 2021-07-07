var url = 'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json';

const main = document.getElementById('main');


fetch(url)
    .then(response => response.json())
    .then(data => generatePerson(data))



function generatePerson(data) {
    let html = '';


    const persons = data.photographers;
    console.log(persons);
    console.log(data.media);


    persons.forEach((person) => {
        const personImg = person.portrait;
        const photographerName = person.name;
        const city = person.city;
        const country = person.country;
        const tagline = person.tagline;
        const price = person.price


        html += `
            <div class="card filterDiv show`;
        // Add filter classes
        for (let tags of person.tags) {
            html += ' ' + tags;
            console.log(tags);
        };

        html += `"  >
                <a role="Image Link" alt="${photographerName}" href="${photographerName}.html">
                    <img class="card-img" src="img/PhotographersID/${personImg}" />
                </a>
                <div role="Paragraph text" class="card-content">
                    <h2 class="card-name">${photographerName} </h2>
                    <p class="card-city">${city}, ${country}</p>
                    <p class="card-tagline">${tagline}</p>
                    <p class="card-price">$${price}/day</p>
                    <ul class="card-tags">`;

        // Adding tags 
        for (let tags of person.tags) {
            html += '<li>#' + tags + '</li>';
        };

        html += `                             
                   </ul>
                </div>
            </div>
        `

    });
    main.innerHTML = html;
}

//////////////////////////////////
// Filter for photographers

filterSelection("all")
function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    // Add the "show" class (display:flex) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

// Show filtered elements
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
    console.log(arr1);
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}


// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("header-nav-item");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

