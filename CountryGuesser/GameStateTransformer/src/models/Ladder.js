
/**
 * i.e. les données d'un joueur
 */
class LadderElement {

    name;
    score;
    color;
    constructor(name, score, color) {
        this.name = name;
        this.score = score;
        this.color = color;
    }
}

module.exports = { LadderElement }