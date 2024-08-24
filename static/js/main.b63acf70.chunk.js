(this["webpackJsonpdigital-trace-data"]=this["webpackJsonpdigital-trace-data"]||[]).push([[0],{38:function(e,t,s){},62:function(e,t,s){},80:function(e,t,s){"use strict";s.r(t);var i=s(2),n=s(1),a=s.n(n),c=s(20),r=s.n(c),o=(s(62),s(30)),l=s(28),d=s.n(l),p=s(33),u=s(22),h=s(23),j=s(24),m=s(27),b=s(25),g=s(54),v=s(6),f=s(42);s(81);f.a.initializeApp({apiKey:"AIzaSyD7yAsyCWr27YwB_wNYKAEWiBSM4VRtBU0",authDomain:"survey-digital-trace-project.firebaseapp.com",projectId:"survey-digital-trace-project",storageBucket:"survey-digital-trace-project.appspot.com",messagingSenderId:"1085800929605",appId:"1:1085800929605:web:31566d2b20bf0be331c62c",measurementId:"G-9LLMERWK25"});var O=f.a,x=s(26),y=(s(38),s(16)),S=s(32),_=s(13),N=s(29),w=s.n(N),A=function(e){Object(m.a)(s,e);var t=Object(b.a)(s);function s(e){var i;Object(u.a)(this,s),(i=t.call(this,e)).state={positionList:[]},i.recordActivity=i.props.recordActivity;var n=O.firestore();return i.db=n,i.collapsibleOpened=i.collapsibleToggled.bind(Object(j.a)(i)),i}return Object(h.a)(s,[{key:"componentDidMount",value:function(){var e=this;this.setState({applicantNumber:this.props.applicantNumber,tierNumber:this.props.tierNumber},(function(){e.parseCandidateData((function(){e.getResumeValues()}))})),this.db.collection("responseIDs").doc(this.props.qualtricsUserId+"_tier"+this.props.tierNumber).set({}),this.setState({appStartTime:w()().tz("America/New_York")}),window.addEventListener("blur",(function(t){t.preventDefault(),console.log("blur..."),e.state.activeSection&&(console.log("closing "+e.state.activeSection+" tab"),e[e.state.activeSection].click(),e.setState({activeSection:void 0,activeStartTime:void 0}))})),window.addEventListener("pagehide",(function(t){t.preventDefault(),console.log("pagehide...");var s=w()().tz("America/New_York");e.recordActivity("appTime","accessed",s.diff(e.state.appStartTime,"milliseconds")+" msec spent on app"),e.recordActivity("unloading","accessed","App unmounted")}))}},{key:"componentWillUnmount",value:function(){console.log("componentWillUnmount from Resume.js")}},{key:"getResumeValues",value:function(){var e,t,s,i=this.state.applicants[this.state.applicantNumber-1],n=this.state.tiers[(e=this.state.tierNumber,t=this.state.applicantNumber,4*(e-1)+(t-1))];this.setState({personal_address:i.a_personal_address,name:i.a_personal_legal_name,citizenship:i.b_demographics_citizenship,gender:i.b_demographics_gender,hispanic:i.b_demographics_hispanic,racial:i.b_demographics_racial,fedu:i.c_family_fedu,medu:i.c_family_medu,gpa:n.d_gpa,courses_taken:(s=n.d_courses_taken,s.split(", ")),sat_rw:n.e_sat_rw,sat_math:n.e_sat_math,ap_subject1:n.e_ap_subject1,ap_subject2:n.e_ap_subject2})}},{key:"componentDidUpdate",value:function(e,t){if(t.activeSection&&t.activeSection!==this.state.activeSection){var s=w()().tz("America/New_York");this.recordActivity("collapsibleTime",t.activeSection,s.diff(t.activeStartTime,"milliseconds")+" msec spent on "+t.activeSection+" section")}}},{key:"collapsibleToggled",value:function(e,t){this.state[e+"SectionOpened"]?this.setState({activeSection:e,activeStartTime:w()().tz("America/New_York")}):this.setState({activeSection:void 0,activeStartTime:void 0}),this.recordActivity("collapsibleToggled",e,(this.state[e+"SectionOpened"]?"opened":"closed")+" "+e+" section"+(t.isTrusted?"":" (auto)"))}},{key:"parseCandidateData",value:function(e){var t=this,s=this.db.collection("Applicants"),i=this.db.collection("Tiers"),n=[],a=[];i.get().then((function(e){e.forEach((function(e){a.push(e.data())}))})).then((function(){t.setState({tiers:a})})).catch((function(e){console.error("Error getting tiers: ",e)})),s.get().then((function(e){e.forEach((function(e){n.push(e.data())}))})).then((function(){t.setState({applicants:n},e)})).catch((function(e){console.error("Error getting applicants:",e)}))}},{key:"addPositionToList",value:function(e){this.setState((function(t){return{positionList:[].concat(Object(x.a)(t.positionList),[e])}}))}},{key:"_onMouseMove",value:function(e){}},{key:"render",value:function(){var e=this,t=k("1_hsprofile","profile_app"+this.state.applicantNumber),s=k("2_transcripts","transcript_t"+this.state.tierNumber+"_app"+this.state.applicantNumber),n=k("3_activities","activities_t"+this.state.tierNumber+"_app"+this.state.applicantNumber),a=k("4_essay","essay_app"+this.state.applicantNumber);return this.state.name?Object(i.jsx)("div",{className:"overall",children:Object(i.jsx)("div",{className:"App",onMouseMove:this._onMouseMove.bind(this),children:Object(i.jsxs)("div",{className:"resume",children:[Object(i.jsxs)("div",{children:[Object(i.jsxs)("div",{className:"header",children:[Object(i.jsxs)("span",{style:{fontWeight:"bold"},children:["Applicant #",this.state.applicantNumber]}),": ",Object(i.jsx)("span",{children:"Engineering Undeclared"})]}),Object(i.jsx)("div",{className:"header",style:{marginTop:"20px"},children:"Student Information"}),Object(i.jsx)("p",{className:"content",style:{fontWeight:"bold"},children:"Personal Information"}),Object(i.jsxs)("p",{className:"content",children:["Legal name: ",this.state.name]}),Object(i.jsxs)("p",{className:"content",children:["Permanent home address: ",this.state.personal_address]}),Object(i.jsx)("p",{className:"content",style:{marginTop:"12px",marginBottom:"12px"}})," ",Object(i.jsx)("p",{className:"content",style:{fontWeight:"bold"},children:"Demographics"}),Object(i.jsxs)("p",{className:"content",children:["Gender: ",this.state.gender]}),Object(i.jsxs)("p",{className:"content",children:["Citizenship status: ",this.state.citizenship]}),Object(i.jsxs)("p",{className:"content",children:["Hispanic/Latino/a/x: ",this.state.hispanic]}),Object(i.jsxs)("p",{className:"content",children:["Racial identity: ",this.state.racial]}),Object(i.jsx)("p",{className:"content",style:{marginTop:"12px",marginBottom:"12px"}}),Object(i.jsx)("p",{className:"content",style:{fontWeight:"bold"},children:"Family"}),Object(i.jsxs)("p",{className:"content",children:["Father\u2019s education: ",this.state.fedu]}),Object(i.jsxs)("p",{className:"content",children:["Mother\u2019s education: ",this.state.medu]})]}),Object(i.jsx)("div",{className:"section",children:Object(i.jsx)("div",{className:"header",style:{marginTop:"20px"},children:"Education"})}),Object(i.jsxs)("div",{className:"section",children:[Object(i.jsx)("div",{className:"content",style:{fontWeight:"bold"},children:"Grades"}),Object(i.jsxs)("p",{className:"content",children:["Cumulative GPA: ",this.state.gpa]})]}),Object(i.jsxs)("div",{className:"section",children:[Object(i.jsx)("div",{className:"content",style:{marginTop:"12px",fontWeight:"bold"},children:"Courses taken in current or most recent year"}),Object(i.jsxs)("table",{className:"course-table",children:[Object(i.jsx)("thead",{}),Object(i.jsx)("tbody",{children:this.state.courses_taken.map((function(e){return Object(i.jsx)("tr",{children:Object(i.jsx)("td",{className:"courses_taken_style underline",children:e})},e)}))})]})]}),Object(i.jsxs)("div",{className:"section",children:[Object(i.jsx)("div",{className:"header",style:{marginTop:"20px"},children:"Testing"}),Object(i.jsx)("p",{className:"content",style:{fontWeight:"bold"},children:"SAT"}),this.state.sat_rw||this.state.sat_math?Object(i.jsxs)("div",{children:[Object(i.jsxs)("p",{className:"content",children:["Evidence-Based Reading and Writing: ",this.state.sat_rw]}),Object(i.jsxs)("p",{className:"content",children:["Mathematics: ",this.state.sat_math]})]}):Object(i.jsx)("p",{className:"content",children:"Not Submitted"}),Object(i.jsx)("p",{className:"content",style:{fontWeight:"bold"},children:"AP"}),Object(i.jsxs)("p",{className:"content",children:[" ",this.state.ap_subject1]}),Object(i.jsxs)("p",{className:"content",children:[" ",this.state.ap_subject2]})]}),Object(i.jsxs)(y.a,{children:[Object(i.jsxs)(_.a,{children:[Object(i.jsx)(_.a.Header,{style:{background:"white",paddingLeft:0,paddingRight:0},children:Object(i.jsxs)(y.a.Toggle,{as:S.a,style:{color:"black",width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px",alignItems:"center"},variant:"link",eventKey:"0",ref:function(t){return e.hsprofile=t},onClick:function(t){return e.setState({hsprofileSectionOpened:!e.state.hsprofileSectionOpened},(function(){e.collapsibleToggled("hsprofile",t),e.state.hsprofileSectionOpened&&e.setState({transcriptSectionOpened:!1,activitiesSectionOpened:!1,essaySectionOpened:!1})}))},children:["High School Profile"," ",Object(i.jsx)("img",{id:"toggle_icon",src:this.state.hsprofileSectionOpened?C("minus_icon"):C("plus_icon"),alt:"toggle icon"})]})}),Object(i.jsx)(y.a.Collapse,{eventKey:"0",style:{marginTop:0},children:Object(i.jsx)(_.a.Body,{children:Object(i.jsx)("img",{src:t,className:"hsprofile-picture",alt:"High School Profile"})})})]}),Object(i.jsxs)(_.a,{children:[Object(i.jsx)(_.a.Header,{style:{background:"white",paddingLeft:0,paddingRight:0,borderTop:"1px solid black"},children:Object(i.jsxs)(y.a.Toggle,{as:S.a,style:{color:"black",width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px",alignItems:"center"},variant:"link",eventKey:"1",ref:function(t){return e.transcript=t},onClick:function(t){return e.setState({transcriptSectionOpened:!e.state.transcriptSectionOpened},(function(){e.collapsibleToggled("transcript",t),e.state.transcriptSectionOpened&&e.setState({hsprofileSectionOpened:!1,activitiesSectionOpened:!1,essaySectionOpened:!1})}))},children:["Transcript"," ",Object(i.jsx)("img",{id:"toggle_icon",src:this.state.transcriptSectionOpened?C("minus_icon"):C("plus_icon"),alt:"toggle icon"})]})}),Object(i.jsx)(y.a.Collapse,{eventKey:"1",children:Object(i.jsx)(_.a.Body,{children:Object(i.jsx)("img",{src:s,className:"image_togglefit",alt:"Transcript"})})})]}),Object(i.jsxs)(_.a,{children:[Object(i.jsx)(_.a.Header,{style:{background:"white",paddingLeft:0,paddingRight:0,borderTop:"1px solid black"},children:Object(i.jsxs)(y.a.Toggle,{as:S.a,style:{color:"black",width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px",alignItems:"center"},variant:"link",eventKey:"2",ref:function(t){return e.activities=t},onClick:function(t){return e.setState({activitiesSectionOpened:!e.state.activitiesSectionOpened},(function(){e.collapsibleToggled("activities",t),e.state.activitiesSectionOpened&&e.setState({hsprofileSectionOpened:!1,transcriptSectionOpened:!1,essaySectionOpened:!1})}))},children:["Activities "," ",Object(i.jsx)("img",{id:"toggle_icon",src:this.state.activitiesSectionOpened?C("minus_icon"):C("plus_icon"),alt:"toggle icon"})]})}),Object(i.jsx)(y.a.Collapse,{eventKey:"2",children:Object(i.jsx)(_.a.Body,{children:Object(i.jsx)("img",{src:n,className:"image_togglefit",alt:"Transcript"})})})]}),Object(i.jsxs)(_.a,{children:[Object(i.jsx)(_.a.Header,{style:{background:"white",paddingLeft:0,paddingRight:0,borderTop:"1px solid black"},children:Object(i.jsxs)(y.a.Toggle,{as:S.a,style:{color:"black",width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px",alignItems:"center"},variant:"link",eventKey:"3",ref:function(t){return e.essay=t},onClick:function(t){return e.setState({essaySectionOpened:!e.state.essaySectionOpened},(function(){e.collapsibleToggled("essay",t),e.state.essaySectionOpened&&e.setState({hsprofileSectionOpened:!1,transcriptSectionOpened:!1,activitiesSectionOpened:!1})}))},children:["Personal Essay"," ",Object(i.jsx)("img",{id:"toggle_icon",src:this.state.essaySectionOpened?C("minus_icon"):C("plus_icon"),alt:"toggle icon"})]})}),Object(i.jsx)(y.a.Collapse,{eventKey:"3",children:Object(i.jsx)(_.a.Body,{children:Object(i.jsx)("img",{src:a,className:"image_togglefit",alt:"Transcript"})})})]})]})]})})}):Object(i.jsx)("h1",{children:"Loading..."})}}]),s}(a.a.Component);function C(e){return"".concat("/test_survey","/images/").concat(e,".png")}function k(e,t){return"".concat("/test_survey","/application_components/").concat(e,"/").concat(t,".png")}var T=s(56);function D(){var e=Object(n.useState)([]),t=Object(T.a)(e,2),s=t[0],a=t[1],c=function(e,t){var n="/test_survey/#/".concat(e,"/").concat(t,"/0sampleResponseIDstudy").concat(e),c="".concat(e).concat(t),r=Object(i.jsx)("iframe",{height:"630px",width:"100%",src:n,title:c},c);a([].concat(Object(x.a)(s),[r]))};return Object(i.jsxs)("div",{className:"LandingPage container",children:[Object(i.jsx)("h1",{children:"Pretend this is the Qualtrics Survey"}),Object(i.jsx)("h2",{children:"You'll have some questions"}),Object(i.jsx)("p",{children:"And information and such"}),Object(i.jsx)("p",{children:"And then you can embed the Digital Trace Data page."}),Object(i.jsx)("p",{children:"By default, we are manipulating candidate gender and parenthood status."}),Object(i.jsx)("p",{children:"There are two resumes. Here's Candidate 1."}),Object(i.jsx)("h3",{children:"First Resume"}),Object(i.jsx)("button",{onClick:function(){return c(1,1)},children:"Generate Candidate 1 resume"}),s.length>=1&&s[0],Object(i.jsx)("h3",{children:"Second Resume"}),Object(i.jsx)("p",{children:"And now Candidate 2."}),Object(i.jsx)("button",{onClick:function(){return c(1,2)},children:"Generate Candidate 2 resume"}),s.length>=2&&s[1],Object(i.jsx)("h2",{children:"Downloading the Data"}),Object(i.jsxs)("p",{children:["Once you've run your study, you can download the data in CSV format at"," ",Object(i.jsx)("a",{href:"#/admin",children:"/admin"}),". In this demo, you can download the data no matter what password you put in."]}),Object(i.jsx)("a",{href:"https://www.google.com/",children:"/admin"})]})}var I=s(53),E=s.n(I),P=s(44),B=s.n(P),U=(s(51),function(e){Object(m.a)(s,e);var t=Object(b.a)(s);function s(e){var i;Object(u.a)(this,s),(i=t.call(this,e)).state={showPasswordErrorMessage:!1,isAuthenticated:!1,typedText:"",userIDs:[],resumeCSVurl:null,activitiesCSVurl:null},i.DATABASE=O.firestore(),i.resumeContent=[],i.activityContent=[];var n=document.getElementById("root");return B.a.setAppElement(n),i}return Object(h.a)(s,[{key:"handleChange",value:function(e){this.setState({showPasswordErrorMessage:!1}),this.setState({typedText:e.target.value})}},{key:"submitPassword",value:function(){"letmein"===this.state.typedText?(this.setState({isAuthenticated:!0}),this.fetchData()):this.setState({showPasswordErrorMessage:!0,isAuthenticated:!1})}},{key:"fetchData",value:function(){var e=Object(p.a)(d.a.mark((function e(){var t,s,i=this;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=null,e.next=5;break;case 5:return e.next=7,this.DATABASE.collection("responseIDs").get();case 7:s=e.sent,t=s.docs.map((function(e){return e.id}));case 9:t.length>0&&this.setState({userIDs:t},(function(){var e=t.map((function(e){return Promise.all([i.getResumeContent(e,1),i.getResumeContent(e,2)])}));Promise.all(e).then((function(){i.setState({resumeCSVurl:i.createCSV(i.resumeContent)})})).catch((function(e){console.error("Error fetching resumes:",e)}));var s=t.map((function(e){return Promise.all(Object(x.a)(Array(4).keys()).map((function(e){return++e})).map((function(t){return i.getActivityContent(e.split("_tier")[0],e.split("_tier")[1],t)})))}));Promise.all(s).then((function(){i.setState({activitiesCSVurl:i.createCSV(i.activityContent)})})).catch((function(e){console.error("Error fetching activity:",e)}))}));case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getResumeContent",value:function(e,t){var s=this;return this.DATABASE.collection("responseIDs").doc(e).collection("values shown").doc("resume ".concat(t)).get().then((function(i){i.exists?s.resumeContent.push(Object(o.a)({responseID:e,resumeNum:t},i.data())):console.log("No such document!")})).catch((function(e){console.error("Error getting document:",e)}))}},{key:"getActivityContent",value:function(e,t,s){var i=this;return this.DATABASE.collection("responseIDs").doc("".concat(e,"_tier").concat(t)).collection("app".concat(s)).get().then((function(n){n.forEach((function(n){i.activityContent.push(Object(o.a)({responseID:e,tierNum:t,appNum:s,activityID:n.id},n.data()))}))}))}},{key:"createCSV",value:function(e){var t=E.a.unparse(e),s=new Blob([t],{type:"text/csv"});return URL.createObjectURL(s)}},{key:"render",value:function(){var e=this;return this.state.isAuthenticated?Object(i.jsx)("div",{className:"overall",children:Object(i.jsxs)("div",{className:"container",children:[Object(i.jsx)("div",{className:"title",children:"Download Data"}),!this.state.activitiesCSVurl&&!this.state.resumeCSVurl&&Object(i.jsx)("p",{children:"Processing..."}),this.state.activitiesCSVurl&&Object(i.jsx)("div",{className:"horizontal",id:"big",children:Object(i.jsx)("a",{href:this.state.activitiesCSVurl,download:"activity_data.csv",children:"Activity Data"})}),this.state.resumeCSVurl&&Object(i.jsx)("div",{className:"horizontal",id:"big",children:Object(i.jsx)("a",{href:this.state.resumeCSVurl,download:"resume_data.csv",children:"Resume Data"})})]})}):Object(i.jsx)(B.a,{className:"modal_dtp",isOpen:!this.state.isAuthenticated,children:Object(i.jsxs)("form",{onSubmit:function(t){t.preventDefault(),e.submitPassword()},children:[Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{htmlFor:"password",children:"Enter Password:"}),Object(i.jsx)("input",{type:"password",id:"password",onChange:this.handleChange.bind(this),value:this.state.typedText,autoFocus:!0}),Object(i.jsx)("button",{type:"submit",children:"Submit"})]}),this.state.showPasswordErrorMessage&&Object(i.jsx)("div",{id:"red",children:"Invalid password. Please re-enter."})]})})}}]),s}(a.a.Component)),R=U,L=s(29),z=function(e){Object(m.a)(s,e);var t=Object(b.a)(s);function s(e){var i;Object(u.a)(this,s),(i=t.call(this,e)).activityCounter=1,i.recordActivity=i.recordActivity.bind(Object(j.a)(i)),i.DATABASE=O.firestore();var n=document.location.hash;return i.applicantNumber=parseInt(n.split("/")[1]),i.tierNumber=parseInt(n.split("/")[2]),i.qualtricsUserId=n.split("/")[3],console.log("qualtricsUserId: "+i.qualtricsUserId),i}return Object(h.a)(s,[{key:"recordActivity",value:function(){var e=Object(p.a)(d.a.mark((function e(t,s,i){var n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(this.qualtricsUserId+" "+i),void 0!==this.qualtricsUserId&&!this.qualtricsUserId.startsWith("${e:")){e.next=3;break}return e.abrupt("return");case 3:n=this.activityCounter.toString().padStart(5,"0"),this.activityCounter=this.activityCounter+1,a=L(),this.DATABASE.collection("responseIDs").doc(this.qualtricsUserId+"_tier"+this.tierNumber.toString()).collection("app"+this.applicantNumber.toString()).doc(n).set({category:t,description:i,value:s,timestamp:new Date(a),timeEpoch:Number(a.format("x")),timeReadable:a.tz("America/Los_Angeles").format("M-D-YY h:mm:ssa")}),console.log(n+" "+t+": "+s+" -- "+i);case 8:case"end":return e.stop()}}),e,this)})));return function(t,s,i){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=this;this.DATABASE.collection("responseIDs").doc(this.qualtricsUserId+"_tier"+this.tierNumber.toString()).collection("app"+this.applicantNumber.toString()).get().then((function(t){e.activityCounter=t.size+1,console.log(e.qualtricsUserId+"?!"),e.recordActivity("loading","accessed","App mounted")}))}},{key:"componentWillUnmount",value:function(){console.log("componentWillUnmount from App.js")}},{key:"render",value:function(){var e=this;return Object(i.jsx)("div",{children:Object(i.jsxs)(g.a,{children:[Object(i.jsx)(v.a,{path:"/:applicantNumber/:tierNumber/:qualtricsUserId",render:function(t){return Object(i.jsx)(A,Object(o.a)(Object(o.a)({},t),{},{applicantNumber:e.applicantNumber,tierNumber:e.tierNumber,recordActivity:e.recordActivity,qualtricsUserId:e.qualtricsUserId}))}}),Object(i.jsx)(v.a,{path:"/admin",render:function(){return Object(i.jsx)(R,{})}}),Object(i.jsx)(v.a,{path:"/",exact:!0,render:function(){return Object(i.jsx)(D,{})}})]})})}}]),s}(a.a.Component);r.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(z,{})}),document.getElementById("root"))}},[[80,1,2]]]);
//# sourceMappingURL=main.b63acf70.chunk.js.map