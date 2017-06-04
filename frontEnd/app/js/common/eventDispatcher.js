//ЕventDispatcher предназначен для осуществления обмена информацией между различными(несвязанными на прямую) частями приложения. Events - oбъект-контейнер,названия свойств которого - есть именованные названиями событий массивы; метод trigger, получая  имя события исполняет callback функции подписчиков;метод on создает свойство-массив с именем события в контейнере events(если его не было создано) и добавляет в него callback функцию подписчика, возвращая последнему id события;метод off, получая id события, удаляет его или из массива одноименных событий или если событие там одно, удаляет соответствующее свойство объекта events.
"use strict";
define(function () {
    const events = {};
    let subEventId = -1;
    return {
        trigger(event, arg) {
            if (!events[event]) {
                return false;
            }
            events[event].forEach(event => event.callback(arg));
        },
        on(event, callback) {
            if (!events[event]) {
                events[event] = [];
            }
            const id = ++subEventId;
            events[event].push({
                callback: callback,
                subEventId: id 
            });
            return id;
        },
        off(id){
            Object.keys(events).forEach(eventArray => { 
               events[eventArray].forEach((event,index) => {
                   if(event.subEventId == id){ 
                       events[eventArray].length > 1 ? events[eventArray].splice(index,1) : delete events[eventArray];
                   }
                });  
               
            });
        }
    };
});