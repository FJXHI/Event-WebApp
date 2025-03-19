import{u as F}from"./useEventData-CztJfjsB.js";import{_,g as c,b as $,c as r,a as t,F as m,h as v,u as A,o as a,i as g,t as b,j as V,d as B,k as D,e as I,f as P}from"./index-BgWNFov8.js";import{P as S}from"./ProgrammList-BlZ1wYGu.js";import"./FavBtn-Bes61ZIC.js";import"./IconHeart-BiJSGRWM.js";const E={class:"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"},N={class:"bg-white rounded-lg w-96 shadow-lg"},j={class:"p-4 border-b flex justify-between items-center"},z={class:"p-4"},L={class:"mb-4"},M={class:"flex gap-2 flex-wrap"},T=["onClick"],K={class:"flex gap-2 flex-wrap"},q=["onClick"],G={__name:"FilterMenu",emits:["apply"],setup(x,{emit:i}){const{stages:d,acts:u}=F(),p=i,l=c([]),o=c([]),f=$(()=>{if(!Array.isArray(u.value))return[];const s=new Set;return u.value.forEach(e=>{Array.isArray(e.tags)&&e.tags.forEach(n=>{n.visible&&s.add(n.name)})}),Array.from(s)}),y=s=>{l.value.includes(s)?l.value=l.value.filter(e=>e!==s):l.value.push(s)},k=s=>{o.value.includes(s.id)?o.value=o.value.filter(e=>e!==s.id):o.value.push(s.id)},h=()=>{l.value=[],o.value=[]},w=()=>{const s={categories:l.value,stages:o.value};p("apply",s)};return(s,e)=>(a(),r("div",E,[t("div",N,[t("div",j,[e[1]||(e[1]=t("h2",{class:"text-lg font-semibold"},"Filter",-1)),t("button",{onClick:e[0]||(e[0]=n=>s.$emit("close")),class:"text-gray-500 hover:text-black"},"×")]),t("div",z,[t("button",{onClick:h,class:"text-blue-500 flex items-center mb-4"}," ↻ Filter zurücksetzen "),t("div",L,[e[2]||(e[2]=t("h3",{class:"font-semibold mb-2"},"Kategorien",-1)),t("div",M,[(a(!0),r(m,null,v(f.value,n=>(a(),r("button",{key:n,onClick:C=>y(n),class:g(["px-3 py-1 rounded-full border",l.value.includes(n)?"bg-blue-500 text-white":"bg-gray-100"])},b(n),11,T))),128))])]),t("div",null,[e[4]||(e[4]=t("h3",{class:"font-semibold mb-2"},"Bühnen",-1)),t("div",K,[(a(!0),r(m,null,v(A(d),n=>(a(),r("button",{key:n.id,onClick:C=>k(n),class:g(["px-3 py-1 rounded-full border flex items-center",o.value.includes(n.id)?"bg-green-500 text-white":"bg-gray-100"])},[e[3]||(e[3]=t("span",{class:"mr-1"},"📍",-1)),V(" "+b(n.name),1)],10,q))),128))])])]),t("div",{class:"p-4 border-t"},[t("button",{onClick:w,class:"w-full bg-green-500 text-white py-2 rounded-lg"},"Filter anwenden")])])]))}},H=_(G,[["__scopeId","data-v-88eeac3d"]]),J=B({__name:"ProgrammView",setup(x){const i=c(!1),d=c("all"),u=c([]),p=l=>{console.log(l),d.value=l.categories.length>0?"tags":"all",u.value=l.categories.length>0?l.categories:[]};return(l,o)=>(a(),r("div",null,[i.value?(a(),D(H,{key:0,onApply:p,onClose:o[0]||(o[0]=f=>i.value=!1)})):I("",!0),t("button",{onClick:o[1]||(o[1]=f=>i.value=!0),class:"bg-blue-500 text-white px-4 py-2 rounded"}," Filter öffnen "),P(S,{filter:d.value,filterID:u.value,class:"ProgrammList"},null,8,["filter","filterID"])]))}}),X=_(J,[["__scopeId","data-v-4d219514"]]);export{X as default};
