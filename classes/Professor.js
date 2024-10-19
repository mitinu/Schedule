
class Professor {
    name = ""
    days_parrys = [
        [true, true, true, true, true, true],
        [true, true, true, true, true, true],
        [true, true, true, true, true, true],
        [true, true, true, true, true, true],
        [true, true, true, true, true, true],
        [true, true, true, true, true, true]
    ]
    static id_counter = 1
    id = -1
    constructor(name) {
        this.id = Professor.id_counter++
        this.name = name
    }
    
}
module.exports = Professor;
