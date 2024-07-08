
////////////////////////////////////////////////////////////////////////////////////////////

var landing = document.getElementById('landing');

let mainBg = localStorage.getItem('main-bg');

if(mainBg !== null) {
    landing.style.backgroundImage = `url('../images/${mainBg}.jpg')`
}

let mainColor = localStorage.getItem("mainColor")

if(mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);

    // Check for active class
        // Remove Active Class from li
        document.querySelectorAll(".colors-list li").forEach((li) =>{ 
            li.classList.remove("active") 

            // Add active class on li which is has the same mainColor
            if(li.dataset.color === mainColor) {
                li.classList.add('active')
            }
        });
}

// Function to randomize bg
var bgOption = true;

let bgLocalItem = localStorage.getItem('bg-option');

if(bgLocalItem !== null) {
    if(bgLocalItem === 'true') {
        bgOption = true;
    } else {
        bgOption = false;
    }
    console.log(bgLocalItem)
    
    // Remove Active Class From Spans
    document.querySelectorAll('.random-bg span').forEach(span => {
        span.classList.remove('active')
    });

    if(bgLocalItem === 'true') {
        document.querySelector('.random-bg .yes').classList.add("active")
    } else {
        document.querySelector('.random-bg .no').classList.add("active")
    }
}

////////////////////////////////////////////////////////////////////////////////////////////


// Setting Box
let settingIcon = document.querySelector(".setting-icon");
let settingToggle = document.querySelector(".setting-toggle");
let settingBox  = document.querySelector(".setting-box");

settingToggle.addEventListener("click", ()=> {
    settingBox.classList.toggle('open')
    settingIcon.classList.toggle('fa-spin')
})

////////////////////////////////////////////////////////////////////////////////////////////

// Switch Color
let colorLi = document.querySelectorAll('.colors-list li')

colorLi.forEach((li) => {
    li.addEventListener("click", (e)=>{
        // Remove Active Class from li
        // colorLi.forEach((li) =>{ li.classList.remove("active") });
        // e.target.classList.add("active");
        handleActive(e);

        // Set color on Root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color)
        // Set Color On local Storage
        localStorage.setItem('mainColor',e.target.dataset.color )
    });
});
////////////////////////////////////////////////////////////////////////////////////////////

// Switch Random BG Option box

document.querySelectorAll('.random-bg span').forEach((element) => {
    element.addEventListener("click", (e)=>{
        // Remove & Add Active Class from li
        // document.querySelectorAll('.random-bg span').forEach((ele) =>{ ele.classList.remove("active") });
        // e.target.classList.add("active");
        handleActive(e);

        // Randomize Bg
        if(e.target.dataset.bg === 'yes') {
            bgOption = true;
            randomizeBg();
            localStorage.setItem('bg-option', true);
        } else {
            clearInterval(bgInterval);
            localStorage.setItem('bg-option', false);
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////

// Change LandingPage BG

let imgs = ['08','09','10','11','12','13','14','15','16','17'];

var bgInterval;

function randomizeBg() {
    if(bgOption === true) {
        bgInterval = setInterval(() =>{
            // Random number for imgs index
            let random = Math.floor(Math.random() * imgs.length);
            // landing.style.backgroundImage = `url('../images/${imgs[random]}.jpg')`
            document.styleSheets[3].cssRules[46].style.setProperty('background-image', `url('../images/${imgs[random]}.jpg')`, "important");
            localStorage.setItem('main-bg', imgs[random])
        },4000)
    }
}

randomizeBg();

////////////////////////////////////////////////////////////////////////////////////////////

// Progress Bar

let ourSkills = document.querySelector(".skills");

window.onscroll = function() {
    
    // Skills Offset Top (All Elements Above OurSkills)
    let skillOffsetTop = ourSkills.offsetTop;

    // Skills outer Height (OurSkills Height including Padding..etc)
    let skillOuterHeight = ourSkills.offsetHeight;

    // Window Height Means (100vh)
    let windowHeight = this.innerHeight;

    // Window Scroll Top
    let windowScrollTop = this.scrollY;
    
    // console.log(skillOffsetTop, skillOuterHeight, windowHeight, windowScrollTop)

    if(windowScrollTop > (skillOffsetTop + skillOuterHeight - windowHeight)) {
        
        // Progress Bar
        let progSpan = document.querySelectorAll('.skill-progress span');

        progSpan.forEach((span) => {
            let spanWidth = span.dataset.prog;
            span.style.width = spanWidth;

            let skillNumEle = document.createElement('div');
            let skillNumText = document.createTextNode(span.dataset.prog);
            skillNumEle.appendChild(skillNumText);
            skillNumEle.classList.add('show-prog-num')
            span.appendChild(skillNumEle)
        })
        
    }
    
}


////////////////////////////////////////////////////////////////////////////////////////////

let ourGallery = document.querySelectorAll('.gallery .images-box img');

ourGallery.forEach((image) => {

    image.addEventListener('click', (e)=> {

        // Create The overlay
        let overlay = document.createElement('div');

        overlay.className = 'popup-overlay';

        document.body.appendChild(overlay);


        // Create Image Box
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';

        let popupImage = document.createElement('img');
        popupImage.src = image.src;

        // Check if an image has an ALT
        if(image.alt !== '') {
                
            popupBox.classList.add('has-alt');

            let contentImgDiv = document.createElement('div');
            contentImgDiv.className = 'content';

            let imgDic = document.createElement('p');
            let imgDicText = document.createTextNode('Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta animi et tenetur unde numquam! Obcaecati eaque rem laboriosam ab eveniet. Nesciunt quidem minus labore distinctio, reiciendis aliquam a sit. Numquam?');
            imgDic.appendChild(imgDicText);

            // Create img Heading 
            let imgHeading = document.createElement('h3');
            let imgText = document.createTextNode(image.alt);
            imgHeading.appendChild(imgText);

            contentImgDiv.appendChild(imgHeading);
            contentImgDiv.appendChild(imgDic);

            popupBox.appendChild(contentImgDiv);


            console.log(image.alt);
            popupImage.classList.add('img-alt');
        }

        

        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        console.log(image.src);


        // Create Close Button
        let closeButton = document.createElement('div');
        let closeText = document.createTextNode('x');
        
        closeButton.className = 'close-btn';

        closeButton.appendChild(closeText);

        popupBox.appendChild(closeButton);

    });

});

document.addEventListener('click', (e) => {

    if(e.target.className === 'close-btn') {

        e.target.parentNode.remove();
        document.querySelector('.popup-overlay').remove();
    }

});


////////////////////////////////////////////////////////////////////////////////////////////
// nav Bullet
let navBullets = document.querySelectorAll('.nav-bullets .bullet-circle');
let navLinks = document.querySelectorAll('.links a');

console.log(navLinks);



function navMoveToSection(elements) {
    elements.forEach((ele) => {
        ele.addEventListener('click', function (e) {
            e.preventDefault();
            console.log(e.target)
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};

navMoveToSection(navBullets);
navMoveToSection(navLinks);

////////////////////////////////////////////////////////////////////////////////////////////

let bulletContainer = document.querySelector('.nav-bullets');
let bulletSpan = document.querySelectorAll('.bullet-opt span');
let bulletLocalItem = localStorage.getItem('bullet-option');

if(bulletLocalItem !== null) {

    bulletContainer.style.display = bulletLocalItem;

    bulletSpan.forEach(span => {
        span.classList.remove('active');
    });
    bulletLocalItem === 'block' ? document.querySelector('.bullet-opt .yes').classList.add('active') : document.querySelector('.bullet-opt .no').classList.add('active') 
    
}

bulletSpan.forEach((span) => {
    span.addEventListener('click', (e) => {
        handleActive(e);

        if(span.dataset.display === 'block') {
            bulletContainer.style.display = 'block';
            localStorage.setItem('bullet-option', span.dataset.display)
        } else {
            bulletContainer.style.display = 'none';
            localStorage.setItem('bullet-option', span.dataset.display)
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////

document.querySelector('.setting-box .reset').onclick = () => {
    localStorage.clear();
    location.reload();
}

////////////////////////////////////////////////////////////////////////////////////////////
// Toggle menu

let toggleMenu = document.querySelector('.toggle-menu');

toggleMenu.addEventListener('click', function() {
    // toggleMenu.querySelector('.two').style.opacity = 0;
    // toggleMenu.querySelector('.one').style = 'transform: rotate(45deg); transform-origin: 10% 10%;'
    // toggleMenu.querySelector('.three').style = 'transform: rotate(-45deg); transform-origin: 10% 90%;'

    document.querySelector('.links').classList.toggle('open')
})
////////////////////////////////////////////////////////////////////////////////////////////


// Function to handle active class
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll('.active').forEach((ele) =>{ 

        ele.classList.remove("active") 

    });
    ev.target.classList.add("active");
};
