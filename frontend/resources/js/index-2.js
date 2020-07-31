// const USERS_URL = "http://localhost:3000/users";
// let current_user;

// document.addEventListener("DOMContentLoaded", () => {
//     const loginForm = document.querySelector("#login-form");
//     loginForm.addEventListener("submit", (e) => {
//         e.preventDefault()
//         const username = e.target.username.value;
//         checkUser(username);
//         loginForm.reset()
//     });
// }); 

// function checkUser(username) {
//     fetch(USERS_URL)
//         .then(resp => resp.json())
//         .then(users => {

//             users.forEach(user => {
//                 if(user.username === username) {
//                     current_user = user;
//                     loginUser()
//                 } else {
//                     console.log("Goodbye Stranger!")
//                 }
//             })

//         })
// }

// function loginUser() {
//     document.querySelector("#login").style.display = "none"
//     home()
// }

// function home() {
//     const dashboard = document.querySelector("#dashboard-content > .container")
//     dashboard.innerHTML = `
//         <div class="row">
//             <div class="col-lg-4">
//                 <div class="card-njs card-sm">
//                     <div class="card-sm-header">
//                         <h3>Your Budget</h3>
//                     </div>
//                     <div class="card-sm-content">
//                         <p>$2000</p>
//                     </div>
//                 </div>
//             </div>
//             <div class="col-lg-4">
//                 <div class="card-njs card-sm">
//                     <div class="card-sm-header">
//                         <h3>Monthly Spending</h3>
//                     </div>
//                     <div class="card-sm-content">
//                         <p>$1450</p>
//                     </div>
//                 </div>
//             </div>
//             <div class="col-lg-4">
//                 <div class="card-njs card-sm">
//                     <div class="card-sm-header">
//                         <h3>Spending Categories</h3>
//                     </div>
//                     <div class="card-sm-content">
//                         <p>7</p>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div class="row">
//             <div class="col-md-12">
//                 <div class="card-njs card-lg-home">
//                     <canvas id="myChart" style="display: block; height: 100%; width: 100%;"></canvas>
//                 </div>
//             </div>
//         </div>
//     `;
// }