class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamId: -1
        };
    }

    componentDidMount() {
        if (this.state.teamId === -1) {
            return;
        }

        let teamMatchesUrl = `http://www.managerzone.com/xml/team_matchlist.php?sport_id=1&team_id=${this.state.teamId}&match_status=1&limit=10`;
        console.log("Team Matches url: " + teamMatchesUrl);

        $.get(teamMatchesUrl, data => {
            console.log(data);
        }).done(() => console.log( "second success" ))
            .fail(() => alert( "error" ))
            .always(() => console.log( "finished" ));
    }

    render() {
        return <div className="row">
            <h2>Results</h2>
            <div className="results">
                {this.state.teamId}
            </div>
        </div>;
    }
}