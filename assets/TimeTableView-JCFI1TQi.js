import{u as M}from"./useEventData-DquINv-W.js";import{d as w,b as D,c as i,a as c,t as u,n as h,F as v,g as f,u as C,i as L,w as B,l as E,o,_ as k,f as S}from"./index-C78Mhlsf.js";const V={class:"table-content"},N={class:"timeline"},O={class:"timeline-column"},U={class:"timeline-header"},z={class:"stages"},F={class:"timeline-header"},j={key:0},q={key:1},P={key:2},G=w({__name:"TimeTableItem",props:{date:String},setup(y){const m=y,{performances:d,acts:g,stages:p}=M(),_=(t=[])=>t.map(n=>{var a;return((a=g.value.find(e=>e.id===n))==null?void 0:a.name)||"Unknown Artist"}).join(", "),H=D(()=>d.value.filter(t=>new Date(t.start_time).toLocaleDateString()===m.date).sort((t,n)=>new Date(t.start_time).getTime()-new Date(n.start_time).getTime())),l=D(()=>{const t=H.value.flatMap(r=>[new Date(r.start_time).getHours(),new Date(r.end_time).getHours()]),n=8,a=t.map(r=>r<n?r+24:r),e=Math.min(...a)-1,s=Math.max(...a)+1;return Array.from({length:s-e+1},(r,T)=>(e+T)%24)}),$=t=>{const n=new Date(t.start_time),a=new Date(t.end_time),e=l.value[0],s=l.value.length*60,r=(n.getHours()<e?n.getHours()+24:n.getHours())*60+n.getMinutes()-e*60,T=(a.getHours()<e?a.getHours()+24:a.getHours())*60+a.getMinutes()-e*60,A=r/s*100+"%",x=(T-r)/s*100+"%";return{top:A,height:x}},b=()=>{const t=l.value[0];return{height:`${((l.value[l.value.length-1]<t?l.value[l.value.length-1]+24:l.value[l.value.length-1])-t)*60}px`}},I=t=>{const n=l.value[0],a=l.value.length*60;return{top:((t<n?t+24:t)*60-n*60)/a*100+"%"}};return(t,n)=>{const a=E("router-link");return o(),i("div",V,[c("div",N,[c("div",O,[c("div",U,u(t.$t("Time")),1),c("div",{class:"time-slots",style:h(b())},[(o(!0),i(v,null,f(l.value,e=>(o(),i("div",{key:e,class:"time-slot",style:h(I(e))},u(e%24)+":00 ",5))),128))],4)])]),c("div",z,[(o(!0),i(v,null,f(C(p),e=>(o(),i("div",{key:e.id,class:"stage"},[c("div",F,u(e.name),1),c("div",{class:"events",style:h(b())},[(o(!0),i(v,null,f(H.value.filter(s=>s.stageID===e.id),s=>{var r;return o(),L(a,{key:s.id,to:"/event/"+(((r=s["id-name"])==null?void 0:r.trim())||s.id),class:"event",style:h($(s)),title:s.name||_(s.actsIDArr)||t.$t("Unknown")},{default:B(()=>[c("strong",null,[s.name?(o(),i("div",j,u(s.name),1)):s.actsIDArr.length?(o(),i("div",q,u(_(s.actsIDArr)),1)):(o(),i("div",P,u(t.$t("Unknown")),1))])]),_:2},1032,["to","style","title"])}),128))],4)]))),128))])])}}}),J=k(G,[["__scopeId","data-v-6d5d8d7d"]]),K={class:"timetable"},Q={class:"day-head"},R=w({__name:"TimeTableList",setup(y){const{performances:m}=M(),d=D(()=>{const g=new Set(m.value.map(p=>new Date(p.start_time).toLocaleDateString()));return Array.from(g).sort()});return(g,p)=>(o(),i("div",K,[(o(!0),i(v,null,f(d.value,_=>(o(),i("div",{key:_,class:"day-table"},[c("h2",Q,u(_),1),S(J,{date:_},null,8,["date"])]))),128))]))}}),W=k(R,[["__scopeId","data-v-55c7d8f9"]]),X=w({__name:"TimeTableView",setup(y){return(m,d)=>(o(),i(v,null,[c("button",{onClick:d[0]||(d[0]=g=>m.$router.push("/schedule")),class:"btn-view-chang"},u(m.$t("change-view")),1),S(W)],64))}}),tt=k(X,[["__scopeId","data-v-c69afbcf"]]);export{tt as default};
