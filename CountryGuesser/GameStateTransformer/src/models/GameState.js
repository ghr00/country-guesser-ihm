
/**
 * Un état du jeu
 */
class GameState {
    constructor(countries, ladder) {
        this.countries = countries;
        this.ladder = ladder;
    }
}

module.exports = { GameState }