(this["webpackJsonpcapstone-frontend"]=this["webpackJsonpcapstone-frontend"]||[]).push([[0],{44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},99:function(e,t,n){"use strict";n.r(t);var r,s=n(2),a=n.n(s),c=n(39),i=n.n(c),o=(n(44),n(45),n(46),n(1)),l=n.n(o),u=n(3),d=n(5),h=n(6),b=n(4),x=n(8),f=n(7),m=n(10),j=n.n(m),p=n(12),v=n.n(p),O=function e(){Object(d.a)(this,e)};O.localBaseUrl="http://localhost:5000",O.serverBaseUrl="https://www.devwulfcodes.com",function(e){e[e.Blue=0]="Blue",e[e.Red=1]="Red"}(r||(r={}));var T=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{policies:[]};Object(d.a)(this,e),this.baseUrl=void 0,this.policies=void 0,this.baseUrl=t,this.policies=n}return Object(h.a)(e,[{key:"retrieveBestPolicies",value:function(){var e=Object(u.a)(l.a.mark((function e(t){var n,s,a,c,i,o=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.length>1&&void 0!==o[1]?o[1]:r.Blue,s=o.length>2&&void 0!==o[2]?o[2]:0,a=o.length>3&&void 0!==o[3]?o[3]:"bKills",c=[],i="".concat(this.baseUrl,"/api/policy/best?team=").concat(r[n],"&state=").concat(s,"&actions=").concat(a),e.next=7,j.a.get(i,{headers:{"X-Access-Tokens":t}});case 7:e.sent.data.policies.forEach((function(e){c.push(e)})),this.policies.policies=c;case 10:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"retrieveNextPolicies",value:function(){var e=Object(u.a)(l.a.mark((function e(t){var n,s,a,c,i,o=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.length>1&&void 0!==o[1]?o[1]:r.Blue,s=o.length>2&&void 0!==o[2]?o[2]:0,a=o.length>3&&void 0!==o[3]?o[3]:"bKills",c=[],i="".concat(this.baseUrl,"/api/policy/next?team=").concat(r[n],"&state=").concat(s,"&action=").concat(a),e.next=7,j.a.get(i,{headers:{"X-Access-Tokens":t}});case 7:e.sent.data.policies.forEach((function(e){c.push(e)})),this.policies.policies=c;case 10:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"retrieveStartPolicies",value:function(){var e=Object(u.a)(l.a.mark((function e(t){var n,s,a,c=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=c.length>1&&void 0!==c[1]?c[1]:r.Blue,s=[],a="".concat(this.baseUrl,"/api/policy/start?team=").concat(r[n]),e.next=5,j.a.get(a,{headers:{"X-Access-Tokens":t}});case 5:e.sent.data.policies.forEach((function(e){s.push(e)})),this.policies.policies=s;case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"addPolicy",value:function(e){this.policies.policies.push(e)}},{key:"clearPolicies",value:function(){this.policies.policies=[]}},{key:"getSchema",value:function(){return this.policies}}]),e}(),y=a.a.createContext({team:r.Blue,setTeam:function(e){},addListener:function(e,t){},removeListener:function(e){}}),g=a.a.createContext({choosePolicy:function(){var e=Object(u.a)(l.a.mark((function e(t,n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return");case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()}),R=a.a.createContext({setAccuracy:function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return");case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),addListener:function(e,t){},removeListener:function(e){}}),N=a.a.createContext({searchStr:"",setSearchStr:function(e){},searchAction:function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),addActionListener:function(e,t){},removeActionListener:function(e){}}),k=a.a.createContext({token:"",setToken:function(e){}}),w=a.a.createContext({baseUrl:"",setBaseUrl:function(e){},addListener:function(e,t){},removeListener:function(e){}}),U=n(0),L=function(e){Object(x.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(d.a)(this,n),(r=t.call(this,e)).state={},r}return Object(h.a)(n,[{key:"render",value:function(){return Object(U.jsx)(w.Consumer,{children:function(e){var t=e.baseUrl,n=e.setBaseUrl;return Object(U.jsx)("div",{className:"flex items-center",children:Object(U.jsxs)("label",{htmlFor:"",className:"flex items-center",children:[Object(U.jsx)("span",{className:"text-sm font-bold mr-2 text-gray-900",children:"Local"}),Object(U.jsx)(v.a,{className:"mr-2",icons:!1,checked:t===O.serverBaseUrl,onChange:function(e){var t=e.target.checked?O.serverBaseUrl:O.localBaseUrl;n(t)}}),Object(U.jsx)("span",{className:"text-sm font-bold text-gray-900",children:"Server"})]})})}})}}]),n}(a.a.Component),_=function(e){Object(x.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(d.a)(this,n),(r=t.call(this,e)).state={username:"",password:"",isRegister:!1},r.onDemoClick=r.onDemoClick.bind(Object(b.a)(r)),r.onRegister=r.onRegister.bind(Object(b.a)(r)),r.onLogin=r.onLogin.bind(Object(b.a)(r)),r}return Object(h.a)(n,[{key:"onDemoClick",value:function(){this.setState({username:"test",password:"test123"})}},{key:"onRegister",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,r,s,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.baseUrlContext,n=this.state,r=n.username,s=n.password,e.prev=2,e.next=5,j.a.post("".concat(t.baseUrl,"/auth/register"),{username:r,password:s});case 5:200===(a=e.sent).status&&alert(a.data.message),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),alert("".concat(e.t0.response.status,": ").concat(e.t0.response.data));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(){return e.apply(this,arguments)}}()},{key:"onLogin",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,r,s,a,c,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props,n=t.authContext,r=t.baseUrlContext,s=this.state,a=s.username,c=s.password,e.prev=2,e.next=5,j.a.post("".concat(r.baseUrl,"/auth/login"),{},{auth:{username:a,password:c}});case 5:200===(i=e.sent).status&&n.setToken(i.data.token),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),alert("".concat(e.t0.response.status,": ").concat(e.t0.response.data));case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state,n=t.username,r=t.password,s=t.isRegister;return Object(U.jsx)("div",{className:"flex justify-center items-center w-screen h-screen",children:!s&&Object(U.jsxs)("div",{className:"flex flex-col p-4 rounded-lg bg-indigo-200 text-indigo-900",children:[Object(U.jsxs)("div",{className:"flex flex-row justify-between items-center mb-4",children:[Object(U.jsx)("span",{className:"text-2xl font-bold",children:"Login"}),Object(U.jsx)(L,{})]}),Object(U.jsxs)("div",{className:"flex flex-col mb-2",children:[Object(U.jsx)("label",{className:"text-xs mb-1",htmlFor:"",children:"Username"}),Object(U.jsx)("input",{className:"px-2 py-1 rounded-default text-sm",value:n,onChange:function(t){return e.setState({username:t.target.value})}})]}),Object(U.jsxs)("div",{className:"flex flex-col mb-4",children:[Object(U.jsx)("label",{className:"text-xs mb-1",htmlFor:"",children:"Password"}),Object(U.jsx)("input",{className:"px-2 py-1 rounded-default text-sm",value:r,type:"password",onChange:function(t){return e.setState({password:t.target.value})}})]}),Object(U.jsxs)("div",{className:"flex justify-between",children:[Object(U.jsx)("button",{className:"px-4 py-1 mr-2 rounded-default text-xs bg-indigo-400 text-indigo-100",onClick:function(){return e.setState({isRegister:!0})},children:"Register"}),Object(U.jsx)("button",{className:"px-4 py-1 mr-2 rounded-default text-xs bg-indigo-700 text-indigo-200",onClick:this.onLogin,children:"Login"}),Object(U.jsx)("button",{className:"px-4 py-1 rounded-default text-xs bg-indigo-400 text-indigo-100",onClick:this.onDemoClick,children:"Demo"})]})]})||s&&Object(U.jsxs)("div",{className:"flex flex-col p-4 rounded-lg bg-indigo-200 text-indigo-900",children:[Object(U.jsxs)("div",{className:"flex flex-row justify-between items-center mb-4",children:[Object(U.jsx)("span",{className:"text-2xl font-bold",children:"Register"}),Object(U.jsx)(L,{})]}),Object(U.jsxs)("div",{className:"flex flex-col mb-2",children:[Object(U.jsx)("label",{className:"text-xs mb-1",htmlFor:"",children:"Username"}),Object(U.jsx)("input",{className:"px-2 py-1 rounded-default text-sm",value:n,onChange:function(t){return e.setState({username:t.target.value})}})]}),Object(U.jsxs)("div",{className:"flex flex-col mb-4",children:[Object(U.jsx)("label",{className:"text-xs mb-1",htmlFor:"",children:"Password"}),Object(U.jsx)("input",{className:"px-2 py-1 rounded-default text-sm",value:r,type:"password",onChange:function(t){return e.setState({password:t.target.value})}})]}),Object(U.jsxs)("div",{className:"flex justify-between",children:[Object(U.jsx)("button",{className:"px-4 py-1 mr-2 rounded-default text-xs bg-indigo-700 text-indigo-200",onClick:this.onRegister,children:"Register"}),Object(U.jsx)("button",{className:"px-4 py-1 mr-2 rounded-default text-xs bg-indigo-400 text-indigo-100",onClick:function(){return e.setState({isRegister:!1})},children:"Login"}),Object(U.jsx)("button",{className:"px-4 py-1 rounded-default text-xs bg-indigo-400 text-indigo-100",onClick:this.onDemoClick,children:"Demo"})]})]})})}}]),n}(a.a.Component);function E(){var e=Object(s.useContext)(k),t=Object(s.useContext)(w);return Object(U.jsx)(_,{authContext:e,baseUrlContext:t})}var B=n(18),A=n(13),I=n.n(A);function C(e,t){return S.apply(this,arguments)}function S(){return(S=Object(u.a)(l.a.mark((function e(t,n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){return n.setState(t,(function(){return e(null)}))})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var P,D=n(14),H=n.n(D);!function(e){e[e.bKills=0]="bKills",e[e.bTOP_OUTER_TURRET=1]="bTOP_OUTER_TURRET",e[e.bTOP_INNER_TURRET=2]="bTOP_INNER_TURRET",e[e.bTOP_BASE_TURRET=3]="bTOP_BASE_TURRET",e[e.bTOP_INHIBITOR=4]="bTOP_INHIBITOR",e[e.bMID_OUTER_TURRET=5]="bMID_OUTER_TURRET",e[e.bMID_INNER_TURRET=6]="bMID_INNER_TURRET",e[e.bMID_BASE_TURRET=7]="bMID_BASE_TURRET",e[e.bMID_INHIBITOR=8]="bMID_INHIBITOR",e[e.bMID_NEXUS_TURRET=9]="bMID_NEXUS_TURRET",e[e.bBOT_OUTER_TURRET=10]="bBOT_OUTER_TURRET",e[e.bBOT_INNER_TURRET=11]="bBOT_INNER_TURRET",e[e.bBOT_BASE_TURRET=12]="bBOT_BASE_TURRET",e[e.bBOT_INHIBITOR=13]="bBOT_INHIBITOR",e[e.bDRAGON=14]="bDRAGON",e[e.bELDER_DRAGON=15]="bELDER_DRAGON",e[e.bRIFT_HERALD=16]="bRIFT_HERALD",e[e.bBARON_NASHOR=17]="bBARON_NASHOR",e[e.bWon=18]="bWon",e[e.rKills=19]="rKills",e[e.rTOP_OUTER_TURRET=20]="rTOP_OUTER_TURRET",e[e.rTOP_INNER_TURRET=21]="rTOP_INNER_TURRET",e[e.rTOP_BASE_TURRET=22]="rTOP_BASE_TURRET",e[e.rTOP_INHIBITOR=23]="rTOP_INHIBITOR",e[e.rMID_OUTER_TURRET=24]="rMID_OUTER_TURRET",e[e.rMID_INNER_TURRET=25]="rMID_INNER_TURRET",e[e.rMID_BASE_TURRET=26]="rMID_BASE_TURRET",e[e.rMID_INHIBITOR=27]="rMID_INHIBITOR",e[e.rMID_NEXUS_TURRET=28]="rMID_NEXUS_TURRET",e[e.rBOT_OUTER_TURRET=29]="rBOT_OUTER_TURRET",e[e.rBOT_INNER_TURRET=30]="rBOT_INNER_TURRET",e[e.rBOT_BASE_TURRET=31]="rBOT_BASE_TURRET",e[e.rBOT_INHIBITOR=32]="rBOT_INHIBITOR",e[e.rDRAGON=33]="rDRAGON",e[e.rELDER_DRAGON=34]="rELDER_DRAGON",e[e.rRIFT_HERALD=35]="rRIFT_HERALD",e[e.rBARON_NASHOR=36]="rBARON_NASHOR",e[e.rWon=37]="rWon"}(P||(P={}));var M=function(e){Object(x.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(d.a)(this,n),(r=t.call(this,e)).state={},r}return Object(h.a)(n,[{key:"render",value:function(){var e=this.props,t=e.policy,n=e.isSelected,s=void 0!==n&&n,a=e.isDisabled,c=void 0!==a&&a,i=e.isBestProb,o=void 0!==i&&i,l=e.isBestQValue,u=void 0!==l&&l,d=e.showState,h=void 0!==d&&d,b=e.showAction,x=void 0!==b&&b,f=e.showProbability,m=void 0!==f&&f,j=e.showQValue,p=void 0!==j&&j,v=e.showGoldAdv,O=void 0!==v&&v,T=t.probability<0?"-":"".concat((100*t.probability).toFixed(2),"%"),R=t.qValue<0?"-":"".concat(t.qValue.toFixed(2)),N=""===t.goldAdv?"-":t.goldAdv;return Object(U.jsx)(y.Consumer,{children:function(e){var n=e.team;return Object(U.jsx)(g.Consumer,{children:function(e){var a=e.choosePolicy;return Object(U.jsxs)("button",{className:"flex flex-col items-center w-full ".concat(s?n===r.Blue?"bg-blue-600 text-blue-200":"bg-red-600 text-red-200":""," ").concat(c?"opacity-50 cursor-default":""),onClick:function(){return a(n,t)},disabled:c,children:[Object(U.jsx)("span",{className:"".concat(h?"":"hidden"),children:t.state}),Object(U.jsx)("span",{className:"".concat(x?"text-sm":"hidden"),children:t.action}),Object(U.jsxs)("div",{className:"flex flex-row",children:[Object(U.jsxs)("div",{className:"".concat(m?"flex flex-col mr-4":"hidden"," ").concat(o?"text-green-300 font-bold":""),children:[Object(U.jsx)("span",{className:"text-xs",children:"Probability"}),Object(U.jsx)("span",{className:"text-sm",children:T})]}),Object(U.jsxs)("div",{className:"".concat(p?"flex flex-col mr-4":"hidden"," ").concat(u?"text-green-300 font-bold":""),children:[Object(U.jsx)("span",{className:"text-xs",children:"Q-Value"}),Object(U.jsx)("span",{className:"text-sm",children:R})]}),Object(U.jsxs)("div",{className:"".concat(O?"flex flex-col":"hidden"),children:[Object(U.jsx)("span",{className:"text-xs",children:"Gold Adv"}),Object(U.jsx)("span",{className:"text-sm",children:N})]})]})]})}})}})}}]),n}(a.a.Component),F=function(e){Object(x.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(d.a)(this,n),(r=t.call(this,e)).state={},r}return Object(h.a)(n,[{key:"render",value:function(){var e,t,n=this.props,s=n.state,a=n.selectedAction,c=n.actions,i=void 0===c?[]:c,o=n.isDisabled,l=void 0!==o&&o,u=i;if(i.length<=0){for(var d in P)if(isNaN(Number(d))){var h=void 0!==a&&a.action===d?a:{state:s,action:d,probability:-1,qValue:-1,goldAdv:""};u.push(h)}}else e=i.reduce((function(e,t){return e.probability>t.probability?e:t})),t=i.reduce((function(e,t){return e.qValue>t.qValue?e:t}));return Object(U.jsx)(y.Consumer,{children:function(n){var c=n.team;return Object(U.jsxs)("div",{className:"flex flex-col w-64 h-full p-4",children:[Object(U.jsxs)("div",{className:"flex flex-col items-center justify-center mb-2 h-12 ".concat(c===r.Blue?"text-blue-900":"text-red-900"),children:[Object(U.jsx)("span",{className:"text-xs",style:{marginBottom:"-0.5rem"},children:"Action"}),Object(U.jsx)("span",{className:"text-2xl font-medium",children:s+1})]}),Object(U.jsx)("div",{className:"flex flex-col h-full py-4 border-2 shadow-lg rounded-lg bg-gray-100 ".concat(c===r.Blue?"border-blue-800":"border-red-800"),children:Object(U.jsx)(I.a,{autoHide:!0,autoHideTimeout:250,style:{width:"100%"},children:u.map((function(n,r){return Object(U.jsx)("div",{className:"".concat(r===u.length-1?"":"mb-2"),children:Object(U.jsx)(M,{policy:n,isSelected:void 0!==a&&(n.action===a.action||void 0!==e&&H()(e,n)),isDisabled:l,isBestProb:void 0!==e&&H()(e,n),isBestQValue:void 0!==t&&H()(t,n),showAction:!0,showProbability:!0,showQValue:!0,showGoldAdv:!0})},r)}))})})]})}})}}]),n}(a.a.Component);F.contextType=g;var G=n.p+"static/media/logo.103b5fa1.svg",V=function(e){Object(x.a)(n,e);var t=Object(f.a)(n);function n(e){var r;Object(d.a)(this,n),r=t.call(this,e);var s=e.baseUrlContext.baseUrl;return r.state={currentPolicies:new T(s),bestPolicies:new T(s),nextPolicies:new T(s),pastPolicies:[],isLoading:!0,correctCount:0},r.onTeamChanged=r.onTeamChanged.bind(Object(b.a)(r)),r.onBaseUrlChanged=r.onBaseUrlChanged.bind(Object(b.a)(r)),r.resetPolicies=r.resetPolicies.bind(Object(b.a)(r)),r.onChoosePolicy=r.onChoosePolicy.bind(Object(b.a)(r)),r}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props,n=t.teamContext,r=t.baseUrlContext,n.addListener("policies",this.onTeamChanged),r.addListener("policies",this.onBaseUrlChanged),e.next=5,this.state.nextPolicies.retrieveStartPolicies(this.props.authContext.token);case 5:return e.next=7,C({isLoading:!1},this);case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"onTeamChanged",value:function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.resetPolicies();case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"onBaseUrlChanged",value:function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.resetPolicies();case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"resetPolicies",value:function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C({isLoading:!0,pastPolicies:[]},this);case 2:return e.next=4,this.state.currentPolicies.clearPolicies();case 4:return e.next=6,this.state.bestPolicies.clearPolicies();case 6:return e.next=8,this.state.nextPolicies.retrieveStartPolicies(this.props.authContext.token);case 8:return e.next=10,this.props.accuracyContext.setAccuracy(0);case 10:return e.next=12,C({isLoading:!1},this);case 12:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"onChoosePolicy",value:function(){var e=Object(u.a)(l.a.mark((function e(t,n){var r,s,a,c,i,o,u,d,h,b,x,f,m,j;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=this.props,s=r.accuracyContext,a=r.authContext,c=this.state,i=c.pastPolicies,o=c.currentPolicies,u=c.bestPolicies,d=c.nextPolicies,h=c.correctCount,o.addPolicy(n),b=u.getSchema().policies,x=o.getSchema().policies,f=h,b.length>1&&n.action===b[1].action&&f++,x.length>1&&s.setAccuracy(f/(x.length-1)),m=i.concat({policies:d.getSchema().policies}),e.next=11,C({isLoading:!0,pastPolicies:m,correctCount:f},this);case 11:if(!((j=x.length-1)>=0)){e.next=17;break}return e.next=15,u.retrieveBestPolicies(a.token,t,j,n.action);case 15:return e.next=17,d.retrieveNextPolicies(a.token,t,j,n.action);case 17:return e.next=19,C({isLoading:!1},this);case 19:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){var e=this.props,t=e.teamContext,n=e.baseUrlContext;t.removeListener("policies"),n.removeListener("policies")}},{key:"render",value:function(){var e=this.state,t=e.pastPolicies,n=e.currentPolicies,r=e.bestPolicies,s=e.nextPolicies,a=e.isLoading,c=n.getSchema().policies,i=r.getSchema().policies,o=s.getSchema().policies,l=[];l.push.apply(l,Object(B.a)(c)),l.push.apply(l,Object(B.a)(i.slice(1)));var u=0;return o.length>0&&(u=o[0].state),Object(U.jsx)(g.Provider,{value:{choosePolicy:this.onChoosePolicy},children:Object(U.jsxs)("div",{className:"w-full h-full relative",children:[a&&Object(U.jsx)("div",{className:"absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center backdrop-filter backdrop-blur-sm z-10",children:Object(U.jsxs)("div",{className:"p-4 bg-gray-800 rounded-md",children:[Object(U.jsx)("img",{src:G,alt:"logo",className:"App-logo"}),Object(U.jsx)("span",{className:"text-2xl text-blue-200",children:"Loading"})]})}),Object(U.jsx)(I.a,{autoHide:!0,autoHideTimeout:250,children:Object(U.jsx)("div",{className:"flex flex-row h-full",children:c.length<=0&&Object(U.jsx)(F,{state:0,actions:o})||c.length>0&&Object(U.jsx)(U.Fragment,{children:l.map((function(e,n){return Object(U.jsx)("div",{className:"",children:e.state===u&&Object(U.jsx)(F,{state:e.state,selectedAction:e,actions:o})||e.state!==u&&n<t.length&&Object(U.jsx)(F,{state:e.state,selectedAction:e,actions:t[n].policies,isDisabled:!0})||e.state!==u&&n>=t.length&&Object(U.jsx)(F,{state:e.state,selectedAction:e,isDisabled:!0})},n)}))})})})]})})}}]),n}(a.a.Component);function W(){var e=Object(s.useContext)(y),t=Object(s.useContext)(R),n=Object(s.useContext)(k),r=Object(s.useContext)(w);return Object(U.jsx)(V,{teamContext:e,accuracyContext:t,authContext:n,baseUrlContext:r})}var X=function(e){Object(x.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(d.a)(this,n),(r=t.call(this,e)).state={},r}return Object(h.a)(n,[{key:"render",value:function(){return Object(U.jsx)(y.Consumer,{children:function(e){var t=e.team;return Object(U.jsx)(N.Consumer,{children:function(e){var n=e.searchStr,s=e.setSearchStr,a=e.searchAction;return Object(U.jsxs)("div",{className:"flex w-full px-4 py-2 max-w-3xl h-12",children:[Object(U.jsx)("input",{className:"w-full mr-2 rounded-default shadow-inner px-2 text-sm",placeholder:"Type in Youtube link here...",value:n,onChange:function(e){return s(e.target.value)},onSubmit:function(){return a()}}),Object(U.jsx)("button",{className:"px-4 mr-2 rounded-default text-sm ".concat(t===r.Blue?"bg-blue-500 text-blue-200":"bg-red-500 bg- text-red-200"),onClick:function(){return a()},children:"Search"}),Object(U.jsx)("button",{className:"px-4 rounded-default text-sm ".concat(t===r.Blue?"bg-blue-500 text-blue-200":"bg-red-500 bg- text-red-200"),onClick:function(){return s("https://youtu.be/kTewx3x6Dps")},children:"Demo"})]})}})}})}}]),n}(a.a.Component),z=function(e){Object(x.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(d.a)(this,n),(r=t.call(this,e)).state={},r}return Object(h.a)(n,[{key:"render",value:function(){return Object(U.jsx)(y.Consumer,{children:function(e){var t=e.team,n=e.setTeam;return Object(U.jsx)("div",{className:"flex items-center",children:Object(U.jsxs)("label",{htmlFor:"",className:"flex items-center",children:[Object(U.jsx)("span",{className:"text-lg font-bold mr-2 ".concat(t===r.Blue?"text-blue-900":"text-red-900"),children:"Team"}),Object(U.jsx)(v.a,{icons:!1,onChange:function(e){var t=e.target.checked?r.Red:r.Blue;n(t)}})]})})}})}}]),n}(a.a.Component),K=function(e){Object(x.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(d.a)(this,n),(r=t.call(this,e)).state={accuracy:0},r.onAccuracyChanged=r.onAccuracyChanged.bind(Object(b.a)(r)),r}return Object(h.a)(n,[{key:"componentDidMount",value:function(){this.context.addListener("topBar",this.onAccuracyChanged)}},{key:"onAccuracyChanged",value:function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.setState({accuracy:t});case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this.context.removeListener("topBar")}},{key:"render",value:function(){this.state.accuracy;return Object(U.jsxs)("div",{className:"flex justify-between w-screen h-20 p-4",children:[Object(U.jsxs)("div",{className:"flex flex-row",children:[Object(U.jsx)("div",{className:"flex items-center mr-4",children:Object(U.jsx)(z,{})}),Object(U.jsx)(L,{})]}),Object(U.jsx)(X,{}),Object(U.jsx)("div",{className:"flex flex-col items-end justify-center w-40"})]})}}]),n}(a.a.Component);K.contextType=R;var q=function(e){Object(x.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(d.a)(this,n),(r=t.call(this,e)).WIDTH=560,r.HEIGHT=315,r.state={embedId:"",isIdValid:!0},r.getEmbedId=r.getEmbedId.bind(Object(b.a)(r)),r}return Object(h.a)(n,[{key:"componentDidMount",value:function(){this.context.addActionListener("videoPlayer",this.getEmbedId)}},{key:"getEmbedId",value:function(){var e=Object(u.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=/^(https:\/\/www.youtube.com\/watch\?v=[a-zA-Z0-9]{11})|(https:\/\/youtu.be\/[a-zA-Z0-9]{11})|([a-zA-Z0-9]{11})$/,r="",t.match(n)&&(r=t.substring(t.length-11)),r&&11===r.length){e.next=6;break}return this.setState({embedId:"",isIdValid:!1}),e.abrupt("return");case 6:this.setState({embedId:r,isIdValid:!0});case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this.context.removeActionListener("videoPlayer")}},{key:"render",value:function(){var e=this.state,t=e.embedId,n=e.isIdValid;return Object(U.jsxs)("div",{className:"flex w-full justify-center relative",children:[Object(U.jsx)("div",{className:"absolute left-0 right-0 top-0 bottom-0 bg-gray-900 opacity-50"}),!t&&Object(U.jsx)("div",{className:"flex w-full justify-center z-10",children:Object(U.jsx)("div",{className:"flex items-center justify-center bg-gray-900",style:{width:this.WIDTH,height:this.HEIGHT},children:Object(U.jsx)("span",{className:"text-gray-400",children:"".concat(n?"No video selected.":"Invalid video url or id given.")})})})||t&&Object(U.jsx)("div",{className:"z-10",children:Object(U.jsx)("iframe",{width:this.WIDTH,height:this.HEIGHT,src:"https://www.youtube.com/embed/".concat(t),frameBorder:"0",allow:"accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,title:"Youtube"})})]})}}]),n}(a.a.Component);q.contextType=N;var Q=function(e){Object(x.a)(n,e);var t=Object(f.a)(n);function n(e){var s;return Object(d.a)(this,n),(s=t.call(this,e)).teamListeners=[],s.accuracyListeners=[],s.searchListeners=[],s.state={team:r.Blue,searchStr:""},s.setTeam=s.setTeam.bind(Object(b.a)(s)),s.addTeamListener=s.addTeamListener.bind(Object(b.a)(s)),s.removeTeamListener=s.removeTeamListener.bind(Object(b.a)(s)),s.setAccuracy=s.setAccuracy.bind(Object(b.a)(s)),s.addAccuracyListener=s.addAccuracyListener.bind(Object(b.a)(s)),s.removeAccuracyListener=s.removeAccuracyListener.bind(Object(b.a)(s)),s.setSearchStr=s.setSearchStr.bind(Object(b.a)(s)),s.searchAction=s.searchAction.bind(Object(b.a)(s)),s.addSearchActionListener=s.addSearchActionListener.bind(Object(b.a)(s)),s.removeSearchActionListener=s.removeSearchActionListener.bind(Object(b.a)(s)),s}return Object(h.a)(n,[{key:"setTeam",value:function(e){var t=this;this.setState({team:e},Object(u.a)(l.a.mark((function n(){return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.all(t.teamListeners.map((function(t){return t.listener(e)})));case 2:case"end":return n.stop()}}),n)}))))}},{key:"addTeamListener",value:function(e,t){this.teamListeners.filter((function(t){return t.name===e})).length>0||this.teamListeners.push({name:e,listener:t})}},{key:"removeTeamListener",value:function(e){this.teamListeners.filter((function(t){return t.name===e})).length<=0||(this.teamListeners=this.teamListeners.filter((function(t){return t.name!==e})))}},{key:"setAccuracy",value:function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(this.accuracyListeners.map((function(e){return e.listener(t)})));case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"addAccuracyListener",value:function(e,t){this.accuracyListeners.filter((function(t){return t.name===e})).length>0||this.accuracyListeners.push({name:e,listener:t})}},{key:"removeAccuracyListener",value:function(e){this.accuracyListeners.filter((function(t){return t.name===e})).length<=0||(this.accuracyListeners=this.accuracyListeners.filter((function(t){return t.name!==e})))}},{key:"setSearchStr",value:function(e){this.setState({searchStr:e})}},{key:"searchAction",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state.searchStr,e.next=3,Promise.all(this.searchListeners.map((function(e){return e.listener(t)})));case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"addSearchActionListener",value:function(e,t){this.searchListeners.filter((function(t){return t.name===e})).length>0||this.searchListeners.push({name:e,listener:t})}},{key:"removeSearchActionListener",value:function(e){this.searchListeners.filter((function(t){return t.name===e})).length<=0||(this.searchListeners=this.searchListeners.filter((function(t){return t.name!==e})))}},{key:"render",value:function(){var e=this.state,t=e.team,n=e.searchStr;return Object(U.jsx)(y.Provider,{value:{team:t,setTeam:this.setTeam,addListener:this.addTeamListener,removeListener:this.removeTeamListener},children:Object(U.jsx)(R.Provider,{value:{setAccuracy:this.setAccuracy,addListener:this.addAccuracyListener,removeListener:this.removeAccuracyListener},children:Object(U.jsx)(N.Provider,{value:{searchStr:n,setSearchStr:this.setSearchStr,searchAction:this.searchAction,addActionListener:this.addSearchActionListener,removeActionListener:this.removeSearchActionListener},children:Object(U.jsxs)("div",{className:"transition-default duration-500 ease-in-out flex flex-col w-screen h-screen ".concat(t===r.Blue?"bg-blue-300":"bg-red-300"),children:[Object(U.jsx)(K,{}),Object(U.jsx)(q,{}),Object(U.jsx)(W,{})]})})})})}}]),n}(a.a.Component),Z=function(e){Object(x.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(d.a)(this,n),(r=t.call(this,e)).baseUrlListeners=[],r.state={token:"",baseUrl:O.serverBaseUrl},r.setToken=r.setToken.bind(Object(b.a)(r)),r.setBaseUrl=r.setBaseUrl.bind(Object(b.a)(r)),r.addBaseUrlListener=r.addBaseUrlListener.bind(Object(b.a)(r)),r.removeBaseUrlListener=r.removeBaseUrlListener.bind(Object(b.a)(r)),r}return Object(h.a)(n,[{key:"setToken",value:function(){var e=Object(u.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.state.baseUrl,e.prev=1,e.next=4,j.a.get("".concat(n,"/auth/token"),{headers:{"X-Access-Tokens":t}});case 4:200===(r=e.sent).status&&("valid token"===r.data.message?this.setState({token:t}):this.setState({token:""})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),alert("".concat(e.t0.response.status,": ").concat(e.t0.response.data));case 11:case"end":return e.stop()}}),e,this,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"setBaseUrl",value:function(e){var t=this;this.setState({baseUrl:e},Object(u.a)(l.a.mark((function n(){return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.all(t.baseUrlListeners.map((function(t){return t.listener(e)})));case 2:case"end":return n.stop()}}),n)}))))}},{key:"addBaseUrlListener",value:function(e,t){this.baseUrlListeners.filter((function(t){return t.name===e})).length>0||this.baseUrlListeners.push({name:e,listener:t})}},{key:"removeBaseUrlListener",value:function(e){this.baseUrlListeners.filter((function(t){return t.name===e})).length<=0||(this.baseUrlListeners=this.baseUrlListeners.filter((function(t){return t.name!==e})))}},{key:"render",value:function(){var e=this.state,t=e.token,n=e.baseUrl;return Object(U.jsx)(k.Provider,{value:{token:t,setToken:this.setToken},children:Object(U.jsx)(w.Provider,{value:{baseUrl:n,setBaseUrl:this.setBaseUrl,addListener:this.addBaseUrlListener,removeListener:this.removeBaseUrlListener},children:Object(U.jsx)("div",{className:"App",children:!t&&Object(U.jsx)(E,{})||t&&Object(U.jsx)(Q,{})})})})}}]),n}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(U.jsx)(a.a.StrictMode,{children:Object(U.jsx)(Z,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[99,1,2]]]);
//# sourceMappingURL=main.997cd034.chunk.js.map