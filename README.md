# packt_react_laravel

## About The Project

1. First you need to set .env and php 8.1 apache2 server for run this project
2. Inside the terminal run => composer install
3. Inside the terminal run => npm install && npm run dev ( npm run dev for react js compilation )
4. Inside the terminal run => php artisan db:seed ( for fake data insert inside the DB. Every time you will get 100 records during seed)
5. Inside the terminal run => php artisan serve ( for generate live url like => 127.0.0.1:8000 )
6. You can see on the home page there is books listing with functionality of search records of book and with pagination api call
7. Also for book full details you can click on Full Details button.
8. On the Header there are two Links

    1. User Listing => For local user or public view of book store URL => (http://127.0.0.1:8000/)
    2. Admin Listing => For Admin user add/update/delete/list records. URL => (http://127.0.0.1:8000/allListing)

    Note : Right now I have not attached the auth login for this demo.

9. Note : I have tried with Elsatic search and I got success in some functionality. But with Model eloquent elastic search I got some libraies error and not able to resolved right now. But all the code is there about elastic search. You can see the code for that.

10. For api => This project is fully running on api base and you can check api inside BooksController.php file for that.
11. If you have any issue for run this project then feel free to ask anytime.

Note : React Js code is inside of Component folder in resources directory.

