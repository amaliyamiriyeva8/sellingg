let main=document.querySelector(".main")
let favorite=document.querySelector("#fav")
let sort=document.querySelector("#sort")
let search=document.querySelector("#search")
let sorted="des"
let firstArr=[]
let secondArr=[]
let add=document.querySelector("#add")
add.addEventListener("click",()=>{
    window.location="add.html"
})


function CRUD(){
fetch("http://localhost:3000/sell/")
.then(res=>res.json())
.then(data=>{
    secondArr=data
    firstArr=firstArr.length || search.value ? firstArr:data,
    main.innerHTML=""
    axios.get("http://localhost:3000/fav/")
    .then(fav=>{
        firstArr.forEach(element => {
            if(fav.data.find(favEl=>favEl.id===element.id)){
                main.innerHTML+=`
                <div class="main-1">
                <img src=${element.image} alt="">
                <i class="bi bi-heart-fill" style=" color: red;" onclick=deleteFav("${element.id}")></i>
                <h1>${element.name}</h1>
                <p>${element.des}</p>
                <button onclick=details("${element.id}")>Details</button>
            </div>
                `
            }else{
                main.innerHTML+=`
                <div class="main-1">
                <img src=${element.image} alt="">
                <i class="bi bi-heart" onclick=addFav("${element.id}")></i>
                <h1>${element.name}</h1>
                <p>${element.des}</p>
                <button onclick=details("${element.id}")>Details</button>
            </div>
                `
            }
          
        });
    })

})
}
CRUD()

function deleteFav(id){
    axios.delete("http://localhost:3000/fav/"+id)
    window.location.reload()
}

function addFav(id){
fetch("http://localhost:3000/sell/"+id)
.then(res=>res.json())
.then(data=>{
    axios.post("http://localhost:3000/fav/",data)
})}

favorite.addEventListener("click",()=>{
    window.location=`fav.html`
})

function details(id){
    window.location=`details.html?id=${id}`
}

sort.addEventListener("click",()=>{
    if(sorted==="as"){
        firstArr.sort((a,b)=>a.name.localeCompare(b.name))
        sorted="des"
        sort.innerHTML="SORT AS"
    }
    else  if(sorted==="des"){
        firstArr.sort((a,b)=>b.name.localeCompare(a.name))
        sorted="def"
        sort.innerHTML="SORT DES"
    }
    else{
        firstArr=secondArr
        sorted="as"
        sort.innerHTML="SORT DEF"
    }
    CRUD()
})

search.addEventListener("input",(e)=>{
    firstArr=secondArr
    firstArr=firstArr.filter((element)=>
    element.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    )
    CRUD()
})
