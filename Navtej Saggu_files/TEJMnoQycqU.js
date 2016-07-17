if (self.CavalryLogger) { CavalryLogger.start_js(["eTsJp"]); }

__d("NavigationMetricsEnumJS",[],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports={NAVIGATION_START:"navigationStart",UNLOAD_EVENT_START:"unloadEventStart",UNLOAD_EVENT_END:"unloadEventEnd",REDIRECT_START:"redirectStart",REDIRECT_END:"redirectEnd",FETCH_START:"fetchStart",DOMAIN_LOOKUP_START:"domainLookupStart",DOMAIN_LOOKUP_END:"domainLookupEnd",CONNECT_START:"connectStart",CONNECT_END:"connectEnd",SECURE_CONNECTION_START:"secureConnectionStart",REQUEST_START:"requestStart",RESPONSE_START:"responseStart",RESPONSE_END:"responseEnd",DOM_LOADING:"domLoading",DOM_INTERACTIVE:"domInteractive",DOM_CONTENT_LOADED_EVENT_START:"domContentLoadedEventStart",DOM_CONTENT_LOADED_EVENT_END:"domContentLoadedEventEnd",DOM_COMPLETE:"domComplete",LOAD_EVENT_START:"loadEventStart",LOAD_EVENT_END:"loadEventEnd"};},null);
__d("PerfXClientMetricsConfig",[],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports={LOGGER_CONFIG:"PerfXClientMetricsLoggerConfig"};},null);
__d("ResourceTimingMetricsEnumJS",[],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports={START_TIME:"startTime",REDIRECT_START:"redirectStart",REDIRECT_END:"redirectEnd",FETCH_START:"fetchStart",DOMAIN_LOOKUP_START:"domainLookupStart",DOMAIN_LOOKUP_END:"domainLookupEnd",CONNECT_START:"connectStart",SECURE_CONNECTION_START:"secureConnectionStart",CONNECT_END:"connectEnd",REQUEST_START:"requestStart",RESPONSE_START:"responseStart",RESPONSE_END:"responseEnd"};},null);
__d('ReactSpeedHelper',['LogBuffer','ReactDOM'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={enableRenderMeasurements:function(){if(!c('ReactDOM').enableRenderMeasurements)return;c('ReactDOM').enableRenderMeasurements();},getMetrics:function(i,j){return c('LogBuffer').read('react_speed').filter(function(k){return ((i==null||k.begin>=i)&&(j==null||k.end<=j));});}};f.exports=h;},null);
__d('sourceMetaToString',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i,j){var k;if(i.name){k=i.name;if(i.module)k=i.module+'.'+k;}else if(i.module)k=i.module+'.<anonymous>';if(j&&i.line){k=(k?k:'<anonymous>')+':'+i.line;if(i.column)k+=':'+i.column;}return k;}f.exports=h;},null);
__d('NavigationTimingHelper',['NavigationMetricsEnumJS','forEachObject','performance'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(j,k){var l={};c('forEachObject')(c('NavigationMetricsEnumJS'),function(m){var n=k[m];if(n)l[m]=n+j;});return l;}var i={getAsyncRequestTimings:function(j){if(!j||!c('performance').timing||!c('performance').getEntriesByName)return undefined;var k=c('performance').getEntriesByName(j);if(k.length===0)return undefined;return h(c('performance').timing.navigationStart,k[0]);},getNavTimings:function(){if(!c('performance').timing)return undefined;return h(0,c('performance').timing);}};f.exports=i;},null);
__d('ImageTimingHelper',['Arbiter','BigPipe','URI'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={},i={};c('Arbiter').subscribe(c('BigPipe').Events.init,function(j,k){if(k.lid&&k.lid!=='0')k.arbiter.subscribe('images_displayed',function(l,m){var n=h[m.lid];if(!n)n=h[m.lid]=[];m.images.forEach(function(o){try{var q=new (c('URI'))(o);o=q.setFragment('').toString();}catch(p){return;}if(i[o])return;i[o]=true;n.push({pagelet:m.pagelet,timeslice:m.timeslice,ts:m.ts,uri:o});});});});f.exports.getImageTimings=function(j){return h[j]||[];};},null);
__d('ResourceTimingBootloaderHelper',['Bootloader','ResourceTimingMetricsEnumJS','ImageTimingHelper','URI','forEachObject','isEmpty','performance'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={},i={};function j(p,q,r,s){if(!c('performance').timing||!c('performance').getEntriesByType)return;var t={};if(s)t=c('ImageTimingHelper').getImageTimings(r).sort(function(ka,la){return ka.ts-la.ts;}).reduce(function(ka,la){if(ka[la.uri])return ka;ka[la.uri]=la.pagelet;return ka;},{});var u=c('performance').getEntriesByType('resource'),v=0,w=0,x=0;for(var y=0;y<u.length;y++){var z=u[y];if(z.duration<=0||z.startTime<q)continue;var aa='',ba='',ca='',da='',ea='',fa=z.initiatorType;switch(fa){case 'css':case 'link':case 'script':var ga=n(z.name);ba=ga[0];aa=ga[1];if(!ba||!aa)continue;if(aa==='css'||aa==='js'){da=aa;var ha=i[z.name]||w++;ca=ha+'_'+ba;}else{var ia=m(z.name);ea=ia[0];da=ia[1];ca=v+++'_'+ea;}break;case 'img':ca=v+++'_'+k(z.name);da='img';break;case 'iframe':ca=x+++'_'+k(z.name)+l(z.name);da='iframe';break;default:continue;}if(p[z.name]==undefined)p[z.name]=[];var ja={};c('forEachObject')(c('ResourceTimingMetricsEnumJS'),function(ka){var la=z[ka];if(la)ja[ka]=la+c('performance').timing.navigationStart;});ja.type=da;ja.desc=ca;if(da=='img'&&t.hasOwnProperty(z.name))ja.pagelet=t[z.name];ja.transferSize=z.transferSize;ja.encodedBodySize=z.encodedBodySize;p[z.name].push(ja);}}function k(p){var q=new (c('URI'))(p).getDomain();return q;}function l(p){var q=new (c('URI'))(p).getPath();return q;}function m(p){return [k(p),'img'];}function n(p){var q=p.match(/\/rsrc\.php\/.*\/([^\?]+)/);if(!q)return [];var r=q[1],s='',t=r.match(/\.(\w+)$/);if(t)s=t[1];return [r,s];}var o={addBootloaderMetricsToResourceTimings:function(){var p=arguments.length<=0||arguments[0]===undefined?{}:arguments[0],q=arguments.length<=1||arguments[1]===undefined?{}:arguments[1],r=arguments.length<=2||arguments[2]===undefined?true:arguments[2],s=arguments.length<=3||arguments[3]===undefined?false:arguments[3];if(c('isEmpty')(i))i=c('Bootloader').getURLToHashMap();var t={};c('forEachObject')(i,function(w,x){t[w]=x;});var u={bootload:true,js_exec:true,start_bootload:true,tag_bootload:true},v=[];c('forEachObject')(q,function(w,x){var y=x.indexOf('/');if(y===-1)return;var z=x.substring(0,y);if(!u[z])return;v.push(x);var aa=x.substring(y+1),ba=t[aa];if(!ba)return;if(p[ba]==null){if(s&&ba.startsWith('data:'))ba='inlined resource: '+aa;if(p[ba]==null)p[ba]=[{}];}p[ba].forEach(function(ca){ca.bootloader_hash=aa;ca[z]=w;});});if(!r)v.forEach(function(w){return delete q[w];});return p;},getLastTTIAndE2EImageResponseEnds:function(p,q,r){var s={TTI:p,E2E:q};if(!c('performance').timing)return s;var t=r.filter(function(w){return w.ts<=p;}).map(function(w){return w.uri;}).reduce(function(w,x){w[x]=true;return w;},{}),u=r.map(function(w){return w.uri;}).reduce(function(w,x){w[x]=true;return w;},{});for(var v in h)h[v].forEach(function(w){if(w.type==='img'){if(t[v])s.TTI=Math.max(s.TTI,w.responseEnd);if(u[v])s.E2E=Math.max(s.E2E,w.responseEnd);}});return s;},getMetrics:function(p,q,r){h={};if(c('isEmpty')(i))i=c('Bootloader').getURLToHashMap();j(h,p,q,r);return h;}};f.exports=o;},null);
__d('TimeSliceHelper',['invariant','ArtilleryExperiments','LogBuffer','Map','ReactSpeedHelper','sourceMetaToString'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=function(k,l){return Math.round((k-l)*1000);},j={formatMetricsForTransport:function(k){var l=[],m=new (c('Map'))(),n=0,o=k==null?[]:k.map(function(p,q,r){var s=i(p.begin,n),t=i(p.end,p.begin);n=p.end;var u=void 0;if(m.has(p.name)){u=m.get(p.name);!(u!=null)?h(0):void 0;}else{u=l.length;m.set(p.name,u);l.push(p.name);}var v=[s,t,u];if(p.id)v.push(p.id);if(p.parentID)v.push(p.parentID);return v;});return {version:'compact',items:o,names:l};},getMetrics:function(k,l,m,n){var o=c('LogBuffer').read('time_slice'),p=c('LogBuffer').read('time_slice_heartbeat'),q=c('ReactSpeedHelper').getMetrics().map(function(w){return babelHelpers['extends']({},w,{desc:'React['+w.name+']'});}),r=o.concat(p,q),s,t=[],u=function(w){var x;if(w.guard){var y=c('sourceMetaToString')(w),z=w.guard.toString();x=y?z+' at '+y:z;}else if(w.desc){x=w.desc;}else x='JS['+w.count+']';if(c('ArtilleryExperiments').artillery_timeslice_edges){t.push({begin:w.begin,end:w.end,name:x,id:w.id,parentID:w.parentID});}else t.push({begin:w.begin,end:w.end,name:x});},v=function(){if(s)u(s.count==1?s.first:s);s=null;};r.sort(function(w,x){if(w.begin!==x.begin){return w.begin-x.begin;}else if(w.end!==x.end){return w.end-x.end;}else return 0;}).forEach(function(w){if(k&&w.end<k||l&&w.begin>l)return;if(w.end-w.begin<m){if(s&&w.begin-s.end<n){s.end=w.end;s.count++;}else{v();s={begin:w.begin,end:w.end,count:1,first:w,guard:false,id:undefined,parentID:undefined};}}else{v();u(w);}});v();return t;}};f.exports=j;},null);
__d('PerfXFlusher',['invariant','BanzaiLogger','PerfXClientMetricsConfig'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=c('PerfXClientMetricsConfig').LOGGER_CONFIG,j=['perfx_page','perfx_page_type','lid'];function k(m){j.forEach(function(n){return h(n in m);});}var l={flush:function(m){k(m);this._logger=this._logger||c('BanzaiLogger').create({signal:true});this._logger.log(i,m);},registerToSendWithBeacon:function(m){c('BanzaiLogger').registerToSendWithBeacon(i,m);}};f.exports=l;},null);
__d("pageLoadedViaSWCache",[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(){return self.__SW_CACHE__===1;}f.exports=h;},null);
__d('AsyncRequestNectarLogging',['AsyncRequest','Nectar'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();Object.assign(c('AsyncRequest').prototype,{setNectarModuleData:function(h){if(this.method=='POST')c('Nectar').addModuleData(this.data,h);},setNectarImpressionId:function(){if(this.method=='POST')c('Nectar').addImpressionID(this.data);}});},null);
__d('ClickRefUtils',['DataAttributeUtils'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={get_intern_ref:function(i){if(!!i){var j={profile_minifeed:1,gb_content_and_toolbar:1,gb_muffin_area:1,ego:1,bookmarks_menu:1,jewelBoxNotif:1,jewelNotif:1,BeeperBox:1,searchBarClickRef:1};for(var k=i;k&&k!=document.body;k=k.parentNode){if(!k.id||typeof k.id!=='string')continue;if(k.id.substr(0,8)=='pagelet_')return k.id.substr(8);if(k.id.substr(0,8)=='box_app_')return k.id;if(j[k.id])return k.id;}}return '-';},get_href:function(i){var j=i.getAttribute&&(i.getAttribute('ajaxify')||i.getAttribute('data-endpoint'))||i.action||i.href||i.name;return typeof j==='string'?j:null;},should_report:function(i,j){if(j=='FORCE')return true;if(j=='INDIRECT')return false;return i&&(h.get_href(i)||i.getAttribute&&c('DataAttributeUtils').getDataFt(i));}};f.exports=h;},null);
__d("setUECookie",["Env"],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i){if(!c("Env").no_cookies)document.cookie="act="+encodeURIComponent(i)+"; path=/; domain="+window.location.hostname.replace(/^.*(\.facebook\..*)$/i,'$1');}f.exports=h;},null);
__d('ClickRefLogger',['Arbiter','Banzai','ClickRefUtils','Env','ScriptPath','SessionName','Vector','$','collectDataAttributes','ge','pageID','setUECookie'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={delay:0,retry:true};function i(m){if(!c('ge')('content'))return [0,0,0,0];var n=c('$')('content'),o=c('Vector').getEventPosition(m);return [o.x,o.y,n.offsetLeft,n.clientWidth];}function j(m,n,event,o){var p='r',q=[0,0,0,0],r,s;if(!!event){r=event.type;if(r=='click'&&c('ge')('content'))q=i(event);var t=0;event.ctrlKey&&(t+=1);event.shiftKey&&(t+=2);event.altKey&&(t+=4);event.metaKey&&(t+=8);if(t)r+=t;}if(!!n)s=c('ClickRefUtils').get_href(n);var u=c('collectDataAttributes')(!!event?event.target||event.srcElement:n,['ft','gt']);Object.assign(u.ft,o.ft);Object.assign(u.gt,o.gt);if(typeof u.ft.ei==='string')delete u.ft.ei;var v=[m._ue_ts,m._ue_count,s||'-',m._context,r||'-',c('ClickRefUtils').get_intern_ref(n),p,b.URI?b.URI.getRequestURI(true,true).getUnqualifiedURI().toString():location.pathname+location.search+location.hash,u].concat(q).concat(c('pageID')).concat(c('ScriptPath').getScriptPath());return v;}c('Arbiter').subscribe("ClickRefAction/new",function(m,n){if(c('ClickRefUtils').should_report(n.node,n.mode)){var o=j(n.cfa,n.node,n.event,n.extra_data);c('setUECookie')(n.cfa.ue);var p=[c('SessionName').getName(),Date.now(),'act'];c('Banzai').post('click_ref_logger',Array.prototype.concat(p,o),h);}});function k(m){function n(v){var w='';for(var x=0;x<v.length;x++)w+=String.fromCharCode(1^v.charCodeAt(x));return w;}function o(v,w,x,y){var z=w[x];if(z&&v&&z in v)if(x+1<w.length){o(v[z],w,x+1,y);}else{var aa=v[z],ba=function(){setTimeout(y.bind(null,arguments));return aa.apply(this,arguments);};ba.toString=aa.toString.bind(aa);Object.defineProperty(v,z,{configurable:false,writable:true,value:ba});}}var p={},q={},r=false;function s(v,w){if(q[v])return;q[v]=p[v]=1;}var t=m[n('jiri')];if(t){var u=[];n(t).split(',').map(function(v,w){var x=v.substring(1).split(':'),y;switch(v.charAt(0)){case '1':y=new RegExp('\\b('+x[0]+')\\b','i');u.push(function(z){var aa=y.exec(Object.keys(window));if(aa)s(w,''+aa);});break;case '2':y=new RegExp(x[0]);o(window,x,2,function(z){var aa=z[x[1]];if(typeof aa==='string'&&y.test(aa))s(w,v);});break;case '3':o(window,x,0,function(){for(var z=u.length;z--;)u[z]();var aa=Object.keys(p);if(aa.length){p={};setTimeout(c('Banzai')[n('qnru')].bind(c('Banzai'),n('islg'),{m:''+aa}),5000);}});break;case '4':r=true;break;}});}}try{k(c('Env'));}catch(l){}},null);
__d('PostLoadJS',['Bootloader','Run','emptyFunction'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(j,k){c('Run').onAfterLoad(function(){return c('Bootloader').loadModules.call(c('Bootloader'),[j],k,'PostLoadJS');});}var i={loadAndRequire:function(j){h(j,c('emptyFunction'));},loadAndCall:function(j,k,l){h(j,function(m){return m[k].apply(m,l);});}};f.exports=i;},null);
__d('PageletEventsHelper',['Arbiter','PageletEventConstsJS'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h='BigPipe/init',i='pagelet_event',j='phase_begin',k={},l=false;function m(){return {pagelets:{},categories:{},phase_start:{},display_resources:{},all_resources:{}};}function n(q,r,s,t){if(k[t].pagelets[r]==undefined)k[t].pagelets[r]={};k[t].pagelets[r][q]=s;}function o(q){q.subscribe(i,function(r,s){var event=s.event,t=s.ts,u=s.id,v=s.lid,w=s.phase,x=s.categories,y=s.allResources,z=s.displayResources;n(event,u,t,v);var aa=k[v],ba=aa.pagelets[u];if(event===c('PageletEventConstsJS').ARRIVE_END){ba.phase=w;aa.all_resources[u]=y;aa.display_resources[u]=z;}if((event===c('PageletEventConstsJS').ONLOAD_END||event===c('PageletEventConstsJS').DISPLAY_END)&&x)x.forEach(function(ca){if(aa.categories[ca]==undefined)aa.categories[ca]={};aa.categories[ca][event]=t;});});q.subscribe(j,function(event,r){k[r.lid].phase_start[r.phase]=r.ts;});}var p={init:function(){if(l)return;c('Arbiter').subscribe(h,function(event,q){var r=q.lid,s=q.arbiter;k[r]=m();o(s);});l=true;},getMetrics:function(q){if(k[q])return JSON.parse(JSON.stringify(k[q]));return null;}};f.exports=p;},null);
__d('PerfXLogger',['DataAttributeUtils','PerfXFlusher','NavigationMetrics','NavigationTimingHelper','Set','forEachObject','performanceAbsoluteNow','setTimeoutAcrossTransitions','pageLoadedViaSWCache'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={},i={},j=65*1000,k=['e2e','tti','all_pagelets_displayed','all_pagelets_loaded'],l={},m={_listenersSetUp:false,_setupListeners:function(){if(this.listenersSetUp)return;this._subscribeToNavigationMetrics();c('PerfXFlusher').registerToSendWithBeacon(function(){var n=[];c('forEachObject')(h,function(o,p){if(!h[p].sent){var q=this.getPayload(p,'unload fired');if(q!=null)n.push(q);}}.bind(this));h={};return n;}.bind(this));this.listenersSetUp=true;},_init:function(n,o,p,q){var r=i[n];i[n]=undefined;h[n]={perfx_page:o,perfx_page_type:p,tags:new (c('Set'))(r||[]),art_id:q,lid:n,sent:false};this._registerTimeoutSendback(n);this._setupListeners();},initWithNavigationMetricsLID:function(n,o,p,q){var r=c('NavigationMetrics').getFullPageLoadLid();if(!r)return;m.init(r,n,o,null,p);if(q&&q.always)for(var s=0;s<q.always.length;s++)m.addTag(r,q.always[s]);if(q&&q.swCache&&c('pageLoadedViaSWCache')())for(var t=0;t<q.swCache.length;t++)m.addTag(r,q.swCache[t]);},init:function(n,o,p,q,r){if(q!=null)l[n]=q;this._init(n,o,p,r);},updateProperties:function(n,o,p){var q=h[n];if(q){q.perfx_page=o;q.perfx_page_type=p;}},addTag:function(n,o){var p=h[n];if(p){p.tags.add(o);return;}if(!i[n])i[n]=[];i[n].push(o);},addTagWithNavigationMetricsLID:function(n){var o=c('NavigationMetrics').getFullPageLoadLid();if(!o)return;m.addTag(o,n);},_registerTimeoutSendback:function(n){var o=this._getFetchStart(n),p=j;if(o!=null)p-=c('performanceAbsoluteNow')()-o;c('setTimeoutAcrossTransitions')(function(){return this._uploadPayload(n,'sendback time out');}.bind(this),p);},_subscribeToNavigationMetrics:function(){c('NavigationMetrics').addRetroactiveListener(c('NavigationMetrics').Events.EVENT_OCCURRED,function(n,o){if(!(n in h))return;h[n][o.event]=o.timestamp;});c('NavigationMetrics').addRetroactiveListener(c('NavigationMetrics').Events.NAVIGATION_DONE,function(n,o){var p=o.serverLID;if(!(p in h))return;h[p].tti=o.tti;h[p].e2e=o.e2e;h[p].all_pagelets_displayed=o.all_pagelets_displayed;h[p].all_pagelets_loaded=o.all_pagelets_loaded;if(this._validateValues(p))this._uploadPayload(p);}.bind(this));},_getPayloadWithOffset:function(n,o,p){var q=h[n];if(q==null)return null;var r=Object.assign({},q),s=document.querySelector('[id^="hyperfeed_story_id"]');if(s){var t=JSON.parse(c('DataAttributeUtils').getDataFt(s));if(t)r.mf_query_id=t.qid;}r.tags=Array.from(q.tags);this._adjustValues(r,o);r.fetch_start=o;if(r.perfx_page_type==='normal')r.nav_to_fetch=o-c('NavigationTimingHelper').getNavTimings().navigationStart;if(p!=null)r.sendback_reason=p;delete r.sent;return r;},_uploadPayload:function(n,o){if(h[n]!=null&&!h[n].sent){var p=this.getPayload(n,o);if(p!=null){c('PerfXFlusher').flush(p);h[n].sent=true;}}},getPayload:function(n,o){return this._getPayloadWithOffset(n,this._getFetchStart(n),o);},_getFetchStart:function(n){if(!(n in h))return null;var o=void 0,p=h[n].perfx_page_type;if(p=='quickling'){if(!(n in l)){return null;}else o=c('NavigationTimingHelper').getAsyncRequestTimings(l[n]);}else o=c('NavigationTimingHelper').getNavTimings();if(!o||!o.fetchStart)return null;return o.fetchStart;},_adjustValues:function(n,o){for(var p=0;p<k.length;p++){var q=k[p],r=n[q];n[q]=r-o;}},_validateValues:function(n){if(!(n in h))return false;var o=h[n];for(var p=0;p<k.length;p++){var q=k[p];if(!o[q])return false;}return true;}};f.exports=m;},null);
__d('KappaWrapper',['AsyncSignal','setTimeoutAcrossTransitions'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=false;f.exports={forceStart:function(i,j,k){var l=0,m=function(){new (c('AsyncSignal'))('/si/kappa/',{Ko:"a"}).send();if(++l<i)c('setTimeoutAcrossTransitions')(m,j*1000);};c('setTimeoutAcrossTransitions')(m,(j+k)*1000);},start:function(i,j,k){if(!h){h=true;this.forceStart(i,j,k);}}};},null);
__d('Chromedome',['fbt'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();g.start=function(i){if(i.off||top!==window||!/(^|\.)facebook\.(com|sg)$/.test(document.domain))return;var j=i.stop||h._("Stop!"),k=i.text||h._("This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a Facebook feature or \"hack\" someone's account, it is a scam and will give them access to your Facebook account."),l=i.more||h._("See {url} for more information.",[h.param('url','https://www.facebook.com/selfxss')]);if((window.chrome||window.safari)&&!i.textonly){var m='font-family:helvetica; font-size:20px; ';[[j,i.c1||m+'font-size:50px; font-weight:bold; '+'color:red; -webkit-text-stroke:1px black;'],[k,i.c2||m],[l,i.c3||m],['','']].map(function(s){setTimeout(console.log.bind(console,'\n%c'+s[0],s[1]));});}else{var n=['',' .d8888b.  888                       888','d88P  Y88b 888                       888','Y88b.      888                       888',' "Y888b.   888888  .d88b.  88888b.   888','    "Y88b. 888    d88""88b 888 "88b  888','      "888 888    888  888 888  888  Y8P','Y88b  d88P Y88b.  Y88..88P 888 d88P',' "Y8888P"   "Y888  "Y88P"  88888P"   888','                           888','                           888','                           888'],o=(''+k).match(/.{35}.+?\s+|.+$/g),p=Math.floor(Math.max(0,(n.length-o.length)/2));for(var q=0;q<n.length||q<o.length;q++){var r=n[q];n[q]=r+new Array(45-r.length).join(' ')+(o[q-p]||'');}console.log('\n\n\n'+n.join('\n')+'\n\n'+l+'\n');return;}};},null);