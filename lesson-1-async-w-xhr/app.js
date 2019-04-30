(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });
})();


const unsplashRequest = new XMLHttpRequest();

const searchedForText = 'hippos';
unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
unsplashRequest.onload = addImage;
unsplashRequest.setRequestHeader('Authorization', 'Client-ID 3fa69d468a0ea3881fa29f9dbe0228c45cba9aafb2a479b51200c1d7acfd8d1e');
unsplashRequest.send();

function addImage(){
    debugger;
}