let main=document.querySelector(".main")
fetch("http://localhost:3000/fav/")
.then(res=>res.json())
.then(data=>{
    data.forEach(element => {
        main.innerHTML+=`
        <div class="main-1">
        <img src=${element.image} alt="">
        <h1>${element.name}</h1>
        <p>${element.des}</p>
        <button onclick=deletebtn("${element.id}")>Delete</button>
    </div>
        `
    });
})

function deletebtn(id){
    axios.delete("http://localhost:3000/fav/"+id)
    window.location.reload()
}
