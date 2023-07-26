# ITB_2

### My interview task details:

#### All the technologies are being used only to develop the backend.

1. Typescript
2. Express.js
3. MongooseODM
4. Password hashing and encryption (bcrypt)
5. JWT and token based authentication
6. zod validation
7. Global error handling
8. Modular pattern
9. Eslint and prettier setup

   - Clean code and follow good coding practices.
   - Deploy the backend project in the vercel.
   - Use yarn package manager

#### Backend deploy link:

Vercel deploy link: [Backend project link](https://itb-nine.vercel.app/)
Github repo link: [Source code](https://github.com/dev-rakibul1/ITB_2)

### API

// Create user
https://itb-nine.vercel.app/api/v1/user/create-user [POST]

```Json
{
    "name":"Abdur Rahim",
    "email": "abdur@rahim.com",
    "password": "12345678"
}
```

<!-- User single routes -->

https://itb-nine.vercel.app/api/v1/user/64c11bc8ef8c5754331dd2a6 [DELETE]
https://itb-nine.vercel.app/api/v1/user/64c11bc8ef8c5754331dd2a6 [PATCH]
https://itb-nine.vercel.app/api/v1/user/64c11bc8ef8c5754331dd2a6 [GET]
https://itb-nine.vercel.app/api/v1/user/ [GET]

// User login
https://itb-nine.vercel.app/api/v1/auth/login [POST]

```Json
{
    "email": "abdur@rahim.com",
    "password": "12345678"
}
```

// Create input values and search values
https://itb-nine.vercel.app/api/v1/search/create-search [POST]

```Json
{
    "payload": [
        {
            "input_values": [2, 4, 7]
        }
    ],
    "search_value": 4
}
```

https://itb-nine.vercel.app/api/v1/search/ [GET]

#### All the technologies are being used only to develop the front-end.

1. React.js
2. Tailwind css
3. Context API
4. Use react router dom

   - Creative design
   - Deploy the front-end project in the netlify.

Netlify deploy link: [Backend project link](https://64c1281f433fff07dc92074a--thunderous-madeleine-6613c2.netlify.app/)
Github repo link: [Source code](https://github.com/dev-rakibul1/ITB-Front-End)
