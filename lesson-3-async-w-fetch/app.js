(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;


        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID 3fa69d468a0ea3881fa29f9dbe0228c45cba9aafb2a479b51200c1d7acfd8d1e'
            } 
        }).then(response => response.json()).then(addImage).catch(e => requestError(e, 'image'))


        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=nANItMCLG9cQWCD7Pt5VvALpNwNzfIeh`,
        ).then(response => response.json()).then(addArticle).catch(e => requestError(e, 'article'))



        function addImage(data) {
            let htmlContent = '';
            let firstImage = data.results[0];

            if(firstImage) {
                htmlContent = `
                    <figure>
                        <img src='${firstImage.urls.small}' alt='${searchedForText}'>
                        <figcaption>
                            ${searchedForText} by ${firstImage.user.name}
                        </figcaption>
                    </figure>
                `;
            }else {
                htmlContent = 'There are no Images for this search';
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }



        function addArticle(data) {
            let htmlContent = '';
            let articles = data.response.docs;

            if(articles) {
                htmlContent = articles.map(article => { 
                   return `<div>
                        <h2>${article.headline.main}</h2>
                        <a href='${article.web_url}'>${article.snippet}</a>
                    </div>`
                })
            }else {
                htmlContent = `<h3>There are no articles related to ${searchedForText}</h3>`;
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }


        function requestError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }


    });
})();
