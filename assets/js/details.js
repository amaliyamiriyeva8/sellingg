let id=new URLSearchParams(window.location.search).get("id")
let main=document.querySelector(".main")
fetch("http://localhost:3000/sell/"+id)
.then(res=>res.json())
.then(element=>{
        main.innerHTML=`
        <div class="main-1">
        <img src=${element.image} alt="">
        <h1>${element.name}</h1>
        <p>${element.des}</p>
    </div>
        `
    });