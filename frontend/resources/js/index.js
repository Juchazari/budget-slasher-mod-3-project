document.addEventListener("DOMContentLoaded", () => {
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
});