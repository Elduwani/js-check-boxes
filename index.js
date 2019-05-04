const listParent = document.getElementById("list-items");

function getItems() {
  fetch("listItems.json")
    .then(res => res.json())
    .then(items => {
      items.forEach(item => {
        let listChild = document.createElement("li");
        let newItem = `
            <div class="checkbox-wrapper">
                <input type="checkbox" name=${item.id} id="checkbox" />
            </div>
            <div class="item-title">${item.title}</div>
        `;
        listChild.innerHTML = newItem;
        listParent.appendChild(listChild);
      });
    });
}

getItems();

const checkboxes = document.querySelectorAll(
  ".checkbox-wrapper input[type=checkbox]"
);

let lastChecked;

function handleCheck(e) {
  const parent = this.parentElement.parentElement;
  parent.classList.toggle("checked");

  let inBetween = false;

  if (e.shiftKey && this.checked && lastChecked != this) {
    console.log("Last Checked: ", lastChecked.name);
    checkboxes.forEach(checkbox => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }

      if (inBetween) {
        checkbox.checked = true;
      }

      if (checkbox.checked) {
        checkbox.parentElement.parentElement.classList.add("checked");
      } else {
        checkbox.parentElement.parentElement.classList.remove("checked");
      }
    });
  }

  lastChecked = this;
}

checkboxes.forEach(checkbox => checkbox.addEventListener("click", handleCheck));
