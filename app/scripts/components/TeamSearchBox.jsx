class TeamSearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teamId: -1
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
        if (this.state.teamId === -1) {
            return;
        }

        let teamMatchesUrl = `http://localhost:8080/team/${this.state.teamId}`;
        console.log("Team Matches url: " + teamMatchesUrl);

        $.get(teamMatchesUrl, data => console.log(data))
            .done(() => console.log("second success"))
            .fail(() => alert("error"))
            .always(() => console.log("finished"));
    }

    render() {
        return <div>
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="inputTeamId" className="col-sm-2 control-label">Team Id</label>

                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputTeamId" placeholder="MZ Team Id"/>
                    </div>

                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default" onClick={this._submitSearch.bind(this)}>Find</button>
                    </div>
                </div>
                <output>
                    <div className="row">
                        <h2>Results</h2>
                        <div className="results">
                            {this.state.teamId}
                        </div>
                    </div>
                </output>
            </form>
        </div>;
    }
}
