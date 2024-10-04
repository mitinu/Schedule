class Groups {
    name = ""
    subject = []
    constructor(name, arrSubjectId) {
        this.name = name
        for (let i = 0; i < arrSubjectId.length; i++) {
            this.subject.push({id: arrSubjectId[i], count: 0})
        }
    }
}
module.exports = Groups;