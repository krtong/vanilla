!function(e){var t={};function o(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,o),l.l=!0,l.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)o.d(n,l,function(t){return e[t]}.bind(null,l));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";var n=o(1),l=o(2);
/*!
 * @author Isis (igraziatto) Graziatto <isis.g@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */$(function(){(0,n.setupMobileNavigation)(),(0,l.fixToggleFlyoutBehaviour)(),$("select").wrap('<div class="SelectWrapper"></div>')})},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setupMobileNavigation=
/*!
 * @author Isis (igraziatto) Graziatto <isis.g@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */
function(){var e=$("#menu-button"),t=$("#navdrawer");e.on("click",function(){e.toggleClass("isToggled"),t.toggleClass("isOpen")})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fixToggleFlyoutBehaviour=function(){$(document).undelegate(".ToggleFlyout","click");var e=null;$(document).delegate(".ToggleFlyout","click",function(t){var o=$(".Flyout",this),l=!1;if(0===$(t.target).closest(".Flyout").length)t.stopPropagation(),l=!0;else if($(t.target).hasClass("Hijack")||$(t.target).closest("a").hasClass("Hijack"))return;t.stopPropagation();var r=$(this).attr("rel");if(r&&($(this).attr("rel",""),o.html('<div class="InProgress" style="height: 30px"></div>'),$.ajax({url:gdn.url(r),data:{DeliveryType:"VIEW"},success:function(e){o.html(e)},error:function(e){o.html(""),gdn.informError(e,!0)}})),"hidden"==o.css("visibility")?(null!==e&&($(".Flyout",e).hide(),$(e).removeClass("Open").closest(".Item").removeClass("Open")),$(this).addClass("Open").closest(".Item").addClass("Open"),o.show(),(0,n.disableScroll)(),e=this):(o.hide(),$(this).removeClass("Open").closest(".Item").removeClass("Open"),(0,n.enableScroll)()),l)return!1}),$(document).delegate(".ToggleFlyout a","mouseup",function(){$(this).hasClass("FlyoutButton")||($(".ToggleFlyout").removeClass("Open").closest(".Item").removeClass("Open"),$(".Flyout").hide())}),$(document).on("click touchstart",function(){e&&($(".Flyout",e).hide(),$(e).removeClass("Open").closest(".Item").removeClass("Open")),$(".ButtonGroup").removeClass("Open"),(0,n.enableScroll)()}),$(".Button.Primary.Handle").on("click",function(e){(0,n.toggleScroll)()}),$(".Options .Flyout").on("click",function(){(0,n.enableScroll)()})}
/*!
   * @author Isis (igraziatto) Graziatto <isis.g@vanillaforums.com>
   * @copyright 2009-2018 Vanilla Forums Inc.
   * @license GPL-2.0-only
   */;var n=o(3)},function(e,t,o){"use strict";function n(){$(document.body).addClass("NoScroll")}function l(){$(document.body).removeClass("NoScroll")}Object.defineProperty(t,"__esModule",{value:!0}),t.fireEvent=
/*!
 * @author Isis (igraziatto) Graziatto <isis.g@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */
function(e,t,o){var n=document.createEvent("CustomEvent");n.initCustomEvent(t,!0,!0,o),e.dispatchEvent(n)},t.toggleScroll=function(){$(document.body)[0].style.overflow?l():n()},t.disableScroll=n,t.enableScroll=l,window.requestAnimationFrame||(window.requestAnimationFrame=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e,t){window.setTimeout(e,1e3/60)})}]);
//# sourceMappingURL=custom.js.map