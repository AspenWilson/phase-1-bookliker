// document.addEventListener("DOMContentLoaded", function() {});

function fetchBooks () {
    fetch (`http://localhost:3000/books`)
    .then(resp=>resp.json())
    .then(json=> displayBooks(json))
}
const bookList = document.querySelector('#list')
const bookDiv =document.querySelector('#show-panel')

function displayBooks(books) {
    books.forEach(book => {
        const bookLi = document.createElement('li')
        bookLi.innerHTML = `${book.title}`
        bookList.appendChild(bookLi)

        bookLi.addEventListener('click',(e) => {
            const bookImg= document.createElement ('img')
            bookImg.src=`${book.img_url}`
            const bookName= document.createElement('h2')
            bookName.innerHTML=`${book.title}`
            const author = document.createElement('h2')
            author.innerHTML=`${book.author}`
            const bookSummary = document.createElement('h4')
            bookSummary.innerHTML= `${book.description}`
            const usersLiked = document.createElement('ul')
            usersLiked.innerHTML= 'Liked by:'
            const bookId = document.createElement('h4')
            bookId.className='hidden'
            bookId.innerHTML= `${book.id}`
            const likeList=document.createElement('li')

            book.users.forEach((user) => {
                likeList.innerHTML += `<li>${user.username}</li>`
            })
            const likeBtn= document.createElement('button')
            likeBtn.innerHTML = "Like"

            let userList = (book.users)
            likeBtn.addEventListener('click',(e) => {
                let assignedId = document.querySelector('.hidden').innerText
            
                let newLikeObj = {
                    id: 812,
                    username: 'Aspen'
                }
                let newUserList = userList.push(newLikeObj)
                if (e.target.innerHTML === "Like") {
                    e.target.innerHTML = "Unlike"
                const patchRequest = {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                        'Accepts':'application/json'
                     },
                    body:JSON.stringify ({
                        users: userList,
                    }),
                    }
                    fetch (`http://localhost:3000/books/${assignedId}`, patchRequest)
                    .then (resp => resp.json())
                    .then((updatedBook) => {
                        usersLiked.innerHTML+=`<li>${newLikeObj.username}</li>`
                    })
                    
                } else if (e.target.innerHTML === 'Unlike') {
                    e.target.innerHTML = 'Like'

                }

            })
            
            bookDiv.innerHTML= ''

            bookDiv.appendChild(bookImg)
            bookDiv.appendChild(bookName)
            bookDiv.appendChild(author)
            bookDiv.appendChild(bookSummary)
            bookDiv.appendChild(bookId)
            bookDiv.appendChild(usersLiked)
            usersLiked.appendChild(likeList)
            bookDiv.appendChild(likeBtn)
        })
    })
}
    

fetchBooks()

