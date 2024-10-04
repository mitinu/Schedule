const fse = require('fs-extra')
const express = require('express');
const { type } = require('os');
const server = express() 
const http = require("http").createServer(server).listen(3000);

const Groups = require('./classes/Groups.js')
const Office = require('./classes/Office.js')
const Subject = require('./classes/Subject.js')
const Professor = require('./classes/Professor.js')

server.use(express.static(__dirname + "/public"))

server.get("/", function(req, res){ 
    res.sendFile(__dirname + "/public/index.html") 
})
server.get("/redirectionChekDate", function(req, res){ 
    res.sendFile(__dirname + "/public/redirectionChekDate.html") 
}) 

data = {
    arrCourseGroups: [
        [
            new Groups("ПД 241", [0]),
            new Groups("ПД 242", [0]),
            new Groups("ПД 243", [0]),
            new Groups("ПД 244", [0]),
            new Groups("ПД 245", [0]),
            new Groups("Ю 241", [0]),
            new Groups("Ю 241", [0]),
            new Groups("Р 241", [0]),
            new Groups("ИС 241", [0]),
            new Groups("ИС 242", [0]),
            new Groups("ВЕБ 241", [0]),
            new Groups("ВЕБ 242", [0])
        ], 
        [
            new Groups("ПД 231", [0]),
            new Groups("ПД 233", [0]),
            new Groups("ПД 234", [0]),
            new Groups("ПД 235 + ПД 246у", [0]),
            new Groups("ПД 236 + ПД 247у", [0]),
            new Groups("Ю 231", [0]),
            new Groups("Ю 232", [0]),
            new Groups("ПНК 232", [0]),
            new Groups("ИС 231 + ИС 243у", [0]),
            new Groups("ИБ 231 + ИБ 241у", [0]),
            new Groups("ВЕБ 231", [0]),
            new Groups("ВЕБ 232", [0])

        ], 
        [
            new Groups("ПД 221 + ПД 237у", [0]),
            new Groups("ПД 222 + ПД 238у", [0]),
            new Groups("ПД 223 + ПД 239у", [0]),
            new Groups("ПСО 221", [0]),
            new Groups("ПСО 223 + ПСО 234у", [0]),
            new Groups("Т 221", [0]),
            new Groups("ИС 221", [0]),
            new Groups("ИС 223 + ИС 233у", [0]),
            new Groups("ВЕБ 221 + ВЕБ 233у", [0])

        ], 
        [
            new Groups("ПД 211", [0]),
            new Groups("ПД 212 + ПД 224у", [0]),
            new Groups("ИС 211 + ИС 222у", [0]),
            new Groups("ВЕБ 211 + ВЕБ 222у", [0])
        ]
    ],
    arrOffice: [
        new Office(12),
        new Office(13),
        new Office(15),
        new Office(23),
    ],
    arrSubject: [
        new Subject("русский", 1),
        new Subject("математика", 2),
        new Subject("история", 3),
        new Subject("заДЕМОКРАТИЮ", 4),
    ],
    arrProfessor: [
        new Professor("Шабарчина.В.Ю.", [0]),
        new Professor("Бурков.А.С.", [0]),
        new Professor("Золотухина.Д.В.", [0]),
    ]
}
function dataSort(data){
    data.arrSubject.sort((a, b) => a.ID - b.ID);
    for (let i = 0; i < data.arrProfessor.length; i++) {
        data.arrProfessor[i].subject.sort((a, b) => a.ID - b.ID);
        
    }
    for (let i = 0; i < data.arrCourseGroups.length; i++) {
        for (let j = 0; j < data.arrCourseGroups[i].length; j++) {
            data.arrCourseGroups[i][j].subject.sort((a, b) => a.ID - b.ID);
            
        }
        
    }
}
dataSort(data)

server.get("/getData", function(req, res){ 
    res.send(data) 
}) 
server.get("/redirectionChekDate/getDate/:id", function(req, res){
    fse.readJSON("jsonDate/date"+req.params.id+".json")
    .then(function(data){
        res.send(data)
    })
    .catch(function(err){
        res.status(404).send({ text: 'Файл не найден', err: err })
    })
})

server.use(express.json());
server.post("/postData",function(req, res){
    fse.writeFileSync("jsonDate/date"+req.body.date+".json", JSON.stringify(req.body, null, 4))

})