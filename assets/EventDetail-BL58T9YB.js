import{d as B,b as T,g as L,c as s,u as m,a as t,t as n,e as u,F as c,j as _,h,q as g,s as N,x,o as i,_ as C}from"./index-BF-5QZq4.js";import{u as E,f as p}from"./useEventData-Dcdqaid4.js";import{I as F}from"./IconGeo-B7Ix5jh8.js";import{O as V}from"./OvalLink-DHIP3CrQ.js";import{F as k}from"./FavBtn-CoG8YCO1.js";const $={key:0},S={key:1,class:"event-detail-view detail-view"},j={class:"detail-header"},O={class:"event-detail-time"},U={class:"detail-title"},q={key:0},A={class:"detail-content"},G={class:"list-item-info"},K={class:"list-item-name"},P={class:"detail-content-text"},R={key:0},z=["href"],H={key:2},J=B({__name:"EventDetail",setup(M){const y=L(),{performances:I,stages:w,acts:b,isLoading:D}=E(),e=T(()=>{const l=y.params.id,r=I.value.find(o=>o.id===Number(l)||o["id-name"]===l);if(!r)return null;const v=(r.actsIDArr??[]).map(o=>b.value.find(a=>a.id===o)).filter(Boolean),d=w.value.find(o=>o.id===r.stageID)||{id:0,name:"Unknown","id-name":""};return{...r,acts:v,stage:d}});return(l,r)=>{var d,o;const v=x("router-link");return m(D)?(i(),s("div",$,[t("p",null,n(l.$t("loading")),1)])):e.value?(i(),s("div",S,[r[0]||(r[0]=t("div",{class:"detail-space"},null,-1)),t("div",j,[t("div",O,[t("h4",null,n(m(p)(e.value.start_time,"Time"))+" – "+n(m(p)(e.value.end_time,"Time"))+", "+n(m(p)(e.value.start_time,"Date Long")),1)]),u(k,{itemId:String(e.value.id),itemType:"event",class:"detail-view-favBtn"},null,8,["itemId"]),t("div",U,[t("h3",null,[e.value.name?(i(),s(c,{key:0},[_(n(e.value.name),1)],64)):e.value.acts.length?(i(!0),s(c,{key:1},h(e.value.acts,(a,f)=>(i(),s("span",{key:a.id},[_(n(a.name),1),f<e.value.acts.length-1?(i(),s("span",q,", ")):g("",!0)]))),128)):(i(),s(c,{key:2},[_(n(l.$t("Unknown")),1)],64))])]),u(V,{link:"/location/"+((d=e.value.stage["id-name"])!=null&&d.trim()?e.value.stage["id-name"]:e.value.stage.id),icon:F,name:e.value.stage.name},null,8,["link","name"])]),t("div",A,[(i(!0),s(c,null,h(e.value.acts,(a,f)=>(i(),s("div",{key:a.id,class:"list-item-obj"},[u(v,{to:"/act/"+(a["id-name"]&&a["id-name"].trim()!==""?a["id-name"]:a.id),class:"list-item-link"},{default:N(()=>[t("div",G,[t("strong",K,n(a.name),1)])]),_:2},1032,["to"]),u(k,{itemId:String(a.id),itemType:"act",class:"list-item-fav-btn"},null,8,["itemId"])]))),128)),t("div",P,[t("p",null,n(e.value.description||"Keine Beschreibung verfügbar"),1),(o=e.value)!=null&&o.url?(i(),s("p",R,[t("a",{href:e.value.url,target:"_blank",rel:"noopener noreferrer"},n(e.value.url.replace(/^(https?:\/\/)?(www\.)?/,"")),9,z)])):g("",!0)])])])):(i(),s("div",H,[t("p",null,n(l.$t("event"))+" "+n(l.$t("not-found")),1)]))}}}),ee=C(J,[["__scopeId","data-v-fbf2ef71"]]);export{ee as default};
