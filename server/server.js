'use strict';

var restify = require('restify'),
    needle = require('needle'),
    FixturesParser = require('./components/FixturesParser');

function respond(req, res, next) {

    let status = req.params.status || 2;

    let teamMatchesUrl =
        `http://www.managerzone.com/xml/team_matchlist.php?sport_id=1&team_id=${req.params.id}&match_status=${status}&limit=500`;

    needle.get(teamMatchesUrl, (err, resp) => {
        if (err) {
            console.log(err);
            next();
        }

        let fixtures = new FixturesParser().parse(resp.body, req.params.id, req.params.type);
        let team = {id: req.params.id, fixtures: fixtures};
        res.send(team);
        next();
    });
}

var server = restify.createServer({
    name: 'MZ Assistant Server'
});

server.use(
    (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        return next();
    }
);

server.get('/fixtures/team/:id', respond);
server.get('/fixtures/team/:id/type/:type', respond);
server.get('/fixtures/team/:id/status/:status', respond);
server.get('/fixtures/types', (req, res, next) => {
    var types = ['world_league', 'cup_group', 'cup_playoff', 'private_cup_group',
        'private_cup_playoff', 'special', 'friendly', 'league', 'friendly_series',
        'qualification'];

    res.send(types);
    next();
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});