const USERS_URL = "http://localhost:3000/users";
const LISTS_URL = "http://localhost:3000/lists";
const EXPEND_URL = "http://localhost:3000/expenditures";
let current_user;

document.addEventListener("DOMContentLoaded", () => {

    fetch(USERS_URL)
        .then((res) => res.json())
        .then((json) => {
            current_user = json[0];
            getUserData(json[0])
        })

    
    
    const addListBtn = document.getElementById("add-list-btn")
    addListBtn.addEventListener("click", () => {
        const list = {
            "category": "New List",
            "id": "",
            "expenditures": []
        }

        renderCardList(list)

        fetch(LISTS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "category": "New List",
                "user": current_user.id
            })
        }).then(resp => resp.json()).then(json => console.log(json))
    })

    // When Add new item btn is clicked
    document.addEventListener("click", (e) => {
        if(e.target.matches("#add-item-btn")) {
            addNewItem(e.target)
        }
    })

    //on delete button click
    document.addEventListener("click", (e) => {
        if(e.target.matches("#item-delete-btn")) {
            const tr = e.target.parentNode.parentNode.parentNode;
            deleteListItem(tr, e.target)
        }
    })

    const debounce = (fn, delay) => {
        let timeoutID;
        return function(...args) {
            if(timeoutID) {
                clearTimeout(timeoutID);
            }
            timeoutID = setTimeout(() => {
                fn(...args);
            }, delay)
        }
    }

    document.addEventListener("input", debounce(e =>{
        if(e.target.matches("td")) {
            const newText = e.target.innerText;
            const item = e.target.parentNode;

            updateItem(newText, item)
        }
        if(e.target.matches("h3#list-cate-name")) {
            const listId = e.target.parentNode.parentNode.parentNode.getAttribute("list-id")
            const newCateName = e.target.innerText
            updateListName(listId, newCateName)
        }
    }, 800))

});

function updateListName(id, newName){
    fetch(`${LISTS_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({"category": newName})
    })
}

function updateItem(newText, item) {
    const id = item.getAttribute("expense-id")

    let price = item.children[1].innerText.replace("$", "")
    
    const itemUpdate = {
        "name": item.children[0].innerText,
        "price": price,
        "deadline": item.children[2].innerText
    }

    fetch(`${EXPEND_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(itemUpdate)
    })
}

function getUserData(userData) {
    userData.lists.forEach(list => {
        renderCardList(list)
    });
}

function renderCardList(list) {
    const dashboard = document.querySelector("#dashboard-content > .container");
    const cardContainer = document.createElement('div');

    cardContainer.className = "row"

    cardContainer.innerHTML = `
        <div class="col-md-12">
            <div class="card-njs card-lg-expe" list-id=${list.id}>
                <i id="list-delete-btn" class="fa fa-close" data-id="${list.id}"></i>
                <div class="card-exp-left">
                    <div class="cardexp-header">
                        <h3 id="list-cate-name" contenteditable="true">${list.category}</h3>
                    </div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Expenditure</th>
                                <th scope="col">Price</th>
                                <th class="text-center" scope="col">Pay Day</th>
                                <th class="text-center" scope="col" >
                                    <i id="add-item-btn" class="fa fa-plus" data-id="${list.id}" aria-hidden="true"></i>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="table-body" table-id="${list.id}">

                        </tbody>
                    </table>
                </div>
                <div class="card-exp-right">
                    <div id="chart-container" class="center-chart">
                        <canvas id=${list.id} style="display: block; height: 100%; width: 100%;"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;

    const listDeleteBtn = cardContainer.querySelector("#list-delete-btn");
    listDeleteBtn.addEventListener("click", () => deleteListCard(cardContainer, listDeleteBtn));

    list.expenditures.forEach(expenditure => {
        const tableBody = cardContainer.querySelector("#table-body")
        const tr = document.createElement("tr");
        tr.setAttribute("expense-id", expenditure.id)

        const empty = " ";
        if (expenditure.deadline === null ){
            expenditure.deadline = empty}

        if (expenditure.name === null){
            expenditure.name = empty}

        if (expenditure.price === null){
            expenditure.price = empty}
            
        tr.innerHTML = `
            <td class="pt-3-half" contenteditable="true" >${expenditure.name}</td>
            <td class="pt-3-half" contenteditable="true" >$ ${expenditure.price}</td>
            <td class="text-center" class="pt-3-half" contenteditable="true" >${expenditure.deadline}</td>
            <td class="text-center">
                <span class="table-remove">
                        <i id="item-delete-btn" class="fa fa-minus" aria-hidden="true" expenditure-id="${expenditure.id}"></i>
                </span>
            </td>
        `;

        tableBody.appendChild(tr);

    });

    renderChart(list, cardContainer)

    dashboard.appendChild(cardContainer);
}

function addNewItem(btn){
    const id = btn.getAttribute("data-id")
    const table = document.querySelector(`tbody[table-id="${id}"]`)
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td class="pt-3-half" contenteditable="true" > </td>
        <td class="pt-3-half" contenteditable="true" > $ </td>
        <td class="text-center" class="pt-3-half" contenteditable="true" >  </td>

        <td class="text-center">
            <span class="table-remove">
                    <i id="item-delete-btn" class="fa fa-minus" aria-hidden="true"> </i>
            </span>
        </td>
    `;

    table.appendChild(tr);
    
    fetch(EXPEND_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },

        body: JSON.stringify({"list": id})
    }).then(resp => resp.json())
      .then(json => {

        const expId = json.id
        const deleteBtn = tr.querySelector("#item-delete-btn");

        deleteBtn.setAttribute("expenditure-id", expId);
        tr.setAttribute("expense-id", expId)
    })
}


function deleteListItem(item, btn) {
    const id = btn.getAttribute("expenditure-id")
    item.remove();

    fetch(`${EXPEND_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
}

function deleteListCard(list, btn) {
    const id = btn.getAttribute("data-id")
    list.remove();

    // fetch(`${LISTS_URL}/${id}`, {
    //     method: "DELETE",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json"
    //     }
    // })
}

function renderChart(list, cardContainer) {
    let labels = [];
    let data = [];

    list.expenditures.forEach(expenditure => {
        labels.push(expenditure.name)
        data.push(expenditure.price)
    })

    const canvas = cardContainer.querySelector("canvas")
    const newChart = new Chart(canvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: list.category,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(153, 12, 29, 0.5)',
                    'rgba(131, 255, 60, 0.5)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                }]
            }
        }
    });

    setTimeout(function () {
        newChart.data.datasets.forEach((dataset) => {
            dataset.data = data
        });
        newChart.update();
    }, 200);
}