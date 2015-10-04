class TeamSearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teamId: 402457,
            opponentTeamId: 402457,
            fixtures: [],
            results: []
        };
    }

    _submitSearch(event) {
        event.preventDefault();

        this.setState({
            teamId: $('#inputTeamId').val(),
            opponentTeamId: $('#inputOpponentTeamId').val()
        });

        this._reloadFixtures();
        this._reloadResults();
    }

    componentDidMount() {
        this._reloadFixtures();
        this._reloadResults();
    }

    _reloadFixtures() {
        let teamId = $('#inputTeamId').val();

        let teamFixturesUrl = `http://localhost:8080/fixtures/team/${teamId}`;

        $.get(teamFixturesUrl, data => this.setState({fixtures: data.matches}))
            .done(() => console.log("done"))
            .fail((err) => console.error("error: " + err));
    }

    _reloadResults() {
        let opponentTeamId = $('#inputOpponentTeamId').val();

        let teamResultsUrl = `http://localhost:8080/results/team/${opponentTeamId}`;

        $.get(teamResultsUrl, data => this.setState({results: data.matches}))
            .done(() => console.log("done"))
            .fail((err) => console.error("error: " + err));
    }

    static _getType(type) {
        switch (type) {
            case "" :
                return "World League";
            case "cup_group":
            case "cup_playoff":
                return "Official Cup";
            case "private_cup_group":
            case "private_cup_playoff":
                return "Private Cup";
            case "friendly":
            case "friendly_series":
                return "Friendly";
            case "league":
                return "League";
            case "qualification":
                return "Qualification";
            case "special":
                return "Special";
        }
    }

    _changeOpponentType(event) {
        event.preventDefault();
        $('#inputOpponentTeamId').val(this.id);
        this.that._reloadResults();
    }

    render() {

        var fixtureNodes = this.state.fixtures.map(item => {
            return <div className="list-group-item row">
                <span className="col-sm-2">{item.date}</span>
                <span className="col-sm-2">{TeamSearchBox._getType(item.type)}</span>
                <span className="col-sm-3">{item.typeName || "-"}</span>
                <span className="col-sm-3">{item.opponentTeamName}</span>
                <button className="col-sm-2 btn btn-default" onClick={this._changeOpponentType.bind({id: item.opponentTeamId, that: this})}>
                    {item.opponentTeamId}
                </button>
            </div>;
        });

        var resultNodes = this.state.results.map(item => {
            return <a href={"http://managerzone.com/?p=match&sub=result&tid=" + item.opponentTeamId + "&mid=" + item.id} target="_blank" className="list-group-item row">
                <span className="col-sm-3">{item.homeTeamName}</span>
                <span className="col-sm-2">{item.homeTeamGoals + ':' + item.awayTeamGoals}</span>
                <span className="col-sm-3">{item.awayTeamName}</span>
                <span className="col-sm-1">{TeamSearchBox._getType(item.type)}</span>
                <span className="col-sm-3">{item.typeName || "-"}</span>
            </a>;
        });

        return <div>
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="inputTeamId" className="col-sm-2 control-label">Your Team Id</label>

                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputTeamId" placeholder="MZ Team Id (Your team)"
                               defaultValue="402457"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputTeamId" className="col-sm-2 control-label">Opponent Team Id</label>

                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputOpponentTeamId" placeholder="MZ Team Id (Opponent)"
                               defaultValue="402457"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default" onClick={this._submitSearch.bind(this)}>
                            Refresh
                        </button>
                    </div>
                </div>
                <output>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Fixtures for team id: {this.state.teamId}</h3>
                        </div>
                        <div className="panel-body">
                            {fixtureNodes}
                        </div>
                    </div>
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <h3 className="panel-title">Results for team id: {this.state.opponentTeamId}</h3>
                        </div>
                        <div className="panel-body">
                            {resultNodes}
                        </div>
                    </div>
                </output>
            </form>
        </div>;
    }
}
