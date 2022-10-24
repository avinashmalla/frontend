# Front-end Project
[Netlify](https://fep-avinashmalla.netlify.app/)

## Requirement
1. TypeScript and Unit testing are required in your project
2. Use the API endpoint [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/). Read the documentation and learn how to use the different endpoints.
3. Create at lease 4 pages (can be more if you want): Home page, product page, 
profile page (only available if user logins), and cart page (cart could be a page or a modal)
4. Use context API to create a button to switch themes of the web app
5. Create Redux store for following features:
- product reducer: get all products, find a single products, sort products by
categories, sort products by price, update and delete a product (enable update & delete features only for admin of the webapp. For example, you can check if user is your account before let them delete product)
- user reducer: get all users, find a single user, create new user (delete user is not allowed in this api)
- cart reducer: add product to cart, remove products, update products's quantity in cart
6. Your UI should have functions according to the Redux store
