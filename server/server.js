'use strict';

var restify = require('restify'),
    needle = require('needle'),
    MatchListParser = require('./components/MatchListParser');

function respondWithFixtures(req, res, next) {
    respond('2', req, res, next);
}

function respondWithResults(req, res, next) {
    respond('1', req, res, next);
}

function respond(status, req, res, next) {
    let teamMatchesUrl =
        `http://www.managerzone.com/xml/team_matchlist.php?sport_id=1&team_id=${req.params.id}&match_status=${status}&limit=500`;

    needle.get(teamMatchesUrl, (err, resp) => {
        if (err) {
            console.log(err);
            next();
        }

        let matches = new MatchListParser().parse(resp.body, req.params.id, req.params.type);
        let team = {id: req.params.id, matches: matches};
        res.send(team);
        next();
    });
}

let server = restify.createServer({
    name: 'MZ Assistant Server'
});

server.use(
    (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        return next();
    }
);

server.get('/fixtures/team/:id', respondWithFixtures);
server.get('/fixtures/team/:id/type/:type', respondWithFixtures);

server.get('/results/team/:id', respondWithResults);
server.get('/results/team/:id/type/:type');

server.get('/matches/types', (req, res, next) => {
    var types = ['world_league', 'cup_group', 'cup_playoff', 'private_cup_group',
        'private_cup_playoff', 'special', 'friendly', 'league', 'friendly_series',
        'qualification'];

    res.send(types);
    next();
});

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});