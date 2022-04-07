let myLibrary = [];

function Book(title, author, pages, isReadOption) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isReadOption;
}
let tableRef = document.getElementById('book-table');


function addBookToLibrary() {
      
      let bookTable = document.querySelector('#book-table')
      let title = document.getElementById('title').value;
      let author = document.getElementById('author').value;
      let pages = document.getElementById('pages').value;
      let isRead = document.getElementById('isRead');
      let isReadOption = isRead.options[isRead.selectedIndex].text;
      const newBook = new Book(title, author, pages, isReadOption);
      //вот здесь проверка на заполнение
      if (title !== '' && author !== '' && pages !== '') {
      myLibrary.push(newBook);
      createTableRows(tableRef)
      }
      
}


let bookTable = document.querySelector('#book-table')

let addButton = document.querySelector('.add-button');

addButton.addEventListener('click', () => addBookToLibrary())

//добавить метод типа push

function createTableRows(tableRef) {
          
          let newText1, newText2, newText3, statusButton, deleteButton;
          //удалить таблицу
          let tableLen = tableRef.rows.length; 
          for(var i=1; i<tableLen; i++){ 
            tableRef.deleteRow(1); 
            }

          //пройти по массиву и вывести все книги
          for (let i=0; i < myLibrary.length; i++) {
               // Вставляем строку в конец таблицы
                let newRow = tableRef.insertRow(-1);
              
               // Вставляем ячейку в строку с индексом 0
                let newCell1 = newRow.insertCell(0);
                let newCell2 = newRow.insertCell(1);
                let newCell3 = newRow.insertCell(2);
                let newCell4 = newRow.insertCell(3);
                let newCell5 = newRow.insertCell(4);

                // Добавляем текстовый узел в ячейку
                newText1 = document.createTextNode(`${myLibrary[i].title}`);
                newText2 = document.createTextNode(`${myLibrary[i].author}`);
                newText3 = document.createTextNode(`${myLibrary[i].pages}`);
                statusButton = document.createElement('button');
                deleteButton = document.createElement('button');
            
                newCell4.classList.add('book-status');
                newCell5.classList.add('book-delete');
            
              
                statusButton.classList.add('change-status-button');
                statusButton.id = i;       

                
                if (myLibrary[i].isRead === 'Yeah') {
                  statusButton.innerText = 'Read';
                } else statusButton.innerText = 'Not read';

                
                deleteButton.classList.add('delete-button');
                deleteButton.innerText = 'Delete';
            
            
            
                newCell1.appendChild(newText1);
                newCell2.appendChild(newText2);
                newCell3.appendChild(newText3);
                newCell4.appendChild(statusButton);
                newCell5.appendChild(deleteButton);
          } 
    } 
//поменять статус книги
bookTable.addEventListener('click', function(evt) {
  if(evt.target.closest('.change-status-button')) {

    
    myLibrary.switchRead(evt.target.getAttribute('id'))
    createTableRows(tableRef)
   }})

//удалить книгу из массива
bookTable.addEventListener('click', function(evt) {
    if(evt.target.closest('.delete-button')) {
      myLibrary.splice(evt.target.getAttribute('id'), 1)
      createTableRows(tableRef)
      }
      })


//метод для смены статуса прочтения
Array.prototype.switchRead = function(id) {
      
      if (this[id].isRead === 'Yeah') { 
      
        this[id].isRead = 'Nope'
    } else {
      
      this[id].isRead = 'Yeah'
    }
    
}
