// ==UserScript==
// @name         Ekşimeh
// @namespace    https://github.com/mortyobnoxious/EksiTime
// @version      0.1
// @description  some eksisozluk improvements
// @author       Morty
// @match        https://eksisozluk.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=eksisozluk.com
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        GM.addStyle
// @grant        GM.xmlHttpRequest
// @connect      *
// ==/UserScript==

(function() {
    'use strict';

GM.addStyle(`
.flex-item {display: flex;flex-direction: column;position: fixed;background: #0f1622!important;padding: 5px 10px;border-radius: 6px;z-index: 9999999;box-shadow: 2px 2px 3px -1px rgba(2, 2, 2, 0.33);color: #8798A5!important;font-size: 16px!important;max-width: 400px!important;word-break: break-word;white-space: break-spaces;}
.flex-image {width: 100%;max-height: 200px;object-fit:cover;border-radius: 6px;}
.flex-title {font-size: 16px; color:#81C14B;padding:0!important;margin:0!important;}
.flex-item small {font-size:11px;opacity:.7;overflow: hidden;white-space: nowrap;word-break: break-all;text-overflow: ellipsis;}
.flex-description {font-size: 13px;line-height:1.3rem;}
.flex-item.loadingpr {background: transparent!important;display: inline-block;width: 50px;height: 50px;border: 3px solid rgba(255,255,255,.3);border-radius: 50%;border-top-color: #fff;animation: spin 1s ease-in-out infinite;-webkit-animation: spin 1s ease-in-out infinite;}

@keyframes spin {to { -webkit-transform: rotate(360deg); }}
@-webkit-keyframes spin {to { -webkit-transform: rotate(360deg); }}
`)

// get link preview function
function getLinkPreview(url) {
  return new Promise((resolve, reject) => {
    GM.xmlHttpRequest({
      method: "GET",
      url: url,
      onload: function(response) {
        try {
          const html = response.responseText;
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const title = doc.querySelector('meta[property="og:title"]')?.content || doc.querySelector('title')?.innerText;
          const description = doc.querySelector('meta[property="og:description"]')?.content || doc.querySelector('meta[name="description"]')?.content;
          const image = doc.querySelector('meta[property="og:image"]')?.content;
          let link = doc.querySelector('link[rel="canonical"]')?.href;
	  let forimdb = doc.querySelector('script[type="application/ld+json"]')?.innerText;
	  if (doc.querySelector('meta[property="og:site_name"]')?.content == "IMDb") {
	    forimdb = JSON.parse(forimdb)
	    let ar = forimdb.aggregateRating?.ratingValue || "";
	    let rc = forimdb.aggregateRating?.ratingCount?.toLocaleString('tr') || "";
	    let dircre = forimdb.director?.filter(item => item.name) || forimdb.creator?.filter(item => item.name)
	    link = `★ ${ar.toFixed(1)} (${rc}) ${forimdb.genre?.join(', ') || ""}
	    ${forimdb.duration ? "<br> ⏲ " + forimdb.duration.replace('PT','').toLowerCase().trim() : ""}
	    ${dircre ? "<br>" + dircre.map(person => person.name).join(', ') : ""}`;
	  }
          resolve({title, description, image, link});
        } catch (error) {
          reject(error);
        }
      },
      onerror: function(error) {
        reject(error);
      }
    });
  });
}

// function to trim and replace given string
function trimReplace(str, len=150) {
	str = str ? (str.trim().length > len) ? str.trim().substring(0, len) + "..." : str.trim() : "";
	str = str.replace(/Key, tempo of | \| Musicstax| - IMDb/gi, '')
	if (str.includes('Find the key and tempo for')) {str = ""}
	return str
}

// create div usig title, description etc.
function createDiv(el, title, description, image, link) {
	let isTweet = link?.includes('twitter.com')
	$('.flex-item').remove();
	var div = `<div class="flex-item">
               <img src="${image || ""}" class="flex-image">
               <h3 class="flex-title">${trimReplace(title)}</h3>
			   <small>${link || ""}</small>
               <span class="flex-description">${isTweet ? description : trimReplace(description, 250)}</span>
             </div>`;
	$(el).append(div);
	if (!title && !description && !image && !link) {
		$('.flex-item').empty().text('Önizleme bulunamadı!');
	}
}

// return top and left position for popup
function rTL(x, y) {
	var elementHeight = $('body').find(".flex-item").outerHeight(true);
	var elementWidth = $('body').find(".flex-item").outerWidth(true);
	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();
	var left = x - elementWidth - 10;
	if (left < 0) {left = x + 10;}
	if (left + elementWidth > viewportWidth) {left = viewportWidth - elementWidth;}
	var top = y - elementHeight - 10;
	if (top < 0) {top = y + 10;}
	if (top + elementHeight > viewportHeight) {top = viewportHeight - elementHeight;}
	return {top, left};
}

// create link preview on mouseover
$(document).on('mouseover', '.url', function(e){
	let href = $(this).attr('href');
	if (href.includes('twitter.com') && href.includes('/status/') ) {href = 'https://nitter.lacontrevoie.fr/i/status/' + href.split('status/').pop()}
	if (href.includes('open.spotify.com/track')) {href = 'https://musicstax.com/track/' + href.split('track/').pop()}
	$('body').append('<div class="flex-item loadingpr"></div>')
	if (!$(this).hasClass('dataadded') || $(this).attr('data-title') == "Error | nitter") {
		$(this).addClass('dataadded');

		getLinkPreview(href).then(preview => {
			let {title, description, image, link} = preview
			$(this).attr({
				'data-title': title,
				'data-description': description,
				'data-image': image,
				'data-link': link
			});
			createDiv($(this), title, description, image, link)
			let {top, left} = rTL(e.clientX, e.clientY)
			$(".flex-item").css({top, left});
		});
		return
	}
	createDiv($(this), $(this).attr("data-title"), $(this).attr("data-description"), $(this).attr("data-image"), $(this).attr("data-link"))
}).mousemove(function(e) {
	let {top, left} = rTL(e.clientX, e.clientY)
	$(".flex-item").css({top, left});
}).mouseout(function(e) {
	$('.flex-item').remove();
});

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

// nekadaronce function to add timesince and formatted date as title
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

// add hostname to urls if text doesn't contain url, fix http://https// links, 
const sourceURL = () => {
$('.url').each(function(){
	var newat = $(this).attr('href').replace('http://https//', 'https://');
	$(this).attr('href', newat);
	var hostname = $(this).prop('hostname').replace('www.','');
	if (!$(this).next().is('.sourceurl')) {
		if (!$(this).text().match(hostname)) {
			$(this).after('<sup class="sourceurl">('+hostname+')</sup>');
		}
	}
});
};
sourceURL();


// Mutation Observer
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    $(mutation.addedNodes).find(".entry-date, .entry-share").each(function() {
		nekadaronce();
	    	sourceURL();
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
})();
