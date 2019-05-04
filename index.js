const listParent = document.getElementById("list-items")
let checkboxes;
savedData = JSON.parse(window.localStorage.getItem("Items"))

//On page load, get items
getItems()

function getItems() {
  //reset all items to empty - otherwise function will render duplicate items
  listParent.innerHTML = '';

  fetch("listItems.json")
    .then(res => res.json())
    .then(items => {

      if (savedData.length) {

        //Read from LocalStorage
        console.log("Outputting from Local Storage")

        savedData.forEach(data => {
          const listChild = document.createElement("li")
          const newItem =
            `<div class="checkbox-wrapper"><input type="checkbox" name=${data.id} id="checkbox" />
            </div><div class="item-title">${data.title}</div>`
          listChild.innerHTML = newItem;
          listParent.appendChild(listChild)
          checkboxes = listParent.querySelectorAll(".checkbox-wrapper input[type=checkbox]")
        })

      } else {

        //Read from file
        console.log("Outputting from JSON file")

        //save to LocalStorage
        save(items);

        items.forEach(item => {
          const listChild = document.createElement("li")
          const newItem =
            `<div class="checkbox-wrapper"><input type="checkbox" name=${data.id} id="checkbox" />
            </div><div class="item-title">${data.title}</div>`

          // listChild.setAttribute('draggable', 'true')
          listChild.innerHTML = newItem
          listParent.appendChild(listChild)
          checkboxes = listParent.querySelectorAll(".checkbox-wrapper input[type=checkbox]")
        })
      }
      checkboxes.forEach(checkbox => checkbox.addEventListener("click", handleCheck))
    })
    .catch(err => console.error(err))
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

//get form element and add to list
const form = document.getElementById("form")
form.addEventListener("submit", handleSubmit)
const formInput = form.querySelector("input[type = text]")

function handleSubmit(e) {
  e.preventDefault()
  newArray = savedData;

  //Add new entry to the LocalStorage array
  newArray.push({ id: (savedData[savedData.length - 1].id + 1), title: formInput.value })
  save(newArray)

  formInput.value = '';

  // Render items again
  getItems()
}

function save(x) {
  window.localStorage.setItem("Items", JSON.stringify(x))
}
