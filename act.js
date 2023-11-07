function getAndupdate() {
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    if (desc.trim() === "" || tit.trim() === "") {
        alert("Title or Description cannot be empty")
    }
    else {
        if (localStorage.getItem('itemsJson') == null) {
            itemJsonArray = [];
            itemJsonArray.push([tit, desc])
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        }
        else {
            itemJsonArraystr = localStorage.getItem('itemsJson');
            itemJsonArray = JSON.parse(itemJsonArraystr);
            itemJsonArray.push([tit, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        }
    }
    document.getElementById('title').value = ""
    document.getElementById('description').value = ""
    update();
}
function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArraystr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArraystr);
    }
    let tablebody = document.getElementById("tablebody")
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
            <th scope="row"}>${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-sm btn-dark" onclick="deleted(${index})">Delete</button></td>
        </tr>
            `
    });
    tablebody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getAndupdate);
update();
function deleted(itemIndex) {
    itemJsonArraystr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArraystr);
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update()
}
function clearlist() {
    if (window.confirm("All list will be cleared! Are you Sure?")) {
        localStorage.clear()
        update();
    }
}
