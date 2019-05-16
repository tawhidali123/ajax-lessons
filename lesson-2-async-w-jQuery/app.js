/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;


        // unsplash ajax request
        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID 3fa69d468a0ea3881fa29f9dbe0228c45cba9aafb2a479b51200c1d7acfd8d1e'
            }
        }).done(addImage)

        function addImage(images){
            let htmlContent = '';
            const firstImage = images.results[0];

            htmlContent = `
                <figure>
                    <img src='${firstImage.urls.regular}'>
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>
            `

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }



        // NY times ajax request
        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=nANItMCLG9cQWCD7Pt5VvALpNwNzfIeh`
        }).done(addArticles)

        function addArticles(content) {
            let htmlContent = '';
            const data = content;
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
