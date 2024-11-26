document.getElementById("sorting_ready").addEventListener('click', function() {
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

async function getDate(){
    remove_data_html()


    const urlGetDate = new URL(location.href + "getDate/"+document.getElementById("date").value)
    try {
        await fetch(urlGetDate.href).then(function(res){return res.json()})
        .then(function(data){
            for (let i_group = 0; i_group < data.arrCourseGroups.length; i_group++) {
                for (let i = 0; i < DAY_LENTH; i++) {
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
    for (let index = 0; index < basicData.arrCourseGroups.length; index++) {
        days_length = 6
        for (let i = 0; i < days_length; i++) {
            htmlCode = `                
                <table>
                    <tr>
                        <td colspan="2" class="name_groups_course${(index+1)}_day${i}"></td>
                    </tr>
                    <tr>
                        <td><input list="subjects_day${(i+1)}_couple1" class="subjects subjects_day${(i+1)}_couple1"></td>
                        <td rowspan="2"><input list="offices_day${(i+1)}_couple1" class="offices offices_day${(i+1)}_couple1" oninput="checkRepetitions(this)"></td>
                    </tr>
                    <tr>
                        <td><input list="professors_day${(i+1)}_couple1" class="professors professors_day${(i+1)}_couple1" oninput="checkRepetitions(this)"></td>
                    </tr>
                    <tr>
                        <td><input list="subjects_day${(i+1)}_couple2" class="subjects subjects_day${(i+1)}_couple2"></td>
                        <td rowspan="2"><input list="offices_day${(i+1)}_couple2" class="offices offices_day${(i+1)}_couple2" oninput="checkRepetitions(this)"></td>
                    </tr>
                    <tr>
                        <td><input list="professors_day${(i+1)}_couple2" class="professors professors_day${(i+1)}_couple2" oninput="checkRepetitions(this)"></td>
                    </tr>
                    <tr>
                        <td><input list="subjects_day${(i+1)}_couple3" class="subjects subjects_day${(i+1)}_couple3"></td>
                        <td rowspan="2"><input list="offices_day${(i+1)}_couple3" class="offices offices_day${(i+1)}_couple3" oninput="checkRepetitions(this)"></td>
                    </tr>
                    <tr>
                        <td><input list="professors_day${(i+1)}_couple3" class="professors professors_day${(i+1)}_couple3" oninput="checkRepetitions(this)"></td>
                    </tr>
                    <tr>
                        <td><input list="subjects_day${(i+1)}_couple4" class="subjects subjects_day${(i+1)}_couple4"></td>
                        <td rowspan="2"><input list="offices_day${(i+1)}_couple4" class="offices offices_day${(i+1)}_couple4" oninput="checkRepetitions(this)"></td>
                    </tr>
                    <tr>
                        <td><input list="professors_day${(i+1)}_couple4" class="professors professors_day${(i+1)}_couple4" oninput="checkRepetitions(this)"></td>
                    </tr>
                    <tr>
                        <td><input list="subjects_day${(i+1)}_couple5" class="subjects subjects_day${(i+1)}_couple5"></td>
                        <td rowspan="2"><input list="offices_day${(i+1)}_couple5" class="offices offices_day${(i+1)}_couple5" oninput="checkRepetitions(this)"></td>
                    </tr>
                    <tr>
                        <td><input list="professors_day${(i+1)}_couple5" class="professors professors_day${(i+1)}_couple5" oninput="checkRepetitions(this)"></td>
                    </tr>
                    <tr>
                        <td><input list="subjects_day${(i+1)}_couple6" class="subjects subjects_day${(i+1)}_couple6"></td>
                        <td rowspan="2"><input list="offices_day${(i+1)}_couple6" class="offices offices_day${(i+1)}_couple6" oninput="checkRepetitions(this)"></td>
                    </tr>
                    <tr>
                        <td><input list="professors_day${(i+1)}_couple6" class="professors professors_day${(i+1)}_couple6" oninput="checkRepetitions(this)"></td>
                    </tr>
                </table>
            `
            for (let j = 0; j < basicData.arrCourseGroups[index].length; j++) {
                document.getElementsByClassName("content_grups_course"+(index+1))[i].innerHTML += htmlCode
                document.getElementsByClassName("name_groups_course"+(index+1)+"_day"+i)[j].innerHTML = basicData.arrCourseGroups[index][j].name
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
//TODO сокротить добавиь константы дней и времени
function addOffice() {
    for (let ind = 1; ind < 7; ind++) {
        for (let j = 1; j < 7; j++) {
            document.getElementById("offices_day"+ind+"_couple"+j).innerHTML = ""            
    

        }
    }
    console.log()
    for (let i = 0; i < saveConfig.finallArrOffice.length; i++) {
        for (let ind = 0; ind < saveConfig.finallArrOffice[i].days_parrys.length; ind++) {
            for (let j = 0; j < saveConfig.finallArrOffice[i].days_parrys[ind].length; j++) {
                if(saveConfig.finallArrOffice[i].days_parrys[ind][j]){
                    document.getElementById("offices_day"+(ind+1)+"_couple"+(j+1)).innerHTML += '<option value="'+saveConfig.finallArrOffice[i].id+'">'
                }
            }
        }
    }
}


function addSubject() {
    for (let i = 0; i < basicData.arrSubject.length; i++) {
        for (let ind = 1; ind < 7; ind++) {
            for (let j = 1; j < 7; j++) {
                document.getElementById("subjects_day"+ind+"_couple"+j).innerHTML += '<option value="'+basicData.arrSubject[i].name+'">' 
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
//TODO сокротить добавиь константы дней и времени
function addProfessor() {
    for (let ind = 1; ind < 7; ind++) {
        for (let j = 1; j < 7; j++) {
            document.getElementById("professors_day"+ind+"_couple"+j).innerHTML = ""            
        }
    }

    for (let i = 0; i < saveConfig.finallArrProfessor.length; i++) {
        for (let ind = 0; ind < saveConfig.finallArrProfessor[i].days_parrys.length; ind++) {
            for (let j = 0; j < saveConfig.finallArrProfessor[i].days_parrys[ind].length; j++) {
                if (saveConfig.finallArrProfessor[i].days_parrys[ind][j]) {
                    document.getElementById("professors_day"+(ind+1)+"_couple"+(j+1)).innerHTML += '<option value="'+saveConfig.finallArrProfessor[i].name+'">'             
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
function save_config(){

    localStorage.setItem("saveConfig", JSON.stringify(saveConfig))
    if (date != null) {
        localStorage.setItem("date", JSON.stringify(date))
    }
    

}

async function uploading_data(){
    
    if (confirm("Вы уверены, что хотите продолжить?")) {
        const urlGetData = new URL(location.origin+"/getData")
        await fetch(urlGetData.href).then(function(res){return res.json()}).then(function(data){
            basicData = data
            localStorage.setItem("basicData", JSON.stringify(basicData))

            saveConfig={
                "finallArrOffice":basicData.arrOffice.slice(),
                "finallArrProfessor":basicData.arrProfessor.slice()
            }
            localStorage.setItem("saveConfig", JSON.stringify(saveConfig))
            
            
        })
        remove_config_items()
        remove_data_items()
        addGrup()
    } else {
        alert("Действие отменено.");
    }
    
}



function remove_config_items() {
    localStorage.setItem("saveConfig", JSON.stringify({"finallArrOffice":basicData.arrOffice,"finallArrProfessor":basicData.arrProfessor}))
    saveConfig.finallArrOffice=basicData.arrOffice
    saveConfig.finallArrProfessor=basicData.arrProfessor

    localStorage.removeItem("date")
    document.getElementsByClassName("office_sort")[0].innerHTML = ""
    document.getElementsByClassName("professor_sort")[0].innerHTML = ""
    addOfficeSort()
    addProfessorSort()
}



function remove_data_items(){
    localStorage.removeItem("saveDataTable")
    // TODO saveDataTable удалить надо
    remove_data_html()
}   
function remove_data_html() {
    console.log("dad")
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


        const urrPostData = new URL(location.href+"postData")
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
            fetch(urrPostData.href, {
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
            // console.log(arrCourseGroups.slice())
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
