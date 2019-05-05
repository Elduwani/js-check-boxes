const listParent = document.getElementById("list-items")
let checkboxes;
let array;
let fileContent;

//On page load, get items
fetchItems()
displayItems(fileContent)

function createNewItem(x) {
  return `
    <div class="checkbox-wrapper"><input type="checkbox" id="checkbox" onclick=${handleCheck} />
    </div><div class="item-title">${x.title}</div>
    <div class="delete" id=${x.id}>X</div>
  `
}

function fetchItems() {
  fetch("listItems.json")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      return fileContent = Array.from(data);
    })
    .catch(err => console.error(err))
  console.log("fileContent inside fetch:", fileContent)
}

function save(x) {
  window.localStorage.setItem("Items", JSON.stringify(x))
}

function displayItems(data) {
  console.log("fileContent inside displayItems:", data)
  // return data.forEach(data => {
  //   const listChild = document.createElement("li")
  //   newItem = createNewItem(data)
  //   console.log("New Item", newItem)
  //   listChild.innerHTML = newItem;
  //   listParent.appendChild(listChild)
  //   // checkboxes = listParent.querySelectorAll(".checkbox-wrapper input[type=checkbox]")
  // })
  // // checkboxes.forEach(checkbox => checkbox.addEventListener("click", handleCheck))

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
  //get form element and add to list
  const form = document.getElementById("form")
  form.addEventListener("submit", handleSubmit)
  const content = form.querySelector("input[type = text]").value

  console.log(content)
}
