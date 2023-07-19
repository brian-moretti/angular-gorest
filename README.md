# Angular Project by Brian Moretti

Welcome to my 1° Angular Project made for the Front-End Master of Star2Impact University

## :technologist: Try now
If you wanna put your hand right now to my project just go there [GoRest a Post](https://s2i-nttdata.web.app/auth)
## GoRest a Post - Application

Welcome to my GoRest a Post application. This application use the RestAPI available at [GoRest](https://gorest.co.in/)

### :computer: Main functionality

- **Signup/Login Users:** Users can signup into the application using a username, an email and a password. Then, on the Login page, they can access to the application throught their credential.

- **Dashboard:** This page shows a list of the Users created. In this page you can easily look at the details of every user, create a new user or delete one of them. All these functionality can be activated throught the buttons located in the view.

- **User's Details:** In this page you will find all the details of the user created: name, email, id, gender, status, the posts linked to that specific user and their relative comments. You can add a new post filling the form and, also, leave comments to the posts you prefer.

- **Post's List:** This page shows all the posts created and sorted by ID. In this page is possible to create a new post above the others for a specific user and, also, leave comments to these posts.

- **Sidebar Menu:** On the left side of the screen there is a Menu that helps you to navigate throught the application and a button to Logout. This sidebar includes aome informations of the Users Logged: name, email and when the session will expire

- **Filter and Pagination:** The Dashboard and the Post's List Pages are provided with a Paginator element and a Filter:
  - The filter will help you to filter the User's List by 'Email' or 'Name' and the Post's List by 'ID', 'User's ID', 'Post's Title' and 'Post's Body'.
  - The Paginator element gives you the possibilty to dedice how many records you would like to see in the view and to change page to see other results

### :hammer: How is build:
The applications is build using:
- Angular
- Pure CSS
- PrimeNG
- Firebase (Hosting & Authentication)

The application has the following features:
- Test Code-Coverage greater than 60%
- Is divided into 3 NGModules: 'Auth', 'Users' and 'App'. Auth and Users are configured to be Lazy-Load. You can see the process spying the Devs tools of your Browser.

## :gear:	Config the application on locale
Copy the repository from my Github  
Run `npm install` to install all the modules needed to use the application  
Run `ng serve -o` or `ng serve open` to launch the app locally and open immediately `http://localhost:4200/`.  
Run `ng test` to execute the unit tests via Karma  

## :incoming_envelope: Contact me
If you find some bugs to fix or simply you want to send me a message please write me at [brianmoretti2512@gmail.com](mailto:brianmoretti2512@gmail.com)