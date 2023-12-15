
var bookName = document.getElementById('bName')
var bookUrl= document.getElementById('bUrl')
var goLink =document.getElementById('vUrl')

var bookList = []
if(localStorage.getItem('bMark')!=null){
    bookList = JSON.parse(localStorage.getItem('bMark'))
    displayBook()
}


// submit button function
function addBook(){
    if(validName()==true && validUrl()==true){
        var bookMark = {
            name: bookName.value,
            url: bookUrl.value
        }
        bookList.push(bookMark)
    }else{
        var messageAlert = document.getElementById('cardAlert')
        messageAlert.classList.remove('d-none')
        
    }

    displayBook()
    clear()
}


// display function that displays the array that user entered
function displayBook(){
    var box=``
    for(var i=0; i<bookList.length; i++){
        box +=`
        <tr>
        <td>${i+1}</td>
        <td>${bookList[i].name}</td>
        <td>
        <a href="${bookList[i].url}" target="_blank">
        <button onclick="goToLink(${bookList[i].url})" class="btn btn-success" id="vUrl"><i class="fa-solid fa-eye me-3"></i>Visit</button>
        </a>
        </td>
        <td><button onclick="deleteBook(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can me-3"></i>Delete</button></td>
    </tr>
    `   
    }
    document.getElementById('tbody').innerHTML=box
    localStorage.setItem('bMark', JSON.stringify(bookList))
}


// clear function that clears the inputs after each entering 
function clear(){
    bookName.value=''
    bookUrl.value=''
    // var inputName= bookName.value
    // var inputUrl= bookUrl.value
    if(bookName.classList.contains("is-valid") &&
    bookUrl.classList.contains("is-valid")){
        bookName.classList.remove('is-valid')
        bookUrl.classList.remove('is-valid')
    }else{
        bookName.classList.remove('is-invalid')
        bookUrl.classList.remove('is-invalid')
    }


}

// delete button function
function deleteBook(index){
    bookList.splice(index,1)
    localStorage.setItem('bMark', JSON.stringify(bookList))
    displayBook()
}

// visit button function
if(goLink){
    goLink.addEventListener('click', goToLink()) 
}
function goToLink(){
    window.open(bookUrl.value,'_blank')
}

// validation function for name
function validName(){
    var inputName= bookName.value
    var regexName = /^\w{3,}(\s+\w+)*$/;

    if(regexName.test(inputName)== true){ //valid
        bookName.classList.add('is-valid')
        bookName.classList.remove('is-invalid')
        return true;
    }else{ //not valid
        bookName.classList.add('is-invalid')
        bookName.classList.remove('is-valid')
        return false;
    }
}


// validation function for URL
function validUrl(){
    var inputUrl= bookUrl.value
    var regexUrl = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

    if(regexUrl.test(inputUrl)== true){ //valid
        bookUrl.classList.add('is-valid')
        bookUrl.classList.remove('is-invalid')
        return true;
    }else{ //not valid
        bookUrl.classList.add('is-invalid')
        bookUrl.classList.remove('is-valid')
        return false;
    }
}

// x-mark function
function closeMark(){
    var cMark = document.getElementById('cardAlert')
        cMark.classList.add('d-none')
}
document.addEventListener("keydown", function (err) {
    if (err.key == "Escape") {
        closeMark();
    }
});