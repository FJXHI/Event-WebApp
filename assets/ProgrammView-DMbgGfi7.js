import{u as b}from"./useEventData-BH0ltqqa.js";import{_ as p,r as c,b as y,c as m,a as e,F as C,g as k,o as d,h as F,t as h,d as A,i as w,e as $,f as x}from"./index-qaY-1e2Q.js";import{P as D}from"./ProgrammList-Bd5W6IUH.js";import"./config-CryjaMuD.js";import"./FavBtn-BYIfDBwy.js";import"./IconHeart-CAhgWLAT.js";const I={class:"overlay"},P={class:"filter-modal"},V={class:"filter-modal-header"},B={class:"filter-modal-body"},E={class:"filter-group"},S={class:"filter-button-group"},z=["onClick"],L={__name:"FilterMenu",emits:["apply","close"],setup(v,{emit:n}){const{acts:i}=b(),u=n,l=c([]),o=c([]),r=y(()=>{if(!Array.isArray(i.value))return[];const s=new Set;return i.value.forEach(t=>{Array.isArray(t.tags)&&t.tags.forEach(a=>{a.visible&&s.add(a.name)})}),Array.from(s)}),f=s=>{l.value.includes(s)?l.value=l.value.filter(t=>t!==s):l.value.push(s)},_=()=>{l.value=[],o.value=[]},g=()=>{const s={categories:l.value,stages:o.value};u("apply",s),u("close")};return(s,t)=>(d(),m("div",I,[e("div",P,[e("div",V,[t[1]||(t[1]=e("h2",null,"Filter",-1)),e("button",{onClick:t[0]||(t[0]=a=>s.$emit("close")),class:"filter-close-btn"},"×")]),e("div",B,[e("button",{onClick:_,class:"filter-reset-btn"}," ↻ Filter zurücksetzen "),e("div",E,[t[2]||(t[2]=e("h3",null,"Kategorien",-1)),e("div",S,[(d(!0),m(C,null,k(r.value,a=>(d(),m("button",{key:a,onClick:K=>f(a),class:F({selected:l.value.includes(a)})},h(a),11,z))),128))])])]),e("div",{class:"filter-modal-footer"},[e("button",{onClick:g,class:"filter-apply-btn"},"Filter anwenden")])])]))}},M=p(L,[["__scopeId","data-v-22fbd1a0"]]),N=A({__name:"ProgrammView",setup(v){const n=c(!1),i=c("all"),u=c([]),l=o=>{console.log(o),i.value=o.categories.length>0?"tags":"all",u.value=o.categories.length>0?o.categories:[]};return(o,r)=>(d(),m("div",null,[n.value?(d(),w(M,{key:0,onApply:l,onClose:r[0]||(r[0]=f=>n.value=!1)})):$("",!0),e("button",{onClick:r[1]||(r[1]=f=>n.value=!0),class:"bg-blue-500 text-white px-4 py-2 rounded"}," Filter öffnen "),x(D,{filter:i.value,filterID:u.value,class:"ProgrammList"},null,8,["filter","filterID"])]))}}),O=p(N,[["__scopeId","data-v-4d219514"]]);export{O as default};
