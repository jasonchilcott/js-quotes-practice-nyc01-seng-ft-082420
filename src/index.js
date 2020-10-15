document.addEventListener('DOMContentLoaded', () => {
    const quoteUl = document.querySelector('#quote-list')
    const popUrl = "http://localhost:3000/quotes?_embed=likes"
    const likesUrl = "http://localhost:3000/likes"
    const quotesUrl = "http://localhost:3000/quotes"


    const renderQuoteList = (quotes) => {
        quoteUl.innerHTML = ""
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

    const submitHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault()
            const form = e.target
            const newQuoteText = form.quote.value
            const newQuoteAuthor = form.author.value
            const newQuote = { quote: newQuoteText, author: newQuoteAuthor }

            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(newQuote)
            }

            fetch(quotesUrl, options)
            .then(response => response.json())
            .then(_quote => {
                getQuotes()
            })
            form.reset()
        })
    }



    const getQuotes = () => {
        fetch(popUrl)
        .then (response => response.json())
        .then (quotes => renderQuoteList(quotes))
    }



    getQuotes()
    submitHandler()


})


/* 
http://localhost:3000/quotes?_embed=likes
http://localhost:3000/quotes
http://localhost:3000/likes







*/
