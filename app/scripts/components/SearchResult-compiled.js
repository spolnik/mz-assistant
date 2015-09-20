"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchResult = (function (_React$Component) {
    _inherits(SearchResult, _React$Component);

    function SearchResult(props) {
        _classCallCheck(this, SearchResult);

        _get(Object.getPrototypeOf(SearchResult.prototype), "constructor", this).call(this, props);
        this.state = {
            teamId: -1
        };
    }

    _createClass(SearchResult, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.state.teamId === -1) {
                return;
            }

            var teamMatchesUrl = "http://www.managerzone.com/xml/team_matchlist.php?sport_id=1&team_id=" + this.state.teamId + "&match_status=1&limit=10";
            console.log("Team Matches url: " + teamMatchesUrl);

            $.get(teamMatchesUrl, function (data) {
                console.log(data);
            }).done(function () {
                return console.log("second success");
            }).fail(function () {
                return alert("error");
            }).always(function () {
                return console.log("finished");
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "h2",
                    null,
                    "Results"
                ),
                React.createElement(
                    "div",
                    { className: "results" },
                    this.state.teamId
                )
            );
        }
    }]);

    return SearchResult;
})(React.Component);

//# sourceMappingURL=SearchResult-compiled.js.map