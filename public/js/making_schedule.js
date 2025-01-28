document.getElementById("sorting_ready").addEventListener('click', function() {
    for (let ind = 1; ind < 7; ind++) {
        for (let j = 1; j < 7; j++) {
            document.getElementById("datalist_offices_day"+ind+"_couple"+j).innerHTML = ""      
            document.getElementById("datalist_professors_day"+ind+"_couple"+j).innerHTML = ""            
        }
    }
    addOffice()
    addProfessor()
});
document.getElementById("remove_config").addEventListener('click', function() {
    if (confirm("Вы уверены, что хотите продолжить?")) {
        remove_config_items()
    } 
    else {
        alert("Действие отменено.");
    }
});
document.getElementById("remove_data").addEventListener('click', function() {
    if (confirm("Вы уверены, что хотите продолжить?")) {
        remove_data_items()
        addGrup()
    } 
    else {
        alert("Действие отменено.");
    }
});
document.getElementById("save_config").addEventListener('click', function() {
    localStorage.setItem("saveConfig", JSON.stringify(saveConfig))
    if (date != null) {
        localStorage.setItem("date", JSON.stringify(date))
    }
});
document.getElementById("uploading_data").addEventListener('click', function() {
    myAlert2Button("выберети способ загрузки тарификации", "с сервера", "с файла(данные буду загружены на сервер)", uploading_data, loding_data)
    
    
});
function myAlert2Button(h, val1, val2, func1, func2){

    
    const divMyAlertBlackout = document.createElement("div");
    divMyAlertBlackout.id = "divMyAlertBlackout"


    const divMyAlertContent = document.createElement("div");
    divMyAlertContent.id = "divMyAlertContent"
  


    const spanH = document.createElement("span");
    spanH.innerHTML = h
    spanH.style.color = "white"

    const inputButton1 = document.createElement("input");
    inputButton1.type = "button"; 
    const inputButton2 = inputButton1.cloneNode(); 
    const inputButtonClose = inputButton1.cloneNode(); 

    inputButton1.value = val1; 
    inputButton2.value = val2; 
    inputButtonClose.value = "X"; 
    inputButtonClose.className = "Close"
  
    inputButton1.onclick = function() {
        divMyAlertBlackout.remove()
        func1()
    }
    inputButton2.onclick = function() {
        divMyAlertBlackout.remove()
        func2()
    }
    inputButtonClose.onclick = function() {
        divMyAlertBlackout.remove()
        
    }
    divMyAlertContent.appendChild(spanH)
    divMyAlertContent.appendChild(inputButton1)
    divMyAlertContent.appendChild(inputButton2)
    divMyAlertContent.appendChild(inputButtonClose)
    divMyAlertBlackout.appendChild(divMyAlertContent)
    document.body.appendChild(divMyAlertBlackout)

}
let basicData = null
let saveConfig = null

function subject_sort(thisText){
    let swith = true
    const arrSubject = basicData.arrSubject
    document.getElementById("datalist_professors_"+thisText.list.id.split("_").splice(2, 3).join('_')).innerHTML = ""
    for (let i = 0; i < arrSubject.length; i++) {
        if (arrSubject[i].name == thisText.value) {
            const arrListHours = basicData.arrListHours
            const arrName = []
            for (let j = 0; j < arrListHours.length; j++) {
                if (arrListHours[j].idSubject==arrSubject[i].id) {
                    const arrProfessor = basicData.arrProfessor
                    for (let ind = 0; ind < arrProfessor.length; ind++) {
                        if (arrProfessor[ind].id==arrListHours[j].idProfessor) {
                            if (arrName.length==0) {
                                arrName.push(arrProfessor[ind].name)
                                const newOption = document.createElement('option');
                                newOption.value = arrProfessor[ind].name;
                                document.getElementById("datalist_professors_"+thisText.list.id.split("_").splice(2, 3).join('_')).appendChild(newOption)
                            }
                            else{
                                let swith2 = true
                                for (let index = 0; index < arrName.length; index++) {
                                    if (arrName[index]==arrProfessor[ind].name) {
                                        swith2 = false
                                    }
                                }
                                if (swith2) {
                                    arrName.push(arrProfessor[ind].name)
                                    const newOption = document.createElement('option');
                                    newOption.value = arrProfessor[ind].name;
                                    document.getElementById("datalist_professors_"+thisText.list.id.split("_").splice(2, 3).join('_')).appendChild(newOption)
                                }
                            }
                            break
                        }
                    }
                } 
            }
            swith = false
            break
        }
    }
    
    if (swith) {
        for (let i_Professor = 0; i_Professor < saveConfig.finallArrProfessor.length; i_Professor++) {
            const newOption = document.createElement('option');
            newOption.value = saveConfig.finallArrProfessor[i_Professor].name;
            document.getElementById("datalist_professors_"+thisText.list.id.split("_").splice(2, 3).join('_')).appendChild(newOption)

        }
    }
    
}

function professors_sort(thisText){
    let swith = true
    const arrProfessor = saveConfig.finallArrProfessor
    document.getElementById("datalist_subjects_"+thisText.list.id.split("_").splice(2, 3).join('_')).innerHTML = ""
    for (let i = 0; i < arrProfessor.length; i++) {
        if (arrProfessor[i].name == thisText.value) {
            const arrListHours = basicData.arrListHours
            const arrName = []
            for (let j = 0; j < arrListHours.length; j++) {
                if (arrListHours[j].idProfessor==arrProfessor[i].id) {
                    const arrSubject1 = basicData.arrSubject
                    for (let ind = 0; ind < arrSubject1.length; ind++) {
                        if (arrSubject1[ind].id==arrListHours[j].idSubject) {
                            if (arrName.length==0) {
                                arrName.push(arrSubject1[ind].name)
                                const newOption = document.createElement('option');
                                newOption.value = arrSubject1[ind].name;
                                document.getElementById("datalist_subjects_"+thisText.list.id.split("_").splice(2, 3).join('_')).appendChild(newOption)
                            }
                            else{
                                let swith2 = true
                                for (let index = 0; index < arrName.length; index++) {
                                    if (arrName[index]==arrSubject1[ind].name) {
                                        swith2 = false
                                    }
                                }
                                if (swith2) {
                                    arrName.push(arrSubject1[ind].name)
                                    const newOption = document.createElement('option');
                                    newOption.value = arrSubject1[ind].name;
                                    document.getElementById("datalist_subjects_"+thisText.list.id.split("_").splice(2, 3).join('_')).appendChild(newOption)
                                }
                            }
                            break
                        }
                    }
                } 
            }
            swith = false
            break
        }
    }
    
    if (swith) {
        for (let i_Subject = 0; i_Subject < basicData.arrSubject.length; i_Subject++) {
            const newOption = document.createElement('option');
            newOption.value = basicData.arrSubject[i_Subject].name;
            document.getElementById("datalist_subjects_"+thisText.list.id.split("_").splice(2, 3).join('_')).appendChild(newOption)

        }
    }
    
}



async function getDate(){
    remove_data_html()


    const urlGetDate = new URL(location.origin + "/getDate/"+document.getElementById("date").value)
    try {
        await fetch(urlGetDate.href).then(function(res){return res.json()})
        .then(function(data){
            for (let i_group = 0; i_group < data.arrCourseGroups.length; i_group++) {
                for (let i = 0; i < 6; i++) {
                    document.getElementsByClassName("content_grups_course"+(i_group+1))[i].innerHTML = ""
                    htmlCode = `                
                        <table>
                            <tr>
                                <td colspan="2" class="name_groups_course${(i_group+1)}_day${i}"></td>
                            </tr>
                            <tr>
                                <td><input list="subjects_day${(i+1)}_couple1" class="subjects subjects_day${(i+1)}_couple1" oninput="checkRepetitions(this)"></td>
                                <td rowspan="2"><input list="offices_day${(i+1)}_couple1" class="offices offices_day${(i+1)}_couple1" oninput="checkRepetitions(this)"></td>
                            </tr>
                            <tr>
                                <td><input list="professors_day${(i+1)}_couple1" class="professors professors_day${(i+1)}_couple1" oninput="checkRepetitions(this)"></td>
                            </tr>
                            <tr>
                                <td><input list="subjects_day${(i+1)}_couple2" class="subjects subjects_day${(i+1)}_couple2" oninput="checkRepetitions(this)"></td>
                                <td rowspan="2"><input list="offices_day${(i+1)}_couple2" class="offices offices_day${(i+1)}_couple2" oninput="checkRepetitions(this)"></td>
                            </tr>
                            <tr>
                                <td><input list="professors_day${(i+1)}_couple2" class="professors professors_day${(i+1)}_couple2" oninput="checkRepetitions(this)"></td>
                            </tr>
                            <tr>
                                <td><input list="subjects_day${(i+1)}_couple3" class="subjects subjects_day${(i+1)}_couple3" oninput="checkRepetitions(this)"></td>
                                <td rowspan="2"><input list="offices_day${(i+1)}_couple3" class="offices offices_day${(i+1)}_couple3" oninput="checkRepetitions(this)"></td>
                            </tr>
                            <tr>
                                <td><input list="professors_day${(i+1)}_couple3" class="professors professors_day${(i+1)}_couple3" oninput="checkRepetitions(this)"></td>
                            </tr>
                            <tr>
                                <td><input list="subjects_day${(i+1)}_couple4" class="subjects subjects_day${(i+1)}_couple4" oninput="checkRepetitions(this)"></td>
                                <td rowspan="2"><input list="offices_day${(i+1)}_couple4" class="offices offices_day${(i+1)}_couple4" oninput="checkRepetitions(this)"></td>
                            </tr>
                            <tr>
                                <td><input list="professors_day${(i+1)}_couple4" class="professors professors_day${(i+1)}_couple4" oninput="checkRepetitions(this)"></td>
                            </tr>
                            <tr>
                                <td><input list="subjects_day${(i+1)}_couple5" class="subjects subjects_day${(i+1)}_couple5" oninput="checkRepetitions(this)"></td>
                                <td rowspan="2"><input list="offices_day${(i+1)}_couple5" class="offices offices_day${(i+1)}_couple5" oninput="checkRepetitions(this)"></td>
                            </tr>
                            <tr>
                                <td><input list="professors_day${(i+1)}_couple5" class="professors professors_day${(i+1)}_couple5" oninput="checkRepetitions(this)"></td>
                            </tr>
                            <tr>
                                <td><input list="subjects_day${(i+1)}_couple6" class="subjects subjects_day${(i+1)}_couple6" oninput="checkRepetitions(this)"></td>
                                <td rowspan="2"><input list="offices_day${(i+1)}_couple6" class="offices offices_day${(i+1)}_couple6" oninput="checkRepetitions(this)"></td>
                            </tr>
                            <tr>
                                <td><input list="professors_day${(i+1)}_couple6" class="professors professors_day${(i+1)}_couple6" oninput="checkRepetitions(this)"></td>
                            </tr>
                        </table>
                    `
                    for (let j = 0; j < data.arrCourseGroups[i_group].length; j++) {
                        document.getElementsByClassName("content_grups_course"+(i_group+1))[i].innerHTML += htmlCode
                        document.getElementsByClassName("name_groups_course"+(i_group+1)+"_day"+i)[j].innerHTML = data.arrCourseGroups[i_group][j].name
                    } 
                }
            }
            for (let i = 0; i < data.data.length; i++) {
                document.getElementsByClassName("professors")[i].value = data.data[i].professors
                document.getElementsByClassName("subjects")[i].value = data.data[i].subjects
                document.getElementsByClassName("offices")[i].value = data.data[i].offices
            }
        })
        document.getElementById("complete_data").disabled = true   
        document.getElementById("save_config").disabled = true   
        document.getElementById("save_data").disabled = true      
    } catch (e) {
        updating_page()
    }

     
}

function updating_page(){
    remove_data_html()
    addGrup()
    document.getElementById("complete_data").disabled = false   
    document.getElementById("save_config").disabled = false   
    document.getElementById("save_data").disabled = false   
}

startIndex()

function startIndex() {
    basicData = JSON.parse(localStorage.getItem("basicData"))
    saveDataTable = JSON.parse(localStorage.getItem("saveDataTable"))
    if (basicData != null) {
        saveConfig = JSON.parse(localStorage.getItem("saveConfig"))
        if (basicData.arrCourseGroups != null) {
            addGrup()
            addOfficeSort()
            addSubject()
            addProfessorSort()
        }
    }
    date =  JSON.parse(localStorage.getItem("date"))
    if (date != null) {
        resetDate(date)
    }
}

function addGrup() {
    console.log(2)
    for (let index = 0; index < basicData.arrCourseGroups.length; index++) {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < basicData.arrCourseGroups[index].length; j++) {
                const elementTable = document.createElement("table")
                    const elementTrNameGroups = document.createElement("tr")
                        const elementTdNameGroups = document.createElement("td")
                        elementTdNameGroups.colSpan = 2
                        elementTdNameGroups.className = `name_groups_course${(index+1)}_day${i}`
                        elementTdNameGroups.innerHTML = basicData.arrCourseGroups[index][j].name
                    elementTrNameGroups.appendChild(elementTdNameGroups)
                elementTable.appendChild(elementTrNameGroups)
                for (let ind = 0; ind < 6; ind++) {
                    const elementTr1 = document.createElement("tr")
                        const elementTd11 = document.createElement("td")
                            const elementInput11 = document.createElement("input")
                            elementInput11.setAttribute("list", `datalist_subjects_day${(i+1)}_couple${ind+1}_groupID${basicData.arrCourseGroups[index][j].id}`)
                            elementInput11.className = `subjects subjects_day${i + 1}_couple${ind + 1}`
                            elementInput11.onblur = () => {
                                subject_sort(elementInput11)
                            }
                        elementTd11.appendChild(elementInput11)
                        const elementTd12 = document.createElement("td")
                        elementTd12.rowSpan = 2
                            const elementInput12 = document.createElement("input")
                            elementInput12.setAttribute("list", `datalist_offices_day${(i+1)}_couple${ind+1}_groupID${basicData.arrCourseGroups[index][j].id}`)
                            elementInput12.className = `offices offices_day${(i+1)}_couple${ind+1}`
                            elementInput12.oninput = () => {
                                checkRepetitions(elementInput12)
                            }
                        elementTd12.appendChild(elementInput12)
                    elementTr1.appendChild(elementTd11)
                    elementTr1.appendChild(elementTd12)
                    const elementTr2 = document.createElement("tr")
                        const elementTd21 = document.createElement("td")
                            const elementInput21 = document.createElement("input")
                            elementInput21.setAttribute("list", `datalist_professors_day${(i+1)}_couple${ind+1}_groupID${basicData.arrCourseGroups[index][j].id}`)
                            elementInput21.className = `professors professors_day${(i+1)}_couple${ind+1}`
                            elementInput21.onblur = () => {
                                professors_sort(elementInput21)
                            }
                            elementInput21.oninput = () => {
                                checkRepetitions(elementInput21)
                            }
                        elementTd21.appendChild(elementInput21)
                    elementTr2.appendChild(elementTd21)
                    


                    elementTable.appendChild(elementTr1)
                    elementTable.appendChild(elementTr2)
                   

                }
               
                document.getElementsByClassName("content_grups_course"+(index+1))[i].appendChild(elementTable)
            } 
        }
    }
    if (saveDataTable != null) {
        for (let i = 0; i < document.getElementsByClassName("subjects").length; i++) {
            document.getElementsByClassName("subjects")[i].value = saveDataTable.saveDataSubjects[i]
        }

        for (let i = 0; i < document.getElementsByClassName("offices").length; i++) {
            document.getElementsByClassName("offices")[i].value = saveDataTable.saveDataOffices[i]
        }

        for (let i = 0; i < document.getElementsByClassName("professors").length; i++) {
            document.getElementsByClassName("professors")[i].value = saveDataTable.saveDataProfessors[i]
        }
    }
}

function addOfficeSort(){
    htmlCode = `
        <div class="carts_office_sort" ondblclick="office_day_swit(this)">
            <div class='roll_office'>
                <span class="addres_office"></span>
                <input type="button" value="+" class="office_swit" onclick="office_day_swit(this)">
            </div>
            <div class="cart_office_days_sort">
                <div class="day_office1"></div>
                <div class="day_office2"></div>
                <div class="day_office3"></div>
                <div class="day_office4"></div>
                <div class="day_office5"></div>
                <div class="day_office6"></div>
            </div> 
        </div>
    `
    for (let i = 0; i < basicData.arrOffice.length; i++) {
        document.getElementsByClassName("office_sort")[0].innerHTML += htmlCode
        document.getElementsByClassName("addres_office")[i].innerHTML = basicData.arrOffice[i].id
        for (let ind = 0; ind < saveConfig.finallArrOffice[i].days_parrys.length; ind++) {
            let day = ""
            switch(ind){
                case 0:
                    day = "пн"
                    break
                case 1:
                    day = "вт"
                    break
                case 2:
                    day = "ср"
                    break
                case 3:
                    day = "чт"
                    break
                case 4:
                    day = "пт"
                    break
                case 5:
                    day = "сб"
                    break
            }
            htmlCode2 = `
                <span>${day}</span>
                <div class="offical_stule">
                    <span>пара 1</span>
                    <input type="button" value="-" class="swit_office_day_${ind}_parry_${i}" onclick="office_day_parry_swit(this)">
                </div>
                <div class="offical_stule">
                    <span>пара 2</span>
                    <input type="button" value="-" class="swit_office_day_${ind}_parry_${i}" onclick="office_day_parry_swit(this)">
                </div>
                <div class="offical_stule">
                    <span>пара 3</span>
                    <input type="button" value="-" class="swit_office_day_${ind}_parry_${i}" onclick="office_day_parry_swit(this)">
                </div>
                <div class="offical_stule">
                    <span>пара 4</span>
                    <input type="button" value="-" class="swit_office_day_${ind}_parry_${i}" onclick="office_day_parry_swit(this)">
                </div>
                <div class="offical_stule">
                    <span>пара 5</span>
                    <input type="button" value="-" class="swit_office_day_${ind}_parry_${i}" onclick="office_day_parry_swit(this)">
                </div>
                <div class="offical_stule">
                    <span>пара 6</span>
                    <input type="button" value="-" class="swit_office_day_${ind}_parry_${i}" onclick="office_day_parry_swit(this)">
                </div>
            `
            document.getElementsByClassName("day_office"+(ind+1))[i].innerHTML += htmlCode2
            for (let j = 0; j < saveConfig.finallArrOffice[i].days_parrys[ind].length; j++) {
                if (!saveConfig.finallArrOffice[i].days_parrys[ind][j]) {
                    document.getElementsByClassName("swit_office_day_"+ind+"_parry_"+i)[j].value = "+"
                }
            }
        }
    }
    addOffice()
    
}    
function addOffice() {
    for (let i = 1; i < 7; i++) {
        for (let j = 1; j < 7; j++) {
            for (let ind = 0; ind < basicData.arrCourseGroups.length; ind++) {
                for (let index = 0; index < basicData.arrCourseGroups[ind].length; index++) {
                    const datalistElement = document.createElement('datalist');
                    datalistElement.id = `datalist_offices_day${i}_couple${j}_groupID${basicData.arrCourseGroups[ind][index].id}`
                    document.getElementById(`datalist_offices_day${i}_couple${j}`).appendChild(datalistElement)
                }                
            }
            
        }        
    }

    for (let i_officel = 0; i_officel < saveConfig.finallArrOffice.length; i_officel++) {
        for (let i_day = 0; i_day < saveConfig.finallArrOffice[i_officel].days_parrys.length; i_day++) {
            for (let i_couple = 0; i_couple < saveConfig.finallArrOffice[i_officel].days_parrys[i_day].length; i_couple++) {
                if(saveConfig.finallArrOffice[i_officel].days_parrys[i_day][i_couple]){
                    for (let i_cours = 0; i_cours < basicData.arrCourseGroups.length; i_cours++) {
                        for (let i_group = 0; i_group < basicData.arrCourseGroups[i_cours].length; i_group++) {
                            const newOption = document.createElement('option');
                            newOption.value = saveConfig.finallArrOffice[i_officel].id;
                            document.getElementById(`datalist_offices_day${i_day+1}_couple${i_couple+1}_groupID${basicData.arrCourseGroups[i_cours][i_group].id}`).appendChild(newOption)

                        }
                    }
                }
            }
        }
    }
    
}


function addSubject() {
    for (let i = 1; i < 7; i++) {
        for (let j = 1; j < 7; j++) {
            for (let ind = 0; ind < basicData.arrCourseGroups.length; ind++) {
                for (let index = 0; index < basicData.arrCourseGroups[ind].length; index++) {
                    const datalistElement = document.createElement('datalist');
                    datalistElement.id = `datalist_subjects_day${i}_couple${j}_groupID${basicData.arrCourseGroups[ind][index].id}`
                    document.getElementById(`datalist_subjects_day${i}_couple${j}`).appendChild(datalistElement)
                }                
            }
            
        }        
    }

    for (let i_Subject = 0; i_Subject < basicData.arrSubject.length; i_Subject++) {
        for (let i_day = 0; i_day < 6; i_day++) {
            for (let i_couple = 0; i_couple < 6; i_couple++) {
                for (let i_cours = 0; i_cours < basicData.arrCourseGroups.length; i_cours++) {
                    for (let i_group = 0; i_group < basicData.arrCourseGroups[i_cours].length; i_group++) {
                        const newOption = document.createElement('option');
                        newOption.value = basicData.arrSubject[i_Subject].name;
                        document.getElementById(`datalist_subjects_day${i_day+1}_couple${i_couple+1}_groupID${basicData.arrCourseGroups[i_cours][i_group].id}`).appendChild(newOption)

                    }
                }
            }
        }
    }
}

function addProfessorSort() {
    htmlCode = `
        <div class="carts_professor_sort"  ondblclick="professor_swit(this)">
            <div class="roll_professor">
                <span class="fullName_professor"></span>
                <input type="button" value="+" class="professor_swit" onclick="professor_swit(this)">
            </div>
            <div class="days_professor display-flex">
                <div class="day_professor1"></div>
                <div class="day_professor2"></div>
                <div class="day_professor3"></div>
                <div class="day_professor4"></div>
                <div class="day_professor5"></div>
                <div class="day_professor6"></div>
            </div>
        </div>
    `
    for (let i = 0; i < basicData.arrProfessor.length; i++) {
        document.getElementsByClassName("professor_sort")[0].innerHTML += htmlCode
        document.getElementsByClassName("fullName_professor")[i].innerHTML = basicData.arrProfessor[i].name
        for (let ind = 0; ind < saveConfig.finallArrProfessor[i].days_parrys.length; ind++) {
            let day = ""
            switch(ind){
                case 0:
                    day = "пн"
                    break
                case 1:
                    day = "вт"
                    break
                case 2:
                    day = "ср"
                    break
                case 3:
                    day = "чт"
                    break
                case 4:
                    day = "пт"
                    break
                case 5:
                    day = "сб"
                    break
            }
            htmlCode2 = `
                <span>${day}</span>
                <div class="profesor_stule">
                    <span>пара 1</span>
                    <input type="button" value="-" class="swit_professor_day_${ind}_parry_${i}" onclick="professor_day_parry_swit(this)">
                </div>
                <div class="profesor_stule">
                    <span>пара 2</span>
                    <input type="button" value="-" class="swit_professor_day_${ind}_parry_${i}" onclick="professor_day_parry_swit(this)">
                </div>
                <div class="profesor_stule">
                    <span>пара 3</span>
                    <input type="button" value="-" class="swit_professor_day_${ind}_parry_${i}" onclick="professor_day_parry_swit(this)">
                </div>
                <div class="profesor_stule">
                    <span>пара 4</span>
                    <input type="button" value="-" class="swit_professor_day_${ind}_parry_${i}" onclick="professor_day_parry_swit(this)">
                </div>
                <div class="profesor_stule">
                    <span>пара 5</span>
                    <input type="button" value="-" class="swit_professor_day_${ind}_parry_${i}" onclick="professor_day_parry_swit(this)">
                </div>
                <div class="profesor_stule">
                    <span>пара 6</span>
                    <input type="button" value="-" class="swit_professor_day_${ind}_parry_${i}" onclick="professor_day_parry_swit(this)">
                </div>
            `
            document.getElementsByClassName(("day_professor"+(ind+1)))[i].innerHTML += htmlCode2
            for (let j = 0; j < saveConfig.finallArrProfessor[i].days_parrys[ind].length; j++) {
                if (!saveConfig.finallArrProfessor[i].days_parrys[ind][j]) {
                    document.getElementsByClassName("swit_professor_day_"+ind+"_parry_"+i)[j].value = "+"
                }
            }
            
        }
    }
    addProfessor()
}
function addProfessor() {

    for (let i = 1; i < 7; i++) {
        for (let j = 1; j < 7; j++) {
            for (let ind = 0; ind < basicData.arrCourseGroups.length; ind++) {
                for (let index = 0; index < basicData.arrCourseGroups[ind].length; index++) {
                    const datalistElement = document.createElement('datalist');
                    datalistElement.id = `datalist_professors_day${i}_couple${j}_groupID${basicData.arrCourseGroups[ind][index].id}`
                    document.getElementById(`datalist_professors_day${i}_couple${j}`).appendChild(datalistElement)
                }                
            }
            
        }        
    }

    for (let i_Professor = 0; i_Professor < saveConfig.finallArrProfessor.length; i_Professor++) {
        for (let i_day = 0; i_day < saveConfig.finallArrProfessor[i_Professor].days_parrys.length; i_day++) {
            for (let i_couple = 0; i_couple < saveConfig.finallArrProfessor[i_Professor].days_parrys[i_day].length; i_couple++) {
                if(saveConfig.finallArrProfessor[i_Professor].days_parrys[i_day][i_couple]){
                    for (let i_cours = 0; i_cours < basicData.arrCourseGroups.length; i_cours++) {
                        for (let i_group = 0; i_group < basicData.arrCourseGroups[i_cours].length; i_group++) {
                            const newOption = document.createElement('option');
                            newOption.value = saveConfig.finallArrProfessor[i_Professor].name;
                            document.getElementById(`datalist_professors_day${i_day+1}_couple${i_couple+1}_groupID${basicData.arrCourseGroups[i_cours][i_group].id}`).appendChild(newOption)

                        }
                    }
                }
            }
        }
    }
}


function resetDate(data){
    if (data.value == null) {
        datee = new Date(data)
    }
    else{
        datee = new Date(data.value)
    }
    if (datee.getDay() == 1) {
        for (let i = 1; i < (document.getElementsByClassName("course").length+1); i++) {
            dateCourse = new Date(datee)
            for (let j = 0; j < document.getElementsByClassName("parameters_data_course"+i).length; j++) {
                document.getElementsByClassName("parameters_data_course"+i)[j].innerHTML = dateCourse.getDate()+"-"+(dateCourse.getMonth()+1)+"-"+dateCourse.getFullYear()
                dateCourse.setDate(dateCourse.getDate()+1)
            }
        }
        date = datee.getFullYear()+"-"+(datee.getMonth()+1)+"-"+datee.getDate() 
    }
    else{
        data.value = null
        alert("выберете понедльник")
    }
    getDate()
}


function save_data(){
    saveDataTable={
        "saveDataSubjects":new Array(),
        "saveDataOffices":new Array(),
        "saveDataProfessors":new Array()
    }
    for (let i = 0; i < document.getElementsByClassName("subjects").length; i++) {
        saveDataTable.saveDataSubjects[i] = document.getElementsByClassName("subjects")[i].value
    }

    for (let i = 0; i < document.getElementsByClassName("offices").length; i++) {
        saveDataTable.saveDataOffices[i] = document.getElementsByClassName("offices")[i].value
    }

    for (let i = 0; i < document.getElementsByClassName("professors").length; i++) {
        saveDataTable.saveDataProfessors[i] = document.getElementsByClassName("professors")[i].value
    }
    localStorage.setItem("saveDataTable", JSON.stringify(saveDataTable))

}




function saving_data(data){
    basicData = data
    localStorage.setItem("basicData", JSON.stringify(basicData))

    saveConfig={
        "finallArrOffice":basicData.arrOffice.slice(),
        "finallArrProfessor":basicData.arrProfessor.slice()
    }
    localStorage.setItem("saveConfig", JSON.stringify(saveConfig))
    
    remove_config_items()
    remove_data_items()
    addGrup()
    addSubject()
}
async function uploading_data(){
    if (confirm("Вы уверены, что хотите продолжить?")) {
        const urlGetData = new URL(location.origin+"/getData")
        await fetch(urlGetData.href).then(function(res){return res.json()}).then(saving_data)
     
    } else {
        alert("Действие отменено.");
    }
    
}
function loding_data(){

    const inputFile = document.createElement("input");
    inputFile.type = "file"; 
    inputFile.accept = ".htm" //, .html
    inputFile.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file.name.endsWith('.htm')) {//!file.name.endsWith('.html') && 
            alert('Пожалуйста, выберите файл с расширением.htm');// .html или 
        }
        else{
            const reader = new FileReader(); 
                
            reader.onload = function(e) {
                if (confirm("Вы уверены, что хотите продолжить?")) {
                    const content = e.target.result; 
                    const div = document.createElement('div')
                    div.innerHTML = content
                    const table = div.querySelectorAll('table')[0].querySelectorAll('tbody')[0]
                    removeItemTable(table, 11)
                    removeItemTable(table, 10)
                    removeItemTable(table, 8)
                    removeItemTable(table, 6)
                    removeItemTable(table, 5)
                    removeItemTable(table, 3)
                    removeItemTable(table, 2)
                    const urlPostBilling = new URL(location.origin+"/postBilling")
                    fetch(urlPostBilling.href, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"table": table.innerHTML})
                    }).then(function(res){return res.json()}).then(saving_data)

                } else {
                    alert("Действие отменено.");
                }
            };
            reader.readAsText(file)
            
        }
        // TODO полоучить таблицу ииииииииииии отправить ее на бек после чего запучтить функцию получение данных с бека с небольшой заденрзкой так как данные на беке должны еще обработатся как вырик просто ожидатьт пустое вохрощение с серверааааааааааааакаааа
    })
    inputFile.click()
        
     
    
    
}
function removeItemTable(table, index){
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].deleteCell(index)
    }
}


function remove_config_items() {
    saveConfig.finallArrOffice=basicData.arrOffice
    saveConfig.finallArrProfessor=basicData.arrProfessor
    localStorage.setItem("saveConfig", JSON.stringify(saveConfig))
    document.getElementsByClassName("office_sort")[0].innerHTML = ""
    document.getElementsByClassName("professor_sort")[0].innerHTML = ""
    addOfficeSort()
    addProfessorSort()
}



function remove_data_items(){
    localStorage.removeItem("saveDataTable")
    saveDataTable = null
    remove_data_html()
}   
function remove_data_html() {   
    for (let i = 1; i <= 4; i++) {
        for (let j = 0; j < 6; j++) {
            document.getElementsByClassName("content_grups_course"+(i))[j].innerHTML = ""
        }                
    }
}

function redirectionChekDate(){
    const redirectionChekDate = new URL(location.href+"redirectionChekDate")
    location.href = redirectionChekDate.href
}   


function complete_data(){   
    if (confirm("Вы уверены, что хотите продолжить?")) {
        loadXLSX()


        data2 = []
        for (let i = 0; i < document.getElementsByClassName("professors").length; i++) {
            data2.push({
                professors: document.getElementsByClassName("professors")[i].value,
                subjects: document.getElementsByClassName("subjects")[i].value,
                offices: document.getElementsByClassName("offices")[i].value
            })
        }


        const urlPostData = new URL(location.origin+"/postData")
        console.log(urlPostData)
        try {
            finallDate = date.split('-')
            if(finallDate[1].length == 1){
                finallDate[1] = 0+finallDate[1]
            }
            finallDate[2] = parseInt(finallDate[2]).toString()
            if(finallDate[2].length == 1){
                finallDate[2] = 0+finallDate[2]
            }
            dat = {
                "date": finallDate.join("-"),
                "data": data2,
                "arrCourseGroups": basicData.arrCourseGroups,
                "arrProfessor": basicData.arrProfessor
            }
            fetch(urlPostData.href, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dat)
            })
        } 
        catch (error) {
            alert("данные не отправлены на сервер выберите дату")
        }
        
        remove_data_items()
        addGrup()
    } 
    else {
        alert("Действие отменено.");
    }  
}
function loadXLSX() {
    let index_group = 0
    let data = [[], [], [], []];
    let cellText = null
    for (let i_curs = 0; i_curs < basicData.arrCourseGroups.length; i_curs++) {
        for (let i_day = 1; i_day < 7; i_day++) {
            let rowData = []
            rowData.push("")
            rowData.push("")
            rowData.push("")
            for (let i = 0; i < basicData.arrCourseGroups[i_curs].length; i++) {
                rowData.push(basicData.arrCourseGroups[i_curs][i].name)
                rowData.push("")
            }
            data[i_curs].push(rowData)
            let day = ""
                switch(i_day){
                    case 1:
                        day = "пн"
                        break
                    case 2:
                        day = "вт"
                        break
                    case 3:
                        day = "ср"
                        break
                    case 4:
                        day = "чт"
                        break
                    case 5:
                        day = "пт"
                        break
                    case 6:
                        day = "сб"
                        break
                }
            dateCourse = new Date(date)
            
            let dateText = dateCourse.getDate()+"."+(dateCourse.getMonth()+1)+"."+dateCourse.getFullYear()
            dateCourse.setDate(dateCourse.getDate()+1)
            for (let i_couple = 1; i_couple < 7; i_couple++) {
                
                rowData = [];
                if (i_couple==1) {
                    rowData.push(dateText)
                    rowData.push(day)
                }
                else{
                    rowData.push("")
                    rowData.push("")
                }
                rowData.push(i_couple)
                

                
                let rowdata2 = rowData.slice()
               
                for (let i_grup = 0; i_grup < basicData.arrCourseGroups[i_curs].length; i_grup++) {
                    cellText = document.getElementsByClassName("subjects_day"+i_day+"_couple"+i_couple)[index_group+i_grup].value
                    rowdata2.push(cellText)
                    cellText = document.getElementsByClassName("offices_day"+i_day+"_couple"+i_couple)[index_group+i_grup].value
                    rowdata2.push(cellText)
                }
                data[i_curs].push(rowdata2)
                rowdata2 = rowData.slice()
                for (let i_grup = 0; i_grup < basicData.arrCourseGroups[i_curs].length; i_grup++) {
                    cellText = document.getElementsByClassName("professors_day"+i_day+"_couple"+i_couple)[index_group+i_grup].value
                    rowdata2.push(cellText)
                    rowdata2.push("")
                }   
                data[i_curs].push(rowdata2)
                for (let i_grup = 0; i_grup < basicData.arrCourseGroups[i_curs].length; i_grup++) {
                    let text_subject = document.getElementsByClassName("subjects_day"+i_day+"_couple"+i_couple)[index_group+i_grup].value
                    let text_professor = document.getElementsByClassName("professors_day"+i_day+"_couple"+i_couple)[index_group+i_grup].value
                    let text_group = basicData.arrCourseGroups[i_curs][i_grup].name
                    checkHours(text_professor, text_group, text_subject)
                }   
            }
        }
        index_group += basicData.arrCourseGroups[i_curs].length;
    }

    let workbook = XLSX.utils.book_new();
    for (let ind = 0; ind < data.length; ind++) {
        let worksheet = XLSX.utils.aoa_to_sheet(data[ind]);
        worksheet['!merges'] = []
        let swit = true
        for (let i = 0; i < 78; i++) {//78 колчичество все строчик за неделю у одной курсса
            if(i%13==0){
                for (let j = 0; j < basicData.arrCourseGroups[ind].length*2; j+=2) {
                    worksheet['!merges'].push({ s: { r: i, c: j+3 }, e: { r: i, c: j+4 } })
                }
                worksheet['!merges'].push({ s: { r: i+1, c: 0 }, e: { r: i+12, c: 0 } })
                worksheet['!merges'].push({ s: { r: i+1, c: 1 }, e: { r: i+12, c: 1 } })
            }
            else{
                if (swit) {
                    for (let j = 2; j < data[ind][0].length*2; j+=2) {
                        worksheet['!merges'].push({ s: { r: i, c: j }, e: { r: (i+1), c: j } })
                        swit = false
                    }
                }
                else{
                    swit = true
                }
                
            }
            
        }
        XLSX.utils.book_append_sheet(workbook, worksheet, 'курс'+(ind+1));
    }






    arrDataHoursProfessor = [["Предподователь", "Группа", "Предмет", "всего чесов", "осталось"]]
    for (let i = 0; i < basicData.arrListHours.length; i++) {
        arrDataHoursProfessor.push([getProfessor(basicData.arrListHours[i].idProfessor), getGroup(basicData.arrListHours[i].idGroup), getSubject(basicData.arrListHours[i].idSubject), basicData.arrListHours[i].countHours, basicData.arrListHours[i].currentHours])
    }

    let worksheetHP = XLSX.utils.aoa_to_sheet(arrDataHoursProfessor);
    XLSX.utils.book_append_sheet(workbook, worksheetHP, 'чесы');
    
    
    
    XLSX.writeFile(workbook, 'table_data.xlsx');
}

function checkHours(professor, group, subject){

    for (let i = 0; i < basicData.arrListHours.length; i++) {
        if (getProfessor(basicData.arrListHours[i].idProfessor)==professor&&getGroup(basicData.arrListHours[i].idGroup)==group&&getSubject(basicData.arrListHours[i].idSubject)==subject) {
            basicData.arrListHours[i].currentHours-=2
        }
    }
}
function getProfessor(id){
    for (let i = 0; i < basicData.arrProfessor.length; i++) {
        if(basicData.arrProfessor[i].id == id){
            return basicData.arrProfessor[i].name
        }
    }
}
function getSubject(id){
    for (let i = 0; i < basicData.arrSubject.length; i++) {
        if(basicData.arrSubject[i].id == id){
            return basicData.arrSubject[i].name
        }
    }
}
function getGroup(id){
    for (let i = 0; i < basicData.arrCourseGroups.length; i++) {
        for (let j = 0; j < basicData.arrCourseGroups[i].length; j++) {
            if(basicData.arrCourseGroups[i][j].id == id){
            return basicData.arrCourseGroups[i][j].name
        }
        }
        
    }
}

function office_day_swit(thisButt){ 
    if (thisButt.className != "office_swit") {
        office_swit_style = document.getElementsByClassName("cart_office_days_sort")[Array.from(document.getElementsByClassName("carts_office_sort")).findIndex(button => button == thisButt)].style
        thisButt = document.getElementsByClassName("office_swit")[Array.from(document.getElementsByClassName("carts_office_sort")).findIndex(button => button == thisButt)]
    }
    else{
        office_swit_style = document.getElementsByClassName("cart_office_days_sort")[Array.from(document.getElementsByClassName("office_swit")).findIndex(button => button == thisButt)].style
    }
    if(thisButt.value == "+"){
        thisButt.value = "-"
        office_swit_style.display = "flex"

    }
    else{
        thisButt.value = "+"
        office_swit_style.display = "none"
    }
}
function office_day_parry_swit(thisButt){
    index_proffesor = thisButt.className.split("_")[5]
    index_day = thisButt.className.split("_")[3]
    index_parray = Array.from(document.getElementsByClassName("swit_office_day_"+index_day+"_parry_"+index_proffesor)).findIndex(button => button == thisButt)
    if(thisButt.value == "+"){
        thisButt.value = "-"
        
        saveConfig.finallArrOffice[index_proffesor].days_parrys[index_day][index_parray] = true
    }
    else{
        thisButt.value = "+"
        saveConfig.finallArrOffice[index_proffesor].days_parrys[index_day][index_parray] = false
    }
}



function professor_day_parry_swit(thisButt){{}
    index_proffesor = thisButt.className.split("_")[5]
    index_day = thisButt.className.split("_")[3]
    index_parray = Array.from(document.getElementsByClassName("swit_professor_day_"+index_day+"_parry_"+index_proffesor)).findIndex(button => button == thisButt)
    if(thisButt.value == "+"){
        thisButt.value = "-"
        saveConfig.finallArrProfessor[index_proffesor].days_parrys[index_day][index_parray] = true

    }
    else{
        thisButt.value = "+"
        saveConfig.finallArrProfessor[index_proffesor].days_parrys[index_day][index_parray] = false
    }

}
function professor_swit(thisButt){
    if (thisButt.className != "professor_swit") {
        professor_swit_style = document.getElementsByClassName("days_professor")[Array.from(document.getElementsByClassName("carts_professor_sort")).findIndex(button => button == thisButt)].style
        thisButt = document.getElementsByClassName("professor_swit")[Array.from(document.getElementsByClassName("carts_professor_sort")).findIndex(button => button == thisButt)]
    }
    else{
        professor_swit_style = document.getElementsByClassName("days_professor")[Array.from(document.getElementsByClassName("professor_swit")).findIndex(button => button == thisButt)].style
        
    }
    if(thisButt.value == "+"){
        thisButt.value = "-"
        professor_swit_style.display = "flex"
    }
    else{
        thisButt.value = "+"
        professor_swit_style.display = "none"
    }
}


function checkRepetitions(thisButt){
    input_couple = document.getElementsByClassName(thisButt.className)
    swit = true

    for (let i = 0; i < input_couple.length; i++) {
        checkRepetitions_twoFor(input_couple, i)
        if (input_couple[i].value == thisButt.value && input_couple[i] != thisButt && thisButt.value != "") {
            swit = false
        }
    }
    if (swit) {
        for (let i = 0; i < input_couple.length; i++) {
            input_couple[i].style.color = "black"
        }
        for (let i = 0; i < input_couple.length; i++) {
            checkRepetitions_twoFor(input_couple, i)
        }
    }
}
function checkRepetitions_twoFor(input_couple, indexArrOne){
    for (let j = 0; j < input_couple.length; j++) {
        if (input_couple[indexArrOne].value == input_couple[j].value && input_couple[indexArrOne] != input_couple[j] && input_couple[indexArrOne].value != "") {
            input_couple[indexArrOne].style.color = "red"
            input_couple[j].style.color = "red"
        }
    }
}


function rollFunc2(thisButt){
    contentStule = document.getElementsByClassName("content")[Array.from(document.getElementsByClassName("roll")).findIndex(button => button == thisButt)].style
    if (thisButt.value == "-") {
        thisButt.value = "+"
        contentStule.display = "none"
    }
    else{
        thisButt.value = "-"
        contentStule.display = "flex"
    }
}
function rollFunc(thisButt){
    contentStule = document.getElementsByClassName("content")[Array.from(document.getElementsByClassName("roll")).findIndex(button => button == thisButt)].style
    if (thisButt.value == "-") {
        thisButt.value = "+"
        contentStule.display = "none"
    }
    else{
        thisButt.value = "-"
        contentStule.display = "block"
    }
}
