# TechTools-backend

REST API for TechTools using MongoDB, Express, Node.js

Hosted [here](https://limitless-scrubland-55173.herokuapp.com/)

## Setup

- Add the following code snippet in `./config/default.json`

```json
{
  "mongoURI": "yourMongoURI",
  "jwtSecret": "yourSecretKey"
}
```

- `npm install` - Install all dependencies
- `npm start` - Run the API server

## Routes

### Testing

- GET - `/` - Return `"Hello World!"`

### User - `/api/users`

- POST - `/register` - Register new user
- POST - `/login` - Login user and return JSONWebToken
- GET - `/verify` - (Private) Verify user login and return User
- DELETE - `/delete` - (Private) Delete user

### Post - `/api/posts`

- POST - `/create` - (Private) Create a new post
- GET - `/index` - Get all posts
- GET - `/user/:id` - Get all posts by userId
- GET - `/:contentType` - Get all posts by contentType
- GET - `/:id` - Get post by Id
- PUT - `/:id` - (Private) Update post by Id
- DELETE - `/:id` - (Private) Delete post by Id
- PUT - `/like/:id` - (Private) Like post by Id
- PUT - `/unlike/:id` - (Private) Unlike post by Id
- POST - `/comment/:id` - (Private) Comment on a post by Id
- DELETE - `/uncomment/:id/:commentId` - (Private) Delete comment on post by Id
