class Professor {
    name = ""
    subject = []
    days_parrys = [
        [true, true, true, true, true, true],
        [true, true, true, true, true, true],
        [true, true, true, true, true, true],
        [true, true, true, true, true, true],
        [true, true, true, true, true, true],
        [true, true, true, true, true, true]
    ]
    constructor(name, arrSubjectId) {
        this.name = name
        for (let i = 0; i < arrSubjectId.length; i++) {
            this.subject.push({id: arrSubjectId[i], count: 0})
        }
    }
}
module.exports = Professor;
