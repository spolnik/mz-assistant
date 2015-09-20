class TeamSearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teamId: 402457,
            fixtures: []
        };
    }

    _submitSearch(event) {
        event.preventDefault();
        var teamId = $('#inputTeamId').val();

        this.setState({teamId: teamId});
        this._reloadData();
    }

    componentDidMount() {
        this._reloadData();
    }

    _reloadData() {
        let teamMatchesUrl = `http://localhost:8080/fixtures/team/${this.state.teamId}`;
        console.log("Team Matches url: " + teamMatchesUrl);

        $.get(teamMatchesUrl, data => this.setState({fixtures: data.fixtures}))
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

    render() {
        var fixtrureNodes = this.state.fixtures.map(item => {
            return <a href="#" className="list-group-item row">
                <span className="col-sm-2">{item.date}</span>
                <span className="col-sm-2">{TeamSearchBox._getType(item.type)}</span>
                <span className="col-sm-4">{item.typeName || "-"}</span>
                <span className="col-sm-4">{item.teamName}</span>
            </a>;
        });

        return <div>
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="inputTeamId" className="col-sm-2 control-label">Team Id</label>

                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputTeamId" placeholder="MZ Team Id"
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
                            <h3 className="panel-title">Results for team id: {this.state.teamId}</h3>
                        </div>
                        <div className="panel-body">
                            {fixtrureNodes}
                        </div>
                    </div>
                </output>
            </form>
        </div>;
    }
}
