'use strict';

let xpath = require('xpath'),
    dom = require('xmldom').DOMParser,
    Match = require('../domain/Match');

class MatchParser {

    parse(data) {
        let doc = new dom().parseFromString(data);
        let nodes = xpath.select('//Match', doc);

        let matches = [];

        nodes.forEach(item => {
            let match = new Match();
            match.id = item.attributes['0'].value;
            match.type = item.attributes['3'].value;
            match.typeName = item.attributes['4'].value;

            let teamHome = item.childNodes['1'];

            let teamAway = item.childNodes['2'];

            matches.push(match);
        });

        return matches;
    }
}

module.exports = MatchParser;