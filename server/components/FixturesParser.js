'use strict';

let xpath = require('xpath'),
    dom = require('xmldom').DOMParser;

class FixturesParser {

    static _getTeamId(teamNode) {
        return teamNode.attributes['2'].value;
    }

    parse(data, teamId, typeFilter) {
        let doc = new dom().parseFromString(data);
        let nodes = xpath.select('//Match', doc);

        let matches = [];

        if (typeFilter) {
            if (typeFilter === 'world_league') {
                typeFilter = '';
            }
            nodes = nodes.filter(item => item.attributes['3'].value === typeFilter);
        }

        nodes.forEach(item => {
            let match = {};
            match.id = item.attributes['0'].value;
            match.date = item.attributes['1'].value;
            match.type = item.attributes['3'].value;
            match.typeName = item.attributes['4'].value;

            let opponentTeam = item.childNodes['1'];
            let opponentTeamId = FixturesParser._getTeamId(opponentTeam);

            if (teamId === opponentTeamId) {
                opponentTeam = item.childNodes['3'];
                opponentTeamId = FixturesParser._getTeamId(opponentTeam);
            }

            match.teamId = opponentTeamId;
            match.teamName = opponentTeam.attributes['3'].value;

            matches.push(match);
        });

        return matches;
    }
}

module.exports = FixturesParser;