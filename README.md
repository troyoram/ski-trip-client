# Ski Trip Planner - Capstone Project

The Ski Trip Planner application is the fourth project assigned to students
in General Assembly's Web Development Immersive (WDI) Course.  The student is
tasked with building a Single Page Application (SPA).  Users will be required
to authenticate through sign-up, sign-in, change-password, and sign-out using
a custom Application Programming Interface (API).  Once signed in, users can
create, read, update, and delete planned ski trips in a PostgreSQL database with location, date, and equipment needed.

The Ski Trip Client front-end-user-interface is deployed on gh-pages and was created from the react-auth-template-master.
The following React components were created to allow all the necessary CRUD
actions: TripIndex, TripShow, TripNew, and TripEdit. Although trip delete is
supported within TripIndex, a seperate React component was not required.  Two
additional components, WeatherForm and Weather, were created to interface with
OpenWeatherMap API within the TripShow view that will retrun the current
weather conditions at or near the skiing destination.

The Ski Trip Server back-end-api is deployed on heroku and was created from the rails-api-template-master.
The following command was used to create the trip resource:
```sh
$ bin/rails generate scaffold trip location:string date:date equipment:string
```
null:false was added to the migration file to require entries for location,
date, and equipment.
The following command was executed to update schema:
```sh
$ bin/rails db:migrate
```
After the trip resource was created, the following command was used to create a
one-to-many relationship between users and trips:
```sh
$ bin/rails generate migration AddUserToTrips user:references
```
As before, the following command was executed to update schema:
```sh
$ bin/rails db:migrate
```
Finally, the trip controller was changed to ProtectedController to only allow
users to index, show, edit, and delete their own ski trips.

## Project Links

[Requirements](https://git.generalassemb.ly/ga-wdi-boston/capstone-project/)

[Ski Trip Client - Repo](https://github.com/troyoram/ski-trip-client/)

[Ski Trip Client - Deployed](https://troyoram.github.io/ski-trip-client/)

[Ski Trip Server - Repo](https://github.com/troyoram/ski-trip-server/)

[Ski Trip Server - Deployed](https://ski-trip-server.herokuapp.com/)

## User Stories

1.  As a user, I want to sign-up for an account with email and password
1.  As a user, I want to sign-in with email and password
1.  As a user, I want change password option after sign-in
1.  As a user, I want to sign-out of application upon completion
1.  As a user, I want to plan a ski trip on a chosen date
1.  As a user, I want to plan a ski trip at a chosen location
1.  As a user, I want to plan a ski trip with chosen equipment

## Tables and Columns

users: user_id, email, password

trips: trip_id, location, date, user_id

## Entity Relationship Diagram (ERD)

![Entity Relationship Diagram](public/erd-skiTripPlanner.png)

## Routing

```sh
$ bin/rails routes
         Prefix Verb   URI Pattern                Controller#Action
          trips GET    /trips(.:format)           trips#index
                POST   /trips(.:format)           trips#create
           trip GET    /trips/:id(.:format)       trips#show
                PATCH  /trips/:id(.:format)       trips#update
                PUT    /trips/:id(.:format)       trips#update
                DELETE /trips/:id(.:format)       trips#destroy
       examples GET    /examples(.:format)        examples#index
                POST   /examples(.:format)        examples#create
        example GET    /examples/:id(.:format)    examples#show
                PATCH  /examples/:id(.:format)    examples#update
                PUT    /examples/:id(.:format)    examples#update
                DELETE /examples/:id(.:format)    examples#destroy
        sign_up POST   /sign-up(.:format)         users#signup
        sign_in POST   /sign-in(.:format)         users#signin
       sign_out DELETE /sign-out(.:format)        users#signout
change_password PATCH  /change-password(.:format) users#changepw
```

## Wireframes

![Wireframe 1](public/wireframe1-skiTripPlanner.png)
![Wireframe 2](public/wireframe2-skiTripPlanner.png)

## Technologies Used

1.  *Browser:* Google Chrome with DevTools
1.  *Editor:* Atom
1.  *Client-side tools:* React, HTML, CSS, Javascript, Axios, JSON, bootstrap, Node Package Manager, curl-scripts
1.  *Server-side tools:* Ruby, Rails, JSON, curl-scripts

## Schedule

### November 30, 2018
### Planning
1.  [ ] Review [project-scope-study](https://git.generalassemb.ly/ga-wdi-boston/game-project-scope-study)
1.  [ ] Create User Stories
1.  [ ] Review [project-planning-wireframes-practice](https://git.generalassemb.ly/ga-wdi-boston/project-planning-wireframes-practice)
1.  [ ] Create Wire Frames
1.  [ ] Review [project-modeling-lab](https://git.generalassemb.ly/ga-wdi-boston/full-stack-project-modeling-lab)
1.  [ ] Create ERD

### December 1, 2018
### Set Up

API

1.  [ ] [Download Express API Template](https://git.generalassemb.ly/ga-wdi-boston/express-api-template) or [Download Rails API Template](https://git.generalassemb.ly/ga-wdi-boston/rails-api-template)
1.  [ ] Create a Github Repository
1.  [ ] [Deploy to Heroku with Express](https://git.generalassemb.ly/ga-wdi-boston/express-api-deployment-guide) or [Deploy to Heroku with Rails](https://git.generalassemb.ly/ga-wdi-boston/rails-heroku-setup-guide)

Client

1.  [ ] [Download Browser Template](https://git.generalassemb.ly/ga-wdi-boston/browser-template) or [Download React Auth Template](https://git.generalassemb.ly/ga-wdi-boston/react-auth-template)
1.  [ ] Create a Github Repository
1.  [ ] [Deploy to Github Pages with Browser Template](https://git.generalassemb.ly/ga-wdi-boston/gh-pages-deployment-guide) or [Deploy to Github Pages with React Template](https://git.generalassemb.ly/ga-wdi-boston/react-template)

### December 2, 2018
### API
1.  [ ] Review [express-api](https://git.generalassemb.ly/ga-wdi-boston/express-api) or [rails-api](https://git.generalassemb.ly/ga-wdi-boston/rails-api)
1.  [ ] Create your resource and end points
1.  [ ] Test your resource's end points with curl scripts
1.  [ ] Add the relationship to a User
1.  [ ] Add User ownership to resource controller

### December 3-5, 2018
### Client
1.  [ ] Review [api-token-auth](https://git.generalassemb.ly/ga-wdi-boston/api-token-auth) or [react-auth](https://git.generalassemb.ly/ga-wdi-boston/react-auth-template)
1.  [ ] Sign Up (curl then web app)
1.  [ ] Sign In (curl then web app)
1.  [ ] Change Password (curl then web app)
1.  [ ] Sign Out (curl then web page)
1.  [ ] All API calls have success or failure messages
1.  [ ] Review [query-ajax-post](https://github.com/ga-wdi-boston/jquery-ajax-post) or [react-resources](https://git.generalassemb.ly/ga-wdi-boston/react-template)
1.  [ ] Create resource (curl then web app)
1.  [ ] Get all of their owned resources (curl then web app)
1.  [ ] Delete single resource (curl then web app)
1.  [ ] Update single resource (curl then web app)

### December 6, 2018
### Final Touches
1.  [ ] README
2.  [ ] Troubleshoot/Debug
3.  [ ] Style

### December 7, 2018
### Project Completion
1.  [ ] Presentation

## Problem Resolution

As problems with design and development were encountered, a new issued was created
and addressed through General Assembly's Capstone Project [Issue Queue](https://git.generalassemb.ly/ga-wdi-boston/capstone-project/issues)

## Unsolved problems to be fixed in future releases

1.  If time permits, I would like to add a feature where Google Maps API is used for displaying the location of each skiing destination.
2.  If time permits, I would like to add a feature where a weather API is used for displaying the current weather conditions of each skiing location.

## Testing

There were no requirements for developing automated tests for this project.  As
a result, no automated tests exist for the Full-Stack project.

### Coding style tests

Linter for Atom was used to enforce coding style

## Deployment

'npm run deploy' was used to deploy the React front-end client to github pages
The back-end api is deployed on heroku.

## Built With

React components are implemented on the client-side of this project.
Ruby on Rails framework was used for the server-side of this project. No
dependency management or RSS feeds were used for this project

## Versioning

'git commit' and 'git push' were used for versioning. For the versions available,
see the Project Links above.

## Authors

*   **Troy Oram** - *Initial work*

## Acknowledgments
N/A
