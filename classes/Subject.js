class Subject {
    name = ""
    static id_counter = 1
    id = -1
    constructor(name) {
        this.id = Subject.id_counter++
        this.name = name
    }
}
module.exports = Subject;