// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        http://10receptov.net/*
// @match        https://crushdrummers.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementsByName("text")[0];
 let btn = document.getElementsByClassName("button")[1];
let sites = {
    "10receptov":  ["национальная кухня","кулинарные рецепты","рецепты народов мира"],
    "crushdrummers.ru": ["Барабанное шоу", "Шоу барабанщиков Crush", "Заказать барабанное шоу"]
}
let site = Object.keys(sites)[getIntRandom(0, Object.keys(sites).length)]; // Возвращаем случайный сайт
let words = sites[site];
//let words = ["национальная кухня","кулинарные рецепты","рецепты народов мира"];//создаем масив для случайного поиска
let word = words[getIntRandom(0, words.length)];// рендомно выдает в поисковик одно из значений массива words
if(btn != undefined){ // Проверяем, что мы на главной странице
    let i=0;
    let timerId = setInterval(function(){//функция задает с какой частотой вводятся буквы в милисек
        yandexInput.value =yandexInput.value + word[i++];//слова в яндекс прописываются по буквам
        document.cookie = "site="+site;
        if(i==word.length){//когда букв в строке больше не останется
            clearInterval(timerId);//набор прекращается
            btn.click();// Клик по кнопке поиска
        }
    }, 500);

}else if(location.hostname === "yandex.ru"){ // Если страница с поисковой выдачей
    let links = document.links; // Собираем коллекцию ссылок
    let goNext = true;
    let site = getCookie("site"); // Достаём ранее выбранный сайт из куки
    for(let i=0; i<links.length; i++){ // Перебираем ссылки
        let link = links[i];
        link.target = "_self"
        if(link.href.indexOf(site) != -1){ // Ищем ссылку с нужным сайтом
            setTimeout(function(){
                link.click(); // Кликаем по ссылке с нужным сайтом
            }, 3000);
            goNext = false; // запрещаем идти дальше по страницам поисковика
            break; // Останавливаем цикл
        }
    }
   if(goNext){ // Проверяем, можно ли идти далее по страницам поисковика
        let currentPage = document.querySelector(".pager__items>span").innerText;
        if(currentPage<10){
            let next = document.getElementsByClassName("link_theme_none")[4]; // Находим кнопку "Следующая"
            setTimeout(function(){
                next.click(); // Кликаем по кнопке следующая
            }, 3000);
        }else{
            location.href = "https://yandex.ru/";
        }
    }
}else{ // Любой другой сайт
    setInterval(function(){
        if(getIntRandom(0,100)<30) location.href = "https://yandex.ru/"; // С некоторой вероятностью мы уйдём на сайт yandex
        let links = document.links; // Коллекция ссылок
        let randomIndex = getIntRandom(0, links.length);
        let link = links[randomIndex];
        if(link.href.indexOf(location.hostname) != -1){ // Если переход внутри сайта
            links[randomIndex].click();
        }else{ // Если переход на другой сайт, то мы ссылаем браузер на главную страницу нашего сайта
            location.href = location.origin;
        }
    },2000);
}

function getIntRandom(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
