const Body = document.getElementById("Body")
const listdiv = document.getElementById("list-div");
const head = document.getElementById("main-head");
const darkbtn = document.getElementById("dark-btn");
const txtInp = document.getElementById("txtInp");
const btn = document.getElementById("btn");
const TaskBox = document.getElementById("TaskBox");
let TaskArr = [];

setTimeout(LoadArr(), 1000);

btn.addEventListener("click", () => {
    if (txtInp.value !== "") {
        if(localStorage.getItem("Data")){
            const ParseddArr = JSON.parse(localStorage.getItem("Data"))
            ParseddArr.push(txtInp.value);
            localStorage.setItem("Data", JSON.stringify(ParseddArr))
            LoadArr()
        }else{
            TaskArr.push(txtInp.value);
            localStorage.setItem("Data", JSON.stringify(TaskArr))
            LoadArr()
        } 
    }else{
        alert("Enter something!");
    }
})

function LoadArr(){
    TaskBox.innerHTML = "";
    if (localStorage.getItem("Data")) {
        const ParseddArr = JSON.parse(localStorage.getItem("Data"));
        ParseddArr.map((elem, index) => {
        TaskBox.innerHTML += `<div class="d-flex justify-content-center align-items-center mb-2">
        <div class="bg-primary text-white p-2 ps-3 fs-6 me-3 text-start shadow list utility">${elem}</div>
        <button type="button" class=" btn btn-danger fa-solid fa-trash-can shadow delete utility" onclick="Delete(${index})"></button>
        <i class="p-2 ms-1 rounded fa-solid fa-pen-to-square text-white bg-black" onclick="Update(${index})"></i>
        </div>`;
    });
    }   
}

function Update(i){
    const ParseddArr = JSON.parse(localStorage.getItem("Data"));
    const UpdateVal = ParseddArr.find((elem, index) => {
        return index === 1;
    })
    const UpdatedVal = prompt("Edit your list", UpdateVal)
    if(UpdatedVal !== null){
        ParseddArr.splice(i, 1, UpdatedVal);
      }
    localStorage.setItem("Data", JSON.stringify(ParseddArr))
    LoadArr();
}

function Delete(i){
    const ParseddArr = JSON.parse(localStorage.getItem("Data"))
    ParseddArr.splice(i, 1);
    localStorage.setItem("Data", JSON.stringify(ParseddArr))
    LoadArr();
}

let bool = true;
darkbtn.addEventListener("click", () => {
    if (bool) {
        bool = false;
        Body.className = "bg-white";
        darkbtn.className = "fa-solid fa-moon p-3 btn btn-light shadow";
        listdiv.className = "bg-white text-center shadow p-5 rounded";
        head.className = "text-black";
    } else {
        bool = true;
        Body.className = "bg-dark";
        darkbtn.className = "fa-solid fa-sun p-3 btn btn-light shadow";
        listdiv.className = "bg-dark text-center shadow p-5 rounded";
        head.className = "text-white";
    }
})