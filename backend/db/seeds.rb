# = Expenditure.create(list: , name: "" , price: ,deadline: )

user_1 = User.create(username: "Budgetbobby", name: "Bob Doe", email: "bob.doe@gmail.com")

media_list = List.create(category: "Media", budget: 500.00, user_id: user_1.id)
groceries_list = List.create(category: "Groceries", budget: 120.00, user_id: user_1.id)
sub_list = List.create(category: "Subscriptions", budget: 1000.99, user_id: user_1.id)

netflix = Expenditure.create(list_id: 1, name: "Netflix", price: 13.99)
hulu = Expenditure.create(list_id: 1, name: "Hulu", price: 8.99)
amazon_prime = Expenditure.create(list_id: 1, name: "Amazon Prime", price: 12.99)

milk = Expenditure.create(list_id: 2, name: "2% Milk" , price: 2.15)
cereal = Expenditure.create(list_id: 2, name: "Cereal", price: 4.99)
eggs = Expenditure.create(list_id: 2, name: "Eggs", price: 5.99)
bread = Expenditure.create(list_id: 2, name: "Bread", price: 2.99)
cheese = Expenditure.create(list_id: 2, name: "Mozzerella", price: 10.99)

mad_mag = Expenditure.create(list_id: 3, name: "Mad Magazine", price: 12.99, deadline: "06/08/2020")
shave = Expenditure.create(list_id: 3, name: "Dollar Shave", price: 5.99, deadline: "06/08/2009")
dropout = Expenditure.create(list_id: 3, name: "Dropout", price: 4.99, deadline: "03/08/2009")
cat_toys = Expenditure.create(list_id: 3, name: "Cats", price: 10.99, deadline: "05/01/2009")
cheese = Expenditure.create(list_id: 3, name: "Cheese", price: 77.77, deadline: "07/7/2007")
tekken = Expenditure.create(list_id: 3, name: "Tekken", price: 1.99, deadline: "05/05/2005")
medium = Expenditure.create(list_id: 3, name: "Medium.com", price: 555.99, deadline: "06/09/2010")


# user_2 = User.create(username: "Juchazari", name: "Julio Chazari", email: "julio.chazari@gmail.com")

# home_list = List.create(category: "Home", budget: 1000.00, user: user_2)

# gas = Expenditure.create(list: home_list, name: "Electric Bill", price: 50.00)
# electric = Expenditure.create(list: home_list, name: "Electric Bill", price: 60.00)

# user_3 = User.create(username: "Johnnyboi", name: "Johnny Test", email: "john.test@gmail.com")