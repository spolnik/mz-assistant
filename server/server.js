'use strict';

var restify = require('restify'),
    needle = require('needle'),
    MatchParser = require('./components/MatchParser');

function respond(req, res, next) {

    let teamMatchesUrl = `http://www.managerzone.com/xml/team_matchlist.php?sport_id=1&team_id=${req.params.id}&match_status=1&limit=10`;
    console.log(teamMatchesUrl);

    needle.get(teamMatchesUrl, (err, resp) => {
        if (err) {
            console.log(err);
            next();
        }

        let matches = new MatchParser().parse(resp.body);
        let team = {id: req.params.id, matches: matches};
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

server.get('/team/:id', respond);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});