import{d as f,c as _,l as g,a as i,b as a,n as h,u as o,e as r,t as n,A as b,o as d,g as k,_ as y}from"./index-ByZbFJ75.js";import{b as S,a as I,e as w}from"./config-CFcYo9TX.js";import{u as B}from"./useEventData-BXc6N1on.js";import{O as D}from"./OvalLink-DidSSNh4.js";import{S as L}from"./ScheduleListItem-CJwIIx7D.js";import{F as N}from"./FavBtn-BAbLzbI5.js";import"./tagLabel-CuO8aFNs.js";const A={key:0,class:"detail-view"},C={class:"detail-space"},F={class:"detail-header"},V={class:"detail-title"},$={class:"detail-content"},x={class:"detail-content-text"},E={key:0},O=["href"],q={key:1},z=f({__name:"LocationDetail",setup(G){const c=g(),{stages:u,performances:m,acts:v}=B(),e=_(()=>{const l=u.value.find(t=>t["id-name"]===c.params.id||t.id===Number(c.params.id));if(l){const t=m.value.filter(s=>s.stageID===l.id).map(s=>({...s,act:v.value.find(p=>p.id===s.actsIDArr[0])}));return{...l,performances:t}}return null});return(l,t)=>{var s;return e.value?(d(),i("div",A,[a("div",C,[a("div",{class:"detail-view-background",style:h({"--bg-image":e.value.image?`url(${o(S)+"images/"+e.value.image})`:"none","--fallback-bg":e.value.image?"transparent":"#ccc"})},null,4)]),a("div",F,[r(N,{itemId:String(e.value.id),itemType:"stage",class:"detail-view-favBtn"},null,8,["itemId"]),a("div",V,[t[0]||(t[0]=a("div",{class:"detail-space2"},null,-1)),a("h3",null,n(e.value.name),1),a("p",null,n(o(I)(e.value.address,"noCountry")),1)]),r(D,{link:{name:"map",query:{stage:e.value.id}},icon:k,name:e.value.location.toString()},null,8,["link","name"])]),a("div",$,[a("div",x,[a("p",null,n(e.value.description||"Keine Beschreibung verfügbar"),1),(s=e.value)!=null&&s.url?(d(),i("p",E,[a("a",{href:e.value.url,target:"_blank",rel:"noopener noreferrer"},n(e.value.url.replace(/^(https?:\/\/)?(www\.)?/,"")),9,O)])):b("",!0)]),t[1]||(t[1]=a("div",{class:"detail-line"},null,-1)),r(L,{filters:{...o(w),stages:[String(e.value.id)]}},null,8,["filters"])])])):(d(),i("div",q,[a("p",null,n(l.$t("stage"))+" "+n(l.$t("not-found")),1)]))}}}),J=y(z,[["__scopeId","data-v-9122283f"]]);export{J as default};
