document.getElementById('addItemButton').addEventListener('click', addItem);

function addItem() {
    const itemInput = document.getElementById('itemInput');
    const itemText = itemInput.value.trim();

    if (itemText !== "") {
        const listItem = document.createElement('li');
        const textNode = document.createElement('span');
        textNode.innerText = itemText;
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Видалити';
        deleteButton.addEventListener('click', () => {
            if (confirm("Ви впевнені, що хочете видалити цей елемент?")) {
                listItem.remove();
            }
        });
        const editButton = document.createElement('button');
        editButton.innerText = 'Редагувати';
        editButton.addEventListener('click', () => {
            const newText = prompt("Введіть новий текст:", textNode.innerText);
            if (newText !== null && newText.trim() !== "") {
                textNode.innerText = newText.trim();
            }
        });
        listItem.appendChild(textNode);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        document.getElementById('shoppingList').appendChild(listItem);
        itemInput.value = '';
        itemInput.focus();
    }
}
