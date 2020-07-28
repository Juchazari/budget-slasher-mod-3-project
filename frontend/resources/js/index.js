const USERS_URL = "http://localhost:3000/users";
const LISTS_URL = "http://localhost:3000/lists";
const EXPEND_URL = "http://localhost:3000/expenditures";

document.addEventListener("DOMContentLoaded", () => {

    fetch(USERS_URL)
        .then((res) => res.json())
        .then((json) => getUserData(json[0]))

});

function getUserData(userData) {
    userData.lists.forEach(list => {
        renderCardList(list)
    });
}

function renderCardList(list) {
    console.log(list)
    const content = document.querySelector("#dashboard-content > .container")
    const divRow = document.createElement('div')
    divRow.className = "row"

    divRow.innerHTML = `
        <div class="col-md-12">
            <div class="card-njs card-lg-expe">
                <div class="card-exp-left">
                    <div class="cardexp-header">
                        <h3>${list.category}</h3>
                        <button id="list-delete-btn" data-id="${list.id}" class="btn btn-danger">Delete</button>
                    </div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Expenditure</th>
                                <th scope="col">Price</th>
                                <th scope="col">Pay Day</th>
                            </tr>
                        </thead>
                        <tbody class="table_body">
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

    const listDeleteBtn = divRow.querySelector("#list-delete-btn");
    listDeleteBtn.addEventListener("click", () => deleteList(divRow, listDeleteBtn));

    list.expenditures.forEach(expenditure => {
        const divRowTb = divRow.querySelector(".table_body")
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="pt-3-half" contenteditable="true" >${expenditure.name}</td>
            <td class="pt-3-half" contenteditable="true" >$ ${expenditure.price}</td>
            <td class="pt-3-half" contenteditable="true" >${expenditure.deadline}</td>
            <td>
                <span class="table-remove">
                    <button id="item-remove-btn" data-id="${expenditure.id}" type="button"class="btn btn-danger btn-rounded btn-sm my-0">
                        Remove
                    </button>
                </span>
            </td>
        `;

        divRowTb.appendChild(tr);
        
        const itemDeleteBtn = tr.querySelector("#item-remove-btn")
        itemDeleteBtn.addEventListener("click", () => deleteItem(tr,itemDeleteBtn, expenditure))
    });

    createChart(list, divRow)

    content.appendChild(divRow);
}

function deleteItem(item, btn, expenditure) {
    const id = btn.getAttribute("data-id")
    item.remove();

    fetch(`${EXPEND_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
}

function deleteList(list, btn) {
    const id = btn.getAttribute("data-id")
    list.remove();

    fetch(`${LISTS_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

}

function createChart(list, divRow) {
    
    let labels = [];
    let data = [];

    list.expenditures.forEach(expenditure => {
        labels.push(expenditure.name)
        data.push(expenditure.price)
    })

    const canvas = divRow.querySelector("canvas")
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