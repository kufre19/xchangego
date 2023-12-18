import{t as N}from"./toMoney-095245cb.js";import{t as B}from"./toDate-72dd42ab.js";import{F as z}from"./Filter-775fbf02.js";import{C as U}from"./Col-bcd5fefc.js";import{_ as I,o as u,c as m,a as e,F as w,r as M,p as O,t as a,n as y,q as T,g as k,i as x,U as j,d as P,f as c,w as n,V as A,e as L,h as b}from"./bootstrap-edff2868.js";import{u as H}from"./market-6fe8fea7.js";import"./_commonjsHelpers-de833af9.js";import"./browser-77dd377d.js";import"./preload-helper-f61836a9.js";import"./axios-28bc18a3.js";const q={props:["values"],computed:{chartPoints(){return this.values.map(t=>t.x-8+","+t.y).join(" ")},cx(){return this.values.length?this.values[this.values.length-1].x-3:0},cy(){return this.values.length?this.values[this.values.length-1].y:0}}},D=["points"],K=["cx","cy"];function E(t,s,d,h,r,o){return u(),m(w,null,[e("polyline",{class:"polyline",fill:"none",stroke:"#f0f0f0","stroke-width":"1","stroke-linecap":"round",points:o.chartPoints},null,8,D),e("circle",{class:"circle",cx:o.cx,cy:o.cy,r:"3",fill:"#f0f0f0",stroke:"none"},null,8,K)],64)}const W=I(q,[["render",E]]);const R={components:{toDate:B,toMoney:N,Filter:z,Col:U,LineChartList:W},setup(){const t=H(),s={enableRateLimit:!0,proxy:gnl.cors,options:{tradesLimit:10},newUpdates:!0,timeout:2e4};return t.exchange===null&&(t.exchange=new ccxt.pro[provider](s)),{marketStore:t}},data(){return{plat,cur_rate,cur_symbol,available_wallet,trading_wallet,filters:{symbol:{value:"",keys:["symbol"]}},activeItem:"USDT",list:{},currentPage:1,totalPages:0,filtersFutures:{symbol:{value:"",keys:["symbol"]}},activeItemFutures:"USDT",listFutures:{},currentPageFutures:1,totalPagesFutures:0,filtersMain:{symbol:{value:"",keys:["symbol"]}},activeItemMain:"All",listMain:{},currentPageMain:1,totalPagesMain:0,filtersMainVolume:{symbol:{value:"",keys:["symbol"]}},listMainVolume:{},currentPageMainVolume:1,totalPagesMainVolume:0,cx:0,cy:0,width:200,height:28,history:[],old:[],oldChange:[],ext,activeTab:plat.eco.ecosystem_trading_only==1?"main_markets":"markets"}},computed:{svgBox(){return"0 0 "+this.width+" "+this.height},market(){return this.marketStore[this.activeTab][this.activeItem]}},watch:{activeItem(){this.lists()},activeItemFutures(){this.listsFutures()},activeItemMain(){this.listsMain()}},async created(){plat.eco.ecosystem_trading_only!=1&&(await this.marketStore.fetch_markets(),this.lists(),ext.futures===1&&(await this.marketStore.fetch_futures(),this.listsFutures())),ext.eco===1&&(await this.marketStore.fetch_main_markets(),this.listsMain(),plat.eco.ecosystem_trading_only==1&&(await this.marketStore.fetch_main_markets_volume(),this.listMainVolume=this.marketStore.main_markets_volume))},mounted(){plat.eco.ecosystem_trading_only!=1&&this.loop()},methods:{renderSymbol(t){const[s,d]=t.split("/"),[h,r]=s.split("_"),[o,f]=d.split("_");let g="",p="";return r?g=`${h}
          <span class="badge bg-primary">${r}</span>`:h?g=h:g=s,f?p=`${o}
          <span class="badge bg-primary">${f}</span>`:o?p=o:p=d,g+"/"+p},formatNumber(t){const s=t.toString(),d=s.indexOf(".");if(d===-1)return t;const h=s.slice(d+1).replace(/0*$/,"");return h.length===0?parseInt(s.slice(0,d)):parseFloat(`${s.slice(0,d)}.${h}`)},setActive(t){this.activeTab=t},isActive(t){return this.activeTab===t},async loop(){for(;this.$route.meta.title=="Dashboard";)try{if(this.marketStore.exchange.has.watchTickers){const t=await this.marketStore.exchange.watchTickers();this.handle(t)}else{const t=await this.marketStore.exchange.fetchTickers();this.handle(t),await new Promise(s=>setTimeout(s,5e3))}}catch{break}},tickerTransform(t,s){const d=this.activeTab==="futures"?t+":"+this.activeItem:t,h=this.market[d];!h||!s.last||(h.price=s.last,h.class=s.last>(this.old&&this.old[d])?"text-success":"text-danger",this.calcHistory(d,s.last),s.percentage&&(h.change=s.percentage,h.classChange=s.percentage>(this.oldChange&&this.oldChange[d])?"text-success":"text-danger"),h.baseVolume=s.baseVolume,h.quoteVolume=s.quoteVolume)},generateOld(t){this.old=Object.fromEntries(Object.entries(t).map(([s,d])=>[d.symbol,d.last]))},handle(t){try{if(!this.market)return;for(const[s,d]of Object.entries(t))this.tickerTransform(d.symbol,d);this.generateOld(t)}catch(s){console.error(s)}},lists(){if(this.marketStore.markets)if(this.activeItem&&this.marketStore.markets[this.activeItem])this.list=Object.values(this.marketStore.markets[this.activeItem]).filter(t=>t.active===!0);else{const t=Object.keys(this.marketStore.markets)[0];this.list=Object.values(this.marketStore.markets[t]).filter(s=>s.active===!0)}else this.list=[]},listsFutures(){if(this.marketStore.futures)if(this.activeItemFutures&&this.marketStore.futures[this.activeItemFutures])this.listFutures=Object.values(this.marketStore.futures[this.activeItemFutures]).filter(t=>t.active===!0);else{const t=Object.keys(this.marketStore.futures)[0];this.listFutures=Object.values(this.marketStore.futures[t]).filter(s=>s.active===!0)}else this.listFutures=[]},listsMain(){if(this.marketStore.main_markets)if(this.activeItemMain==="All")this.listMain=Object.values(this.marketStore.main_markets).flatMap(t=>Object.values(t).filter(s=>s.status===1));else if(this.activeItemMain!==null&&this.marketStore.main_markets[this.activeItemMain])this.listMain=Object.values(this.marketStore.main_markets[this.activeItemMain]).filter(t=>t.status===1);else{const t=Object.keys(this.marketStore.main_markets)[0];this.activeItemMain=t,this.listMain=Object.values(this.marketStore.main_markets[t])}else this.listMain=[]},points(t,s,d){t=parseFloat(t)||0,s=parseFloat(s)||0,d=Array.isArray(d)?d:[],d=d.map(_=>parseFloat(_)||0);let h=d.reduce((_,v)=>v<_?v:_,d[0]),r=d.reduce((_,v)=>v>_?v:_,d[0]),o=d.length,f=s/2,g=r>h?r-h:s,p=o>1?t/(o-1):1,C=[];for(let _=0;_<o;++_){let F=2*((d[_]-h)/g-.5),S=_*p,i=-F*f*.8+f;C.push({x:S,y:i})}return C},priceFormatter(t,s=8,d=2,h=","){return t==null||isNaN(t)?0:(t=parseInt(t)!==0?parseFloat(t).toFixed(d):parseFloat(t).toFixed(s),t=parseInt(t)!==0?t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,h):t,t)},calcHistory(t,s){this.history[t]||(this.history[t]=[]),this.history[t].length||this.fakeHistory(t,s),this.history[t].push(s),this.history[t].splice(0,this.history[t].length-30)},fakeHistory(t,s){const d=s*2e-4,h=-Math.abs(d),r=Math.abs(d);this.history[t]=[];for(let o=0;o<30;++o){const f=Math.random()*(r-h)+h;this.history[t].push(s+f)}}}},Z={class:"mb-4"},G={class:"flex justify-between p-1"},J={class:"font-medium"},Q={class:"font-medium"},X={class:"mb-4 border-b border-gray-200 dark:border-gray-700"},Y={id:"myTab",class:"-mb-px flex flex-wrap text-center text-sm font-medium",role:"tablist"},$={key:0,class:"mr-2",role:"presentation"},ee={class:"flex"},te=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"},null,-1),se=[te],re={class:"mr-2"},ae={key:1,class:"mr-2",role:"presentation"},le={class:"flex"},oe=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"},null,-1),ie=[oe],ne={class:"mr-2"},ce={key:2,class:"mr-2",role:"presentation"},ue={class:"flex"},de=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"},null,-1),me=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"},null,-1),he=[de,me],ge={class:"mr-2"},pe={key:3,class:"mr-2",role:"presentation"},ye={class:"flex"},_e=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"},null,-1),be=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"},null,-1),fe=[_e,be],ke={class:"mr-2"},ve={class:"mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"},xe={class:"mb-1 text-xl font-medium"},we={class:"grid gap-3 xs:grid-cols-1 md:grid-cols-2"},Me=["value"],Pe={class:"card relative overflow-x-auto"},Fe={class:"bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"},Se=e("th",{scope:"col",class:"px-6 py-3"},null,-1),Ce={"data-label":"Symbol",class:"flex items-center px-6 py-4"},Ve={class:"tokenicon-wrap"},Te={class:"tokenicon-image"},Ae={class:"font-medium"},Le={"data-label":"price"},je={class:"well"},Ie=["viewBox"],Ne={"data-label":"change"},Be={"data-label":"volume"},ze={class:"mr-1 text-start"},Ue={class:"mr-1 text-start"},Oe={class:"px-6 py-3",style:{width:"20%"},"data-label":"Action"},He={class:"btn btn-outline-primary"},qe={key:1,scope:"row",class:"border-b bg-white dark:border-gray-700 dark:bg-gray-800"},De={colspan:"100%",class:"px-6 py-4"},Ke={class:"sr-only"},Ee=e("svg",{class:"h-5 w-5","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"fill-rule":"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z","clip-rule":"evenodd"})],-1),We={class:"sr-only"},Re=e("svg",{class:"h-5 w-5","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"fill-rule":"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z","clip-rule":"evenodd"})],-1),Ze={class:"mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"},Ge={class:"mb-1 text-xl font-medium"},Je={class:"grid gap-3 xs:grid-cols-1 md:grid-cols-2"},Qe=["value"],Xe={class:"card relative overflow-x-auto"},Ye={class:"bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"},$e=e("th",{scope:"col",class:"px-6 py-3"},null,-1),et={"data-label":"Symbol",class:"flex items-center px-6 py-4"},tt={class:"tokenicon-wrap"},st={class:"tokenicon-image"},rt={class:"font-medium"},at={"data-label":"price"},lt={class:"well"},ot=["viewBox"],it={"data-label":"change"},nt={"data-label":"volume"},ct={class:"mr-1 text-start"},ut={class:"mr-1 text-start"},dt={class:"px-6 py-3",style:{width:"20%"},"data-label":"Action"},mt={class:"btn btn-outline-primary"},ht={key:1,scope:"row",class:"border-b bg-white dark:border-gray-700 dark:bg-gray-800"},gt={colspan:"100%",class:"px-6 py-4"},pt={class:"sr-only"},yt=e("svg",{class:"h-5 w-5","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"fill-rule":"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z","clip-rule":"evenodd"})],-1),_t={class:"sr-only"},bt=e("svg",{class:"h-5 w-5","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"fill-rule":"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z","clip-rule":"evenodd"})],-1),ft={class:"mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"},kt={class:"mb-1 text-xl font-medium"},vt={class:"grid gap-3 xs:grid-cols-1 md:grid-cols-2 }"},xt=e("option",{value:"All"},"All",-1),wt=["value"],Mt={class:"card relative overflow-x-auto"},Pt={class:"bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"},Ft={scope:"col",class:"py-3 px-6"},St={scope:"col",class:"py-3 px-6"},Ct={"data-label":"Symbol",class:"flex items-center px-6 py-4"},Vt={class:"tokenicon-wrap"},Tt={class:"tokenicon-image"},At=["innerHTML"],Lt={"data-label":"Limits",class:"px-6 py-4"},jt={class:"font-medium text-warning"},It={class:"font-medium text-warning"},Nt={"data-label":"Fees",class:"px-6 py-4"},Bt={class:"font-medium text-warning"},zt={class:"font-medium text-warning"},Ut={class:"px-6 py-3","data-label":"Action"},Ot={class:"btn btn-outline-primary"},Ht={key:1,scope:"row",class:"border-b bg-white dark:border-gray-700 dark:bg-gray-800"},qt={colspan:"100%",class:"px-6 py-4"},Dt={class:"sr-only"},Kt=e("svg",{class:"h-5 w-5","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"fill-rule":"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z","clip-rule":"evenodd"})],-1),Et={class:"sr-only"},Wt=e("svg",{class:"h-5 w-5","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"fill-rule":"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z","clip-rule":"evenodd"})],-1),Rt={class:"mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"},Zt={class:"mb-1 text-xl font-medium"},Gt={class:"card relative overflow-x-auto"},Jt={class:"bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"},Qt={scope:"col",class:"py-3 px-6"},Xt={scope:"col",class:"py-3 px-6"},Yt={scope:"col",class:"py-3 px-6"},$t={scope:"col",class:"py-3 px-6"},es={"data-label":"Symbol",class:"flex items-center px-6 py-4"},ts={class:"tokenicon-wrap"},ss={class:"tokenicon-image"},rs=["innerHTML"],as={"data-label":"Limits",class:"px-6 py-4"},ls={class:"font-medium text-warning"},os={class:"font-medium text-warning"},is={"data-label":"Fees",class:"px-6 py-4"},ns={class:"font-medium text-warning"},cs={class:"font-medium text-warning"},us={"data-label":"Volume",class:"px-6 py-4"},ds={"data-label":"High/Low",class:"px-6 py-4"},ms={class:"font-medium text-warning"},hs={class:"font-medium text-warning"},gs={class:"px-6 py-3","data-label":"Action"},ps={class:"btn btn-outline-primary"},ys={key:1,scope:"row",class:"border-b bg-white dark:border-gray-700 dark:bg-gray-800"},_s={colspan:"100%",class:"px-6 py-4"},bs={class:"sr-only"},fs=e("svg",{class:"h-5 w-5","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"fill-rule":"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z","clip-rule":"evenodd"})],-1),ks={class:"sr-only"},vs=e("svg",{class:"h-5 w-5","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"fill-rule":"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z","clip-rule":"evenodd"})],-1);function xs(t,s,d,h,r,o){const f=M("Filter"),g=M("Col"),p=M("VTh"),C=M("LineChartList"),_=M("router-link"),v=M("VTable"),F=M("VTPagination"),S=O("lazy");return u(),m(w,null,[e("div",Z,[e("div",G,[e("div",null,[e("span",J,a(t.$t("Locked Balance:")),1),e("span",null,a(t.lockedWallet),1)]),e("div",null,[e("span",Q,a(t.$t("Available Balance:")),1),e("span",null,a(t.availableWallet),1)])])]),e("div",X,[e("ul",Y,[r.plat.eco.ecosystem_trading_only!=1?(u(),m("li",$,[e("button",{id:"markets-tab",class:y(["inline-block rounded-t-lg border-b-2 p-4",o.isActive("markets")?"text-gray-900 dark:text-gray-300":"border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"]),type:"button",role:"tab","aria-controls":"markets","aria-selected":"false",href:"#markets",onClick:s[0]||(s[0]=T(i=>o.setActive("markets"),["prevent"]))},[e("div",ee,[(u(),m("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:y(["mr-2 h-5 w-5",o.isActive("markets")?"text-blue-600 dark:text-blue-500":" text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"])},se,2)),e("span",re,a(t.$t("Spot Markets")),1)])],2)])):k("",!0),r.plat.eco.ecosystem_trading_only!=1&&r.ext.futures==1?(u(),m("li",ae,[e("button",{id:"futures-tab",class:y(["inline-block rounded-t-lg border-b-2 p-4",o.isActive("futures")?"text-gray-900 dark:text-gray-300":"border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"]),type:"button",role:"tab","aria-controls":"futures","aria-selected":"false",href:"#futures",onClick:s[1]||(s[1]=T(i=>o.setActive("futures"),["prevent"]))},[e("div",le,[(u(),m("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:y(["mr-2 h-5 w-5",o.isActive("futures")?"text-blue-600 dark:text-blue-500":" text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"])},ie,2)),e("span",ne,a(t.$t("Futures Markets")),1)])],2)])):k("",!0),r.ext.eco==1&&r.listMain.length>0?(u(),m("li",ce,[e("button",{id:"main_markets-tab",class:y(["inline-block rounded-t-lg border-b-2 p-4",o.isActive("main_markets")?"text-gray-900 dark:text-gray-300":"border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"]),type:"button",role:"tab","aria-controls":"main_markets","aria-selected":"false",href:"#main_markets",onClick:s[2]||(s[2]=T(i=>o.setActive("main_markets"),["prevent"]))},[e("div",ue,[(u(),m("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:y(["mr-2 h-5 w-5",o.isActive("main_markets")?"text-blue-600 dark:text-blue-500":" text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"])},he,2)),e("span",ge,a(r.plat.eco.ecosystem_trading_only==1?t.$t("All Markets"):t.$t("Hot Markets")),1)])],2)])):k("",!0),r.plat.eco.ecosystem_trading_only==1&&r.ext.eco==1&&r.listMainVolume.length>0?(u(),m("li",pe,[e("button",{id:"main_markets_volume-tab",class:y(["inline-block rounded-t-lg border-b-2 p-4",o.isActive("main_markets_volume")?"text-gray-900 dark:text-gray-300":"border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"]),type:"button",role:"tab","aria-controls":"main_markets_volume","aria-selected":"false",href:"#main_markets",onClick:s[3]||(s[3]=T(i=>o.setActive("main_markets_volume"),["prevent"]))},[e("div",ye,[(u(),m("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:y(["mr-2 h-5 w-5",o.isActive("main_markets_volume")?"text-blue-600 dark:text-blue-500":" text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"])},fe,2)),e("span",ke,a(t.$t("Hot Markets")),1)])],2)])):k("",!0)])]),r.plat.eco.ecosystem_trading_only!=1?(u(),m("div",{key:0,class:y(o.isActive("markets")?"":"hidden")},[e("div",ve,[e("h2",xe,a(t.$t("Spot Markets")),1),e("div",we,[x((u(),m("select",{key:h.marketStore.markets.length,"onUpdate:modelValue":s[4]||(s[4]=i=>r.activeItem=i),class:"mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"},[(u(!0),m(w,null,P(h.marketStore.markets,(i,l,V)=>(u(),m("option",{key:V,value:l},a(l),9,Me))),128))])),[[j,r.activeItem]]),c(f,null,{default:n(()=>[x(e("input",{"onUpdate:modelValue":s[5]||(s[5]=i=>r.filters.symbol.value=i),type:"text",class:"filter-input",placeholder:"Symbol"},null,512),[[A,r.filters.symbol.value]])]),_:1})])]),e("div",Pe,[r.list.length>0?(u(),L(v,{key:r.list.length,"current-page":r.currentPage,"onUpdate:currentPage":s[6]||(s[6]=i=>r.currentPage=i),class:"w-full text-left text-sm text-gray-500 dark:text-gray-400",data:r.list,filters:r.filters,"page-size":10,"hide-sort-icons":!0,onTotalPagesChanged:s[7]||(s[7]=i=>r.totalPages=i)},{head:n(()=>[e("tr",Fe,[c(p,{"sort-key":"symbol",scope:"col",class:"px-6 py-3",style:{width:"15%"}},{default:n(()=>[c(g,{text:"Symbol"})]),_:1}),c(p,{"sort-key":"price",scope:"col",class:"px-6 py-3",style:{width:"20%"}},{default:n(()=>[c(g,{text:"Price"})]),_:1}),c(p,{"sort-key":"change",scope:"col",class:"px-6 py-3",style:{width:"25%"}},{default:n(()=>[c(g,{text:"Change"})]),_:1}),Se,c(p,{"sort-key":"baseVolume",scope:"col",class:"px-6 py-3",style:{width:"25%"}},{default:n(()=>[c(g,{text:"Volume"})]),_:1}),c(p,{"sort-key":"action",scope:"col",class:"px-6 py-3",style:{width:"15%"}},{default:n(()=>[c(g,{text:"Action"})]),_:1})])]),body:n(({rows:i})=>[r.list.length>0?(u(!0),m(w,{key:0},P(i,l=>(u(),m("tr",{key:l.id,class:"border-b bg-white dark:border-gray-700 dark:bg-gray-800"},[e("td",Ce,[e("div",Ve,[x(e("img",Te,null,512),[[S,l.base?"/assets/images/cryptoCurrency/"+l.base.toLowerCase()+".png":"/market/notification.png"]])]),e("span",Ae,a(l.symbol),1)]),e("td",Le,[e("span",{class:y(["text-start",l.class||""])},a(o.priceFormatter(l.price)||""),3),b(" "+a(l.quote),1)]),e("td",null,[e("div",je,[e("section",{class:y({transparent:!l.history})},[(u(),m("svg",{class:y(l.class),viewBox:o.svgBox,xmlns:"http://www.w3.org/2000/svg"},[c(C,{values:o.points(r.width,r.height,r.history[l.symbol])},null,8,["values"])],10,Ie))],2)])]),e("td",Ne,[e("span",{class:y(["mr-1 text-start",l.classChange||""])},a(o.priceFormatter(l.change,2)||"")+"%",3)]),e("td",Be,[e("div",ze,a(o.priceFormatter(l.baseVolume,2)||"")+" "+a(l.base),1),e("div",Ue,a(o.priceFormatter(l.quoteVolume,2)||"")+" "+a(l.quote),1)]),e("td",Oe,[c(_,{class:"",to:"trade/"+l.symbol},{default:n(()=>[e("button",He,a(t.$t("Trade")),1)]),_:2},1032,["to"])])]))),128)):(u(),m("tr",qe,[e("td",De,a(t.$t("No results found!")),1)]))]),_:1},8,["current-page","data","filters"])):k("",!0)]),c(F,{currentPage:r.currentPage,"onUpdate:currentPage":s[8]||(s[8]=i=>r.currentPage=i),class:"float-right flex items-center justify-between pt-4","aria-label":"Table navigation","total-pages":r.totalPages,"max-page-links":3,"boundary-links":!0},{firstPage:n(()=>[b(a(t.$t("First")),1)]),lastPage:n(()=>[b(a(t.$t("Last")),1)]),next:n(()=>[e("span",Ke,a(t.$t("Next")),1),Ee]),previous:n(()=>[e("span",We,a(t.$t("Previous")),1),Re]),_:1},8,["currentPage","total-pages"])],2)):k("",!0),r.plat.eco.ecosystem_trading_only!=1&&r.ext.futures==1?(u(),m("div",{key:1,class:y(o.isActive("futures")?"":"hidden")},[e("div",Ze,[e("h2",Ge,a(t.$t("Futures Markets")),1),e("div",Je,[x((u(),m("select",{key:h.marketStore.futures.length,"onUpdate:modelValue":s[9]||(s[9]=i=>r.activeItem=i),class:"mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"},[(u(!0),m(w,null,P(h.marketStore.futures,(i,l,V)=>(u(),m("option",{key:V,value:l},a(l),9,Qe))),128))])),[[j,r.activeItem]]),c(f,null,{default:n(()=>[x(e("input",{"onUpdate:modelValue":s[10]||(s[10]=i=>r.filtersFutures.symbol.value=i),type:"text",class:"filter-input",placeholder:"Symbol"},null,512),[[A,r.filtersFutures.symbol.value]])]),_:1})])]),e("div",Xe,[r.listFutures.length>0?(u(),L(v,{key:r.listFutures.length,"current-page":r.currentPageFutures,"onUpdate:currentPage":s[11]||(s[11]=i=>r.currentPageFutures=i),class:"w-full text-left text-sm text-gray-500 dark:text-gray-400",data:r.listFutures,filters:r.filtersFutures,"page-size":10,"hide-sort-icons":!0,onTotalPagesChanged:s[12]||(s[12]=i=>r.totalPagesFutures=i)},{head:n(()=>[e("tr",Ye,[c(p,{"sort-key":"symbol",scope:"col",class:"px-6 py-3",style:{width:"15%"}},{default:n(()=>[c(g,{text:"Symbol"})]),_:1}),c(p,{"sort-key":"price",scope:"col",class:"px-6 py-3",style:{width:"20%"}},{default:n(()=>[c(g,{text:"Price"})]),_:1}),c(p,{"sort-key":"change",scope:"col",class:"px-6 py-3",style:{width:"25%"}},{default:n(()=>[c(g,{text:"Change"})]),_:1}),$e,c(p,{"sort-key":"baseVolume",scope:"col",class:"px-6 py-3",style:{width:"25%"}},{default:n(()=>[c(g,{text:"Volume"})]),_:1}),c(p,{"sort-key":"action",scope:"col",class:"px-6 py-3",style:{width:"15%"}},{default:n(()=>[c(g,{text:"Action"})]),_:1})])]),body:n(({rows:i})=>[r.listFutures.length>0?(u(!0),m(w,{key:0},P(i,l=>(u(),m("tr",{key:l.id,class:"border-b bg-white dark:border-gray-700 dark:bg-gray-800"},[e("td",et,[e("div",tt,[x(e("img",st,null,512),[[S,l.base?"/assets/images/cryptoCurrency/"+l.base.toLowerCase()+".png":"/market/notification.png"]])]),e("span",rt,a(l.symbol),1)]),e("td",at,[e("span",{class:y(["text-start",l.class||""])},a(o.priceFormatter(l.price)||""),3),b(" USDT ")]),e("td",null,[e("div",lt,[e("section",{class:y({transparent:!l.history})},[(u(),m("svg",{class:y(l.class),viewBox:o.svgBox,xmlns:"http://www.w3.org/2000/svg"},[c(C,{values:o.points(r.width,r.height,r.history[l.symbol])},null,8,["values"])],10,ot))],2)])]),e("td",it,[e("span",{class:y(["mr-1 text-start",l.classChange||""])},a(o.priceFormatter(l.change,2)||"")+"%",3)]),e("td",nt,[e("div",ct,a(o.priceFormatter(l.baseVolume,2)||"")+" "+a(l.base),1),e("div",ut,a(o.priceFormatter(l.quoteVolume,2)||"")+" "+a(l.quote),1)]),e("td",dt,[c(_,{class:"",to:"futures/"+l.base+"/"+l.quote},{default:n(()=>[e("button",mt,a(t.$t("Trade")),1)]),_:2},1032,["to"])])]))),128)):(u(),m("tr",ht,[e("td",gt,a(t.$t("No results found!")),1)]))]),_:1},8,["current-page","data","filters"])):k("",!0)]),c(F,{currentPage:r.currentPageFutures,"onUpdate:currentPage":s[13]||(s[13]=i=>r.currentPageFutures=i),class:"float-right flex items-center justify-between pt-4","aria-label":"Table navigation","total-pages":r.totalPagesFutures,"max-page-links":3,"boundary-links":!0},{firstPage:n(()=>[b(a(t.$t("First")),1)]),lastPage:n(()=>[b(a(t.$t("Last")),1)]),next:n(()=>[e("span",pt,a(t.$t("Next")),1),yt]),previous:n(()=>[e("span",_t,a(t.$t("Previous")),1),bt]),_:1},8,["currentPage","total-pages"])],2)):k("",!0),r.ext.eco==1?(u(),m("div",{key:2,class:y(o.isActive("main_markets")?"":"hidden")},[e("div",ft,[e("h2",kt,a(t.$t("Hot Markets")),1),e("div",vt,[x((u(),m("select",{key:h.marketStore.main_markets.length,"onUpdate:modelValue":s[14]||(s[14]=i=>r.activeItemMain=i),class:"mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"},[xt,(u(!0),m(w,null,P(h.marketStore.main_markets,(i,l,V)=>(u(),m("option",{key:V,value:l},a(l),9,wt))),128))])),[[j,r.activeItemMain]]),c(f,null,{default:n(()=>[x(e("input",{"onUpdate:modelValue":s[15]||(s[15]=i=>r.filtersMain.symbol.value=i),type:"text",class:"filter-input",placeholder:"Symbol"},null,512),[[A,r.filtersMain.symbol.value]])]),_:1})])]),e("div",Mt,[r.listMain.length>0?(u(),L(v,{key:r.listMain.length,"current-page":r.currentPageMain,"onUpdate:currentPage":s[16]||(s[16]=i=>r.currentPageMain=i),class:"w-full text-left text-sm text-gray-500 dark:text-gray-400",data:r.listMain,filters:r.filtersMain,"page-size":10,"hide-sort-icons":!0,onTotalPagesChanged:s[17]||(s[17]=i=>r.totalPagesMain=i)},{head:n(()=>[e("tr",Pt,[c(p,{"sort-key":"symbol",scope:"col",class:"px-6 py-3"},{default:n(()=>[c(g,{text:"Symbol"})]),_:1}),e("th",Ft,a(t.$t("Limits")),1),e("th",St,a(t.$t("Fees")),1),c(p,{"sort-key":"action",scope:"col",class:"px-6 py-3"},{default:n(()=>[c(g,{text:"Action"})]),_:1})])]),body:n(({rows:i})=>[r.listMain.length>0?(u(!0),m(w,{key:0},P(i,l=>(u(),m("tr",{key:l.id,class:"border-b bg-white dark:border-gray-700 dark:bg-gray-800"},[e("td",Ct,[e("div",Vt,[x(e("img",Tt,null,512),[[S,l.currency?"/assets/images/cryptoCurrency/"+l.currency.split("_")[0].toLowerCase()+".png":"/market/notification.png"]])]),e("span",{class:"font-medium",innerHTML:l.symbol.includes("_")?o.renderSymbol(l.symbol):l.symbol},null,8,At)]),e("td",Lt,[e("div",null,[e("span",null,a(t.$t("Min"))+": ",1),e("span",jt,a(o.formatNumber(l.min_amount)),1)]),e("div",null,[e("span",null,a(t.$t("Max"))+": ",1),e("span",It,a(o.formatNumber(l.max_amount)),1)])]),e("td",Nt,[e("div",null,[e("span",null,a(t.$t("Taker"))+": ",1),e("span",Bt,a(o.formatNumber(l.taker)),1),b("% ")]),e("div",null,[e("span",null,a(t.$t("Maker"))+": ",1),e("span",zt,a(o.formatNumber(l.maker)),1),b("% ")])]),e("td",Ut,[c(_,{class:"",to:"trade/"+l.currency+"-"+l.pair},{default:n(()=>[e("button",Ot,a(t.$t("Trade")),1)]),_:2},1032,["to"])])]))),128)):(u(),m("tr",Ht,[e("td",qt,a(t.$t("No results found!")),1)]))]),_:1},8,["current-page","data","filters"])):k("",!0)]),c(F,{currentPage:r.currentPageMain,"onUpdate:currentPage":s[18]||(s[18]=i=>r.currentPageMain=i),class:"float-right flex items-center justify-between pt-4","aria-label":"Table navigation","total-pages":r.totalPagesMain,"max-page-links":3,"boundary-links":!0},{firstPage:n(()=>[b(a(t.$t("First")),1)]),lastPage:n(()=>[b(a(t.$t("Last")),1)]),next:n(()=>[e("span",Dt,a(t.$t("Next")),1),Kt]),previous:n(()=>[e("span",Et,a(t.$t("Previous")),1),Wt]),_:1},8,["currentPage","total-pages"])],2)):k("",!0),r.plat.eco.ecosystem_trading_only==1&&r.ext.eco==1?(u(),m("div",{key:3,class:y(o.isActive("main_markets_volume")?"":"hidden")},[e("div",Rt,[e("h2",Zt,a(t.$t("Hot Markets")),1),c(f,null,{default:n(()=>[x(e("input",{"onUpdate:modelValue":s[19]||(s[19]=i=>r.filtersMainVolume.symbol.value=i),type:"text",class:"filter-input",placeholder:"Symbol"},null,512),[[A,r.filtersMainVolume.symbol.value]])]),_:1})]),e("div",Gt,[r.listMainVolume.length>0?(u(),L(v,{key:r.listMainVolume.length,"current-page":r.currentPageMainVolume,"onUpdate:currentPage":s[20]||(s[20]=i=>r.currentPageMainVolume=i),class:"w-full text-left text-sm text-gray-500 dark:text-gray-400",data:r.listMainVolume,filters:r.filtersMainVolume,"page-size":10,"hide-sort-icons":!0,onTotalPagesChanged:s[21]||(s[21]=i=>r.totalPagesMainVolume=i)},{head:n(()=>[e("tr",Jt,[c(p,{"sort-key":"symbol",scope:"col",class:"px-6 py-3"},{default:n(()=>[c(g,{text:"Symbol"})]),_:1}),e("th",Qt,a(t.$t("Limits")),1),e("th",Xt,a(t.$t("Fees")),1),e("th",Yt,a(t.$t("Volume")),1),e("th",$t,a(t.$t("24H High/Low")),1),c(p,{"sort-key":"action",scope:"col",class:"px-6 py-3"},{default:n(()=>[c(g,{text:"Action"})]),_:1})])]),body:n(({rows:i})=>[r.listMainVolume.length>0?(u(!0),m(w,{key:0},P(i,l=>(u(),m("tr",{key:l.id,class:"border-b bg-white dark:border-gray-700 dark:bg-gray-800"},[e("td",es,[e("div",ts,[x(e("img",ss,null,512),[[S,l.currency?"/assets/images/cryptoCurrency/"+l.currency.split("_")[0].toLowerCase()+".png":"/market/notification.png"]])]),e("span",{class:"font-medium",innerHTML:l.symbol.includes("_")?o.renderSymbol(l.symbol):l.symbol},null,8,rs)]),e("td",as,[e("div",null,[e("span",null,a(t.$t("Min"))+": ",1),e("span",ls,a(o.formatNumber(l.min_amount)),1)]),e("div",null,[e("span",null,a(t.$t("Max"))+": ",1),e("span",os,a(o.formatNumber(l.max_amount)),1)])]),e("td",is,[e("div",null,[e("span",null,a(t.$t("Taker"))+": ",1),e("span",ns,a(o.formatNumber(l.taker)),1),b("% ")]),e("div",null,[e("span",null,a(t.$t("Maker"))+": ",1),e("span",cs,a(o.formatNumber(l.maker)),1),b("% ")])]),e("td",us,a(o.formatNumber(l.volume).toFixed(6)),1),e("td",ds,[e("div",null,[e("span",null,a(t.$t("High"))+": ",1),e("span",ms,a(o.formatNumber(l.high).toFixed(6)),1)]),e("div",null,[e("span",null,a(t.$t("Low"))+": ",1),e("span",hs,a(o.formatNumber(l.low).toFixed(6)),1)])]),e("td",gs,[c(_,{class:"",to:"trade/"+l.currency+"-"+l.pair},{default:n(()=>[e("button",ps,a(t.$t("Trade")),1)]),_:2},1032,["to"])])]))),128)):(u(),m("tr",ys,[e("td",_s,a(t.$t("No results found!")),1)]))]),_:1},8,["current-page","data","filters"])):k("",!0)]),c(F,{currentPage:r.currentPageMainVolume,"onUpdate:currentPage":s[22]||(s[22]=i=>r.currentPageMainVolume=i),class:"float-right flex items-center justify-between pt-4","aria-label":"Table navigation","total-pages":r.totalPagesMainVolume,"max-page-links":3,"boundary-links":!0},{firstPage:n(()=>[b(a(t.$t("First")),1)]),lastPage:n(()=>[b(a(t.$t("Last")),1)]),next:n(()=>[e("span",bs,a(t.$t("Next")),1),fs]),previous:n(()=>[e("span",ks,a(t.$t("Previous")),1),vs]),_:1},8,["currentPage","total-pages"])],2)):k("",!0)],64)}const js=I(R,[["render",xs]]);export{js as default};