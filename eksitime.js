// ==UserScript==
// @name         EkşiTime
// @namespace    https://github.com/mortyobnoxious/EksiTime
// @version      0.1
// @description  show "timesince" on eksisozluk
// @author       Morty
// @match        https://eksisozluk.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=eksisozluk.com
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


// date variables for config
let dconfig = {year: 'numeric', month: 'short', day: 'numeric'}
let tconfig = {hour: '2-digit', minute: '2-digit'}
let wconfig = {weekday: 'long'}

// time since function
const dD = (date, od=false) => {
	const units={yıl:31536e3,ay:2592e3,gün:86400,sa:3600,dk:60,sn:1};
	let nd=new Date;od&&(nd=new Date(od));
    let distance = Math.abs(new Date(date) - nd) / 1000;
    let count = 0, retMinus = false, span = "";
    Object.keys(units).forEach((unit) => {
        if (count >= 2 || (count == 1 && unit == "sn")) {return;}
        const interval = Math.floor(distance / units[unit]);
        let sign = new Date() > new Date(date) && retMinus && count === 0 ? "-" : "";
        if (interval > 0) {span += `${sign}${interval} ${unit} `;count++;}
        distance %= units[unit];
    });
    return span.trim();
};

// date parser from string
const parseDate = str => {
  const tsn = str.replace(' ~', '').split(/\W/g)
  const [d, m, y, h = "00", mi = "00", d1, m1, y1, h1, mi1] = tsn
  return [
    `${y}/${m}/${d} ${h}:${mi}`,
    `${tsn.length === 7 ? y : y1}/${tsn.length === 7 ? m : m1}/${tsn.length === 7 ? d : d1} ${tsn.length === 7 ? d1 : h1}:${tsn.length === 7 ? m1 : mi1}`
  ]
}

const nekadaronce = () => {
	$('.entry-date, .matter-date, #message-thread time').each(function(){
		let hrefen = $(this).attr('href');
		let [date, date1] = parseDate($(this).text())
		let editDate = dD(date1)?" ~ "+(dD(date1)).replace(dD(date), `<span style="color:#8798A5;opacity:.5;">${dD(date, date1)}<span>`):"";
		let vdistance = `${dD(date)}${editDate}`
		let rdate = new Date(date);
		let rdate1 = new Date(date1);
		let titleReadable = `${rdate.toLocaleDateString('tr', dconfig)},  ${rdate.toLocaleDateString('tr', wconfig)} ${rdate.toLocaleTimeString('tr', tconfig)}`
		let titleReadable1 = false;
		if (rdate1 instanceof Date && !isNaN(rdate1.valueOf())) {
			titleReadable1 = `\n${rdate1.toLocaleDateString('tr', dconfig)},  ${rdate1.toLocaleDateString('tr', wconfig)} ${rdate1.toLocaleTimeString('tr', tconfig)}`
		}
		$(this).closest('li, #quote-entry, .outgoing, .incoming').find('.nekadaronce').remove();
		$(this).closest('li, #quote-entry, .outgoing, .incoming').prepend(`<div class="nekadaronce" style="margin: 0 0 5px 0;">
<a href="${hrefen}" title="${titleReadable}${titleReadable1 || ""}">
<small style="padding: 2px 3px;font-size: 11px;">${vdistance}</small>
</a>
</div>`);

		$('.nekadaronce a[href="undefined"]').attr('href','javascript:void(0)');
	});
}
nekadaronce();


// Mutation Observer
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    $(mutation.addedNodes).find(".entry-date, .entry-share").each(function() {
		nekadaronce();
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
})();
