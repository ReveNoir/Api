# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```



# TODO
```markdown
# Informations Projet

1. [github](https://github.com/ReveNoir)
   [website](https://github.com/ReveNoir/Website)
   [api](https://github.com/ReveNoir/Api)

2. [nodejs](https://nodejs.org/en/)

3. [adonisjs](https://adonisjs.com/)
   [persona](https://github.com/adonisjs/adonis-persona)

4. Membres
   > [Azvalk](https://github.com/Azvalk)
   > [Hahdrim](https://github.com/Hahdrim)
   > [Sebastien-Ahkrin](https://github.com/Sebastien-Ahkrin)

5. Morceau de code à garder.
   > https://codepen.io/DraftMan/pen/VGegWz

6. Site de référence
   > https://html.nkdev.info/godlike/

Breakpoint principale de l'api:
> http://127.0.0.1:3334/api/blackdream/v1


# Routes
Informations [-, x, o]
> [-]: A modifier.
> [x]: Fini.
> [o]: Pas encore fait.

# Groupe : "/auth/"
- [x] verify/:token   | [GET]
- [x] register        | [POST]
- [x] login           | [POST]
- [x] refresh         | [POST]
- [x] readRules       | [POST]
- [x] updateMinecraft | [POST]

# Groupe: "/profil/"
- [x] get/:uuid       | [GET]
- [x] upload/:type    | [POST] / ['auth']

# Groupe: "/application/"
- [x] publish         | [POST] / ['auth']
- [x] get/:uuid       | [GET]
- [x] update          | [POST] / ['auth']
```
