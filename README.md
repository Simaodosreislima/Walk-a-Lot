# Walk a Lot

<img src="https://sonicagents.files.wordpress.com/2013/10/silly-walks.png">
<br>

## Description

A database of walking routes where users can upload their walks with comments and pictures of interesting things to see. **_---Other users can search, interact, share, comment and contribute with their walks.---_**

<br>

## User Stories

- **404** - A 404 page when a page doesn’t exist.
- **500** - A error page when the server is down.
- **homepage** - Access the homepage with the ability to log in and sign up.
- **sign up** - User can create an acccount with username, email, password and password confirmation. We will use Modal for the form.
- **login** - User can login to the acccount with email and password. We will use Modal for the form.
- **logout** - If the user is logged in, user can logout and return to the homepage.
- **main page** - When user is logged in: User can create a new walk card, and view created walk cards with the card title.
- **walk card creation** - User can choose two points on the map; add comments about the walk; add pictures about the walk; It creates the walk card on the database.
- **walk card creation edit** - User can edit two points on the map; edit comments about the walk; edit pictures about the walk; It updates the walk card on the database.
- **Walk card** - Shows the walk route, the user comments and the pictures. User can edit the card, or delete the card.
- **profile page** - Details about the user. First name, last name, profile picture.
- **edit profile** - Ability to edit profile. Edit first name, last name, profile picture. **_???--- edit email and password ---???_**

<br>

## Server Routes (Back-end):

| **Method** | **Route**               | **Description**                                                            | Request - Body                                           |
| ---------- | ----------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------- |
| `GET`      | `/`                     | Homepage route. Renders `index` view.                                      |                                                          |
| `GET`      | `/login`                | Renders `login` form view.                                                 |                                                          |
| `POST`     | `/login`                | Sends `login` form data to the server.                                     | { email, password }                                      |
| `GET`      | `/signup`               | Renders `signup` form view.                                                |                                                          |
| `POST`     | `/signup`               | Sends `signup` info to the server and creates user in the DB.              | { username, email, password, password confirmation }     |
| `GET`      | `/private/edit-profile` | Private route. Renders `edit-profile` form view.                           |                                                          |
| `POST`     | `/private/edit-profile` | Private route. Sends `edit-profile` info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/card/create`          | Renders `card-create` form view.                                           |
| `POST`     | `/card/create`          | Sends `create-card` info to the server and updates card in DB              |
| `GET`      | `/card/:id/edit`        | Renders `card-edit` page                                                   |
| `POST`     | `/card/:id/edit`        | Sends `card-edit` info to the server and updates card in DB                |

<br>

## Models

User model

```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  /* ??? confirm: password, */
  profileImg: imageUrl,
}

```

Card model

```javascript
{
  title: String,
  startPointFromApi: String,
  endPointFromApi: String,
  walkComment: String,
  walkPicture: imageURL,

}

```

<br>

## API's

Google Directions API

[Directions API documentation](https://developers.google.com/maps/documentation/directions/overview)
<br>

## Packages

<br>

## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)

<br>

## Links

### Git

The url to your repository and to your deployed project

[Walk a Lot on Github](https://github.com/Simaodosreislima/Walk-a-Lot)

[Deploy Link]()

<br>

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

### Contributors

Miguel Nogueira - [`Github`](https://github.com/tomarnogueiracoding) - [`LinkedIn`](https://www.linkedin.com/in/migueltomarnogueira/)

Simão Lima - [`Github`](https://github.com/Simaodosreislima) - [`LinkedIn`](https://www.linkedin.com/in/simao-lima/)
