class Groups {
    name = ""
    static id_counter = 1
    id = -1
    constructor(name) {
        this.id = Groups.id_counter++
        this.name = name
    }
}
module.exports = Groups;