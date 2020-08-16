let bookContainer=document.getElementById("bookContainer");
let bookLibrary;
let search=document.getElementById("searchInput");
let addNewBookBtn=document.getElementById("addNewBook");
let bookForm=document.getElementById("addBookForm");
let addBookBtn=document.getElementById("addBook");
let closeBtn=document.getElementById("close");
let bookName=document.getElementById("bookNameInput");
let bookAuthor=document.getElementById("bookAuthorInput");
let bookImg=document.getElementById("bookImg");
let bookList=document.getElementsByClassName("name");
let bookexist=document.getElementById("exist");
let imageSrc;

let googlApi=new XMLHttpRequest();
googlApi.open("GET","https://www.googleapis.com/books/v1/volumes?q=java&fbclid=IwAR2vjMK-zajMwBVu4ujPvd2RrT2o3KNJe7CNdUZpqeor7oVCj_MiVq6WHp8");
googlApi.send();
googlApi.addEventListener("readystatechange",dataFound);

function dataFound(){
    if(googlApi.readyState==4 && googlApi.status==200){
        bookLibrary=JSON.parse(googlApi.response);
        displayBooks();
        search.addEventListener("keyup",searchBooks);
        
    }
    else{
        bookContainer.innerHTML=`<h4 class="text-danger">Server not responding.</h4>`;
    }
}

function displayBooks(){
    let bookInfo="";
        for(let i=0;i<bookLibrary.items.length ;i++){
            bookInfo+=`
            <div  class="col-12 book border border-mute p-3 p-lg-5  mb-4">
                <div id="bookInfo">
                    <h4 class="name">`+bookLibrary.items[i].volumeInfo.title +`</h4>
                    <p>by: `+bookLibrary.items[i].volumeInfo.authors +`</p>
                </div>
                <div id="bookImg">
                    <img src="`+bookLibrary.items[i].volumeInfo.imageLinks.smallThumbnail +`" class="w-100" alt="">
                </div>
            </div>`;
        }
        bookContainer.innerHTML=bookInfo;
}

function searchBooks(){
    let searchValue=search.value;
    let bookInfo="";
        for(let i=0;i<bookLibrary.items.length ;i++){
            if(bookLibrary.items[i].volumeInfo.title.includes(searchValue.trim())){
                bookInfo+=`
             <div  class="col-12 book border border-mute p-3 p-lg-5  mb-4">
                <div id="bookInfo">
                    <h4 class="name">`+bookLibrary.items[i].volumeInfo.title +`</h4>
                    <p>by: `+bookLibrary.items[i].volumeInfo.authors +`</p>
                </div>
                <div id="bookImg">
                    <img src="`+bookLibrary.items[i].volumeInfo.imageLinks.smallThumbnail +`" class="w-100" alt="">
                </div>
             </div>`;
            }
        }
        if(bookInfo!=""){
            bookContainer.innerHTML=bookInfo;
        }
        else{
            bookContainer.innerHTML=`<h4 class="text-danger">Book Not Found.</h4>`;
        }   
}

addNewBookBtn.addEventListener("click",function(){
    bookForm.style.display="flex";
});

closeBtn.addEventListener("click",function(){
    bookForm.style.display="none";
    bookAuthor.value="";
    bookName.value="";
    bookImg.value="";
});

bookImg.addEventListener("change",function(e){
    imageSrc =URL.createObjectURL(e.target.files[0]);    
});

addBookBtn.addEventListener("click",function(){
    
       let bookNameValue=bookName.value;
       let bookAuthorValue=bookAuthor.value;  
    
    let bookInfo="",bookFound=false;
        bookInfo+=`
        <div  class="col-12 book border border-mute p-3 p-lg-5  mb-4">
            <div id="bookInfo">
                <h4 class="name">`+bookNameValue+`</h4>
                <p>by: `+bookAuthorValue+`</p>
            </div>
            <div id="bookImg">
                <img src="`+imageSrc +`" class="w-100" alt="">
            </div>
        </div>`;
    for(let i=0;i<bookList.length;i++){
        if(bookNameValue==bookList[i].innerHTML){
            bookFound=true;
            break;            
        }         
    } 
    if(bookFound){
       bookexist.innerHTML="Already exist";
    }else{
        bookContainer.innerHTML+=bookInfo;
        bookexist.innerHTML="" ;
    }
});


