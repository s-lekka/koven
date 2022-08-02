window.onload = init;

//hobs and  oven data
var brhob = {
    currentlvl: 0,
    maxlvl:3,
    minlvl:0,
    increment: 0.5
}

var blhob = {
    currentlvl: 0,
    maxlvl:6,
    minlvl:0,
    increment: 1
}

var tlhob = {
    currentlvl: 0,
    maxlvl:6,
    minlvl:0,
    increment: 1
}

var trhob = {
    currentlvl: 0,
    maxlvl:6,
    minlvl:0,
    increment: 1
}

var oven = {
    temp: 0,
    mode: 'fan-only',
    timer: {
        hours: 0,
        minutes: 0
    }
}

function init(){

    //variables
    var brButton = document.getElementById('brHob-button')
    var blButton = document.getElementById('blHob-button')
    var trButton = document.getElementById('trHob-button')
    var tlButton = document.getElementById('tlHob-button')
    var ovnButton = document.getElementById('oven-button')
    
    var screens = document.getElementsByClassName('screens')
    for (i=0; i <screens.length; i++) {
        screens[i].style.display = 'none'
    }
    document.getElementById('message').innerHTML = 'Main Tab'

    //view
    updateView()


    //eventListeners
    brButton.addEventListener('click', openHobsTab)
    blButton.addEventListener('click', openHobsTab)
    trButton.addEventListener('click', openHobsTab)
    tlButton.addEventListener('click', openHobsTab)
    ovnButton.addEventListener('click', openOvenTab)

}

function openHobsTab(evt) {

    document.getElementById('message').innerHTML = 'open Hobs Tab'
    var currentHob = evt.currentTarget.id

    document.getElementById('main-tab').style.display = 'none'
    document.getElementById('hob-tab').style.display = 'block'

    var hobTemp = document.getElementById('hob-level')
    hobTemp.innerText = calcLvl(currentHob)
     
    var hobOff = document.getElementById('off-hob')
    hobOff.hobID = currentHob
    hobOff.addEventListener('click', turnHobOff)

    var hobOn = document.getElementById('on-hob')
    hobOn.addEventListener('click', turnHobOn)

    var lvlUp = document.getElementById('hob-lvl-up')
    lvlUp.hobID = currentHob
    lvlUp.addEventListener('click', IncreaseLvl)

    var lvlDn = document.getElementById('hob-lvl-down')
    lvlDn.hobID = currentHob
    lvlDn.addEventListener('click', DecreaseLvl)

}

function openOvenTab(){

    document.getElementById('message').innerHTML = 'open Oven Tab'

    

    document.getElementById('main-tab').style.display = 'none'
    document.getElementById('oven-tab').style.display = 'block'

    document.getElementById('oven-temp').innerHTML = oven.temp

    var ovenOff = document.getElementById('off-oven')
    var ovenOn = document.getElementById('on-oven')
    var ovenMode = document.getElementById('oven-mode')
    var numbers = document.getElementsByClassName('numpad')
    for (i=0; i< numbers.length; i++){
        numbers[i].addEventListener('click', pressNumPad)
        numbers[i].iter = 0
    }

    ovenOff.addEventListener('click', turnOvenOff)
    ovenOn.addEventListener('click', turnOvenOn)
    ovenMode.addEventListener('click', openOvenModeTab)




}

function openOvenModeTab(){
    document.getElementById('message').innerHTML = 'open Oven Mode Tab'

    document.getElementById('oven-tab').style.display = 'none'
    document.getElementById('oven-mode-tab').style.display = 'block'
    
    //buttons
    var fanMode = document.getElementById('fan')
    var lheatMode = document.getElementById('l-heat')
    var lheatFanMode = document.getElementById('l-heat-fan')
    var luHeatMode = document.getElementById('lu-heat')
    var select = document.getElementById('mode-select')

    //eventListeners
    fanMode.addEventListener('click', updateMode)
    lheatMode.addEventListener('click', updateMode)
    lheatFanMode.addEventListener('click', updateMode)
    luHeatMode.addEventListener('click', updateMode)
    select.addEventListener('click', setMode)


}

//show hob templevel
function calcLvl(id) {
    var text
    switch(id) {
        case 'brHob-button':
            text = brhob.currentlvl;
            console.log('text='+text);
            break;
        case 'blHob-button':
            text = blhob.currentlvl;
            break;
        case 'trHob-button':
            text = trhob.currentlvl;
            break;
        case 'tlHob-button':
            text = tlhob.currentlvl;
            break;
        case '':
            text = oven.temp;
            break;
    }
    return text;
}

function IncreaseLvl(evt) {
    var text
    var heat = evt.currentTarget.hobID
    var hob = true
    switch(heat) {
        case 'brHob-button':
            if (brhob.currentlvl<brhob.maxlvl) {
                brhob.currentlvl = brhob.currentlvl + brhob.increment
            }
            text = brhob.currentlvl;
            break;
        case 'blHob-button':
            if (blhob.currentlvl<blhob.maxlvl) {
                blhob.currentlvl = blhob.currentlvl + blhob.increment
            }
            text = blhob.currentlvl;
            break;
        case 'trHob-button':
            if (trhob.currentlvl<trhob.maxlvl) {
                trhob.currentlvl = trhob.currentlvl + trhob.increment
            }
            text = trhob.currentlvl;
            break;
        case 'tlHob-button':
            if (tlhob.currentlvl<tlhob.maxlvl) {
                tlhob.currentlvl = tlhob.currentlvl + tlhob.increment
            }
            text = tlhob.currentlvl;
            break;
        case '':
            if (brhob.currentlvl<brhob.maxlvl) {
                brhob.currentlvl = brhob.currentlvl + brhob.increment
            }
            text = oven.temp;
            hob = false;
            break;
    }
    if (hob) {
        document.getElementById('hob-level').innerHTML = text}       
    else {
        document.getElementById('oven-temp').innerHTML = text} 
    
}

function DecreaseLvl(evt) {
    var text
    var heat = evt.currentTarget.hobID
    var hob = true
    switch(heat) {
        case 'brHob-button':
            if (brhob.currentlvl>0) {
                brhob.currentlvl = brhob.currentlvl - brhob.increment
            }
            text = brhob.currentlvl;
            break;
        case 'blHob-button':
            if (blhob.currentlvl>0) {
                blhob.currentlvl = blhob.currentlvl - blhob.increment
            }
            text = blhob.currentlvl;
            break;
        case 'trHob-button':
            if (trhob.currentlvl>0) {
                trhob.currentlvl = trhob.currentlvl - trhob.increment
            }
            text = trhob.currentlvl;
            break;
        case 'tlHob-button':
            if (tlhob.currentlvl>0) {
                tlhob.currentlvl = tlhob.currentlvl - tlhob.increment
            }
            text = tlhob.currentlvl;
            break;
        case '':
            if (brhob.currentlvl>0) {
                brhob.currentlvl = brhob.currentlvl - brhob.increment
            }
            text = oven.temp;
            hob = false;
            break;
    }

if (hob) {
    document.getElementById('hob-level').innerHTML = text}       
else {
    document.getElementById('oven-temp').innerHTML = text} 

}

//close selected hob
function turnHobOff(evt) {
    switch(evt.currentTarget.hobID) {
        case 'brHob-button':
            brhob.currentlvl = 0;
            break;
        case 'blHob-button':
            blhob.currentlvl = 0;
            break;
        case 'trHob-button':
            trhob.currentlvl = 0;
            break;
        case 'tlHob-button':
            tlhob.currentlvl = 0;
            break;
    }

    document.getElementById('message').innerHTML = 'turned off hob'

    document.getElementById('hob-tab').style.display = 'none'
    document.getElementById('main-tab').style.display = 'block'

    updateView()
}

function turnHobOn() {
    document.getElementById('message').innerHTML = 'turned on hob'

    document.getElementById('hob-tab').style.display = 'none'
    document.getElementById('main-tab').style.display = 'block'

    updateView()
}

//close oven
function turnOvenOff(){
    oven.temp = 0
    oven.timer = (0, 0)
    //todo oven mode default

    document.getElementById('message').innerHTML = 'turned off oven'

    document.getElementById('oven-tab').style.display = 'none'
    document.getElementById('main-tab').style.display = 'block'

    updateView()
}

function turnOvenOn(){

    if (oven.temp < 251) {
        document.getElementById('message').innerHTML = 'turned on oven'

        document.getElementById('oven-tab').style.display = 'none'
        document.getElementById('main-tab').style.display = 'block'

        updateView()
    }
}

function pressNumPad(evt) {
    var button = evt.currentTarget
    var iter = button.iter
    var newiter
    var temptext = document.getElementById('oven-temp')
    if (button.innerHTML == 'C') {
        //clear temp
        oven.temp = 0
        newiter = 0
    }
    else {
        switch(iter) {
            case 0:
                oven.temp = Number(button.innerHTML);
                newiter = 1;
                break;
            case 1:
                oven.temp = oven.temp*10 + Number(button.innerHTML);
                newiter = 2;
                break;
            case 2:
                oven.temp = oven.temp*10 + Number(button.innerHTML);
                newiter = 3;
                break;
            case 3:
                break;
        }
    }
    updateDigitNum(newiter)
    temptext.innerHTML = oven.temp;
}

function updateDigitNum(iter) {
    var buttons = document.getElementsByClassName('numpad')
    for (i = 0; i < buttons.length; i++){
        buttons[i].iter = iter
    }
}

function updateMode(evt){
    var mode = evt.currentTarget.id
    var select = document.getElementById("mode-select")
    switch(mode) {
        case 'fan':
            oven.mode = 'fan-only';
            break;
        case 'l-heat':
            oven.mode = 'lower-heat';
            break;
        case 'l-heat-fan':
            oven.mode = 'fan-lower-heat';
            break;
        case 'lu-heat':
            oven.mode = 'upper-lower-heat';
            break;
    }
    select.innerHTML = '<img src="./icons/'+oven.mode+'.png">'
}

function setMode(evt) {
    document.getElementById('message').innerHTML = 'selected mode'

    document.getElementById('oven-mode-tab').style.display = 'none'
    document.getElementById('oven-tab').style.display = 'block'

    document.getElementById('oven-mode').innerHTML = '<img src="./icons/'+oven.mode+'.png">' 
}

function updateView() {
    var brButton = document.getElementById('brHob-button')
    var blButton = document.getElementById('blHob-button')
    var trButton = document.getElementById('trHob-button')
    var tlButton = document.getElementById('tlHob-button')
    var ovnButton = document.getElementById('oven-button')

    if (brhob.currentlvl!=0) {
        brButton.innerHTML = brhob.currentlvl
        brButton.style.backgroundColor = 'orangered'
    }
    else {brButton.style.backgroundColor = 'black'
    }

    if (blhob.currentlvl!=0) {
        blButton.innerHTML = blhob.currentlvl
        blButton.style.backgroundColor = 'orangered'
    }
    else {blButton.style.backgroundColor = 'black'
    }

    if (trhob.currentlvl!=0) {
        trButton.innerHTML = trhob.currentlvl
        trButton.style.backgroundColor = 'orangered'
    }
    else {trButton.style.backgroundColor = 'black'
    }

    if (tlhob.currentlvl!=0) {
        tlButton.innerHTML = tlhob.currentlvl
        tlButton.style.backgroundColor = 'orangered'
    }
    else {tlButton.style.backgroundColor = 'black'
    }

    if (oven.temp!=0) {
        ovnButton.innerHTML = oven.temp + ' °C<br><img src="./icons/' + oven.mode +'.png">'
        ovnButton.style.backgroundColor = 'orangered'
    }
    else {
        ovnButton.style.backgroundColor = 'black'
        ovnButton.innerHTML = oven.temp + ' °C<br>' + oven.mode
    }

    //todo timer view
}
