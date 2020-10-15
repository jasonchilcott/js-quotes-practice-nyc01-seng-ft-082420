document.addEventListener('DOMContentLoaded', () => {
    const quoteUl = document.querySelector('#quote-list')
    const popUrl = "http://localhost:3000/quotes?_embed=likes"


    const renderQuoteList = (quotes) => {
        for (const quote of quotes) {
            renderQuote(quote)
        }
    }

    const renderQuote = (quote) => {
        if (quote.likes.length === 0){
            let noLikes = {
                "id": 0
            }
            quote.likes.push(noLikes)
        }
        let quoteLi = document.createElement('li')
        quoteLi.classList.add('quote-card')
        quoteLi.innerHTML = `<blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quote.likes[0]["id"]}</span></button>
        <button class='btn-danger'>Delete</button>
        </blockquote>`
        quoteUl.appendChild(quoteLi)
    }



    const getQuotes = () => {
        fetch(popUrl)
        .then (response => response.json())
        .then (quotes => renderQuoteList(quotes))
    }



    getQuotes()

})


/* 
http://localhost:3000/quotes?_embed=likes
http://localhost:3000/quotes
http://localhost:3000/likes







*/
