let express = require('express'),
    router = express.Router()

let HEROES = [
    { id: 12, name: 'Dr. Nice' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr. IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' },
]

const nextId = () => {
    return HEROES[HEROES.length-1].id+1
}

router.route('/')
    .get((req, res, next) => {
        let query = req.query,
            query_exist = Object.keys(query).length != 0
        if (query_exist) {
            let name_filter = query.name.toLocaleLowerCase(),
                filtered_heroes = HEROES.filter(h => h.name.toLocaleLowerCase().includes(name_filter))
            console.log(filtered_heroes);
            res.send(filtered_heroes)
        }
        else {
            res.send(HEROES)
        }
    })

router.route('/hero/:id')
    .get((req, res, next) => {
        let id = +req.params['id']
        let hero = HEROES.find((h) => h.id === id)
        res.send(hero)
    })
    .put((req, res, next) => {
        let hero = req.body
        if (hero) {
            hero_index = HEROES.findIndex(h => h.id === hero.id)
            HEROES[hero_index] = hero
            res.status(200).send({ message: 'ok' })
        }
        else {
            res.status(400).send({ error: 'client error' })
        }
    })
    .post((req, res, next) => {
        let id = +req.params['id']
        let new_hero = req.body
        if (id < 0 && new_hero.name) {
            new_hero_object = { id: nextId(), name: new_hero.name } 
            HEROES.push(new_hero_object)
            res.send(new_hero_object)
        }
        else res.status(400).send({ error: 'client error' })
    })
    .delete((req, res, next) => {
        let id = +req.params['id']
        let hero_exists = HEROES.findIndex(h => h.id === id)
        if (hero_exists != -1) {
            HEROES.splice(hero_exists, 1)
            res.status(200).send()
        }
        else {
            res.status(400).send()
        }
    })

router.route('*').get((req, res, next) => {
    res.status(200).json({ message: "Response from /api/heroes"})
})


module.exports = router;
