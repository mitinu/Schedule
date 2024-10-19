class ListHours{
    static id_counter = 1
    id = -1
    idSubject = 0
    idGroup = 0
    countHours = 0
    currentHours = 0
    idProfessor = 0
    constructor(idProfessor, idSubject, idGroup, countHours){
        this.id = ListHours.id_counter++
        this.idProfessor = idProfessor
        this.idSubject = idSubject
        this.idGroup = idGroup
        this.countHours = parseInt(countHours) 
        this.currentHours = this.countHours 
    }
    addHours(hours){
        this.countHours += parseInt(hours) 
        this.currentHours = this.countHours 
    }
    
    
}
module.exports = ListHours;
