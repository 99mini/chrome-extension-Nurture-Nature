/*! For license information please see content.bundle.js.LICENSE.txt */
(()=>{function t(){"use strict";t=function(){return n};var n={},r=Object.prototype,o=r.hasOwnProperty,i=Object.defineProperty||function(t,e,n){t[e]=n.value},a="function"==typeof Symbol?Symbol:{},c=a.iterator||"@@iterator",u=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,n){return t[e]=n}}function f(t,e,n,r){var o=e&&e.prototype instanceof p?e:p,a=Object.create(o.prototype),c=new j(r||[]);return i(a,"_invoke",{value:L(t,n,c)}),a}function d(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}n.wrap=f;var h={};function p(){}function v(){}function y(){}var m={};l(m,c,(function(){return this}));var g=Object.getPrototypeOf,w=g&&g(g(O([])));w&&w!==r&&o.call(w,c)&&(m=w);var x=y.prototype=p.prototype=Object.create(m);function b(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,n){function r(i,a,c,u){var s=d(t[i],t,a);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==e(f)&&o.call(f,"__await")?n.resolve(f.__await).then((function(t){r("next",t,c,u)}),(function(t){r("throw",t,c,u)})):n.resolve(f).then((function(t){l.value=t,c(l)}),(function(t){return r("throw",t,c,u)}))}u(s.arg)}var a;i(this,"_invoke",{value:function(t,e){function o(){return new n((function(n,o){r(t,e,n,o)}))}return a=a?a.then(o,o):o()}})}function L(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return{value:void 0,done:!0}}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=k(a,n);if(c){if(c===h)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=d(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===h)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}function k(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,k(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),h;var o=d(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,h;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function I(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function N(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(I,this),this.reset(!0)}function O(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,r=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return r.next=r}}return{next:_}}function _(){return{value:void 0,done:!0}}return v.prototype=y,i(x,"constructor",{value:y,configurable:!0}),i(y,"constructor",{value:v,configurable:!0}),v.displayName=l(y,s,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,l(t,s,"GeneratorFunction")),t.prototype=Object.create(x),t},n.awrap=function(t){return{__await:t}},b(E.prototype),l(E.prototype,u,(function(){return this})),n.AsyncIterator=E,n.async=function(t,e,r,o,i){void 0===i&&(i=Promise);var a=new E(f(t,e,r,o),i);return n.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(x),l(x,s,"Generator"),l(x,c,(function(){return this})),l(x,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},n.values=O,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(N),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,r){return a.type="throw",a.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),u=o.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),N(n),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;N(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:O(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),h}},n}function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function n(t,e,n,r,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}function r(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,u,"next",t)}function u(t){n(a,o,i,c,u,"throw",t)}c(void 0)}))}}var o=document.getElementById("hello-user-a"),i=document.getElementById("date-list-container"),a=document.getElementById("counter"),c=document.getElementById("main-section"),u=document.getElementById("set-userId-section"),s=[o,i,a,c,u],l="../assets/svgs/leaf/leaf00.svg",f="../assets/svgs/leaf/leaf01.svg",d="../assets/svgs/leaf/leaf02.svg",h="../assets/svgs/leaf/leaf03.svg",p="../assets/svgs/leaf/leaf04.svg",v="main",y="set-userId",m="userId",g="commitCount",w="commitsByDay",x="refreshAction";function b(){return b=r(t().mark((function e(){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!s.includes(null)){e.next=2;break}return e.abrupt("return");case 2:return N(v),e.next=6,j();case 6:e.sent,document.getElementById("set-userId-btn").addEventListener("click",(function(t){N(y)})),document.getElementById("refresh-btn").addEventListener("click",function(){var e=r(t().mark((function e(n){return t().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j();case 2:t.sent;case 3:case"end":return t.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),document.getElementById("back-btn").addEventListener("click",(function(t){N(v)})),document.getElementById("close-btn").addEventListener("click",(function(t){window.close()})),k("userId-input","userId-submit-btn",m);case 12:case"end":return e.stop()}}),e)}))),b.apply(this,arguments)}function E(t){return L.apply(this,arguments)}function L(){return(L=r(t().mark((function e(n){var r,o;return t().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=new Promise((function(t,e){chrome.storage.local.get(n,(function(e){t(e[n])}))})),o=r,t.abrupt("return",o);case 3:case"end":return t.stop()}}),e)})))).apply(this,arguments)}function k(t,e,n){return I.apply(this,arguments)}function I(){return(I=r(t().mark((function e(n,o,i){var a,c,u;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=document.getElementById(o),c=document.getElementById(n),e.next=4,E(i);case 4:u=e.sent,c.placeholder=u,a.onclick=r(t().mark((function e(){var n;return t().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(0===(n=c.value).length){t.next=8;break}return e=void 0,(e={})[i]=n,chrome.storage.local.set(e),t.next=5,j();case 5:t.sent,c.value="",window.close();case 8:case"end":return t.stop()}var e}),e)})));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function N(t){switch(t){case v:c.style.display="flex",u.style.display="none";break;case y:c.style.display="none",u.style.display="flex"}}function j(){return O.apply(this,arguments)}function O(){return(O=r(t().mark((function e(){var n,r;return t().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,T(x);case 2:return t.sent,t.next=5,E(g);case 5:return n=t.sent,a.innerHTML=n,t.next=9,E(w);case 9:return r=t.sent,i.hasChildNodes()?S(r):i.appendChild(_(r,null,null)),t.next=13,E(m);case 13:return e=t.sent,c=void 0,u=void 0,c="",u="",""===e?(c="안녕 깃헙 식집사, 아이디 설정을 하세요.",o.addEventListener("click",(function(){return N(y)}))):(c="안녕 깃헙 식집사, @"+e,u+="https://github.com/"+e,o.href=u),o.innerHTML=c,t.abrupt("return",!0);case 16:case"end":return t.stop()}var e,c,u}),e)})))).apply(this,arguments)}function _(t,n,r){var o=n||document.getElementById("date-item-list");for(var i in o||((o=document.createElement("ul")).id="date-item-list"),t){var a=document.createElement("li");if(a.className="date-item","object"===e(t[i]))_(t[i],o,a);else{var c=B(Number(t[i]),a);c.id=i,a.hasChildNodes()?(a.createTextNode(i+" - "),a.appendChild(c),a.createTextNode(t[i])):(a.appendChild(document.createTextNode(i+" - ")),a.appendChild(c),a.appendChild(document.createTextNode(t[i])))}r&&o.appendChild(a)}if(!n&&!r)return o}function B(t,e){var n=new Image;return n.classList.add("commit-img"),0===t?(e.classList.add("off-count"),n.src=l,n.alt="leaf00 svg"):(e.classList.add("on-count"),t<3?(n.src=f,n.alt="leaf01 svg"):t<6?(n.src=d,n.alt="leaf02 svg"):t<10?(n.src=h,n.alt="leaf03 svg"):(n.src=p,n.alt="leaf04 svg")),n}function S(t){for(var e=document.getElementsByClassName("date-item"),n=0;n<t.length;n++){var r=e[n],o=Object.keys(t[n]).toString(),i=Object.values(t[n]).toString(),a=B(Number(i),r);r.createTextNode(o+" - "),r.appendChild(a),r.createTextNode(data[o])}}function T(t){return C.apply(this,arguments)}function C(){return(C=r(t().mark((function e(n){var r;return t().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,chrome.runtime.sendMessage({action:n},(function(t){return!0}));case 2:return r=t.sent,t.abrupt("return",r);case 4:case"end":return t.stop()}}),e)})))).apply(this,arguments)}!function(){b.apply(this,arguments)}()})();