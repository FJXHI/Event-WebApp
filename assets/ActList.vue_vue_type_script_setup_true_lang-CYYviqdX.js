import{u as h}from"./useEventData-Dcdqaid4.js";import{F as k}from"./FavBtn-CoG8YCO1.js";import{T as b}from"./tagLabel-jABmE6z4.js";import{d as y,b as D,c as s,F as u,h as d,t as _,e as p,s as I,a as r,k as B,x as F,o as e}from"./index-BF-5QZq4.js";const L={class:"act-list"},T={key:0,class:"list-item-ul"},x={class:"list-item-info"},C={class:"list-item-name"},A={class:"list-item-tags"},E={key:1},w=y({__name:"ActList",props:{filterID:{}},setup(f){const{acts:i}=h(),a=f,c=D(()=>!i.value||i.value.length===0?[]:!a.filterID||a.filterID.length===0?i.value:i.value.filter(l=>{var n;return(n=a.filterID)==null?void 0:n.includes(l.id)}));return(l,n)=>{const v=F("router-link");return e(),s("div",L,[c.value.length>0?(e(),s("ul",T,[(e(!0),s(u,null,d(c.value,t=>{var m;return e(),s("li",{key:t.id,class:"list-item-obj pad"},[p(v,{to:"/act/"+((m=t["id-name"])!=null&&m.trim()?t["id-name"]:t.id),class:"list-item-link"},{default:I(()=>[r("div",x,[r("strong",C,_(t.name),1),r("span",A,[(e(!0),s(u,null,d(t.tags.filter(o=>o.visible),(o,g)=>(e(),B(b,{key:g,name:o.name,class:"tag-label-item TagLabel"},null,8,["name"]))),128))])])]),_:2},1032,["to"]),p(k,{itemId:String(t.id),itemType:"act",class:"list-item-fav-btn"},null,8,["itemId"])])}),128))])):(e(),s("p",E,_(l.$t("no-acts")),1))])}}});export{w as _};
