let myLib = [];
let bookshelf = document.querySelector(".bookshelf");
let placeBook = document.querySelector(".placeBook");
let recordModal = document.querySelector(".recordModal");
let form = document.querySelector(".modalForm");
let title = document.querySelector("#bookTitle");
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

let book1 = new Book('The Hobbit', 'Tolkien', '297', true);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let book = new Book(form.elements.bookTitle.value, form.elements.author.value,
        form.elements.pages.value, form.elements.read.checked);
    addBookToLibrary(book);
    recordModal.close();
});

placeBook.addEventListener("click", () => {
    recordModal.showModal();
});

function addBookToLibrary(book){
    let bookDiv = buildABook(book);
    bookDiv.dataset.index = myLib.length + 1;
    bookshelf.appendChild(bookDiv);
    myLib.push(book);
}

function removeBook(element){
    let index = element.currentTarget.parentNode.dataset.index;
    myLib.splice(index - 1, 1);
    console.log(myLib.length);
    bookshelf.replaceChildren();
    myLib.forEach(book => bookshelf.appendChild(buildABook(book)));
}

function buildABook(book){
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book")
    Object.keys(book).forEach((prop) => {
        let item = document.createElement("p");
        item.innerText = book[prop];
        item.classList.add("bookInfo");
        if(prop === "read"){
            item.addEventListener("click", (element) => setReadStatus(element));
            item.innerText = book[prop] === true ? "Read" : "Not Read Yet";
            if(item.innerText === "Read"){
                item.classList.remove("bookInfo");
                item.classList.add("readBook");
            }
        }
        bookDiv.appendChild(item);
    });
    let removeButton = document.createElement("button");
    removeButton.classList.add("removeBook");
    removeButton.innerText = "Remove Book";
    removeButton.addEventListener("click", (element) => removeBook(element));
    bookDiv.appendChild(removeButton);
    return bookDiv;
}

function setReadStatus(element){
    if(element.currentTarget.innerText === 'Not Read Yet'){
        element.currentTarget.innerText = 'Read';
        element.currentTarget.classList.remove("bookInfo");
        element.currentTarget.classList.add("readBook");
    }else{
        element.currentTarget.innerText = 'Not Read Yet';
        element.currentTarget.classList.remove("readBook");
        element.currentTarget.classList.add("bookInfo");
    }
}



