if (self.CavalryLogger) { CavalryLogger.start_js(["pxQL5"]); }

__d('TimeOffset',[],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h={timeToTimestamp:function(i){if(i<=0)return '0:00';var j=Math.floor(i/3600),k=j?j+':':'';k+=((j?'0':'')+Math.floor(i%3600/60)).slice(-2)+':';return k+('0'+i%60).slice(-2);}};f.exports=h;},null);