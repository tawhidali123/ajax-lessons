(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;



        const unsplashRequest = new XMLHttpRequest();
        // const searchedForText = '';
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 3fa69d468a0ea3881fa29f9dbe0228c45cba9aafb2a479b51200c1d7acfd8d1e');
        unsplashRequest.send();

        function addImage(){
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            const firstImage = data.results[0];

            htmlContent = `
                <figure>
                    <img src='${firstImage.urls.regular}'>
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>
            `

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }




        const articleRequest = new XMLHttpRequest();
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=nANItMCLG9cQWCD7Pt5VvALpNwNzfIeh`);
        articleRequest.onload = addArticles;
        articleRequest.send();

        function addArticles() {
            // debugger;
            console.log(this.responseText);
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            let articles = data.response.docs.map(article => `
                
                    <li>
                        <h2><a href='${article.web_url}'>${article.headline.main}</a></h2>
                        <p>${article.snippet}</p>
                    </li>
                
            `);

            if(articles.length > 0) {
                htmlContent = `
                <ul>${articles}</ul>
            `
            } else {
                htmlContent = `<h2>There are no articles related to search field</h2>`
            }
            

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }

    });

})();


