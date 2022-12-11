# Pistokkaat RESP API

REST API for school course

## API Reference

#### Register

```http
  POST /auth/register
```

```http
  Content-type: application/json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `email` | **Required**, email, max length 60. Must be unique |
| `username` | `string` | **Required**, min length 3, max length 20. Must be unique |
| `municipality` | `int` | **Required**, ID of the municipality |
| `password` | `string` | **Required**, min length 8 characters, at least one capital letter |

Response:

```json
{
  "message": "User added",
  "user_id": 3
}
```

#### Login

```http
  POST /auth/login
```

```http
  Content-type: application/json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `email` | **Required** |
| `password`    | `string` | **Required** |

Response:

```json
{
    "user": {
        "user_id": 1,
        "email": "username@mail.fi",
        "username": "username",
        "location": "Helsinki",
        "role": 1
    },
    "token": "eyJhbGciOiJIUzI1N..."
}
```

#### Get all users

```http
  GET /user
```

```http
  Authorization: Bearer token
```

Response:

```json
[
  {
      "user_id": 1,
      "email": "username@mail.fi",
      "username": "username",
      "location": "Helsinki",
      "role": 1
  }
]
```

#### Get one user

```http
  GET /user/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `int` | **Required**, user_id of the user to fetch |

Response:

```json
{
  "user_id": 1,
  "username": "username",
  "location": "Helsinki",
  "role": 1
}
```

```http
  With Authorization: Bearer token
```

Response:

```json
{
  "user_id": 1,
  "email": "username@mail.fi",
  "username": "username",
  "location": "Helsinki",
  "role": 1
}
```

#### Update user

```http
  PUT /user
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `email` | **Required**, email, max length 60. Must be unique |
| `username` | `string` | **Required**, min length 3, max length 20. Must be unique |
| `municipality` | `int` | **Required**, ID of the municipality |
| `oldpassword` | `string` | **Required only if newpassword exists**, must match old password |
| `newpassword` | `string` | **Optional**, min length 8 characters, at least one capital letter and can't match oldpassword |

Response:

```json
{
  "message": "User updated"
}
```

#### Delete user

```http
  DELETE /user
```

```http
  Authorization: Bearer token
```

Response:

```json
{
  "message": "User deleted"
}
```

#### Check token

```http
  GET /user/token
```

```http
  Authorization: Bearer token
```

Response:

```json
{
  "user_id": 1,
  "email": "username@mail.fi",
  "username": "username",
  "location": "Helsinki",
  "role": 1
}
```

#### Get user's plants

```http
  GET /user/id/plant
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `int` | **Required**, user_id of the user to fetch plants |

Response:

```json
[
  {
    "plant_id": 1,
    "name": "Peikonlehti",
    "price": 3,
    "description": "Isolehtinen kasvi, joka tekee ilmajuuria.",
    "instruction": "Peikonlehti tarvitsee paljon vettä ja valoa.",
    "imagename": "dasjdsalkdj832",
    "delivery": [
        "Nouto",
        " Postitus"
    ],
    "favourites": 2,
    "created": "2022-12-09T21:23:12.000Z",
    "edited": null,
    "seller": {
      "user_id": 2,
      "username": "username",
      "location": "Kerava"
    }
  }
]
```

```http
  With Authorization: Bearer token
```

Response:

```json
[
  {
    "plant_id": 1,
    "name": "Peikonlehti",
    "price": 3,
    "description": "Isolehtinen kasvi, joka tekee ilmajuuria.",
    "instruction": "Peikonlehti tarvitsee paljon vettä ja valoa.",
    "imagename": "dasjdsalkdj832",
    "delivery": [
        "Nouto",
        " Postitus"
    ],
    "favourites": 2,
    "created": "2022-12-09T21:23:12.000Z",
    "edited": null,
    "seller": {
      "user_id": 2,
      "username": "username",
      "location": "Kerava",
      "email": "username@mail.fi"
    }
  },
]
```

#### Get user's favourites

```http
  GET /user/favourite
```

```http
  Authorization: Bearer token
```

Response:

```json
[
  {
    "plant_id": 1,
    "name": "Peikonlehti",
    "price": 3,
    "description": "Isolehtinen kasvi, joka tekee ilmajuuria.",
    "instruction": "Peikonlehti tarvitsee paljon vettä ja valoa.",
    "imagename": "dasjdsalkdj832",
    "delivery": "Nouto, Postitus",
    "favourites": 2,
    "created": "2022-12-09T21:23:12.000Z",
    "edited": null,
    "seller": {
      "user_id": 2,
      "username": "username23",
      "location": "Kerava",
      "email": "username23@mail.fi"
    }
  }
]
```

#### Get all plants

```http
  GET /plant
```

Response:

```json
[
    {
        "plant_id": 1,
        "name": "Peikonlehti",
        "price": 3,
        "description": "Isolehtinen kasvi, joka tekee ilmajuuria.",
        "instruction": "Peikonlehti tarvitsee paljon vettä ja valoa.",
        "imagename": "dasjdsalkdj832",
        "delivery": "Nouto, Postitus",
        "favourites": 0,
        "created": "2022-12-09T21:23:12.000Z",
        "edited": "2022-12-10T21:23:12.000Z",
        "seller": {
            "user_id": 2,
            "username": "username",
            "location": "Kerava"
        }
    }
]
```

```http
  With Authorization: Bearer token
```

```json
[
    {
        "plant_id": 1,
        "name": "Peikonlehti",
        "price": 3,
        "description": "Isolehtinen kasvi, joka tekee ilmajuuria.",
        "instruction": "Peikonlehti tarvitsee paljon vettä ja valoa.",
        "imagename": "dasjdsalkdj832",
        "delivery": "Nouto, Postitus",
        "favourites": 0,
        "created": "2022-12-09T21:23:12.000Z",
        "edited": "2022-12-10T21:23:12.000Z",
        "seller": {
            "user_id": 2,
            "username": "username23",
            "location": "Kerava",
            "email": "username@mail.fi"
        }
    }
]
```

#### Get one plant

```http
  GET /plant/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**, Id of the plant to fetch |

Response:

```json
{
  "plant_id": 1,
  "name": "Peikonlehti",
  "price": 3,
  "description": "Isolehtinen kasvi, joka tekee ilmajuuria.",
  "instruction": "Peikonlehti tarvitsee paljon vettä ja valoa.",
  "imagename": "dasjdsalkdj832",
  "delivery": "Nouto, Postitus",
  "favourites": 0,
  "created": "2022-12-09T21:23:12.000Z",
  "edited": "2022-12-10T21:23:12.000Z",
  "seller": {
      "user_id": 2,
      "username": "username",
      "location": "Kerava"
  }
}
```

```http
  With Authorization: Bearer token
```

```json
{
  "plant_id": 1,
  "name": "Peikonlehti",
  "price": 3,
  "description": "Isolehtinen kasvi, joka tekee ilmajuuria.",
  "instruction": "Peikonlehti tarvitsee paljon vettä ja valoa.",
  "imagename": "dasjdsalkdj832",
  "delivery": "Nouto, Postitus",
  "favourites": 0,
  "created": "2022-12-09T21:23:12.000Z",
  "edited": "2022-12-10T21:23:12.000Z",
  "seller": {
      "user_id": 2,
      "username": "username",
      "location": "Kerava",
      "email": "username@mail.fi"
  }
}
```

#### Add plant

```http
  POST /plant
```

```http
  Authorization: Bearer token
```

```http
  Content-type: multipart/form-data
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | **Required**, min length 3, max length 200 |
| `price` | `integer` | **Required** |
| `description` | `string` | **Required**, min length 30, max length 280 |
| `instruction` | `string` | **Required**, min length 30, max length 280 |
| `delivery` | `string` | **Required**, delivery's ID numbers. Example: "1,2" |
| `image` | `file` | **Required, jpg, png, gif** |

Response:

```json
{
  "message": "Plant added",
  "plant_id": 2
}
```

#### Update plant

```http
  PUT /plant/:id
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `int` | **Required**, plant_id of the plant to modify |
| `name` | `string` | **Required**, min length 3, max length 200 |
| `price` | `integer` | **Required** |
| `description` | `string` | **Required**, min length 30, max length 280 |
| `instruction` | `string` | **Required**, min length 30, max length 280 |
| `delivery` | `string` | **Required**, delivery's ID numbers. Example: "1,2" |

Response:

```json
{
  "message": "Plant updated"
}
```

#### Delete plant

```http
  DELETE /plant/:id
```

```http
  Authorization: Bearer token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `int` | **Required**, ID of the plant to delete |

Response:

```json
{
  "message": "Plant deleted"
}
```

#### Get plant's all comments

```http
  GET /plant/:id/comment
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `int` | **Required**, ID of the plant to get comments |

Response:

```json
[
  {
    "comment_id": 1,
    "user_id": 3,
    "username": "username",
    "created": "2022-12-10T17:33:19.000Z",
    "comment": "Hieno kasvi!"
  }
]
```

#### Add comment to plant

```http
  POST /plant/:id/comment
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `int` | **Required**, ID of the plant to post comment |
| `comment` | `string` | **Required**, min length 3, max length 280 |

Response:

```json
{
  "message": "Comment added"
}
```

#### Delete comment from plant

```http
  DELETE /plant/:id/comment/:comment_id
```

```http
  Authorization: Bearer token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `int` | **Required**, ID of the plant to delete comment from |
| `comment_id` | `int` | **Required**, ID of the comment to delete |

Response:

```json
{
  "message": "Comment deleted"
}
```

#### Add plant to favourites

```http
  POST /plant/:id/favourite
```

```http
  Authorization: Bearer token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `int` | **Required**, ID of the plant to add it to favourites |

Response:

```json
{
  "message": "Favourite added"
}
```

#### Delete plant from favourites

```http
  DELETE /plant/:id/favourite
```

```http
  Authorization: Bearer token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `int` | **Required**, ID of the plant to delete it from favourites |

Response:

```json
{
  "message": "Favourite deleted"
}
```

#### Get all deliveries

```http
  GET /delivery
```

Response:

```json
[
  {
    "delivery_id": 1,
    "name": "Nouto"
  }
]
```

#### Get all locations

```http
  GET /location
```

Response:

```json
[
  {
    "province": "Uusimaa",
    "province_id": 1,
    "municipalities": [
      {
        "municipality": "Askola",
        "municipality_id": 1
      },
      {
        "municipality": "Espoo",
        "municipality_id": 2
      },
      {
        "municipality": "Hanko",
        "municipality_id": 3
      },
      {
        "municipality": "Helsinki",
        "municipality_id": 4
      }
    ]
  }
]
```