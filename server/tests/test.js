'use strict';
let MatchParser = require('../components/MatchParser'),
    assert = require('assert');

let data = `<?xml version="1.0" encoding="utf-8"?>
<ManagerZone_MatchList>
    <Match id="809812100" date="2015-09-19 18:00" status="played" type="cup_group" typeName="Division Cup Season 55 - Poland Division 6" typeId="14751">
        <Team field="home" goals="2" teamId="423979" teamName="Arka Gdynia" countryShortname="pl"/>
        <Team field="away" goals="1" teamId="376708" teamName="LG Zambrow" countryShortname="pl"/>
    </Match><Match id="809340421" date="2015-09-19 16:00" status="played" type="friendly_series" typeName="[Pool] Senior - Daily #2334" typeId="569759">
    <Team field="home" goals="1" teamId="423979" teamName="Arka Gdynia" countryShortname="pl"/>
    <Team field="away" goals="1" teamId="469306" teamName="Me explico" countryShortname="ar"/>
</Match><Match id="809342678" date="2015-09-19 16:00" status="played" type="friendly_series" typeName="[Pool] Senior - Daily #2335" typeId="569761">
    <Team field="home" goals="1" teamId="423979" teamName="Arka Gdynia" countryShortname="pl"/>
    <Team field="away" goals="12" teamId="224324" teamName="Facopo" countryShortname="br"/>
</Match><Match id="809340416" date="2015-09-18 16:00" status="played" type="friendly_series" typeName="[Pool] Senior - Daily #2334" typeId="569759">
    <Team field="home" goals="2" teamId="992651" teamName="Cuchilla entre los Diente" countryShortname="ar"/>
    <Team field="away" goals="1" teamId="423979" teamName="Arka Gdynia" countryShortname="pl"/>
</Match><Match id="809342663" date="2015-09-18 16:00" status="played" type="friendly_series" typeName="[Pool] Senior - Daily #2335" typeId="569761">
    <Team field="home" goals="11" teamId="133457" teamName="Poli Timisoara" countryShortname="at"/>
    <Team field="away" goals="0" teamId="423979" teamName="Arka Gdynia" countryShortname="pl"/>
</Match><Match id="809340405" date="2015-09-17 16:00" status="played" type="friendly_series" typeName="[Pool] Senior - Daily #2334" typeId="569759">
    <Team field="home" goals="2" teamId="423979" teamName="Arka Gdynia" countryShortname="pl"/>
    <Team field="away" goals="4" teamId="895732" teamName="YILDIZ SPOR" countryShortname="tr"/>
</Match><Match id="809342656" date="2015-09-17 16:00" status="played" type="friendly_series" typeName="[Pool] Senior - Daily #2335" typeId="569761">
    <Team field="home" goals="0" teamId="423979" teamName="Arka Gdynia" countryShortname="pl"/>
    <Team field="away" goals="8" teamId="313761" teamName="Olivos City F.C." countryShortname="ar"/>
</Match><Match id="809342648" date="2015-09-16 16:00" status="played" type="friendly_series" typeName="[Pool] Senior - Daily #2335" typeId="569761">
    <Team field="home" goals="6" teamId="973333" teamName="Papato Tatengue" countryShortname="ar"/>
    <Team field="away" goals="0" teamId="423979" teamName="Arka Gdynia" countryShortname="pl"/>
</Match><Match id="809340401" date="2015-09-16 16:00" status="played" type="friendly_series" typeName="[Pool] Senior - Daily #2334" typeId="569759">
    <Team field="home" goals="6" teamId="975142" teamName="Belfegor FC" countryShortname="ar"/>
    <Team field="away" goals="0" teamId="423979" teamName="Arka Gdynia" countryShortname="pl"/>
</Match><Match id="798972533" date="2015-09-16 13:15" status="played" type="league" typeName="div6.41" typeId="18695">
    <Team field="home" goals="0" teamId="205610" teamName="FC BARCA" countryShortname="pl"/>
    <Team field="away" goals="11" teamId="423979" teamName="Arka Gdynia" countryShortname="pl"/>
</Match></ManagerZone_MatchList>`;

describe('MatchParser', () => {
    before(() => {
        this._result = new MatchParser().parse(data);
        this._match = this._result[0];
    });

    describe('Parse Result', () => {
        it('should return 10 when there is 10 matches in the input', () => {
            assert.equal(10, this._result.length);
        })
    });

    describe('result[0] (Match)', () => {
        it('should return 809812100 as match id', () => {
            assert.equal('809812100', this._match.id);
        });

        it('should return cup_group as match type', () => {
            assert.equal('cup_group', this._match.type);
        });

        it('should return Division Cup Season 55 - Poland Division 6 as match type name', () => {
            assert.equal('Division Cup Season 55 - Poland Division 6', this._match.typeName);
        });
    });
});
