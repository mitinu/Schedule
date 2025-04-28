function resetDate(data){
    datee = new Date(data.value)
    if (datee.getDay() == 1) {
        for (let i = 1; i < (document.getElementsByClassName("course").length+1); i++) {
            dateCourse = new Date(datee)
            for (let j = 0; j < document.getElementsByClassName("parameters_data_course"+i).length; j++) {
                document.getElementsByClassName("parameters_data_course"+i)[j].innerHTML = dateCourse.getDate()+"-"+(dateCourse.getMonth()+1)+"-"+dateCourse.getFullYear()
                dateCourse.setDate(dateCourse.getDate()+1)
            }
        }
        date = datee.getFullYear()+"-"+(datee.getMonth()+1)+"-"+datee.getDate() 
        getDate()
    }
    else{
        data.value = null
        alert("выберете понедльник")
    }
    
}
function remove_data_html() {
    for (let i = 1; i <= 4; i++) {
        for (let j = 0; j < 6; j++) {
            document.getElementsByClassName("content_grups_course"+(i))[j].innerHTML = ""
        }                
    }
}

async function getDate(){
    remove_data_html()
    const urlGetDate = new URL(location.origin + "/getDate/"+document.getElementById("date").value)
    try {
        await fetch(urlGetDate.href).then(function(res){return res.json()})
        .then(function(data){
            if(document.getElementById("group").value==""){
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
            }
            else{
                index = 0
                for (let i_group = 0; i_group < data.arrCourseGroups.length; i_group++) {
                    days_length = 6;
                    for (let i = 0; i < days_length; i++) {
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
                            if (document.getElementById("group").value==data.arrCourseGroups[i_group][j].name) {
                                document.getElementsByClassName("content_grups_course"+(i_group+1))[i].innerHTML += htmlCode
                                document.getElementsByClassName("name_groups_course"+(i_group+1)+"_day"+i)[0].innerHTML = data.arrCourseGroups[i_group][j].name
                                for (let ind = 0; ind < 6; ind++) {
                                    document.getElementsByClassName("offices_day"+(i+1)+"_couple"+(ind+1))[0].value = data.data[index].offices
                                    document.getElementsByClassName("subjects_day"+(i+1)+"_couple"+(ind+1))[0].value = data.data[index].subjects
                                    document.getElementsByClassName("professors_day"+(i+1)+"_couple"+(ind+1))[0].value = data.data[index].professors
                                    index++
                                }
                            } 
                            else{
                                index+=6
                            }
                        
                        }
                        
                    }
                }
                
            }
            
        })
    } catch (e) {
        alert("нет данных")
    }

     
}
startHtml()
function startHtml(){
    document.getElementById("group").value = localStorage.getItem("myGroup")
    const urlGetNameGruop = new URL(location.origin + "/getNameGroup")
    fetch(urlGetNameGruop.href)
    .then(res=>{return res.json()})
    .then(data=>{
        console.log(data)
        data.forEach(name => {

            document.getElementById("groups").innerHTML += "<option value='"+name+"'>"
        })
    })    
}
function getOneGroup(myGroup) {
    localStorage.setItem("myGroup", myGroup.value)
    resetDate(document.getElementById("date"))
}
document.getElementById("exit").addEventListener('click', () => {
    myAlert1Password1Button("Авторизация", "вход", exit)
})
function myAlert1Password1Button(h, val, func){

    
    const divMyAlertBlackout = document.createElement("div");
    divMyAlertBlackout.id = "divMyAlertBlackout"


    const divMyAlertContent = document.createElement("div");
    divMyAlertContent.id = "divMyAlertContent"
  


    const spanH = document.createElement("span");
    spanH.innerHTML = h
    spanH.style.color = "white"

    const inputPassword = document.createElement("input");
    inputPassword.type = "password"; 
    inputPassword.placeholder = "пароль"

    const inputButton = document.createElement("input");
    inputButton.type = "button"; 
    const inputButtonClose = inputButton.cloneNode(); 

    inputButton.value = val; 
    inputButtonClose.value = "X"; 
    inputButtonClose.className = "Close"
  
    inputButton.onclick = function() {
        divMyAlertBlackout.remove()
        func(inputPassword.value)
    }
    inputButtonClose.onclick = function() {
        divMyAlertBlackout.remove()
        
    }
    divMyAlertContent.appendChild(spanH)
    divMyAlertContent.appendChild(inputButton)
    divMyAlertContent.appendChild(inputPassword)
    divMyAlertContent.appendChild(inputButtonClose)
    divMyAlertBlackout.appendChild(divMyAlertContent)
    document.body.appendChild(divMyAlertBlackout)

}
const urlExit = new URL(location.origin+"/exit")
function exit(password) {
    fetch(urlExit,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"password": password})
    })
    .then((res)=>{return res.json()})
    .then((res)=>{location=res.url})
}