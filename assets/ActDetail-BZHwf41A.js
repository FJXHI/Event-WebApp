import{d as v,b as _,l as h,c as r,a as s,f as u,t as l,u as I,j as p,F as k,h as B,e as D,o as n}from"./index-BgWNFov8.js";import{b}from"./config-j_rkw8Ty.js";import{u as y}from"./useEventData-CztJfjsB.js";import{B as $}from"./BackBtn-BolmAfRy.js";import{P as A}from"./ProgrammList-BlZ1wYGu.js";import{F}from"./FavBtn-Bes61ZIC.js";import"./IconHeart-BiJSGRWM.js";const N={key:0,class:"act-detail-view"},S=["src"],V={key:0},L={key:1},q=v({__name:"ActDetail",setup(P){const g=h(),{acts:m,performances:c,stages:d}=y(),t=_(()=>{if(!m.value||!c.value||!d.value)return null;const a=g.params.id,i=m.value.find(e=>e["id-name"]===a||e.id.toString()===a);return i?{...i,performances:c.value.filter(e=>e.actsIDArr.includes(i.id)).map(e=>({...e,stage:d.value.find(o=>o.id===e.stageID)||null}))}:null});return(a,i)=>t.value?(n(),r("div",N,[s("h3",null,l(t.value.name),1),s("img",{src:I(b)+"images/"+(t.value.image&&t.value.image.trim()!==""?t.value.image:"default-image.jpg"),alt:"Act Image",class:"act-image"},null,8,S),s("p",null,[s("strong",null,l(a.$t("bio"))+":",1),p(" "+l(t.value.description),1)]),s("p",null,[s("strong",null,l(a.$t("genre"))+": ",1),(n(!0),r(k,null,B(t.value.tags.filter(e=>e.visible),(e,o)=>(n(),r("span",{key:o},[p(l(e.name),1),o<t.value.tags.filter(f=>f.visible).length-1?(n(),r("span",V,", ")):D("",!0)]))),128))]),u(F,{itemId:String(t.value.id),itemType:"act"},null,8,["itemId"]),s("h4",null,l(a.$t("appearances"))+":",1),u(A,{filter:"act",filterID:[String(t.value.id)],class:"ProgrammList"},null,8,["filterID"]),u($)])):(n(),r("div",L,[s("p",null,l(a.$t("act"))+" "+l(a.$t("not-found")),1)]))}});export{q as default};
