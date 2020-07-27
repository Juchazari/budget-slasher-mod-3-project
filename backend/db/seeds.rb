
bob = User.create(username: "BudgetBobby", name: "Bob", email: "bob.doe@gmail.com")

food_and_drink = List.create(category: "Food and Drink", budget: 1000.00, user: bob)

hot_dog = Expenditure.create(list: food_and_drink, name: "Hot Dog", price: 3.75)
pizza = Expenditure.create(list: food_and_drink, name: "Pizza", price: 6.00)