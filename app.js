// Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn=isbn;
}

// UI Constructor

function UI(){}
// Add Book Tpo List
UI.prototype.addBookToList = function(book){
const list = document.getElementById('book-list');
const row = document.createElement('tr');

row.innerHTML =`
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="delete">X</a></td>
`;


       list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(message, className){
    const div = document.createElement('div');
    div.className =`alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(function(){
document.querySelector('.alert').remove();
    }, 3000);
}

// Delet Book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// Clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
}



// Event Listener for add book

document.getElementById('book-form').addEventListener('submit', 
function(e){
    // Get form values
 const title = document.getElementById('title').value,
       author = document.getElementById('author').value,
       isbn = document.getElementById('isbn').value
    // Instantiate book 
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(title === '' || author === '' || isbn === ''){
        // Error Alert
        ui.showAlert('Please fill in all fields', 'error');
    } else{
    // Add book to list
    ui.addBookToList(book);

    //Show success
    ui.showAlert('Book Added!', 'success');

    // nClear fields
    ui.clearFields();
    }
   
    e.preventDefault();
});

// Event Listener for delete book 
 document.getElementById('book-list').addEventListener('click', function(e){
     const ui = new UI();

     // Delete book
     ui.deleteBook(e.target);
     
     // Show message
     ui.showAlert('Book Removed', 'success')
     e.preventDefault();
 });