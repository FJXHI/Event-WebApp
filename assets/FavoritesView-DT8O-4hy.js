import{u as _}from"./useEventData-CE4THbyF.js";import{e as g}from"./config-tdt0jHZW.js";import{L as u}from"./LinkItem-BZWtFzH3.js";import{d as h,c as v,a as o,b as e,e as n,t as d,u as I,o as s,I as S,g as b,f as k,_ as y}from"./index-BIkOLR_Z.js";import{S as D}from"./ScheduleListItem-Den88hGV.js";import{L}from"./LocationList-rnlN-G2d.js";import{_ as w}from"./ActList.vue_vue_type_script_setup_true_lang-DQovD_Vz.js";import"./FavBtn-CvnfJoFt.js";import"./tagLabel-D31F0LEb.js";import"./SearchBar-DOqd5MZV.js";const x={class:"center"},N={key:0},A={key:1},E={class:"center"},V={key:2},$={key:3},B={class:"center"},F={key:4},J={key:5},O=h({__name:"FavoritesView",setup(C){const{acts:i,stages:r,performances:c}=_(),f=v(()=>{const t=JSON.parse(localStorage.getItem("act"))||[];return!i.value||i.value.length===0?(console.warn("Acts data not available yet!"),[]):i.value.filter(l=>t.includes(l.id.toString()))}),m=v(()=>{const t=JSON.parse(localStorage.getItem("stage"))||[];return!r.value||r.value.length===0?(console.warn("Stages data not available yet!"),[]):r.value.filter(l=>t.includes(l.id.toString()))}),p=v(()=>{const t=JSON.parse(localStorage.getItem("event"))||[];return!c.value||c.value.length===0?(console.warn("Performances data not available yet!"),[]):c.value.filter(a=>t.includes(a.id.toString()))});return(t,l)=>(s(),o("div",null,[e("div",x,[e("ul",null,[n(u,{to:"/acts",icon:S,title:"nav-acts",subtext:"nav-acts-subtext"})])]),f.value.length?(s(),o("div",N,[n(w,{filter:"act",filterID:f.value.map(a=>a.id)},null,8,["filterID"])])):(s(),o("div",A,[e("p",null,d(t.$t("no-act-fav")),1)])),e("div",E,[e("ul",null,[n(u,{to:"/locations",icon:b,title:"nav-locations",subtext:"nav-locations-subtext"})])]),m.value.length?(s(),o("div",V,[n(L,{filter:"location",filterID:m.value.map(a=>a.id)},null,8,["filterID"])])):(s(),o("div",$,[e("p",null,d(t.$t("no-stage-fav")),1)])),e("div",B,[e("ul",null,[n(u,{to:"/schedule",icon:k,title:"nav-timetable",subtext:""})])]),p.value.length?(s(),o("div",F,[n(D,{filters:{...I(g),performanceIDs:p.value.map(a=>String(a.id))}},null,8,["filters"])])):(s(),o("div",J,[e("p",null,d(t.$t("no-event-fav")),1)]))]))}}),T=y(O,[["__scopeId","data-v-5f263a66"]]);export{T as default};
