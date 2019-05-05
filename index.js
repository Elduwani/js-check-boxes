const listParent = document.getElementById("list-items")
let local = JSON.parse(window.localStorage.getItem("Items"))
let newarray = [];

//get form element and add to list
const form = document.getElementById("form")
form.addEventListener("submit", handleSubmit)
let checkboxes;
let listTags;

function getData() {
  return fetch("listItems.json")
    .then(response => response.json())
    .then(data => {
      saveToLocal(data)
      newarray = data;
      displayItems(data)
    })
}

function showData(x) {
  if (!x) { return }

  x.forEach((x, i) => {
    const listItem = document.createElement("li")
    listItem.innerHTML =
      `
        <div class="checkbox-wrapper"><input type="checkbox" id="checkbox" /></div>
        <p class="item-title">${x.title}</p>
        <div class="delete" data-index=${i}>X</div>
      `
    listParent.appendChild(listItem)
  })

  checkboxes = listParent.querySelectorAll('input[type=checkbox]')
  listTags = listParent.querySelectorAll('li')
  listTags.forEach(tag => tag.addEventListener("mouseenter", showDeleteButton))
  listTags.forEach(tag => tag.addEventListener("mouseleave", hideDeleteButton))
  listTags.forEach(tag => tag.addEventListener("click", handleCheck))

  const deleteButton = listParent.querySelectorAll(".delete")
  deleteButton.forEach((btn) => btn.addEventListener("click", handleDelete))
}

function displayItems(data) {
  newarray = data;
  // console.log("Displaying from LocalStorage")
  listParent.innerHTML = "";
  showData(data)
}

if (local && local.length > 0) {
  // console.log("Local Storage exists")
  displayItems(local)
} else {
  getData()
  // console.log("Local Storage does not exist")
}

function saveToLocal(x) {
  window.localStorage.setItem("Items", JSON.stringify(x))
}

//Only bluff calling below function to set global variables holding data from Promises
showData();

//Handle Check
let lastChecked;

function handleCheck(e) {

  if (e.target.matches('input')) {

    const checkbox = this.querySelector('input[type=checkbox')
    // this.classList.toggle("checked")
    let inBetween = false

    if (e.shiftKey && checkbox.checked) {
      //const checkboxes is set inside showData() function when items are created at runtime. 
      //Had to call the function outside of itself to actually set the var
      checkboxes.forEach(box => {
        // Within loop, check if checkbox is between last-checked & current-checked
        if (box === checkbox || box === lastChecked) {
          inBetween = !inBetween
        }
        if (inBetween) {
          box.checked = true
        }
      })
    }
    lastChecked = checkbox;

    //Since elements are created at runtime (don't exist in the DOM)
    //and click can only happen after runtime below function should only be run here
    //otherwise DOM elements will return null 
    listTags.forEach(tag => {
      console.log(tag)
      const box = tag.querySelector('input[type=checkbox]')
      box.checked ? tag.classList.add("checked") : tag.classList.remove("checked")
    })
  }
}

function handleSubmit(e) {
  e.preventDefault()
  let local = JSON.parse(window.localStorage.getItem("Items"))
  const content = form.querySelector("input[type = text]").value //fails if assigned outside this function

  if (content === "" || content === undefined) {
    return
  }

  local.push(
    {
      id: local.length ? (local[local.length - 1].id + 1) : 1,
      title: content
    }
  )
  saveToLocal(local)
  displayItems(local)
  this.reset()
  form.querySelector("input[type = text]").focus()
}

function handleDelete() {
  if (local && local.length) {
    newarray = local;
  }
  newarray.splice(this.dataset.index, 1)
  saveToLocal(newarray)
  displayItems(newarray)
}

function showDeleteButton() {
  this.querySelector(".delete").classList.toggle("show")
}

function hideDeleteButton() {
  this.querySelector(".delete").classList.remove("show")
}
