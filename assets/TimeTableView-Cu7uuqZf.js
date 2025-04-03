import{u as A,p as c,d as H}from"./useEventData-Cu_HqS4d.js";import{d as w,b as S,c as i,a as u,t as d,n as y,F as p,g as D,u as L,i as B,l as N,m as V,o as r,_ as b,f as I}from"./index-BjblGMKW.js";const z={class:"table-content"},O={class:"timeline"},U={class:"timeline-column"},F={class:"timeline-header"},j={class:"stages"},q={class:"timeline-header"},P={key:0},G={key:1},J={key:2},K=w({__name:"TimeTableItem",props:{date:String},setup(k){const _=k,{performances:g,acts:h,stages:f}=A(),l=(a=[])=>a.map(e=>{var s;return((s=h.value.find(n=>n.id===e))==null?void 0:s.name)||"Unknown Artist"}).join(", "),v=S(()=>g.value.filter(a=>{const e=c(a.start_time),s=c(_.date),n=e.getHours()<H&&e.getDate()===s.getDate()+1,m=e.getDate()===s.getDate()||n;return e.getHours()<H&&e.getDate()===s.getDate()?!1:m}).sort((a,e)=>{const s=c(a.start_time)??new Date(0),n=c(e.start_time)??new Date(0);return s.getTime()-n.getTime()})),o=S(()=>{const e=v.value.flatMap(t=>[c(t.start_time).getHours(),c(t.end_time).getHours()]).map(t=>t<H?t+24:t),s=Math.min(...e)-1,n=Math.max(...e)+1;return Array.from({length:n-s+1},(t,m)=>(s+m)%24)}),T=a=>{const e=c(a.start_time),s=c(a.end_time),n=o.value[0],t=o.value.length*60,m=(e.getHours()<n?e.getHours()+24:e.getHours())*60+e.getMinutes()-n*60,E=(s.getHours()<n?s.getHours()+24:s.getHours())*60+s.getMinutes()-n*60,C=m/t*100+"%",x=(E-m)/t*100+"%";return{top:C,height:x}},M=()=>{const a=o.value[0];return{height:`${((o.value[o.value.length-1]<a?o.value[o.value.length-1]+24:o.value[o.value.length-1])-a+1)*60}px`}},$=a=>{const e=o.value[0],s=o.value.length*60;return{top:((a<e?a+24:a)*60-e*60)/s*100+"%"}};return(a,e)=>{const s=V("router-link");return r(),i("div",z,[u("div",O,[u("div",U,[u("div",F,d(a.$t("Time")),1),u("div",{class:"time-slots",style:y(M())},[(r(!0),i(p,null,D(o.value,n=>(r(),i("div",{key:n,class:"time-slot",style:y($(n))},d(n%24)+":00 ",5))),128))],4)])]),u("div",j,[(r(!0),i(p,null,D(L(f),n=>(r(),i("div",{key:n.id,class:"stage"},[u("div",q,d(n.name),1),u("div",{class:"events",style:y(M())},[(r(!0),i(p,null,D(o.value,t=>(r(),i("div",{key:t,class:"time-slot",style:y($(t))},null,4))),128)),(r(!0),i(p,null,D(v.value.filter(t=>t.stageID===n.id),t=>{var m;return r(),B(s,{key:t.id,to:"/event/"+(((m=t["id-name"])==null?void 0:m.trim())||t.id),class:"event",style:y(T(t)),title:t.name||l(t.actsIDArr)||a.$t("Unknown")},{default:N(()=>[u("strong",null,[t.name?(r(),i("div",P,d(t.name),1)):t.actsIDArr.length?(r(),i("div",G,d(l(t.actsIDArr)),1)):(r(),i("div",J,d(a.$t("Unknown")),1))])]),_:2},1032,["to","style","title"])}),128))],4)]))),128))])])}}}),Q=b(K,[["__scopeId","data-v-900eeec5"]]),R={class:"timetable"},W={class:"day-head"},X=w({__name:"TimeTableList",setup(k){const{performances:_}=A(),g=S(()=>{const h=new Set(_.value.map(l=>c(l.start_time).toLocaleDateString("en-CA"))),f=new Set;return _.value.forEach(l=>{const v=c(l.start_time),o=v.getHours();if(o>=0&&o<H){const T=new Date(v);T.setDate(v.getDate()-1),f.add(T.toLocaleDateString("en-CA"))}}),Array.from(new Set([...h,...f])).sort()});return(h,f)=>(r(),i("div",R,[(r(!0),i(p,null,D(g.value,l=>(r(),i("div",{key:l,class:"day-table"},[u("h2",W,d(l),1),I(Q,{date:l},null,8,["date"])]))),128))]))}}),Y=b(X,[["__scopeId","data-v-311ccde3"]]),Z=w({__name:"TimeTableView",setup(k){return(_,g)=>(r(),i(p,null,[u("button",{onClick:g[0]||(g[0]=h=>_.$router.push("/schedule")),class:"btn-view-chang"},d(_.$t("change-view")),1),I(Y)],64))}}),st=b(Z,[["__scopeId","data-v-c69afbcf"]]);export{st as default};
