'use strict';

let xpath = require('xpath'),
    dom = require('xmldom').DOMParser;

class FixturesParser {

    parse(data, teamId, typeFilter) {

        function toJsonMatch(matchNode) {

            function getMatchId(matchNode) {
                return matchNode.attributes[0].value;
            }

            function getMatchDate(matchNode) {
                return matchNode.attributes[1].value;
            }

            function getMatchStatus(matchNode) {
                return matchNode.attributes[2].value;
            }

            function getMatchType(matchNode) {
                return matchNode.attributes[3].value;
            }

            function getMatchTypeName(matchNode) {
                return matchNode.attributes[4].value;
            }

            function getGoals(teamNode) {
                return teamNode.attributes[1].value
            }

            function getTeamId(teamNode) {
                return teamNode.attributes[2].value;
            }

            function getTeamName(teamNode) {
                return teamNode.attributes[3].value;
            }

            function setOpponentDetails(homeTeam, awayTeam, match) {

                let opponentTeamId = getTeamId(homeTeam);
                let opponentTeam = homeTeam;

                if (teamId === opponentTeamId) {
                    opponentTeamId = getTeamId(awayTeam);
                    opponentTeam = awayTeam;
                }

                match.opponentTeamId = opponentTeamId;
                match.opponentTeamName = getTeamName(opponentTeam);
            }

            let match = {
                id: getMatchId(matchNode),
                date: getMatchDate(matchNode),
                status: getMatchStatus(matchNode),
                type: getMatchType(matchNode),
                typeName: getMatchTypeName(matchNode)
            };

            let homeTeam = matchNode.childNodes['1'];
            match.homeTeamName = getTeamName(homeTeam);
            match.homeTeamId = getTeamId(homeTeam);
            match.homeTeamGoals = getGoals(homeTeam);

            let awayTeam = matchNode.childNodes['3'];
            match.awayTeamName = getTeamName(awayTeam);
            match.awayTeamId = getTeamId(awayTeam);
            match.awayTeamGoals = getGoals(awayTeam);

            setOpponentDetails(homeTeam, awayTeam, match);

            return match;
        }

        function matchNodes() {

            function parseFromString(data) {
                return new dom().parseFromString(data);
            }

            function filterMatchNodes(matchNodes, typeFilter) {

                function applyWorldLeagueMappingIfNeeded(typeFilter) {
                    return typeFilter === 'world_league' ? '' : typeFilter;
                }

                function getTypeFilter(matchNode) {
                    return matchNode.attributes['3'].value;
                }

                let filteredMatchNodes = matchNodes.filter(matchNode =>
                    getTypeFilter(matchNode) === applyWorldLeagueMappingIfNeeded(typeFilter)
                );

                return typeFilter ? filteredMatchNodes : matchNodes;
            }

            let matchNodes = xpath.select('//Match', parseFromString(data));
            matchNodes = filterMatchNodes(matchNodes, typeFilter);

            return matchNodes;
        }

        return matchNodes().map(toJsonMatch);
    }
}

module.exports = FixturesParser;