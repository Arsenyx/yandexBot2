// ==UserScript==
// @name         Yandex Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Arseny
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

let keywords = ["Гобой","Саксофон","Валторна","Фагот","Флейта","Как звучит флейта","Скрипка"];
let keyword = keywords[getRandom(0, keywords.length)];
let yandexInput = document.getElementById("text");
let button = document.getElementsByClassName("button_theme_websearch")[0];

if (yandexInput != null){
    let i = 0;
    let timerId = setInterval(()=>{
        yandexInput.value += keyword[i++];
        if(i == keyword.length){
            clearInterval(timerId);
            button.click();
        }
    },500);
}else if(location.hostname == "https://yandex.ru/"){
    let flag = true;
    //let links = document.getElementsByTagName("a");
    let links = document.links;
    let numPage = document.getElementsByClassName('pager__item_current_yes')[0].innerText;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            flag = false;
            link.removeAttribute('target');
            setTimeout(()=>link.click(),1500);
            break;
        }
    }
    if(numPage == "10") location.href = "https://yandex.ru/";
    if(flag) setTimeout(()=>document.getElementsByClassName('pager__item_kind_next')[0].click(),1500);
        }else{
    if(getRandom(0,100)>=80) {location.href = "https://yandex.ru/";
        }else{
        setInterval(()=>{
            let links = document.links;
            let link = links[getRandom(0,links.length)];
            if(link.href.indexOf(location.hostname) != -1){
                link.click();
            }
        },3000);
     }
}
