// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        http://10receptov.net/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementsByName("text")[0];
 let btn = document.getElementsByClassName("button")[1];
if(btn != undefined){ // Проверяем, что мы на главной странице
    yandexInput.value = "рецепты народов мира"; // Пишем фразу в поисковую строку
    setTimeout(function(){
        btn.click();// Клик по кнопке поиска
    }, 1000);
}else if(location.hostname === "yandex.ru"){ // Если страница с поисковой выдачей
    let links = document.links; // Собираем коллекцию ссылок
    let goNext = true;
    for(let i=0; i<links.length; i++){ // Перебираем ссылки
        let link = links[i];
        if(link.href.indexOf("10receptov") != -1){ // Ищем ссылку с нужным сайтом
            setTimeout(function(){
                link.click(); // Кликаем по ссылке с нужным сайтом
            }, 3000);
            goNext = false; // запрещаем идти дальше по страницам поисковика
            break; // Останавливаем цикл
        }
    }
    if(goNext){ // Проверяем, можно ли идти далее по страницам поисковика
        let next = document.getElementsByClassName("link_theme_none")[4] // Находим кнопку "Следующая"
        setTimeout(function(){
            next.click(); // Кликаем по кнопке следующая
        }, 3000);
    }
}else{ // Любой другой сайт
    let links = document.links; // Коллекция ссылок
    let randomIndex = getIntRandom(0, links.length);
    let link = links[randomIndex];
    if(link.href.indexOf(location.hostname) != -1){ // Если переход внутри сайта
        setTimeout(function(){
            links[randomIndex].click();
        }, 2000);
    }else{ // Если переход на другой сайт, то мы ссылаем браузер на главную страницу нашего сайта
        location.href = "http://10receptov.net/";
    }
}

function getIntRandom(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}
