const fse = require('fs-extra')
const express = require('express');
const { type } = require('os');
const server = express() 
const http = require("http").createServer(server).listen(3000);
const crypto = require('crypto');


function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    
    return result;
}
const randomURL = "/"+generateRandomString(32)

const { JSDOM } = require('jsdom');

const Groups = require('./classes/Groups.js')
const Office = require('./classes/Office.js')
const Subject = require('./classes/Subject.js')
const Professor = require('./classes/Professor.js')
const ListHours = require('./classes/ListHours.js');
const e = require('express');

server.use(express.static(__dirname + "/public"))

server.get(randomURL, function(req, res){ 
    res.sendFile(__dirname + "/public/making_schedule.html") 
})
server.get("/", function(req, res){ 
    res.sendFile(__dirname + "/public/index.html") 
})
data = {
    arrCourseGroups: [
        [     
        ], 
        [
        ], 
        [
        ], 
        [
        ]
    ],
    arrOffice: [
    ],
    arrSubject: [
    ],
    arrProfessor: [
    ],
    arrListHours: [
    ]
    
}
function addOffice(office, level, cauntr){
    for (let i = 1; i < cauntr; i++) {
        if (i<10) {
            data.arrOffice.push(new Office(""+office+level+0+i))
        }
        else {
            data.arrOffice.push(new Office(""+office+level+i))
        }
    }
}

addOffice(1,2,8)
addOffice(1,3,6)
addOffice(1,5,13)
addOffice(2,3,13)

server.get("/getData", function(req, res){ 
    res.send(data) 
}) 
server.get("/getDate/:id", function(req, res){
    fse.readJSON("jsonDate/date"+req.params.id+".json")
    .then(function(data){
        res.send(data)
    })
    .catch(function(err){
        res.status(404).send({ text: 'Файл не найден', err: err })
    })
})



server.use(express.json());
server.post("/exit",(req,res)=>{
    const hash = crypto.createHash('sha256');
    console.log(req.body.password)
    hash.update(req.body.password)
    const result = hash.digest('hex')
    console.log(result)
    if (result=="4fc2a253be5e1ea5271b59aa74e9a39b77b1baa3be874b2d92e1111605e3ad24") {
        res.send({"url": randomURL}) 
    }
    else{
        res.status(401).json({"url": '/'})
    }
})
server.post("/postData",function(req, res){
    fse.writeFileSync("jsonDate/date"+req.body.date+".json", JSON.stringify(req.body, null, 4))
})
server.post("/postBilling", function(req, res){
    const table = new JSDOM("<table>"+req.body.table+"</table>").window.document.querySelectorAll('table')[0]
    data.arrSubject.length = 0;
    data.arrProfessor.length = 0;
    data.arrListHours.length = 0;
    data.arrCourseGroups[0].length = 0;
    data.arrCourseGroups[1].length = 0;
    data.arrCourseGroups[2].length = 0;
    data.arrCourseGroups[3].length = 0;
    for (let i = 1; i < table.rows.length; i++) {
        addSubject(table.rows[i])
        addGrup(table.rows[i])
        addProfessor(table.rows[i])
        addListHours(table.rows[i])
    }
        res.send(data) 
})

server.get("/aaa", function(req, res){ 
    res.sendFile(__dirname + "/public/aaa.html") 
})
server.get("/aaa/aaa", function(req, res){ 
    fse.readFile(__dirname+"/getData/Список.htm", 'utf8').then(function(data){
        res.send(data)
    })
})



function addSubject(table_rows){
    let swit = true
    for (let j = 0; j < data.arrSubject.length; j++) {
        if (data.arrSubject[j].name==table_rows.cells[2].textContent) {
            swit = false
            break
        }
    }
    if (swit) {
        data.arrSubject.push(new Subject(table_rows.cells[2].textContent))
    }
}
function returnIdCours(str){
    const thisData = new Date()
    if (thisData.getMonth()<7) {
        switch(parseInt(str.split(" ")[1][1])){
            case thisData.getFullYear()-2024: return 3
            case thisData.getFullYear()-2023: return 2
            case thisData.getFullYear()-2022: return 1
            case thisData.getFullYear()-2021: return 0
        }
    }
    else{
        switch(parseInt(str.split(" ")[1][1])){
            case thisData.getFullYear()-2023: return 3
            case thisData.getFullYear()-2022: return 2
            case thisData.getFullYear()-2021: return 1
            case thisData.getFullYear()-2020: return 0
        }
    }
}
function addGrup(table_rows){
    let swit = true
    for (let j = 0; j < data.arrCourseGroups[returnIdCours(table_rows.cells[4].textContent)].length; j++) {
        if (data.arrCourseGroups[returnIdCours(table_rows.cells[4].textContent)][j].name==table_rows.cells[4].textContent) {
            swit = false
            break
        }
    }
    if (swit) {
        data.arrCourseGroups[returnIdCours(table_rows.cells[4].textContent)].push(new Groups(table_rows.cells[4].textContent))
    }
}
function addProfessor(table_rows){
    let swit = true
    for (let j = 0; j < data.arrProfessor.length; j++) {
        if (data.arrProfessor[j].name==table_rows.cells[1].textContent) {
            swit = false
            break
        }
    }
    if (swit) {
        data.arrProfessor.push(new Professor(table_rows.cells[1].textContent))
    }
    return swit
}
function addListHours(table_rows){
    const idProfessor = getId(data.arrProfessor, table_rows.cells[1].textContent)
    const idSubject = getId(data.arrSubject, table_rows.cells[2].textContent)
    const idGroup = getId(data.arrCourseGroups[returnIdCours(table_rows.cells[4].textContent)], table_rows.cells[4].textContent)
    const hours = table_rows.cells[3].textContent
    let swit = true
    for (let i = 0; i < data.arrListHours.length; i++) {
        if(data.arrListHours[i].idProfessor==idProfessor&&data.arrListHours[i].idSubject==idSubject&&data.arrListHours[i].idGroup==idGroup){
            data.arrListHours[i].addHours(hours)
            swit = false
            break
        }
    }
    if (swit) {
        data.arrListHours.push(new ListHours(idProfessor, idSubject, idGroup, hours))

    }
}
function getId(arr, name){
    for (let  i = 0; i < arr.length; i++) {
        if (arr[i].name == name) {
            return arr[i].id
        }                
    }
    return -1
}
