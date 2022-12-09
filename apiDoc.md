# Pistokkaat RESP API

REST API for school course

## API Reference

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

#### Register

```http
  POST /auth/register
```

```http
  Content-type: application/json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `email` | **Required, email, max length 60** |
| `username` | `string` | **Required, min length 3, max length 20** |
| `municipality_id` | `iny` | **Required** |
| `password` | `string` | **Required, min length 8 characters, at least one capital letter** |

Response:

```json
{
  "message": "User added",
  "user_id": 3
}
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
    },
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
            "email": "username23@mail.fi"
        }
    },
]
```