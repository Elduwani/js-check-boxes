const listParent = document.getElementById("list-items")
let checkboxes;
let itemsArray = [];
getItems()

function getItems() {
  fetch("listItems.json")
    .then(res => res.json())
    .then(items => {

      itemsArray = Object.assign(itemsArray, items)

      items.forEach(item => {
        const listChild = document.createElement("li")
        const newItem = `
            <div class="checkbox-wrapper">
                <input type="checkbox" name=${item.id} id="checkbox" />
            </div>
            <div class="item-title">${item.title}</div>
        `
        // listChild.setAttribute('draggable', 'true')
        listChild.innerHTML = newItem
        listParent.appendChild(listChild)
        checkboxes = listParent.querySelectorAll(".checkbox-wrapper input[type=checkbox]")

      })

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
