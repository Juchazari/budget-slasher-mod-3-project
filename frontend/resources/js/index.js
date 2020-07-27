document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("dashboard-content")

    const homeTab = document.getElementById("home");
    homeTab.addEventListener("click", () => {
        content.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="some-card">
                            <div class="some-card-header">
                                <h3>Your Budget</h3>
                            </div>
                            <div class="some-card-content">
                                <p>$2000</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="some-card">
                            <div class="some-card-header">
                                <h3>Monthly Spending</h3>
                            </div>
                            <div class="some-card-content">
                                <p>$1450</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="some-card">
                            <div class="some-card-header">
                                <h3>Spending Categories</h3>
                            </div>
                            <div class="some-card-content">
                                <p>7</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="some-card-large">
                            <canvas id="myChart" style="display: block; height: 100%; width: 100%;"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Food & Drink', 'Home', 'Auto & Transport', 'Shopping', 'Health & Medical', 'Gift & Donation', 'Misc'],
                datasets: [{
                    label: 'Spendings',
                    data: [150, 200, 190, 100, 150, 170, 175],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ]
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                        display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            beginAtZero: true,
                            max: 200,
                            min: 0,
                            stepSize: 50
                        }
                    }]
                }
            }
        });
    })

    const expenditureListTab = document.getElementById("expenditure-list");
    expenditureListTab.addEventListener("click", () => {
        content.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="some-card-large">
                            <div class="left-list-info">
                                <table class="table table-hover">
                                    <caption>Media - 500$</caption>
                                    <thead>
                                    <tr>
                                        <th scope="col">Expenditure</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Pay Day</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Netflix</td>
                                        <td>13.99</td>
                                        <td>8/1/20</td>
                                    </tr>
                                    <tr>
                                        <td>Hulu</td>
                                        <td>8.99</td>
                                        <td>8/1/20</td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Prime</td>
                                        <td>12.99</td>
                                        <td>8/1/20</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="right-graph-graphic">
                                <canvas id="listChart" style="display: block; height: 100%; width: 100%;"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const ctx1 = document.getElementById('listChart');
        const listChart = new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: ['Netflix', 'Hulu', 'Amazon Prime'],
                datasets: [{
                    label: 'Media',
                    data: [13.99, 8.99, 12.99],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ]
                }]
            },
            options: {
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
    })
});