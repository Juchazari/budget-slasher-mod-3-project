const USERS_URL = "http://localhost:3000/users";
const LISTS_URL = "http://localhost:3000/lists";
const EXPEND_URL = "http://localhost:3000/expenditures";
let current_user;

document.addEventListener("DOMContentLoaded", () => {

    calcTotalSpent()

    calcTotalLists()


    fetch(USERS_URL)
        .then((res) => res.json())
        .then((json) => {
            current_user = json[0];
            getUserData(current_user)
            displayNavChart()
        })

    // Add new list
    const addListBtn = document.getElementById("add-list-btn")
    addListBtn.addEventListener("click", () => {
        fetch(LISTS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "category": "New List",
                "user_id": current_user.id,
                "budget": 0.00
            })
        }).then(resp => resp.json()).then(json => {
            renderCardList(json)
        }).then(calcTotalList())
    })

    // Add Table Item
    document.addEventListener("click", (e) => {
        if(e.target.matches("#add-item-btn")) {
            addNewItem(e.target)
        }
    })
    // Delete Table Item
    document.addEventListener("click", (e) => {
        if(e.target.matches("#item-delete-btn")) {
            const tr = e.target.parentNode.parentNode.parentNode;
            deleteListItem(tr, e.target)
        }
    })
<<<<<<< HEAD
//editing
=======
>>>>>>> 149f5ef73a00aaa0d816068ff78b7454861c8214
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
<<<<<<< HEAD
//see if the person is typing
=======
    // Update table input text
>>>>>>> 149f5ef73a00aaa0d816068ff78b7454861c8214
    document.addEventListener("input", debounce(e =>{
        if(e.target.matches("td")) {
            const newText = e.target.innerText;
            const item = e.target.parentNode;

            updateItem(newText, item)
        }
        if(e.target.matches("h3#list-name")) {
            const listId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("list-id")
            const newCateName = e.target.innerText
            updateListName(listId, newCateName)
        }
        if(e.target.matches("span#list-budget")) {
            const listId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("list-id")
            const newBudget = e.target.innerText
            updateListBudget(listId, newBudget)
        }
    }, 800))

});

function displayNavChart() {
    const ctx = document.getElementById('nav-chart');
    let allLists = [];
    let listsTotals = [];

    current_user.lists.forEach(list=> {
        allLists.push(list.category)
        listsTotals.push(list.total)
    });

    const myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: allLists,
            datasets: [{
                label: 'Spendings',
                data: listsTotals,
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)'
                ]
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    barPercentage: 0.1,
                    gridLines: {
                        display: true
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 1000,
                        min: 0,
                        stepSize: 250
                    }
                }]
            },
            legend : {
                labels : {
                  fontColor : '#ffffff'  
                }
            }
        }
    });
}

function calcTotalLists() {
    fetch(USERS_URL)
        .then(resp => resp.json())
        .then(json => {
            let totalLists = 0;
            json.forEach(user => {
                totalLists = user.lists.length
            })
            document.querySelector("#all-lists").innerText=`Total Lists: ${totalLists}`;
        })
}

function calcTotalSpent() {
    fetch(USERS_URL)
        .then(resp => resp.json())
        .then(json => {
            let total = 0.0;
            json.forEach(user => {
                user.lists.forEach(list => {
                    list.expenditures.forEach(item => {
                        total += item.price
                    })
                })  
            })
            document.querySelector("#all-total").innerText=`Total Spent: $${total.toFixed(2)}`;
        })   
}


function getUserData(userData) {
    userData.lists.forEach(list => {
        renderCardList(list)
    });
}

function renderCardList(list) {
    Chart.defaults.global.defaultFontColor = "#b0aeaf";
    const dashboard = document.querySelector("#dashboard-content > .container");
    const cardContainer = document.createElement('div');

    cardContainer.className = "row"
    cardContainer.innerHTML = `
        <div class="col-md-12">

            <div id="card-list" list-id=${list.id}>
                <i id="list-delete-btn" class="fa fa-close delete-list-btn" list-id="${list.id}"></i>

                <div class="container">
                    <div class="row">

                        <div class="col-lg-6">
                            <div class="card-list-header">
                                <h3 id="list-name" contenteditable="true">${list.category}</h3>
                                <h3> Budget: $<span id="list-budget" contenteditable="true">${list.budget.toFixed(2)}</span></h3>
                            </div>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Expense</th>
                                        <th id="totalPrice" scope="col"></th>
                                        <th class="text-center" scope="col">Date</th>
                                        <th class="text-center" scope="col" >
                                            <i id="add-item-btn" class="fa fa-plus add-table-item-btn" list-id="${list.id}" aria-hidden="true"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="table-body" table-id="${list.id}">

                                </tbody>
                            </table>
                        </div>

                        <div class="col-lg-6">
                            <div class="chart-container">
                                <canvas id=${list.id} style="display: block; width: 100%; height: 100%;"></canvas>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>

        </div>
    `;

    const listDeleteBtn = cardContainer.querySelector("#list-delete-btn");
    listDeleteBtn.addEventListener("click", () => deleteListCard(cardContainer, listDeleteBtn));
    let total = 0.0;
    
    list.expenditures.forEach(expenditure => {
        total += expenditure.price;
        cardContainer.querySelector("#totalPrice").innerText =`Price: $${total.toFixed(2)}`;

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
                        <i id="item-delete-btn" class="fa fa-minus delete-table-item-btn" aria-hidden="true" item-id="${expenditure.id}"></i>
                </span>
            </td>
        `;

        tableBody.appendChild(tr);
    });

    renderChart(list, cardContainer)
    pushTotalToBack(list, total)
    dashboard.appendChild(cardContainer);
}

function pushTotalToBack(list, total) {
    fetch(`${LISTS_URL}/${list.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({"total": total})
    })
}

function updateListBudget(id, newBudget){
    fetch(`${LISTS_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({"budget": newBudget})
    })
}

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
    }).then(displayNavChart()).then(calcTotalSpent())
}


function addNewItem(btn){
    const id = btn.getAttribute("list-id")
    const table = document.querySelector(`tbody[table-id="${id}"]`)
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td class="pt-3-half" contenteditable="true" > </td>
        <td class="pt-3-half" contenteditable="true" > $ </td>
        <td class="text-center" class="pt-3-half" contenteditable="true" >  </td>

        <td class="text-center">
            <span class="table-remove">
                    <i id="item-delete-btn" class="fa fa-minus delete-table-item-btn" aria-hidden="true"> </i>
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

        deleteBtn.setAttribute("item-id", expId);
        tr.setAttribute("expense-id", expId)
    })
}


function deleteListItem(item, btn) {
    const id = btn.getAttribute("item-id")
    item.remove();

    fetch(`${EXPEND_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(calcTotalSpent())
}

function deleteListCard(list, btn) {
    const id = btn.getAttribute("list-id")
    list.remove();

    fetch(`${LISTS_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(calcTotalList())
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