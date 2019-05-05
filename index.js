const listParent = document.getElementById("list-items")

function displayItems(data) {

  let local = JSON.parse(window.localStorage.getItem("Items"))
  console.log("Local:", local)

  if (local === undefined || !local.length) {
    //Display from file
    console.log("Displaying from File")

    data.forEach((data, i) => {
      const listItem = document.createElement("li")
      listItem.innerHTML = createNewItem(data, i)
      listParent.appendChild(listItem)
    })

  } else {
    //Display from localStorage
    console.log("Displaying from LocalStorage")
    listParent.innerHTML = "";

    local.forEach((local, i) => {
      const listItem = document.createElement("li")
      listItem.innerHTML = createNewItem(local, i)
      listParent.appendChild(listItem)
    })
  }

}

function getData(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      let local = JSON.parse(window.localStorage.getItem("Items"))
      if (!local || !local.length || local === undefined) {
        saveToLocal(data)
      }
      displayItems(data)
    })
}

function createNewItem(x, i) {
  return `
    <div class="checkbox-wrapper"><input type="checkbox" id="checkbox" />
    </div><div class="item-title">${x.title}</div>
    <div class="delete" data-index=${i}>X</div>
  `
}
getData("listItems.json")

function saveToLocal(x) {
  window.localStorage.setItem("Items", JSON.stringify(x))
}

//Handle Check
let checkboxes;
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

function handleSubmit(e) {
  e.preventDefault()
  const content = form.querySelector("input[type = text]").value //fails if assigned outside this function
  console.log(content)
  let local = JSON.parse(window.localStorage.getItem("Items"))
  local.push(
    {
      id: (local[local.length - 1].id + 1),
      title: content
    }
  )
  saveToLocal(local)
  displayItems(local)
  this.reset()
}
