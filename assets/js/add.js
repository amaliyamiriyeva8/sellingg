const name=document.querySelector("#name")
const description=document.querySelector("#description")
const image=document.querySelector("#add-image")
const add_file=document.querySelector("#add-file")
const form=document.querySelector("form")
const input=document.querySelector('input[type="file"]')
const table=document.querySelector("table")

fetch("http://localhost:3000/sell/")
.then(res=>res.json())
.then(data=>{
    console.log(data);
data.forEach(element => {
    table.innerHTML+=`
    <tr>
    <td>${element.id}</td>
    <td>${element.name}</td>
    <td>${element.des}</td>
    <td><button  onclick="deletebtn(${element.id})">detele</td>
    <tr>
    `
});
})

input.addEventListener("input",(e)=>{
    let file=e.target.files[0]
    if(file){
        let reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onload=()=>{
            image.src=reader.result
            image.style.width="70px"
            image.style.height="70px"
        }
    }
})

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let object={}
    let src=add_file.files[0]
    let reader=new FileReader()
    reader.readAsDataURL(src)
    reader.onload=(e)=>{
      object={
       image:e.target.result,
       name:name.value,
       des:description.value
      }
      axios.post("http://localhost:3000/sell/",object)
    }
    window.location="index.html"
})

function deletebtn(id){
    axios.delete("http://localhost:3000/sell/"+id)
    window.location.reload()
}