import{u as p}from"./useEventData-DWTzXPFb.js";import{L as u,I as g,a as I}from"./IconClock-CXPa54us.js";import{I as h}from"./IconGeo-DOnZE64O.js";import{S}from"./ScheduleList-CSlBuQFB.js";import{L as b}from"./LocationList-C-460gxF.js";import{_ as k}from"./ActList.vue_vue_type_script_setup_true_lang-DNpc6rId.js";import{_ as y,b as v,c as o,a as e,f as l,t as d,o as s}from"./index-C335-19e.js";import"./config-CryjaMuD.js";import"./FavBtn-BZosoWnO.js";import"./IconHeart-CezdSe3a.js";const D={class:"center"},L={key:0},w={key:1},x={class:"center"},N={key:2},A={key:3},E={class:"center"},V={key:4},$={key:5},B={__name:"FavoritesView",setup(J){const{acts:i,stages:r,performances:c}=p(),f=v(()=>{const t=JSON.parse(localStorage.getItem("act"))||[];return!i.value||i.value.length===0?(console.warn("Acts data not available yet!"),[]):i.value.filter(n=>t.includes(n.id.toString()))}),m=v(()=>{const t=JSON.parse(localStorage.getItem("stage"))||[];return!r.value||r.value.length===0?(console.warn("Stages data not available yet!"),[]):r.value.filter(n=>t.includes(n.id.toString()))}),_=v(()=>{const t=JSON.parse(localStorage.getItem("event"))||[];return!c.value||c.value.length===0?(console.warn("Performances data not available yet!"),[]):c.value.filter(a=>t.includes(a.id.toString()))});return(t,n)=>(s(),o("div",null,[e("div",D,[e("ul",null,[l(u,{to:"/acts",icon:g,title:"nav-acts",subtext:"nav-acts-subtext"})])]),f.value.length?(s(),o("div",L,[l(k,{filter:"act",filterID:f.value.map(a=>a.id)},null,8,["filterID"])])):(s(),o("div",w,[e("p",null,d(t.$t("no-act-fav")),1)])),e("div",x,[e("ul",null,[l(u,{to:"/locations",icon:h,title:"nav-locations",subtext:"nav-locations-subtext"})])]),m.value.length?(s(),o("div",N,[l(b,{filter:"location",filterID:m.value.map(a=>a.id)},null,8,["filterID"])])):(s(),o("div",A,[e("p",null,d(t.$t("no-stage-fav")),1)])),e("div",E,[e("ul",null,[l(u,{to:"/schedule",icon:I,title:"nav-timetable",subtext:""})])]),_.value.length?(s(),o("div",V,[l(S,{filter:"event",filterID:_.value.map(a=>a.id.toString()),class:"ProgrammList"},null,8,["filterID"])])):(s(),o("div",$,[e("p",null,d(t.$t("no-event-fav")),1)]))]))}},M=y(B,[["__scopeId","data-v-629388aa"]]);export{M as default};
