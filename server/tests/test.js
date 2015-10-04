'use strict';
let FixturesParser = require('../components/MatchListParser'),
    assert = require('assert');

let data = `<?xml version="1.0" encoding="utf-8"?>
<ManagerZone_MatchList>
<Match id="799026525" date="2015-09-20 15:15" status="scheduled" type="league" typeName="div6.450" typeId="19104">
 <Team field="home" goals="0" teamId="402457" teamName="FC Tyniec" countryShortname="pl"/>
 <Team field="away" goals="0" teamId="201674" teamName="Kluski Team" countryShortname="pl"/>
</Match><Match id="809994669" date="2015-09-21 11:00" status="scheduled" type="" typeName="div6.73" typeId="437">
 <Team field="home" goals="0" teamId="579759" teamName="≮自由Ⅴ梦想≯Tuha Oilfield™ F.C" countryShortname="cn"/>
 <Team field="away" goals="0" teamId="402457" teamName="FC Tyniec" countryShortname="pl"/>
</Match><Match id="809812102" date="2015-09-22 18:00" status="scheduled" type="cup_group" typeName="Division Cup Season 55 - Poland Division 6" typeId="14751">
 <Team field="home" goals="0" teamId="423979" teamName="Arka Gdynia" countryShortname="pl"/>
 <Team field="away" goals="0" teamId="402457" teamName="FC Tyniec" countryShortname="pl"/>
</Match><Match id="809994674" date="2015-09-22 18:15" status="scheduled" type="" typeName="div6.73" typeId="437">
 <Team field="home" goals="0" teamId="402457" teamName="FC Tyniec" countryShortname="pl"/>
 <Team field="away" goals="0" teamId="311238" teamName="R.C. Deportivo" countryShortname="ar"/>
</Match><Match id="809994744" date="2015-10-03 15:15" status="played" type="" typeName="div6.73" typeId="437">
 <Team field="home" goals="3" teamId="248901" teamName="NEW YOUNG GIANTS" countryShortname="br"/>
 <Team field="away" goals="5" teamId="402457" teamName="FC Tyniec" countryShortname="pl"/>
</Match></ManagerZone_MatchList>`;

describe('FixturesParser', () => {
    before(() => {
        this._data = new FixturesParser().parse(data, "402457");
        this._fixture = this._data[0];
        this._result = this._data[4];
    });

    describe('result.length', () => {
        it('should return 5 when there is 4 matches in the input data', () => {
            assert.equal(5, this._data.length);
        });
    });

    describe('result[0] (Fixture)', () => {
        it('should return 799026525 as match id', () =>
            assert.equal('799026525', this._fixture.id)
        );

        it('should return league as match type', () =>
            assert.equal('league', this._fixture.type)
        );

        it('should return div6.450 as match type name', () =>
            assert.equal('div6.450', this._fixture.typeName)
        );

        it('should return 201674 as opponent team id', () =>
            assert.equal(201674, this._fixture.opponentTeamId)
        );

        it('should return Kluski Team as opponent team name', () =>
            assert.equal('Kluski Team', this._fixture.opponentTeamName)
        );

        it('should return 2015-09-20 15:15 as the match date', () =>
            assert.equal('2015-09-20 15:15', this._fixture.date)
        );

        it('should return scheduled as the match status', () =>
            assert.equal(this._fixture.status, 'scheduled')
        );
    });

    describe('result[4] (Result)', () => {
        it('should return 3 as home team goals', () =>
            assert.equal(this._result.homeTeamGoals, '3')
        );

        it('should return 5 as away team goals', () =>
            assert.equal(this._result.awayTeamGoals, '5')
        );

        it('should return played as the match status', () =>
            assert.equal(this._result.status, 'played')
        );
    });
});
