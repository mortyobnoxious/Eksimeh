// ==UserScript==
// @name         Ekşimeh
// @namespace    https://github.com/mortyobnoxious/Eksimeh
// @version      1.8.9.3
// @description  some eksisozluk improvements
// @author       Morty
// @match        *://*.eksisozluk.com/*
// @match        *://*.eksisozluk111.com/*
// @icon         https://www.google.com/s2/favicons?sz=32&domain=eksisozluk.com
// @downloadURL  https://github.com/mortyobnoxious/Eksimeh/raw/main/eksimeh.user.js
// @updateURL    https://github.com/mortyobnoxious/Eksimeh/raw/main/eksimeh.user.js
// @grant        GM.addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM.xmlHttpRequest
// @connect      *
// ==/UserScript==

(function() {
	'use strict';

GM.addStyle(`
.flex-item {display: flex;flex-direction: column;position: fixed;background: #0f1622!important;padding: 5px 10px;border-radius: 6px;z-index: 9999999;box-shadow: 2px 2px 3px -1px rgba(2, 2, 2, 0.33);color: #8798A5!important;font-size: 16px!important;max-width: 400px!important;word-break: break-word;white-space: break-spaces;}
.flex-image {width: 100%;max-height: 200px;object-fit:cover;border-radius: 6px;}
.flex-image[src*="cdn.eksisozluk.com"], .jimage img {max-height: 500px;}
.jimage small {display:none!important;}
.flex-title {font-size: 16px; color:#81C14B;padding:0!important;margin:0!important;}
.flex-item small {display: flex;gap: 5px;}
.flex-item small span {font-size:11px;opacity:.7;overflow: hidden;white-space: nowrap;word-break: break-all;text-overflow: ellipsis;}
.flex-description {font-size: 13px;line-height:1.3rem;}
.flex-item.loadingpr, .loadingentries {background: transparent!important;display: inline-block;width: 50px;height: 50px;border: 3px solid rgba(255,255,255,.3);border-radius: 50%;border-top-color: #fff;animation: spin 1s ease-in-out infinite;-webkit-animation: spin 1s ease-in-out infinite;}

.popupMeh { position: fixed; top: 115px; left: 50%; transform: translate(-50%, 0); background-color: #141D26; border-radius: 5px; box-shadow: 2px 3px 3px rgba(0,0,0,0.52); width: 95vw; max-width: 650px;overflow: hidden;z-index: 9999;}
.popup-header { display: flex; align-items: stretch; justify-content: space-between;background: #243447;}
.popup-header h3 { margin: 0; font-size: 1.5em;padding: 3px 10px;color: #8798A5;}
.popup-header .close-button { font-size: 1.5em; font-weight: bold; border: none; background: transparent; cursor: pointer;color: #8798A5;padding: 3px 10px;transition: all .3s !important;user-select: none;height: 100%;align-items: center;display: flex;}
.popup-header .close-button:hover {background: #BE1E2D;}
.popup-content { display: flex; flex-wrap: wrap;padding: 15px;max-height: 400px;overflow-y: auto;}
.popup-buttons {display: flex;align-items: center;}
.popup-buttons a:hover {color: #5fca5f;transition: all .3s !important;}
.popup-buttons input#searchpopup {padding: .3rem .6rem;margin-left: auto;max-width: 150px;}

.popupMeh a {color: #81C14B;}
.popupMeh #entry-item-list {width: 100%;margin: 0;}
.popupMeh #entry-item-list #entry-item:not(:last-of-type) {border-bottom: 1px solid #00000d69;}
.popupMeh #entry-item-list #entry-item {position: relative;padding: 0;color: #8798A5;}
.popupMeh .info {display: flex;align-items: center;justify-content: space-between;float: none !important;}
.popupMeh .info .entry-footer-bottom {margin-left: auto;}
.popupMeh .favorite-links {display: flex !important;align-items: center;padding: 0 !important;margin: 0 !important;}
.popupMeh #entry-item-list .content {max-height: initial !important;}
.popupMeh.popImage .popup-content {padding: 0;}
.popupMeh.popImage img {width: 100%;object-fit: contain;max-height: 400px;}
.popup-content::-webkit-scrollbar {width: 0.4em;background-color:transparent;}
.popup-content::-webkit-scrollbar-thumb {background-color: #364859;border-radius:10px;}
.popupMeh #entry-item-list .content {font-size: 14px;}
.popupMeh #entry-item-list footer .feedback-container {float:none!important;}
.loadingentries {margin: auto !important;display: flex;}
.popupMeh .notdiv {background: #00000d69;}
.noteklediv {display: flex;flex-direction: column;gap: 10px;flex: 1;color: #8798A5;}
.noteklediv > div {display: flex;gap: 10px;align-items: center;flex-wrap: wrap;}
.noteklediv > div > label {min-width: 60px;}
.noteklediv > div > input, .noteklediv > div > textarea {flex: 1;max-width: 100%;}
.noteklediv .delnote {margin-left: auto;}
.noteklediv button {display: flex;justify-content: center;align-items: center;}
.noteklediv .buttons {display: none;margin-left: auto;gap: 4px;}
.noteklediv .allnotes:hover .buttons {display: flex;}
.noteklediv .allnotes {border-bottom: 1px dashed #243447;padding: 5px;}
.notes {gap:0}
.allnotes:hover {background: #243447;transition: all .3s;border-radius: 5px;}
.formatButs button {display: flex;justify-content: center;align-items: center;padding: 5px 10px !important;}
.formattedText, .kelimeler {display: block !important;word-wrap: anywhere;word-break: break-word;overflow-y: auto;max-height: 80px;border: 1px solid #1b2836 !important;border-radius: 8px;padding: .2rem .7rem;}
[data-c="0"] {display:none!important;}
.noteklediv input[name="yazar"][disabled] {background: #1b283652;}
.savenote.done::before, .delnote.done::before {content: "Kaydedildi";margin-right: 10px;color: #81C14B;}
.savenote.done svg, .delnote.done svg {transition: all .3s;transform: scale(1.5) rotate(45deg);color: #81C14B;}
.delnote.done::before {content: "Silindi";color: #BE1E2D;}
.delnote.done svg {color: #BE1E2D;}
.noteklediv > .kdiv {flex-wrap: nowrap;}
.kelimeler {display: flex !important;gap: 5px;flex-wrap: wrap;max-height: 200px;padding: 0;border: none !important}
.kelimeler span {cursor: pointer;padding: 2px 4px;border-radius: 6px;border: 1px solid #1b2836 !important;}
.dunbug + label {display: flex;justify-content: center;align-items: center;border-radius: 6px;border: 1px solid #1b2836 !important;transition: all .3s;cursor:pointer}
.dunbug {display:none;}
.dunbug:checked + label {background: #1b7a44;color: #B8C1C8;}
.nextprev {display: flex;height: 100%;align-items: center;padding: 0 5px;text-decoration:none!important;}
.nextprev:hover {background: #265d26;transition: all .3s;}
.randomentry {vertical-align: bottom;}
.addnote.prnote {display: inline-flex;border: 1px solid #141D26;border-radius: 50%;height: 32px;width: 32px;align-items: center;justify-content: center;}
#entry-item-list footer:active, .edittools:active {outline: 2px dashed #81c14b1c;}
.notdiv {position: absolute;background: #141d269e;padding: 5px 5px !important;border-radius: 5px;top: 5px;right: 0;font-size: 12px;cursor:pointer;display: flex !important;gap: 2px;}
.popupMeh input, .popupMeh select, .popupMeh button, .popupMeh textarea {background: transparent;color: #8798A5;border: 1px solid #1b2836!important;border-radius: 8px;padding: .7rem 1rem;resize: none;}
.popupMeh button:hover {background: #1b2836;cursor: pointer;transition: all .3s;}
.mehbuttons {display: flex!important;text-align: center;flex-wrap: wrap;}
.mehbuttons a {width: 25% !important;display: flex !important;padding: 10px !important;justify-content: center;align-content: center;}
.spoilit {display: inline-flex;align-items: center;gap: 4px;}
.sporotate {transform: rotate(180deg);transition: all .3s;}
mark.highlighted {border-radius: 5px;padding: 0 3px;background-color: #1b7a44;color: #B8C1C8;}
#video {display:none;}
.underline {text-decoration: underline;}
.popinactive {opacity: .3;pointer-events: none;}
.isyazar {font-size: 11px;margin-left: 8px;display: inline-block;}
.isyazar[title*="çaylak"] {transform: rotate(180deg);}
.avatar {overflow: hidden;}
@keyframes spin {to { -webkit-transform: rotate(360deg); }}
@-webkit-keyframes spin {to { -webkit-transform: rotate(360deg); }}
`)

// svgs from Bootstrap
const svgDUMB = (c, w=16, h=16) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" fill="currentColor" class="${c}" viewBox="0 0 16 16">`

const SVGs = {
"telegram": `${svgDUMB('bi bi-telegram')}
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
</svg>`,
"entryleri": `${svgDUMB('bi bi-arrow-bar-down')}
  <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
</svg>`,
"baslik": `${svgDUMB('bi bi-person-video')}
  <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2Zm10.798 11c-.453-1.27-1.76-3-4.798-3-3.037 0-4.345 1.73-4.798 3H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1.202Z"/>
</svg>`,
"notekle": `${svgDUMB('bi bi-journal-plus')}
  <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
</svg>`,
"html": `${svgDUMB('bi bi-filetype-html')}
  <path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5Zm-9.736 7.35v3.999h-.791v-1.714H1.79v1.714H1V11.85h.791v1.626h1.682V11.85h.79Zm2.251.662v3.337h-.794v-3.337H4.588v-.662h3.064v.662H6.515Zm2.176 3.337v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596H9.93L8.79 11.85h-.805v3.999h.706Zm4.71-.674h1.696v.674H12.61V11.85h.79v3.325Z"/>
</svg>`,
"edit": `${svgDUMB('bi bi-pencil-square')}
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>`,
"delete": `${svgDUMB('bi bi-trash')}
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>`,
"save": `${svgDUMB('bi bi-plus-circle')}
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>`,
"notesall": `${svgDUMB('bi bi-journal-bookmark-fill')}
  <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"/>
  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
</svg>`,
"spoiler": `${svgDUMB('bi bi-hourglass-top')}
  <path d="M2 14.5a.5.5 0 0 0 .5.5h11a.5.5 0 1 0 0-1h-1v-1a4.5 4.5 0 0 0-2.557-4.06c-.29-.139-.443-.377-.443-.59v-.7c0-.213.154-.451.443-.59A4.5 4.5 0 0 0 12.5 3V2h1a.5.5 0 0 0 0-1h-11a.5.5 0 0 0 0 1h1v1a4.5 4.5 0 0 0 2.557 4.06c.29.139.443.377.443.59v.7c0 .213-.154.451-.443.59A4.5 4.5 0 0 0 3.5 13v1h-1a.5.5 0 0 0-.5.5zm2.5-.5v-1a3.5 3.5 0 0 1 1.989-3.158c.533-.256 1.011-.79 1.011-1.491v-.702s.18.101.5.101.5-.1.5-.1v.7c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13v1h-7z"/>
</svg>`,
"dbleft":`${svgDUMB('bi bi-chevron-double-left')}
  <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
  <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
</svg>`,
"dbright":`${svgDUMB('bi bi-chevron-double-right')}
  <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
  <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
</svg>`,
"random": `${svgDUMB('bi bi-shuffle', 12, 12)}
  <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
  <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
</svg>`,
}

function baseHTML(title,divs) {
return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%2381c14b' viewBox='0 0 18 18'%3E%3Cpath d='M6.71981 17.3999C3.55072 17.3999 1 14.8492 1 11.6801C1 8.58831 6.71981 1.3999 6.71981 1.3999C6.71981 1.3999 12.4396 8.58831 12.4396 11.6801C12.4396 14.8492 9.88889 17.3999 6.71981 17.3999ZM6.71981 17.3999C6.7971 17.3999 6.7971 17.3999 6.71981 17.3999Z' stroke-width='1.3'%3E%3C/path%3E%3C/svg%3E" type="image/svg+xml"/>
<style type="text/css">
html {background: #1b2836;color: #8798A5;font-family: Calibri;}
body {width: 600px;max-width: calc(100% - 20px);margin: 10px auto 0 auto;counter-reset: debe;}
.gen {display: flex;flex-direction: column;background: #15212d;margin-bottom: 15px;box-shadow: 2px 3px 3px rgba(0,0,0,0.52);}
.entry {padding: 0 10px;line-height: 1.3;letter-spacing: .2;word-break: break-word;}
.footer {display: flex;justify-content: space-between;padding: 5px 5px;border-top: 1px solid #1b2836;margin-top: 5px;gap: 20px;}
.footer a {color: #5C6570;font-size: 12px;}
.footer a:last-child {border-left: 2px solid #1b2836;padding-left: 5px;}
.footer span[data-fav] {display: flex;align-items: center;justify-content: center;gap: 3px;font-size: 12px;color: #bdbdbd;}
.footer span[data-fav="0"] {opacity: 0;}
.footer > span:not([data-fav]) {display: flex;gap: 5px;align-items: center;}
.footer svg {width: 12px;height: 12px;fill: #1b2836;stroke: #bdbdbd;}
.avatar {width: 32px;height: 32px;border-radius: 50%;}
h1 {font-size: 1.1rem;background: #10171f;padding: 3px 8px;margin: 0 0 10px 0;}
h1 a {color: #A9894F;text-decoration: none;}
h1.debe {display: flex;align-items: center;gap: 5px;position: sticky;top: 0;}
h1.debe::before {content: counter(debe);counter-increment: debe;border-right: 1px solid #1b2836;padding-right: 5px;}
a {color: #81C14B;text-decoration: none;}
a:hover {color: #fff !important;transition: all .3s !important;}
.url {display: inline-flex;align-items: center;gap: 3px;}
.url::after {content: "🔗";font-size: 10px;}
.ab a::after {content: "("attr(data-query)")";font-size: 10px;}
.read-more {display: block;margin: 10px 0 0 0;font-style: italic;}
.read-more span {margin-right: 8px;background-color: #323f4b;border-radius: 10%;padding: 0 3px;color: #8798A5;}
.read-more + .more-text {display: none;}
</style>
</head>
<body>
${divs}
<script>
const ENTRY = document.querySelectorAll('.entry');
const H1 = document.querySelectorAll('.gen > h1');
function truncateNode(e,n=20){var t=e.innerHTML.match(/<[^>]+>|[^<>]+/g),i=t.slice(0,n).join(" "),n=t.slice(n,e.length).join(" ");e.innerHTML.length>i.length&&n.length>i.length&&(i=\`\${i} <a href="javascript:void(0);" onclick="readMore(this)" class="read-more"><span>...</span>devamını okuyayım</a><span class='more-text'>\${n}</span>\`,e.innerHTML=i)}
function readMore(e){e.nextSibling.replaceWith(...e.nextSibling.childNodes),e.remove()}
1<ENTRY.length&&H1.forEach(e=>{e.classList.add("debe")}),
ENTRY.forEach(e=>{truncateNode(e)});
</script>
</body>
</html>`
}

function entryHTML(title,entry,id,author,fav=0,date,avatar) {
return `<div class="gen">
<h1><a href="https://${window.location.hostname}/?q=${title}" target="_blank">${title}</a></h1>
<div class="entry">${entry}</div>
<div class="footer">
<span data-fav="${fav}"><svg class="eksico"><use xlink:href="#eksico-drop"><symbol id="eksico-drop" viewBox="0 0 14 19">
    <path d="M6.71981 17.3999C3.55072 17.3999 1 14.8492 1 11.6801C1 8.58831 6.71981 1.3999 6.71981 1.3999C6.71981 1.3999 12.4396 8.58831 12.4396 11.6801C12.4396 14.8492 9.88889 17.3999 6.71981 17.3999ZM6.71981 17.3999C6.7971 17.3999 6.7971 17.3999 6.71981 17.3999Z" stroke-width="1.3"></path>
  </symbol></use></svg>${fav}</span>
<span>
<a href="https://${window.location.hostname}/entry/${id}" target="_blank">${date}</a>
<a href="https://${window.location.hostname}/biri/${author}" target="_blank">@${author}</a>
<img class="avatar" src="${avatar}">
</span>
</div>
</div>`
}

class TampermonkeyStorage {
	constructor(key) {this.key = key;}
	modify(index, value) {
		let values = this.values;
		index === -1
		? values.push(value)
		: value
		? (values[index] = value)
		: values.splice(index, 1);
		GM_setValue(this.key, values);
	}
	removeAll() {GM_deleteValue(this.key);}
	findIndex(key, value) {return this.values.findIndex(key && value ? obj => obj[key] === value : item => item === key);}
	move(index, direction) {
		const values = this.values;
		const newIndex = (index + direction + values.length) % values.length;
		const [item] = values.splice(index, 1);
		values.splice(newIndex, 0, item);
		GM_setValue(this.key, values);
	}
	get values() {return GM_getValue(this.key) || []}
}

const notlarGM = new TampermonkeyStorage('notlar');
const HLIGHT = new TampermonkeyStorage('highglight');
const SETTINGS = new TampermonkeyStorage('settings');
const randENTRIES = new TampermonkeyStorage('entries');
const SEEN = new TampermonkeyStorage('seen');

const parser = new DOMParser();

function createPopup(title, div, eb="", cl="") {
  document.querySelector('.popupMeh')?.remove();
  const popup = document.createElement('div');
  popup.classList.add('popupMeh');
  cl?popup.classList.add(cl):null;
  popup.innerHTML = `<div class="popup-header"><h3>${title}</h3><span class="popup-buttons">${eb}<span class="close-button">&times;</span></span></div><div class="popup-content">${div}</div>`;
  document.body.appendChild(popup);
  const closeButton = popup.querySelector('.close-button');
  document.addEventListener('click', event => {
	if (!popup.contains(event.target) || event.target === closeButton) {
	  popup.remove();
	}
  });
}

function saveAs(title, data, ext) {
  const blob = new Blob([data], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${title}.${ext}`;
  link.click();
}

// get link preview function
function getLinkPreview(url) {
  return new Promise((resolve, reject) => {
	GM.xmlHttpRequest({
	  method: "GET",
	  url: url,
	  onload: function(response) {
		try {
		  const html = response.responseText;
		  const doc = parser.parseFromString(html, 'text/html');
		  const title = doc.querySelector('meta[property="og:title"]')?.content || doc.querySelector('title')?.innerText;
		  const description = doc.querySelector('meta[property="og:description"]')?.content || doc.querySelector('meta[name="description"]')?.content;
		  let image = doc.querySelector('meta[property="og:image"]')?.content;
		  let link = doc.querySelector('link[rel="canonical"]')?.href;
		  let forimdb = doc.querySelector('script[type="application/ld+json"]')?.innerText;
		  if (doc.querySelector('meta[property="og:site_name"]')?.content == "IMDb") {
			  forimdb = JSON.parse(forimdb)
			  let ar = forimdb.aggregateRating?.ratingValue?.toFixed(1) || "";
			  let rc = forimdb.aggregateRating?.ratingCount?.toLocaleString('tr') || "";
			  let dircre = forimdb.director?.filter(item => item.name) || forimdb.creator?.filter(item => item.name)
			  link = `★ ${ar} (${rc})${forimdb.duration ? " | ⏲ " + forimdb.duration.replace('PT','').toLowerCase().trim() : ""} | ${forimdb.genre?.join(', ') || ""}
			  ${dircre ? "<br>📽 " + dircre.map(person => person.name).join(', ') : ""}`;
		  }
		  let contentType = response.responseHeaders.match(/content-type:\s*(.*?)\s*$/im)[1];
		  if(contentType.startsWith("image/")) {
			  image = response.finalUrl
			  link = 'jimage'
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
	if (str.includes('on Instagram')) {str = str.replace(' on Instagram','').replace(/(\n|\s\s+)/g, ' ')}
	return str
}

// create div usig title, description etc.
function createDiv(title, description, image, link) {
	let isTweet = link?.includes('twitter.com')
	$('.flex-item').remove();
	let div = `<div class="flex-item${link=='jimage'?' jimage':''}">
			   <img src="${image || ""}" class="flex-image">
			   <h3 class="flex-title">${trimReplace(title)}</h3>
			   <small>${link?.includes('http') ? '<img src="https://www.google.com/s2/favicons?domain='+(new URL(link))?.hostname+'">' : ""}${link ? '<span>'+link+'</span>' : ""}</small>
			   <span class="flex-description">${isTweet ? description : trimReplace(description, 250)}</span>
			 </div>`;
	$('body').append(div);
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
$(document).on('mouseover', '.url:not(.formata)', function(e){
	let href = $(this).attr('href').replace('x.com/', 'twitter.com/');
	if (href.includes('twitter.com') && href.includes('/status/') ) {href = 'https://nitter.privacydev.net/i/status/' + href.split('status/').pop()}
	if (href.includes('open.spotify.com/track')) {href = 'https://musicstax.com/track/' + href.split('track/').pop()}
	$('body').append('<div class="flex-item loadingpr"></div>')
	if (!$(this).hasClass('dataadded') || $(this).attr('data-title') == "Error") {
		$(this).addClass('dataadded');

		getLinkPreview(href).then(preview => {
			let {title, description, image, link} = preview
			$(this).attr({
				'data-title': title,
				'data-description': description,
				'data-image': image,
				'data-link': link
			});
			createDiv(title, description, image, link)
			let {top, left} = rTL(e.clientX, e.clientY)
			$(".flex-item").css({top, left});
		});
		return
	}
	createDiv($(this).attr("data-title"), $(this).attr("data-description"), $(this).attr("data-image"), $(this).attr("data-link"))
}).mousemove(function(e) {
	let {top, left} = rTL(e.clientX, e.clientY)
	$(".flex-item").css({top, left});
}).mouseout(function(e) {
	$('.flex-item').remove();
});


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

const formattedDate = (d) => {
	// date variables for config
	let dconfig = {year: 'numeric', month: 'short', day: 'numeric'}
	let tconfig = {hour: '2-digit', minute: '2-digit'}
	let wconfig = {weekday: 'long'}
	return `${d.toLocaleDateString('tr', dconfig)},  ${d.toLocaleDateString('tr', wconfig)} ${d.toLocaleTimeString('tr', tconfig)}`
}

// function to add timesince and formatted date as title
const howLongAgo = () => {
	$('.entry-date, .matter-date, #message-thread time').each(function(){
		let hrefen = $(this).attr('href');
		let [date, date1] = parseDate($(this).text())
		let editDate = dD(date1)?" ~ "+(dD(date1)).replace(dD(date), `<span style="color:#8798A5;opacity:.5;">${dD(date, date1)}<span>`):"";
		let vdistance = `${dD(date)}${editDate}`
		let rdate = new Date(date);
		let rdate1 = new Date(date1);
		let titleReadable1 = false;
		if (rdate1 instanceof Date && !isNaN(rdate1.valueOf())) {
			titleReadable1 = formattedDate(rdate1)
		}
		let els = $(this).closest('li, #quote-entry, .outgoing, .incoming');
		$(els).find('.nekadaronce').remove();
		$(els).prepend(`<div class="nekadaronce" style="margin: 0 0 5px 0;">
<a href="${hrefen}" title="${formattedDate(rdate)}\n${titleReadable1 || ""}">
<small style="padding: 2px 3px;font-size: 11px;">${vdistance}</small>
</a>
</div>`);

		$('.nekadaronce a[href="undefined"]').attr('href','javascript:void(0)');
	});
}
howLongAgo();

// add hostname to urls if url text doesn't contain hostname, fix http://https// links
const sourceURL = () => {
$('.url:not(.formata)').each(function(){
	let href = $(this).attr('href').replace('http://https//', 'https://');
	$(this).attr('href', href);
	let hostname = $(this).prop('hostname').replace('www.','');
	if (!$(this).next().is('.sourceurl')) {
		if (!$(this).text().match(hostname)) {
			$(this).after(`<sup class="sourceurl">(${hostname})</sup>`);
		}
	}

	// remove twitter tracking
	let tw = /(?:twitter\.com|x\.com)\/\w+\/status\//gi.test(href);
	if (tw) {$(this).attr('href', href.replace(/(\?s=|\?t=|\?ref=|\?ref_src=).*/,""))}
});
};
sourceURL();

// check until element exist
function checkElExist(el, callback) {
	let elCheck = setInterval(function() {
		if ($(el).length) {
			clearInterval(elCheck);
			callback();
		}
	}, 100);
}

const addButtons = () => {
	$('#entry-item-list li').each(function() {
		let { author, id } = $(this).data();
		let title = $('link[rel="canonical"]').attr('href') || $(this).closest('.topic-item, #topic').find('#title a').attr('href');
		let el = $(this).find('.feedback-container');
		checkElExist(el, function() {
			if (el.find('.entry-share .dropdown-menu .mehbuttons').length) {return}
			el.find('.entry-share .dropdown-menu').prepend(`<li class="mehbuttons">
<a href="/biri/${author}/usertopic" class="flat-button wtfbutton addnosk" title="yazarın başlığı">${SVGs.baslik}</a>
<a href="${title}?a=search&author=${author}" class="flat-button wtfbutton addnosk" title="başlıktaki entryleri">${SVGs.entryleri}</a>
<a href="https://${window.location.hostname}/entry/${id}" class="flat-button wtfbutton addnosk savehtml" title="html olarak kaydet">${SVGs.html}</a>
<a href="tg://msg_url?url=https://${window.location.hostname}/entry/${id}" class="flat-button wtfbutton addnosk" title="telegram'da paylaş">${SVGs.telegram}</a>
<a href="#" class="addnote flat-button wtfbutton addnosk" title="not ekle" data-author="${author}">${SVGs.notekle}</a>
</li>`);
		});
	});
}
addButtons();


const modifyDOM = {
	addOtherLinks() {
		// $('#top-navigation > ul').append(`<li><a href="#" class=""eksimehSettings title="ekşimeh"><svg class="eksico"><use xlink:href="#eksico-gear"></use></svg></a></li>`);

		$('#top-navigation .dropdown-menu li:not(.separated):last, #top-navigation #options-dropdown li:not(.separated):last').before(`
<li><a href="#" class="addwordsdiv flat-button wtfbutton addnosk" title="kelime ekle">kelime ekle</a></li>
<li><a href="#" class="shownotes flat-button wtfbutton addnosk" title="kelime ekle">notlar</a></li>
`);
		$('.sub-title-menu').append(`
${$('#video').length?'<a class="togglevideo" href="#">video</a>':""}
`)
		let author = $('#user-profile-title').attr('data-nick');
		$('.sub-title-menu.profile-buttons').append(`
<a href="#" class="addnote prnote eksico" title="not ekle" data-author="${author}">${SVGs.notekle}</a>
`);
	},

	linksForSolFrame() {
		if(!$(".getfromsozlock").length) {
			$("h2:contains(dünün en beğenilen entry'leri)").append('<a class="getfromsozlock" href="https://sozlock.com/" target="_blank" style="margin: 0 5px;font-size: 14px;" title="sozlock\'tan debe al">sozlock</a></a>');
		}
	},
	removeThings() {
		let cl = `[class*="ad-double-click"], .bottom-ads, .under-top-ad, [id*="sponsored"], [id*="nativespot-unit"], #sticky-ad, #sticky-criteo, [id*="reklam"], .under-top-ad`;
		$(cl).remove();
	}


}
Object.values(modifyDOM).forEach(fn => fn());

// get debe list from sozlock
function getSozlockDebe() {
  return new Promise((resolve, reject) => {
	GM.xmlHttpRequest({
	  method: "GET",
	  url: "https://sozlock.com/",
	  onload: function(response) {
		const parsedHTML = parser.parseFromString(response.responseText, "text/html");
		const sozlockEntries = $(parsedHTML).find('.entrylist li').map(function() {
			let [id, title] = [
				$(this).find('.basliklogo a').attr('href').replace(/^.*\/\/[^\/]+/, ''),
				$(this).find('h3').text().replace(/^\d+\./, "")
			];
		  return `<li class="sozlock"><a href="${id}">${title}</a></li>`;
		}).get().join("");

		resolve(sozlockEntries);
	  },
	  onerror: function(response) {
		reject(response.statusText);
	  }
	});
  });
}

$(document).on('click', '.getfromsozlock', function(e) {
  e.preventDefault();
  $(this).toggleClass('underline');

  const topicList = $(this).closest('#content-body, #index-section').find('.topic-list');
  topicList.addClass('loadingentries');
  topicList.find('li').toggle();

  if ($('li.sozlock').length) {
	topicList.removeClass('loadingentries');
	return false;
  }

  getSozlockDebe().then(sozlockEntries => {
	  topicList.append(sozlockEntries);
	  topicList.removeClass('loadingentries');
	}).catch(error => {
	  topicList.removeClass('loadingentries');
	  console.error(error);
	});
});


function checkYazar(yazar) {
  return new Promise((resolve, reject) => {
	GM.xmlHttpRequest({
	  method: "GET",
	  url: "/biri/"+yazar,
	  onload: function(response) {
		const parsedHTML = parser.parseFromString(response.responseText, "text/html");
		if ($(parsedHTML).find('#user-profile-title a').length) {
			let yazar = $(parsedHTML).find('#user-text-badges').text().trim().includes('çaylak')?'çaylak':'yazar';
			let link = $(parsedHTML).find('#user-profile-title a').attr('href').replace('/usertopic','');
			let karma = $(parsedHTML).find('.muted').text().trim()
			let hakkinda = $(parsedHTML).find('#profile-biography').text().trim()
			let totalEntry = $(parsedHTML).find('#entry-count-total').text().trim()
			let followers = $(parsedHTML).find('#user-follower-count').text().trim()
			let followings = $(parsedHTML).find('#user-following-count').text().trim()
			let ret = `${yazar} ${karma?` - ${karma}`:''}\n${totalEntry} entry\n${followers} takipçi\n${followings} takip`
			resolve({ret, link});
		}
	  },
	  onerror: function(response) {
		reject(response.statusText);
	  }
	});
  });
}

function checkIfYazar() {
let h1 = $('#topic h1#title')
if($('.home-page-entry-list').length) return
let title = $(h1).attr('data-slug')
if (title) {
	checkYazar(title).then(ret => {
		$(h1).append(`<a class="isyazar" title="${ret.ret}" href="${ret.link}"><svg class="eksico"><use xlink:href="#eksico-me"></use></svg></a>`);
	}).catch(error => {
		console.log(error)
	});
}
}
checkIfYazar()

$(document).on('click', '.togglevideo', function(e){
	e.preventDefault();
	$(this).toggleClass('underline');
	$('#video').toggle();
});

function retYazarIndex(yazar) {
	return notlarGM.findIndex("yazar", yazar)
}

function formatText(text) {
return text.replace(/\#(\d+)/gi, '<a class="b formata" href="/entry/$1">#$1</a>').replace(/(\`(.*?)\`)/gi, '<a class="b formata" href="/?q=$2">$2</a>').replace(/(\[(\S+) (.*?)\])/gi, '<a class="url formata" href="$2" target="_blank">$3</a>')
}

function allNotes(ret=false) {
	if (ret) {return}
	let divs = "";
	$.each(notlarGM.values, function(index, value) {
		let {yazar, not} = value;
		divs += `<div class="allnotes">
<div>
<div><a href="/biri/${yazar}">${yazar}</a></div>
<div>${formatText(not)}</div>
</div>
<div class="buttons">
<button class="delnote" data-author="${yazar}" data-tf="false" title="sil">${SVGs.delete}</button>
<button class="addnote" data-author="${yazar}" title="düzenle">${SVGs.edit}</button>
</div>
</div>`;
	});
	let notes = `<div class="noteklediv notes">${divs}</div>`
	let input = `<input type="text" id="searchpopup" placeholder="ara..." autocomplete="off"/>`
	createPopup(`Notlar (${notlarGM.values.length})`, notes, input)

}

$(document).on('input', '#searchpopup', function(e){
  let searchedText = $(this).val();
  $(".notes > .allnotes").hide().filter(`:contains("${searchedText}")`).show();
});


$(document).on('click', '.shownotes', function(e){
	e.preventDefault();
	allNotes()
});

$(document).on('click', '.addnote', function(e){
	if ($(e.target).hasClass('formata')) {return}
	e.preventDefault();
	let author = $(this).attr('data-author');
	let entryid = $(this).closest('li#entry-item').attr('data-id');
	let ind = retYazarIndex(author)
	let not = notlarGM.values[ind]?.not || "";
	let inputs = `<div class="noteklediv"><div><label for="yazar"><a href="/biri/${author}">yazar</a></label><input value="${author}" name="yazar" type="text" disabled/></div>
<div><label for="not">not</label><textarea id="nottextarea" name="not" rows="3">${not}</textarea></div>
<div>
<label>önizleme</label><div class="formattedText" data-c="0">${formatText(not)}</div></div>
<div class="formatButs">
${entryid?`<button title="entry id" data-g="#${entryid}">#id</button>`:''}
<button title="bkz" data-g="\`\`">hede</button>
<button title="link" data-g="[url text]">http://</button>
<button title="raptiye" data-g="📌">📌</button>
<button title="kaka" data-g="💩">💩</button>
<button title="baş aşağı yüz" data-g="🙃">🙃</button>
<button title="düşünen yüz" data-g="🤔">🤔</button>
<button title="futbol topu" data-g="⚽">⚽</button>
</div>
<div>
<button class="shownotes" title="tüm notlar">${SVGs.notesall}</button>
<button class="delnote" data-author="${author}" data-tf="true" title="sil">${SVGs.delete}</button>
<button class="savenote" title="kaydet">${SVGs.save}</button></div></div>`
	createPopup("Not Ekle", inputs)
	$('#nottextarea').focus().val('').val(not).trigger('input');
});

$(document).on('input', '#nottextarea', function(e){
	let text = formatText($(this).val())
	$('.formattedText').html(text).attr('data-c',text.length)
});

$(document).on('click', '.formatButs button', function(e){
	e.preventDefault();
	let g = $(this).attr('data-g');
	let ae = $('#nottextarea').val();
	if (ae.length>0) {ae = ae + " "}
	$('#nottextarea').val(ae + g).trigger('input').focus();s
});

$(document).on('click', '.savenote', function(e){
	e.preventDefault();
	let data = {
		yazar: $("input[name='yazar']").val(),
		not: $("textarea[name='not']").val()
	};
	let ind = retYazarIndex(data.yazar);
	if (data.not) {
		notlarGM.modify(ind, data);
		appendNotes(true);
		$(this).addClass('done');
		setTimeout(() => { $('.popupMeh').fadeOut('fast') }, 1200);
	}
});

$(document).on('click', '.delnote', function(e){
	e.preventDefault();
	let author = $(this).attr('data-author');
	let tf = $(this).attr('data-tf');
	tf = tf=="true"?true:false;
	let ind = retYazarIndex(author);
	if (ind != -1) {
		if (confirm("?")) {
		notlarGM.modify(ind);
		appendNotes(true);
		allNotes(tf);
		$(this).addClass('done');
		if (tf) {
			setTimeout(() => { $('.popupMeh').fadeOut('fast') }, 1200);
		}
		}
	}
});

function appendNotes(update=false) {
	$('.entry-author').each(function(){
		if ($(this).hasClass('added') && !update) {return}
		if (update) {$(this).prev('.notdiv').remove()}
		let author = $(this).text().trim();
		let not = notlarGM.values[retYazarIndex(author)]?.not
		if (not) {
			$(this).addClass('added');
			$(this).before(`<div class="notdiv addnote" data-author="${author}">${formatText(not)}</div>`)
		}
	});
}
appendNotes();

$.fn.nextUntilWithTextNodes = function (until) {
	var matched = $.map(this, function (elem, i, until) {
		var matched = [];
		while ((elem = elem.nextSibling) && elem.nodeType !== 9) {
			if (elem.nodeType === 1 || elem.nodeType === 3) {
				if (until && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	}, until);

	return this.pushStack(matched);
};

const spoilerOp = () => {
		$('#entry-item-list li .content, #icerik li .content').each(function(){
			var _this = $(this);
			var as = $(this).find('a.b[href*="spoiler"], a.b[href*="al%c4%b1nt%c4%b1"]');
			var asd = $(this).find('.spoiler');
			if ($(as).length && !$(asd).length) {
				$(as).eq(0).addClass('spoilit spf').append(SVGs.spoiler);
				$(as).eq(-1).addClass('spl').not('.spf').css('display', 'none');
				$(_this).each(function(){
					$(this).find('.spf').nextUntilWithTextNodes(".spl").wrapAll('<span class="spoiler" style="display:none;"></span>');
				});
			}
		});
}

spoilerOp();

$(document).on('click', '.spoilit', function(e){
	e.preventDefault();
	$(this).next('.spoiler').toggle();
	$(this).closest(".content").css({"overflow": "visible", "max-height": "none"});
	$(this).find('.bi-hourglass-top').toggleClass('sporotate');
	$(this).closest('li').find('.read-more-link-wrapper a')[0]?.click();
	$(this).closest('li').find('.spl').not('.spf').toggle();
});

function checkEntry(url) {
	return new Promise(function(resolve, reject) {
	GM.xmlHttpRequest({
		method: "GET",
		url: url,
		onload: function(response) {
			let pos = parser.parseFromString(response.responseText, "text/html");
			let entries = $(pos).find('#entry-item-list');
			if ($(entries).find('#entry-item').length) {
				$(entries).find('#entry-item').each(function() {
					let favCount = $(this).attr('data-favorite-count');
					$(this).find('.info').prepend(`${Number(favCount)>0?`<span class="favorite-links"><svg class="eksico"><use xlink:href="#eksico-drop"></use></svg> ${favCount}</span>`:""}`);
				});
				let h1 = $(pos).find('#title a')
				let title = `<a href="${h1.attr('href')}">${h1.text().trim()}</a>`
				entries = entries.html();
				resolve({title, entries})
			} else {
				resolve("nope")
			}
		},
	});
	});
}

$(document).on('click', '.savehtml', function(e){
    e.preventDefault();
    let href = $(this).attr('href');
    checkEntry(href).then(function(w) {
    let entries = ""
    $(w.entries).filter('li').each(function(i, entry) {
        let id = $(entry).attr('data-id');
        let author = $(entry).attr('data-author');
        let fav = $(entry).attr('data-favorite-count');
        let content = $(entry).find('.content').html().replace(/href="\//g, `href="https://${window.location.hostname}/`).replace(/class="b"/g,'class="b" target="_blank"');
        let date = $(entry).find('.entry-date').text().trim();
        let avatar = $(entry).find('.avatar').attr('src').replace('/Content/',`https://${window.location.hostname}/Content/`);
        entries += entryHTML($(w.title).text(), content, id, author, fav, date, avatar);
    });
    saveAs($(w.title).text(), baseHTML($(w.title).text(), entries), "html");
    });

});

function toggleKeydownEvents(add) {
  let keydownCallback = e => {
	if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
	if (e.which == 37) $('.prevbut, .prevbutimg')?.trigger('click');
	else if (e.which == 39) $('.nextbut, .nextbutimg')?.trigger('click');
	else if (e.keyCode === 27) $(".popupMeh")?.remove();
	else if (e.keyCode === 82) $(".randomentry a")?.focus().trigger('click');
  }
  add ? $(document).on('keydown', keydownCallback) : $(document).off('keydown', keydownCallback);
}
toggleKeydownEvents(true)

function prevNext(clicked) {
	let el = $(`.topic-list a[href="${clicked}"]`).closest('li:visible');
	let li = el.hasClass('new-update')?'li.new-update':'li:visible'
	let prev = $(el).prev(li).children('a');
	let next = $(el).next(li).children('a');
	$(el).find('a').not('a[href*="?a=tracked&snapshot="]').css('opacity','.4');
	let butts = `${prev.length?`<a class="nextprev prevbut" href="${prev.attr('href')}" title="${prev.text().replace(/\s*\d+\s*$/, '').trim()}">${SVGs.dbleft}</a>`:''}${next.length?`<a class="nextprev nextbut" href="${next.attr('href')}" title="${next.text().replace(/\s*\d+\s*$/, '').trim()}">${SVGs.dbright}</a>`:''}`
	return butts
}

function checkOlay(el) {
	$(`a[href="${el}"]`).addClass("empty-index-item").parent().removeClass('new-update').find("small").remove();
	if (!$('.topic-list .new-update').length) {
		$('.tracked a').removeClass("new-update").find('svg').html('<use xlink:href="#eksico-events-tracked"></use>');
		$('.nextprev').remove();
	}
}

let hrefsForPopup = `a.url[href*=".com/entry/"], a[href*="?searchform.author="], a.b[href^="/?q="][href*="%2f"], a.b[href*="%2f%40"], .stats a[href^="/?q="], a[href*="?day="], .new-update a, a[href^="/entry/"], a[href$="?a=buddyrecent"], .nextbut, .prevbut`;
let hrefstoReturn = `a.b[href*="sorular%c4%b1n%c4%b1z%c4%b1+yan%c4%b1tl%c4%b1yor"][href*="%40"], a.b[href*="yan%c4%b1tl%c4%b1yorum"][href*="%40"], .svgico-facebook, .svgico-twitter, #whatisclicked, #site-footer a, .entry-date.permalink, #show-caylak-favs-link, a[href*="/entry/duzelt/"], .last, .next, .prev, .gotodate, #in-topic-search-options a[href*="?day="]`;

// entryleri popup içinde aç
$(document).on('click', hrefsForPopup, function(e){
	let _this = $(this);
	if (($(_this).is(hrefstoReturn)) || ($(_this).find('small').text() >= 11) || e.ctrlKey) { return }
	e.preventDefault();
	let href = $(_this).attr("href").replace('www.','');
	createPopup("", `<div class="loadingentries"></div>`, prevNext(href));
	checkEntry(href).then(function(w) {
		if (w == "nope") {
			createPopup(`<small style="color: #E62537;">böyle bir entry yok. hiç olmadı ki...</small>`, ``, prevNext(href))
			return
		}
		let {title, entries} = w;
		createPopup(title, `<ul id="entry-item-list">${entries}</ul>`, prevNext(href))
		if ($(_this).is('[href*="tracked&snapshot"]')) { checkOlay(href) }
	});

});

function checkImage(url) {
	return new Promise(function(resolve, reject) {
	GM.xmlHttpRequest({
		method: "GET",
		url: url,
		onload: function(response) {
			let pos = parser.parseFromString(response.responseText, "text/html");
			if ($(pos).find('meta[property="og:image"]').length) {
				let image = $(pos).find('meta[property="og:image"]').attr('content');
				resolve(image)
			} else {
				resolve("noimage")
			}
		},
	});
	});
}

function retNextPrevClick(a) {
    let icon = a ? "&#62;&#62;" : "&#60;&#60;";
    let action = a ? "#topic .pager .next" : "#topic .pager .prev";
    let isActive = document.querySelector(action) ? " active":" popinactive"
    return `<a href="#" class="nextprev${isActive}" onclick="document.querySelector('${action}')?.click(); return false;">${icon}</a>`;
}

// görselleri popup içinde aç
$(document).on('click', 'a.url[href*="soz.lk/i"], .url[href*="eksisozluk.com/img/"], .prevbutimg, .nextbutimg', function(e){
	if (e.ctrlKey) { return }
	e.preventDefault();
	let IMGS = [];
	let thisImg = $(this).attr('href') || $(this).attr('data-href');
	let li = $(`a.url[href*="${thisImg}"]`).closest('#entry-item');
	let yazar = $(li).attr('data-author');
	let entry = $(li).attr('data-id');
	let info = `<a href="/entry/${entry}" style="font-size: 14px;"><svg class="eksico" id="svg-hashtag"><use xlink:href="#eksico-hashtag"></use></svg></a> <a href="/biri/${yazar}">@${yazar}</a>`
	$('a.url[href*="soz.lk/i"], .url[href*="eksisozluk.com/img/"]').each(function(){
		let href = $(this).attr('href');
		if (!IMGS.includes(href)) {
			IMGS.push(href);
		}
	});

	let indexImg = IMGS.indexOf(thisImg);
	let prevImg = IMGS[(indexImg - 1 + IMGS.length) % IMGS.length];
	let nextImg = IMGS[(indexImg + 1) % IMGS.length];
	let exbuttons = `<span>${indexImg+1}/${IMGS.length}</span>${retNextPrevClick()}
<a class="nextprev prevbutimg" data-href="${prevImg}">${SVGs.dbleft}</a>
<a class="nextprev nextbutimg" data-href="${nextImg}">${SVGs.dbright}</a>${retNextPrevClick(true)}`
	IMGS.length <= 1 ? (exbuttons = '') : null;
	createPopup(info, `<div class="loadingentries"></div>`, exbuttons, 'popImage');
	checkImage(IMGS[indexImg]).then(function(image) {
	if (image == "noimage") { alert("görsel bulunamadı!"); return }
		createPopup(info, `<img src="${image}"/>`, exbuttons, 'popImage')
	});
});

function solFrameHighlight() {
	let options = {year: 'numeric', month: 'long', day: 'numeric'};
	let today = new Date();
	let todayTR = today.toLocaleDateString("tr-TR", options)

	let yesterday = today-today.setDate(today.getDate()-1);
	let yesterdayTR = today.toLocaleDateString("tr-TR", options)
	let dunbugAR = [];
	SETTINGS.findIndex('bugün')>=0&&dunbugAR.push(todayTR)
	SETTINGS.findIndex('dün')>=0&&dunbugAR.push(yesterdayTR)
	let arrayToHighlight = [...dunbugAR, ...HLIGHT.values]
	let reg = arrayToHighlight.map((a) => `(${a.replace(/([()])/g,'\\$1')})`).join('|');
	reg = new RegExp(reg, 'gi')
	if (!arrayToHighlight.length) return
	$('.topic-list li a, #channel-follow-list li a').each(function(){
		if ($(this).find('.highlighted').length) return
		let small = $(this).find('small, .detail').prop('outerHTML');
		let text = $(this).clone().children(':not(.caption)').remove().end().text();
		let replacedt = text.replace(reg, '<mark class="highlighted">$&</mark>')
		if (!small) {small = ""}
		$(this).empty().append(replacedt+small);
	});
}
solFrameHighlight();

// get highlighted channels to top
$("#channel-follow-list li a mark").each(function() {
	let el = $(this).closest('li');
	$(this).closest('ul').prepend(el);
});

// add background to active title on solframe
const solframeActive = () => {
	let title = $('#topic #title a').attr('href');
	if(title) {
		$(`.topic-list li a[href^="${title}"`).css('background-color', '#141D26');

	}
};
solframeActive();

function appendWords(ap=false) {
	let spans = HLIGHT.values.map((a) => `<span title="silmek için çift tıkla">${a}</span>`).join('');
	let div = `<div class="kelimeler" data-c="${HLIGHT.values.length}">
${spans}
</div>`;
	if (ap) {
		$('.kelimeler').remove();
		$('.kdiv').append(div)
	} else {
		return div
	}
}

$(document).on('click', '.addwordsdiv', function(e){
	e.preventDefault();
	let div = `<div class="noteklediv"><div><label for="kelime">kelime</label><input name="kelime" type="text" placeholder="sol frame'de vurgulanacak kelime ekle"><button class="addwords">ekle</button></div>
<div class="kdiv">
<label>kelimeler</label>
${appendWords()}
</div>
<div>
<label>diğer</label>
<input class="dunbug" type="checkbox" id="bugun" name="bugun" value="bugün" ${SETTINGS.findIndex('bugün')>=0?"checked='true'":""}>
<label for="bugun" title="sol frame'de bugünün tarihini vurgula">bugün</label>
<input class="dunbug" type="checkbox" id="dun" name="dun" value="dün" ${SETTINGS.findIndex('dün')>=0?"checked='true'":""}>
<label for="dun"" title="sol frame'de dünün tarihini vurgula">dün</label>
</div>
</div>`;
	createPopup("Kelime Ekle", div)

});

$(document).on('click', '.addwords', function(e){
	e.preventDefault();
	let word = $('input[name="kelime"]').val().trim();
	if (word) {
		let ind = HLIGHT.findIndex(word);
		HLIGHT.modify(ind, word);
		appendWords(true);
		solFrameHighlight();
		$('input[name="kelime"]').val("");
	}
});

$(document).on('dblclick', '.kelimeler > span', function(e){
	e.preventDefault();
	let word = $(this).text().trim();
	let ind = HLIGHT.findIndex(word);
	HLIGHT.modify(ind);
	appendWords(true);
	solFrameHighlight();
});

$(document).on('change', '.dunbug', function(e){
	let key = $(this).val();
	let val = $(this).prop("checked")
	if (val) {
		let ind = SETTINGS.findIndex(key);
		SETTINGS.modify(ind, key);
	} else {
		let ind = SETTINGS.findIndex(key);
		SETTINGS.modify(ind);
	}
	solFrameHighlight();
});

// homepage entries
function homePage() {
	$('.home-page-entry-list #entry-item').each(function(){
		let entryid = $(this).attr('data-id');
		if (entryid) {
			let ind = randENTRIES.findIndex(entryid);
			randENTRIES.modify(ind, entryid);
		}
	});
	let maxLen = 1000;
	let len = randENTRIES.values.length
	if (randENTRIES.values.length >= maxLen) {
		let spliced = randENTRIES.values.splice(len-maxLen);
		GM_setValue(randENTRIES.key, spliced);
	}
}
homePage()

function randomEntryAppend() {
	let ind = Math.floor(Math.random() * randENTRIES.values.length);
	let randValInd = randENTRIES.values[ind]
	$('.randomentry').remove();
	let randEntryHtml = `<li class="randomentry"><a title="random entry (${randENTRIES.values.length})\ntıkla yada r\'ye bas${!randValInd?'\nhiç entry yok anasayfaya daha fazla uğramalısın':''}" href="/entry/${randValInd || '1'}" data-id="${randValInd || '1'}">${SVGs.random}</a></li>`;
	if ($('#top-login-link').length) { // eğer giriş yapılmamışsa
		$('#top-login-link').parent().before(randEntryHtml);
	} else {
		$('#top-navigation .tracked').after(randEntryHtml);
	}
}
randomEntryAppend();

// click to open a random entry
$(document).on('click', '.randomentry a', function(e){
	e.preventDefault();
	let thisID = $(this).attr('data-id');
	if (thisID !== '1') {
		let ind = randENTRIES.findIndex(thisID);
		randENTRIES.modify(ind);
		randomEntryAppend();
	}
});

$(document).on('click', '.popupMeh #entry-show-button', function(e){
	e.preventDefault();
	let ebt = $(this).closest('#entry-block-text');
	ebt.next('#entry-item').attr('data-show', 'true');
	ebt.hide();
});


function markAsSeen() {
	let wls = window.location.search;
	let id = $("#topic #title").attr("data-id");
	let time = new Date().getTime();
	if (id) {
		let ind = SEEN.findIndex('id', id);
		if (ind == -1) {
			SEEN.modify(ind, {id, time});
		}
	}
}

function removeSeenAfteraDay() {
	let currentTime = new Date().getTime();
	SEEN.values.forEach(function(item) {
		if (currentTime - item.time > 86400000) {
			let ind = SEEN.findIndex('id', item.id);
			SEEN.modify(ind);
		}
	});
	$('#gordumstyle').remove();
	const cssSelectors = SEEN.values.map(item => `.topic-list li > a[href*="${item.id}"]`).join(', ');
	$('head').append(`<style id="gordumstyle">${cssSelectors} {opacity:.5;}</style>`);
}
removeSeenAfteraDay();

function isScrolledIntoView(el) {
	let rect = el.getBoundingClientRect();
	let elemTop = rect.top;
	let elemBottom = rect.bottom;
	let isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
	return isVisible;
}

function scrollToEl() {
	let el = document.getElementById('entry-item-list')?.children
	if (!el || el.length <= 5) {return}
	window.onscroll = function(e) {
		if(isScrolledIntoView(el.item(5))) {
			markAsSeen()
			removeSeenAfteraDay()
		}
	}
}
scrollToEl()


function swipeNavigation(element, leftButton, rightButton) {
  let elements = document.querySelectorAll(element);
  let threshold=100, xstart=0, xend=0;
  function checkDirection() {
	if (Math.abs(xend - xstart) < threshold) return;
	if (xend < xstart) { document.querySelector(leftButton)?.click(); }
	if (xend > xstart) { document.querySelector(rightButton)?.click(); }
  }
  for (const element of elements) {
	element?.addEventListener("touchstart", function(e) { xstart = e.touches[0].screenX; });
	element?.addEventListener("touchend", function(e) { xend = e.changedTouches[0].screenX; checkDirection(); });
	element?.addEventListener("pointerdown", function(e) { xstart = e.screenX; });
	element?.addEventListener("pointerup", function(e) { xend = e.screenX; checkDirection(); });
  }
}

swipeNavigation('#entry-item-list footer', '#topic .pager .next', '#topic .pager .prev');
swipeNavigation('.home-page-entry-list footer, .edittools', 'a[title="olaylar olaylar"]', 'a[title="dünyamızda neler olup bitiyor"]');

const insertPoopEmoji = () => {
  document.querySelectorAll('.footer-info, .profile-top-container')
    .forEach(div => {
      const subscriberBadgeDiv = div.querySelector('#subscriber-badge-entry, #subscriber-badge');
      if (subscriberBadgeDiv) subscriberBadgeDiv.innerHTML = '💩';
    });
};

insertPoopEmoji();

const addSukela = () => {
  const targetDiv = document.querySelector('#in-topic-nice-menu');
  const sourceAnchors = document.querySelectorAll('#in-topic-nice-options li a');
  [...sourceAnchors].reverse().forEach(({ href, textContent }) => {
    if (href.endsWith('?a=dailynice') || href.endsWith('?a=nice')) {
      const newAnchor = targetDiv.appendChild(document.createElement('a'));
      newAnchor.href = href;
      newAnchor.textContent = textContent;
    }
  });
};

addSukela();

const observerFrame = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if (mutation.type === 'childList') {
			solFrameHighlight();
			modifyDOM.linksForSolFrame()
			solframeActive();
		}
	});
});

observerFrame.observe(document.getElementById("partial-index"), { childList: true });

// Mutation Observer
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
	$(mutation.addedNodes).find(".entry-date, .entry-share").each(function() {
		howLongAgo();
		sourceURL();
		addButtons();
		appendNotes();
		spoilerOp();
		modifyDOM.removeThings();
		insertPoopEmoji();
	});
  });
});

observer.observe(document.body, { childList: true, subtree: true });
})();
