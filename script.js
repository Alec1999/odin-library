const myLibrary = [];

function Book(title, author, pages, read) {
    // The constructor
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    };
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages, read);
  book.id = crypto.randomUUID();
  myLibrary.push(book);
};

addBookToLibrary("Harry Potter", "J.K. Rowling", "3,400", "yes");
addBookToLibrary("1984", "George Orwell", "328", "yes");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", "281", "no");

function createBookCards() {
    const libraryContainer = document.querySelector(".library-container");
    const allCards = [];

    for (const book of myLibrary) {
        const newBookCard = document.createElement("div")
        newBookCard.classList.add("book-card");
        propertiesToShow = ["title", "author", "pages", "read"];

        for (const property of propertiesToShow) {
            bookProperty = document.createElement("div");
            bookProperty.classList.add("capitalize");
            bookProperty.textContent = property + ": " + book[property];
            
            newBookCard.appendChild(bookProperty);  
        };
        allCards.push(newBookCard);
    };
    // Prevents previous book cards from duplicating. 
    libraryContainer.replaceChildren(...allCards);
};

function addNewBook() {
    const newBookForm = document.querySelector("#new-book-form");
    const newBookModal = document.querySelector("#new-book-dialog");

    newBookForm.addEventListener("submit", (e) => {
        event.preventDefault();

        const formData = new FormData(newBookForm);

        addBookToLibrary(
            formData.get("title"),
            formData.get("author"),
            formData.get("pages"),
            formData.get("already-read")
        );

        newBookModal.close();
        console.log("Data captured!", Object.fromEntries(formData));

        createBookCards();
    });
};

console.log(myLibrary);
createBookCards();
addNewBook();