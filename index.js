let local = JSON.parse(window.localStorage.getItem("Items"))
let newarray = [];

//get form element and add to list
const form = document.getElementById("form")
form.addEventListener("submit", handleSubmit)

const listParent = document.getElementById("list-items")
let checkboxes;

function showContent(x) {
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

  const listTags = listParent.querySelectorAll('li')
  listTags.forEach(tag => tag.addEventListener("mouseenter", showDeleteButton))
  listTags.forEach(tag => tag.addEventListener("mouseleave", hideDeleteButton))

  const deleteButton = listParent.querySelectorAll(".delete")
  deleteButton.forEach((btn) => btn.addEventListener("click", handleDelete))

  checkboxes = listParent.querySelectorAll("input[type=checkbox]")
  checkboxes.forEach(checkbox => checkbox.addEventListener("click", handleCheck))

}

function displayItems(data) {
  newarray = data;
  console.log("Displaying from LocalStorage")
  listParent.innerHTML = "";
  showContent(data)
}

function getData() {
  return fetch("listItems.json")
    .then(response => response.json())
    .then(data => {
      saveToLocal(data)
      newarray = data;
      displayItems(data)
    })
}

if (local && local.length > 0) {
  console.log("Local Storage exists")
  displayItems(local)
} else {
  getData()
  console.log("Local Storage does not exist")
}

function saveToLocal(x) {
  window.localStorage.setItem("Items", JSON.stringify(x))
}

//Handle Check
let lastChecked;

function handleCheck(e) {
  const parent = this.parentElement.parentElement
  parent.classList.toggle("checked")

  let inBetween = false

  if (e.shiftKey && this.checked && lastChecked != this) {
    console.log("Last Checked: ", lastChecked.name)
    checkboxes.forEach(checkbox => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween
      }
      if (inBetween) {
        checkbox.checked = true
      }
      if (checkbox.checked) {
        checkbox.parentElement.parentElement.classList.add("checked")
      } else {
        checkbox.parentElement.parentElement.classList.remove("checked")
      }
    })
  }

  lastChecked = this
}

function handleSubmit(e) {
  e.preventDefault()
  let local = JSON.parse(window.localStorage.getItem("Items"))
  const content = form.querySelector("input[type = text]").value //fails if assigned outside this function
  local.push(
    {
      id: local.length ? (local[local.length - 1].id + 1) : 1,
      title: content
    }
  )
  saveToLocal(local)
  displayItems(local)
  this.reset()
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
  console.log("entered", this)
}

function hideDeleteButton() {
  this.querySelector(".delete").classList.remove("show")
}
