# Mubble-API

## API

* POST /search

        body: {
          id,
          filters
        }
      returns a list of users

* POST /users

      create new user

* UPDATE /users/:id

      update user

* GET /users/:id

      returns the specified user

* GET /games

        returns all the games

* GET /games/:id

        returns specified game


## Database

* user:

        {
                id,
                name,
                email,
                country,
                age,
                gender,
                language,
                gameList: [game]
                description,
                image
        }

* conversation:

        {
                id,
                users: [],
                messages:[
                        {
                                username,
                                date,
                                message
                        }
                ]
        }

* games:

        {
                id,
                title,
                filters: [
                        {
                                title,
                                options: []
                        }
                ]
        }
