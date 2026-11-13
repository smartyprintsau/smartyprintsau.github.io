/* Shop engine shared by the Smarty Prints and Little Labelled websites.
   The products and shop details live in products.js - edit that file, not this one. */
(function () {
  "use strict";
  var S = window.SHOP, P = window.PRODUCTS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var money = function (n) { return "$" + (Math.round(n * 100) % 100 ? n.toFixed(2) : n.toFixed(0)); };

  /* ---------- drawn product pictures (colours come from CSS --i1..--i4) ---------- */
  var A = 'fill="var(--i1)"', B = 'fill="var(--i2)"', C = 'fill="var(--i3)"', D = 'fill="var(--i4)"', L = 'fill="none" stroke="var(--i4)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
  var face = function (x, y) { return '<circle cx="' + (x - 4) + '" cy="' + y + '" r="1.8" ' + D + '/><circle cx="' + (x + 4) + '" cy="' + y + '" r="1.8" ' + D + '/><path d="M' + (x - 3) + ' ' + (y + 4) + ' q3 3 6 0" ' + L.replace('3"', '1.6"') + '/>'; };
  var ICONS = {
    firstthen: '<rect x="14" y="14" width="92" height="62" rx="9" ' + A + '/><rect x="22" y="22" width="34" height="9" rx="4" ' + C + '/><rect x="64" y="22" width="34" height="9" rx="4" ' + C + '/><rect x="22" y="36" width="34" height="32" rx="6" ' + C + '/><rect x="64" y="36" width="34" height="32" rx="6" ' + C + '/><circle cx="39" cy="52" r="9" ' + B + '/>' + face(39, 51) + '<rect x="73" y="44" width="16" height="16" rx="4" ' + B + '/>',
    choice: '<rect x="12" y="12" width="96" height="66" rx="9" ' + A + '/><rect x="20" y="19" width="80" height="8" rx="4" ' + C + '/>' + [0, 1, 2, 3].map(function (i) { return '<rect x="' + (20 + i * 21) + '" y="33" width="17" height="17" rx="4" ' + C + '/><rect x="' + (20 + i * 21) + '" y="54" width="17" height="17" rx="4" ' + C + '/>'; }).join("") + '<circle cx="28.5" cy="41.5" r="5" ' + B + '/><rect x="66" y="58" width="9" height="9" rx="2" ' + B + '/>',
    strip: '<rect x="6" y="28" width="108" height="34" rx="8" ' + A + '/>' + [0, 1, 2, 3, 4].map(function (i) { return '<rect x="' + (12 + i * 20.5) + '" y="34" width="16" height="22" rx="4" ' + C + '/>'; }).join("") + '<circle cx="20" cy="45" r="5" ' + B + '/><path d="M58 45h8m-3-3 3 3-3 3" ' + L + '/>',
    weekly: '<rect x="8" y="12" width="104" height="66" rx="8" ' + A + '/>' + [0, 1, 2, 3, 4, 5, 6].map(function (i) { return '<rect x="' + (13 + i * 14) + '" y="19" width="11" height="6" rx="2" ' + B + '/><rect x="' + (13 + i * 14) + '" y="29" width="11" height="11" rx="2" ' + C + '/><rect x="' + (13 + i * 14) + '" y="43" width="11" height="11" rx="2" ' + C + '/><rect x="' + (13 + i * 14) + '" y="57" width="11" height="11" rx="2" ' + C + '/>'; }).join(""),
    token: '<rect x="12" y="20" width="96" height="50" rx="9" ' + A + '/>' + [0, 1, 2, 3].map(function (i) { return '<circle cx="' + (27 + i * 17) + '" cy="45" r="7" ' + C + '/>'; }).join("") + '<path d="M27 39l1.8 3.8 4.1.5-3 2.8.8 4.1-3.7-2-3.7 2 .8-4.1-3-2.8 4.1-.5z" ' + B + '/><path d="M44 39l1.8 3.8 4.1.5-3 2.8.8 4.1-3.7-2-3.7 2 .8-4.1-3-2.8 4.1-.5z" ' + B + '/><rect x="88" y="32" width="14" height="26" rx="4" ' + C + '/><path d="M95 40v10m-4-4 4 4 4-4" ' + L + '/>',
    feelings: '<rect x="30" y="8" width="60" height="74" rx="9" ' + A + '/>' + [0, 1, 2].map(function (i) { return '<rect x="37" y="' + (15 + i * 22) + '" width="18" height="18" rx="4" ' + C + '/><rect x="60" y="' + (21 + i * 22) + '" width="22" height="5" rx="2.5" ' + C + '/>'; }).join("") + '<circle cx="46" cy="24" r="6" ' + B + '/>' + face(46, 23),
    tiles: '<rect x="18" y="30" width="34" height="34" rx="7" ' + C + ' transform="rotate(-8 35 47)"/><rect x="46" y="24" width="34" height="34" rx="7" ' + A + '/><rect x="74" y="32" width="30" height="30" rx="7" ' + C + ' transform="rotate(7 89 47)"/><circle cx="63" cy="40" r="9" ' + B + '/>' + face(63, 39) + '<path d="M28 44c4-6 10-6 14 0" ' + L + '/>',
    deskplate: '<path d="M14 66 26 26h68l12 40z" ' + A + '/><path d="M30 34h60l8 26H22z" ' + C + '/><rect x="38" y="42" width="44" height="7" rx="3.5" ' + D + '/><circle cx="31" cy="46" r="4" ' + B + '/><rect x="10" y="66" width="100" height="6" rx="3" ' + D + ' opacity=".5"/>',
    doorsign: '<path d="M40 30 60 8l20 22" ' + L + '/><circle cx="60" cy="8" r="3" ' + D + '/><rect x="10" y="28" width="100" height="52" rx="12" ' + A + '/><circle cx="40" cy="32" r="3" ' + C + '/><circle cx="80" cy="32" r="3" ' + C + '/><rect x="24" y="44" width="72" height="10" rx="5" ' + C + '/><rect x="36" y="60" width="48" height="7" rx="3.5" ' + C + '/><path d="M20 66l3 6 6 1-4.5 4 1 6" ' + B + '/>',
    stamp: '<rect x="44" y="8" width="32" height="30" rx="14" ' + A + '/><rect x="52" y="34" width="16" height="16" ' + A + '/><rect x="28" y="48" width="64" height="14" rx="4" ' + B + '/><rect x="24" y="62" width="72" height="8" rx="3" ' + D + '/><path d="M40 82h40" ' + L + '/><path d="M52 78l6 4 10-8" ' + L + '/>',
    bookmark: '<rect x="46" y="6" width="28" height="76" rx="6" ' + A + '/><circle cx="60" cy="16" r="4" ' + C + '/><path d="M60 16c-10 0-16 6-20 16M60 16c-6 4-8 12-6 20" ' + L.replace("var(--i4)", "var(--i2)") + '/><rect x="54" y="28" width="12" height="44" rx="6" ' + C + '/>',
    tag: '<path d="M30 22h64a8 8 0 0 1 8 8v30a8 8 0 0 1-8 8H30L14 45z" ' + A + '/><circle cx="28" cy="45" r="5" ' + C + '/><rect x="42" y="34" width="46" height="8" rx="4" ' + C + '/><rect x="42" y="48" width="32" height="6" rx="3" ' + C + '/><path d="M23 45C10 45 6 30 14 20" ' + L + '/>',
    letters: [["A", 14, 22, "var(--i1)"], ["B", 46, 30, "var(--i2)"], ["C", 78, 20, "var(--i1)"]].map(function (t) { return '<rect x="' + t[1] + '" y="' + t[2] + '" width="28" height="28" rx="6" fill="' + t[3] + '"/><text x="' + (t[1] + 14) + '" y="' + (t[2] + 21) + '" text-anchor="middle" font-size="20" font-weight="800" ' + C + '>' + t[0] + '</text>'; }).join("") + '<rect x="28" y="56" width="28" height="22" rx="6" ' + C + '/><text x="42" y="73" text-anchor="middle" font-size="16" font-weight="800" ' + D + '>1</text><rect x="64" y="56" width="28" height="22" rx="6" ' + C + '/><text x="78" y="73" text-anchor="middle" font-size="16" font-weight="800" ' + D + '>2</text>',
    label: '<rect x="12" y="24" width="96" height="44" rx="22" ' + A + '/><rect x="18" y="30" width="84" height="32" rx="16" fill="none" stroke="var(--i3)" stroke-width="2" stroke-dasharray="4 4"/><circle cx="34" cy="46" r="8" ' + B + '/><rect x="48" y="40" width="44" height="7" rx="3.5" ' + C + '/><rect x="48" y="51" width="28" height="5" rx="2.5" ' + C + '/>',
    tenframe: '<rect x="10" y="22" width="100" height="46" rx="6" ' + A + '/>' + [0, 1, 2, 3, 4].map(function (i) { return '<rect x="' + (15 + i * 19) + '" y="27" width="16" height="17" rx="3" ' + C + '/><rect x="' + (15 + i * 19) + '" y="47" width="16" height="17" rx="3" ' + C + '/>' + (i < 4 ? '<circle cx="' + (23 + i * 19) + '" cy="35.5" r="5.5" ' + B + '/>' : '') + (i < 3 ? '<circle cx="' + (23 + i * 19) + '" cy="55.5" r="5.5" ' + B + '/>' : ''); }).join(""),
    tangram: '<g transform="translate(30 15)"><path d="M0 0h60L30 30z" ' + A + '/><path d="M0 0v60l30-30z" ' + B + '/><path d="M60 0v30L45 15z" ' + C + '/><path d="M30 30l15-15 15 15-15 15z" ' + A + ' opacity=".7"/><path d="M0 60l15-15h30L30 60z" ' + C + '/><path d="M60 30v30H30z" ' + B + ' opacity=".7"/><path d="M15 45 30 30l15 15z" ' + A + ' opacity=".45"/></g>',
    clock: '<circle cx="60" cy="46" r="36" ' + A + '/><circle cx="60" cy="46" r="29" ' + C + '/>' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (i) { var a = i * Math.PI / 6; return '<circle cx="' + (60 + 23 * Math.sin(a)).toFixed(1) + '" cy="' + (46 - 23 * Math.cos(a)).toFixed(1) + '" r="2.2" ' + D + '/>'; }).join("") + '<path d="M60 46V28M60 46l12 8" ' + L.replace("var(--i4)", "var(--i2)") + ' stroke-width="4"/><circle cx="60" cy="46" r="3.5" ' + D + '/>',
    dominoes: '<rect x="16" y="20" width="30" height="56" rx="6" ' + A + ' transform="rotate(-12 31 48)"/><rect x="48" y="16" width="30" height="56" rx="6" ' + C + '/><rect x="80" y="22" width="30" height="56" rx="6" ' + A + ' transform="rotate(10 95 50)"/><path d="M50 44h26" ' + L + '/><circle cx="57" cy="27" r="3" ' + D + '/><circle cx="69" cy="35" r="3" ' + D + '/><circle cx="63" cy="58" r="3" ' + D + '/><circle cx="57" cy="52" r="3" ' + D + '/><circle cx="69" cy="64" r="3" ' + D + '/>',
    puzzle: '<rect x="8" y="22" width="104" height="46" rx="8" ' + A + '/>' + [["S", "var(--i2)"], ["A", "var(--i3)"], ["M", "var(--i2)"], ["I", "var(--i3)"]].map(function (t, i) { return '<rect x="' + (15 + i * 24) + '" y="30" width="20" height="30" rx="5" fill="' + t[1] + '"/><text x="' + (25 + i * 24) + '" y="52" text-anchor="middle" font-size="18" font-weight="800" ' + D + '>' + t[0] + '</text>'; }).join(""),
    xo: '<rect x="18" y="8" width="84" height="76" rx="10" ' + A + '/><path d="M46 16v60M74 16v60M26 36h68M26 58h68" stroke="var(--i3)" stroke-width="4" stroke-linecap="round"/><circle cx="36" cy="26" r="6" fill="none" stroke="var(--i2)" stroke-width="4"/><path d="M55 42l10 10m0-10L55 52M80 64l9 8m0-8-9 8" stroke="var(--i4)" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="68" r="6" fill="none" stroke="var(--i2)" stroke-width="4"/>',
    stake: '<path d="M52 44h16v34l-8 10-8-10z" ' + A + '/><rect x="26" y="8" width="68" height="40" rx="12" ' + A + '/><path d="M44 36c0-12 6-20 18-22-1 12-7 20-18 22z" ' + B + '/><path d="M44 36c4-6 8-10 14-14" ' + L.replace("var(--i4)", "var(--i3)") + '/><rect x="64" y="22" width="22" height="6" rx="3" ' + C + '/><rect x="64" y="31" width="16" height="5" rx="2.5" ' + C + '/>',
    gardentag: '<path d="M60 4v16" ' + L + '/><rect x="30" y="18" width="60" height="64" rx="14" ' + A + '/><circle cx="60" cy="28" r="4" ' + C + '/><circle cx="60" cy="52" r="15" ' + C + '/><path d="M60 64V52m0 0c-8 0-12-5-12-12 8 0 12 4 12 12zm0 0c0-8 4-12 12-12 0 7-4 12-12 12z" ' + B + '/>',
    keychain: '<circle cx="22" cy="28" r="12" fill="none" stroke="var(--i4)" stroke-width="4"/><rect x="28" y="30" width="84" height="40" rx="6" ' + A + '/><rect x="32" y="34" width="76" height="32" rx="4" ' + C + '/><circle cx="36" cy="38" r="2.6" ' + D + '/><text x="72" y="58" text-anchor="middle" font-size="17" font-weight="800" letter-spacing="1" ' + D + '>MY·NAME</text>',
    milestone: '<circle cx="60" cy="46" r="36" ' + A + '/><circle cx="60" cy="46" r="29" fill="none" stroke="var(--i3)" stroke-width="2" stroke-dasharray="3 4"/><text x="60" y="54" text-anchor="middle" font-size="24" font-weight="800" ' + C + '>3</text><text x="60" y="68" text-anchor="middle" font-size="8" font-weight="700" letter-spacing="1" ' + C + '>MONTHS</text><path d="M60 22l2.4 5 5.4.6-4 3.7 1.1 5.4-4.9-2.7-4.9 2.7 1.1-5.4-4-3.7 5.4-.6z" ' + B + '/>',
    plaque: '<rect x="10" y="16" width="100" height="62" rx="10" ' + A + '/><rect x="17" y="23" width="86" height="48" rx="7" fill="none" stroke="var(--i3)" stroke-width="2"/><path d="M60 58s-14-8-14-17a7 7 0 0 1 14-3 7 7 0 0 1 14 3c0 9-14 17-14 17z" ' + B + '/><rect x="30" y="30" width="14" height="4" rx="2" ' + C + '/><rect x="76" y="30" width="14" height="4" rx="2" ' + C + '/>',
    pdf: '<rect x="30" y="14" width="56" height="70" rx="5" ' + C + ' transform="rotate(-6 58 49)"/><rect x="36" y="8" width="56" height="70" rx="5" ' + A + '/><path d="M42 16h44v54H42z" fill="none" stroke="var(--i3)" stroke-width="1.6" stroke-dasharray="3 3"/><rect x="47" y="21" width="15" height="15" rx="3" ' + C + '/><rect x="66" y="21" width="15" height="15" rx="3" ' + C + '/><rect x="47" y="40" width="15" height="15" rx="3" ' + C + '/><rect x="66" y="40" width="15" height="15" rx="3" ' + B + '/><rect x="80" y="58" width="26" height="14" rx="4" ' + D + '/><text x="93" y="68.5" text-anchor="middle" font-size="9" font-weight="800" ' + C + '>PDF</text>',
    vialcap: '<rect x="42" y="34" width="36" height="50" rx="7" ' + C + ' opacity=".55"/><rect x="47" y="30" width="26" height="8" rx="2" ' + C + '/><ellipse cx="60" cy="22" rx="24" ry="9" ' + A + '/><rect x="36" y="22" width="48" height="12" ' + A + '/><ellipse cx="60" cy="34" rx="24" ry="9" ' + A + ' opacity=".8"/><ellipse cx="60" cy="22" rx="18" ry="6" ' + B + '/><text x="60" y="25" text-anchor="middle" font-size="8" font-weight="800" ' + C + '>NAME</text><rect x="46" y="54" width="28" height="16" rx="3" ' + C + '/>',
    penband: '<g transform="rotate(-24 60 46)"><rect x="6" y="38" width="98" height="16" rx="8" ' + C + '/><rect x="98" y="41" width="14" height="10" rx="3" ' + D + ' opacity=".6"/><rect x="40" y="35" width="28" height="22" rx="5" ' + A + '/><rect x="45" y="42" width="18" height="8" rx="2" ' + B + '/><rect x="16" y="42" width="16" height="8" rx="4" ' + D + ' opacity=".35"/></g>',
    tray: '<path d="M8 40 22 26h86l-12 14z" ' + C + ' opacity=".7"/><path d="M8 40h88v30H8z" ' + A + '/><path d="M96 40l12-14v30L96 70z" ' + A + ' opacity=".75"/>' + [0, 1, 2, 3].map(function (i) { return '<ellipse cx="' + (34 + i * 17) + '" cy="33" rx="6" ry="3.2" ' + D + ' opacity=".55"/>'; }).join("") + '<rect x="14" y="48" width="44" height="8" rx="4" ' + C + '/><rect x="64" y="48" width="26" height="14" rx="3" ' + B + '/>',
    viallabel: [0, 1, 2].map(function (i) { var x = 18 + i * 30; return '<rect x="' + x + '" y="26" width="24" height="54" rx="6" ' + C + ' opacity=".55"/><rect x="' + (x + 3) + '" y="16" width="18" height="12" rx="3" ' + (i === 1 ? B : A) + '/><rect x="' + x + '" y="44" width="24" height="22" ' + A + '/><rect x="' + (x + 4) + '" y="50" width="16" height="4" rx="2" ' + C + '/><rect x="' + (x + 4) + '" y="57" width="10" height="3" rx="1.5" ' + C + '/>'; }).join(""),
    set: '<g transform="translate(-14 0)"><rect x="42" y="38" width="30" height="44" rx="6" ' + C + ' opacity=".55"/><ellipse cx="57" cy="28" rx="20" ry="8" ' + A + '/><rect x="37" y="28" width="40" height="10" ' + A + '/><ellipse cx="57" cy="38" rx="20" ry="8" ' + A + ' opacity=".8"/><ellipse cx="57" cy="28" rx="14" ry="5" ' + B + '/></g><g transform="rotate(-60 88 50)"><rect x="56" y="43" width="66" height="14" rx="7" ' + C + '/><rect x="78" y="40" width="20" height="20" rx="4" ' + A + '/><rect x="82" y="46" width="12" height="8" rx="2" ' + B + '/></g>',
    fractions: '<circle cx="42" cy="46" r="30" ' + C + '/><path d="M42 46V16a30 30 0 0 1 30 30z" ' + A + '/><path d="M42 46h30a30 30 0 0 1-30 30z" ' + B + '/><path d="M42 46v30a30 30 0 0 1-30-30z" ' + A + ' opacity=".6"/><circle cx="42" cy="46" r="30" ' + L + '/><path d="M42 16v60M12 46h60" ' + L + '/><path d="M88 22l18 0a18 18 0 0 1-18 18z" ' + B + ' transform="translate(-4 34)"/><text x="98" y="30" text-anchor="middle" font-size="16" font-weight="800" ' + D + '>¼</text>',
    baseten: '<rect x="12" y="20" width="44" height="44" rx="3" ' + A + '/>' + [1, 2, 3].map(function (i) { return '<path d="M' + (12 + i * 11) + ' 20v44M12 ' + (20 + i * 11) + 'h44" stroke="var(--i3)" stroke-width="1.6"/>'; }).join("") + [0, 1, 2].map(function (i) { return '<rect x="' + (64 + i * 12) + '" y="20" width="9" height="44" rx="2" ' + B + '/>'; }).join("") + '<rect x="64" y="68" width="9" height="9" rx="2" ' + A + '/><rect x="76" y="68" width="9" height="9" rx="2" ' + A + '/><rect x="88" y="68" width="9" height="9" rx="2" ' + A + '/>',
    numberline: '<rect x="6" y="34" width="108" height="26" rx="6" ' + A + '/><path d="M12 47h96" stroke="var(--i3)" stroke-width="3"/>' + [0, 1, 2, 3, 4, 5].map(function (i) { return '<path d="M' + (16 + i * 17.6) + ' 41v12" stroke="var(--i3)" stroke-width="3"/>'; }).join("") + '<path d="M33.6 32c4-12 13.6-12 17.6 0M51.2 32c4-12 13.6-12 17.6 0" ' + L.replace("var(--i4)", "var(--i2)") + '/>',
    geoboard: '<rect x="20" y="10" width="80" height="72" rx="8" ' + A + '/>' + [0, 1, 2, 3, 4].map(function (r) { return [0, 1, 2, 3, 4].map(function (c) { return '<circle cx="' + (32 + c * 14) + '" cy="' + (22 + r * 12) + '" r="2.6" ' + C + '/>'; }).join(""); }).join("") + '<path d="M32 70 60 22l28 48z" fill="none" stroke="var(--i2)" stroke-width="3.5" stroke-linejoin="round"/>',
    custom: '<circle cx="60" cy="46" r="34" ' + A + '/><path d="M60 24l5.6 11.4 12.6 1.8-9.1 8.9 2.1 12.5L60 52.7l-11.2 5.9 2.1-12.5-9.1-8.9 12.6-1.8z" ' + B + '/><circle cx="92" cy="20" r="5" ' + B + '/><circle cx="26" cy="72" r="4" ' + C + '/>'
  };
  function picture(p) {
    if (p.img) return '<img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy">';
    return '<svg viewBox="0 0 120 90" role="img" aria-label="' + esc(p.name) + '">' + (ICONS[p.icon] || ICONS.custom) + "</svg>";
  }

  /* ---------- enquiry list (kept in this browser only) ---------- */
  var KEY = "enquiry-" + S.key, list = [];
  try { list = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { list = []; }
  function saveList() { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} renderList(); }
  function find(id) { for (var i = 0; i < P.length; i++) if (P[i].id === id) return P[i]; }
  list = list.filter(function (it) { return find(it.id); });

  /* ---------- shop grid ---------- */
  var state = { cat: "all", q: "" };
  function renderCats() {
    var cats = [{ id: "all", name: "Everything" }].concat(S.categories);
    $("#cats").innerHTML = cats.map(function (c) {
      var n = c.id === "all" ? P.length : P.filter(function (p) { return p.cat === c.id; }).length;
      return '<button class="chip" data-cat="' + c.id + '" aria-pressed="' + (state.cat === c.id) + '">' + esc(c.name) + ' <span>' + n + "</span></button>";
    }).join("");
  }
  function priceText(p) {
    if (p.price == null) return '<span class="price">Ask for a quote</span>';
    return '<span class="price">' + (p.from ? '<small>from</small> ' : "") + money(p.price) + (p.unit ? ' <small>' + esc(p.unit) + "</small>" : "") + "</span>";
  }
  function renderGrid() {
    var q = state.q.trim().toLowerCase();
    var items = P.filter(function (p) {
      if (state.cat !== "all" && p.cat !== state.cat) return false;
      if (!q) return true;
      return (p.name + " " + p.desc + " " + (p.tags || []).join(" ")).toLowerCase().indexOf(q) >= 0;
    });
    var cat = S.categories.filter(function (c) { return c.id === state.cat; })[0];
    $("#cat-blurb").textContent = cat ? cat.blurb : S.allBlurb;
    $("#grid").innerHTML = items.length ? items.map(function (p) {
      var inList = list.some(function (it) { return it.id === p.id; });
      return '<article class="card" data-cat="' + p.cat + '">' +
        '<div class="pic">' + picture(p) + (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "") + "</div>" +
        '<div class="body"><h3>' + esc(p.name) + "</h3>" + priceText(p) +
        "<p>" + esc(p.desc) + "</p>" +
        (p.tags && p.tags.length ? '<ul class="tags">' + p.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "") +
        '<button class="add" data-add="' + p.id + '">' + (inList ? "✓ In my list" : "+ Add to my list") + "</button></div></article>";
    }).join("") : '<p class="empty">Nothing matches that yet. <a href="#contact">Ask us</a> - custom requests are welcome.</p>';
  }

  /* ---------- list drawer ---------- */
  function lineTotal(it) { var p = find(it.id); return p && p.price != null ? p.price * it.qty : 0; }
  function renderList() {
    var n = list.reduce(function (a, it) { return a + it.qty; }, 0);
    $("#list-count").textContent = n;
    $("#list-btn").classList.toggle("has", n > 0);
    var body = $("#list-items");
    if (!list.length) { body.innerHTML = '<p class="muted">Your list is empty. Tap <b>+ Add to my list</b> on anything you like, then send it to us for a quote.</p>'; }
    else body.innerHTML = list.map(function (it, i) {
      var p = find(it.id);
      return '<div class="li"><div class="li-pic">' + picture(p) + '</div><div class="li-main"><b>' + esc(p.name) + "</b>" +
        '<input class="li-note" data-note="' + i + '" placeholder="' + esc(S.notePlaceholder) + '" value="' + esc(it.note || "") + '">' +
        '<div class="li-row"><span class="qty"><button data-dec="' + i + '" aria-label="Less">−</button><span>' + it.qty + '</span><button data-inc="' + i + '" aria-label="More">+</button></span>' +
        "<span>" + (p.price != null ? (p.from ? "from " : "") + money(lineTotal(it)) : "quote") + '</span><button class="link" data-del="' + i + '">Remove</button></div></div></div>';
    }).join("");
    var tot = list.reduce(function (a, it) { return a + lineTotal(it); }, 0);
    $("#list-total").textContent = list.length ? "Estimate: " + money(tot) + (tot < S.minOrder ? " (minimum order " + money(S.minOrder) + ")" : "") : "";
    $("#send").disabled = $("#copy").disabled = !list.length;
  }
  function enquiryText() {
    var lines = ["Hi " + S.name + "! I'd like a quote for:", ""];
    list.forEach(function (it) {
      var p = find(it.id);
      lines.push("• " + it.qty + " × " + p.name + (it.note ? " - " + it.note : ""));
    });
    var tot = list.reduce(function (a, it) { return a + lineTotal(it); }, 0);
    lines.push("", "Website estimate: " + money(tot) + " (before postage)");
    var extra = $("#list-extra").value.trim(), who = $("#list-name").value.trim();
    if (extra) lines.push("", extra);
    lines.push("", "Thanks!" + (who ? " " + who : ""));
    return lines.join("\n");
  }
  function openDrawer(open) { document.body.classList.toggle("drawer-open", open); $("#drawer").setAttribute("aria-hidden", String(!open)); }

  /* ---------- page details from SHOP ---------- */
  function fillDetails() {
    document.querySelectorAll("[data-email]").forEach(function (a) { a.href = "mailto:" + S.email; if (!a.textContent.trim()) a.textContent = S.email; });
    var soc = S.socials.filter(function (s) { return s.url; });
    document.querySelectorAll("[data-socials]").forEach(function (el) {
      el.innerHTML = soc.map(function (s) { return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + (s.handle ? " <span>" + esc(s.handle) + "</span>" : "") + "</a>"; }).join("");
    });
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button, a, [data-close]"); if (!t) return;
    if (t.dataset.cat) { state.cat = t.dataset.cat; renderCats(); renderGrid(); }
    else if (t.dataset.add) {
      var ex = list.filter(function (it) { return it.id === t.dataset.add; })[0];
      if (ex) ex.qty++; else list.push({ id: t.dataset.add, qty: 1, note: "" });
      saveList(); renderGrid(); toast("Added - open My list to send it");
    }
    else if (t.dataset.inc) { list[+t.dataset.inc].qty++; saveList(); }
    else if (t.dataset.dec) { var it = list[+t.dataset.dec]; if (it.qty > 1) it.qty--; saveList(); }
    else if (t.dataset.del) { list.splice(+t.dataset.del, 1); saveList(); renderGrid(); }
    else if (t.id === "list-btn") openDrawer(true);
    else if (t.dataset.close != null) openDrawer(false);
    else if (t.id === "send") { location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent("Quote request - " + S.name + " website") + "&body=" + encodeURIComponent(enquiryText()); }
    else if (t.id === "copy") {
      var txt = enquiryText();
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { toast("Copied - paste it into a message to us"); }, function () { window.prompt("Copy your list:", txt); });
    }
  });
  document.addEventListener("input", function (e) {
    if (e.target.dataset.note != null) { list[+e.target.dataset.note].note = e.target.value; try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (x) {} }
    if (e.target.id === "search") { state.q = e.target.value; renderGrid(); }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") openDrawer(false); });
  var toastT;
  function toast(msg) { var el = $("#toast"); el.textContent = msg; el.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove("show"); }, 2200); }

  fillDetails(); renderCats(); renderGrid(); renderList();
})();
