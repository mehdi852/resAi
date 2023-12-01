"use strict";(self.webpackChunkcv_creator=self.webpackChunkcv_creator||[]).push([[522],{3089:function(e,s,t){t.r(s),t.d(s,{default:function(){return w}});var a=t(5671),i=t(3144),n=t(7326),l=t(136),c=t(9388),o=t(7313),r=(t(7485),t(8050)),h=t(2393),m=t(6236),d=t(2172),u=t(5938),_=t(7709),p=t(4088),g=t(1203),x=t(7621),j=t(7841),f=t(9099),v=t(8303),N=t(1127),k=t(6417),y=function(){var e={loop:!0,autoplay:!0,animationData:h,rendererSettings:{preserveAspectRatio:"xMidYMid slice"}},s=(0,N.useLottie)(e).View;return s},b=function(e){(0,l.Z)(t,e);var s=(0,c.Z)(t);function t(e){var i;return(0,a.Z)(this,t),(i=s.call(this,e)).state={pages:[],socialLinks:[],email:"",websiteDescription:"",name:"",message:"",isSuccessShowed:!1,loaded:!1},i.customStyles=i.customStyles.bind((0,n.Z)(i)),i.handleInputs=i.handleInputs.bind((0,n.Z)(i)),i.handleSubmit=i.handleSubmit.bind((0,n.Z)(i)),i.redirectToHome=i.redirectToHome.bind((0,n.Z)(i)),"/contact"===window.location.pathname.substring(0,8)&&i.customStyles(),i}return(0,i.Z)(t,[{key:"componentDidMount",value:function(){var e=this;(0,g.UQ)().then((function(s){return null!==s&&e.setState({pages:s})})),(0,g.N5)().then((function(s){null!==s&&e.setState({websiteName:s.title,websiteDescription:s.description})})),(0,g.dv)().then((function(s){null!==s&&e.setState({socialLinks:s}),e.setState({loaded:!0})}))}},{key:"handleInputs",value:function(e,s){switch(e){case"Email":this.setState({email:s});break;case"Name":this.setState({name:s});break;case"Message":this.setState({message:s})}}},{key:"redirectToHome",value:function(){window.location.href="/"}},{key:"customStyles",value:function(){document.getElementById("root").style.overflow="none",document.getElementById("root").style.height="unset",document.getElementsByTagName("body")[0].style.height="fit-content",document.getElementsByTagName("body")[0].style.overflow="unset",document.getElementsByTagName("html")[0].style.height="fit-content",document.getElementsByTagName("html")[0].style.overflow="scroll",document.getElementsByTagName("html")[0].style.overflowX="hidden"}},{key:"handleSubmit",value:function(){var e=this;this.state.email.length>0&&this.state.name.length>0&&this.state.message.length>0?((0,g.x$)(this.state.email,this.state.name,this.state.message),setTimeout((function(){e.setState({isSuccessShowed:!0})}),1e3)):alert("Please fill all fields !")}},{key:"render",value:function(){var e=this;return(0,k.jsxs)("div",{className:"custom-page",children:[!1===this.state.loaded&&(0,k.jsx)("div",{className:"loading",children:(0,k.jsx)(k.Fragment,{children:y})}),(0,k.jsxs)("div",{className:"custom-page__nav",children:[(0,k.jsx)("a",{href:"/",children:(0,k.jsx)("img",{alt:"logo",className:"custom-page__nav__logo",src:r})}),(0,k.jsxs)("ul",{className:"custom-page__navlinks",children:[(0,k.jsx)("li",{children:(0,k.jsx)("a",{href:"/",className:"custom-page__navlinks",children:"Home"})}),null!==this.state.pages&&this.state.pages.map((function(e,s){return(0,k.jsxs)("li",{children:[" ",(0,k.jsx)(v.rU,{className:"custom-page__navlinks",to:{pathname:"/p/"+e.id},children:e.id})," "]},s)})),(0,k.jsxs)("li",{children:[(0,k.jsx)(v.rU,{to:"/contact",className:"custom-page__navlinks",children:"Contact Us"})," "]})]}),(0,k.jsx)("div",{className:"custom-page__nav__action",children:(0,k.jsx)(v.rU,{to:"/",children:"Go to App"})})]}),(0,k.jsx)("div",{className:"custom-page__content",children:(0,k.jsxs)("div",{className:"custom-page__contactUs",children:[(0,k.jsxs)("div",{className:"custom-page-contactHead",children:[(0,k.jsx)("h1",{children:"Contact Us"}),this.state.isSuccessShowed&&(0,k.jsx)("div",{className:"contact-success",children:"Thank you for contacting us we will get back to you soon."}),(0,k.jsx)("p",{children:"Have comments, questions, or feedback to share? Our team would love to hear from you. Give us a call or submit a message below."})]}),(0,k.jsxs)("div",{className:"custom-page-contactBody",children:[(0,k.jsx)(x.Z,{handleInputs:this.handleInputs,title:"Email",name:"Email"}),(0,k.jsx)(x.Z,{handleInputs:this.handleInputs,title:"Name",name:"Name"}),(0,k.jsx)(j.Z,{handleInputs:this.handleInputs,title:"Message",name:"Message"}),(0,k.jsx)(f.Z,{onClick:function(){e.handleSubmit()},variant:"contained",color:"primary",children:"Submit"})]})]})}),(0,k.jsxs)("div",{className:"custom-page__footer-wrapper",children:[(0,k.jsxs)("div",{className:"custom-page__footer",children:[(0,k.jsxs)("div",{className:"custom-page__footer-item",children:[(0,k.jsx)("span",{className:"custom-page__footer-item__title",children:" Social "}),(0,k.jsxs)("ul",{className:"custom-page__footer-item__social-links",children:[(0,k.jsx)("li",{children:(0,k.jsxs)("div",{className:"social-link__facebook",children:[" ",(0,k.jsx)("a",{href:null!==this.state.socialLinks?this.state.socialLinks.facebook:"#",children:(0,k.jsx)(m.r,{className:"social-link__icon"})})]})}),(0,k.jsx)("li",{children:(0,k.jsxs)("div",{className:"social-link__twitter",children:[" ",(0,k.jsxs)("a",{href:null!==this.state.socialLinks?this.state.socialLinks.twitter:"#",children:[" ",(0,k.jsx)(d.r,{className:"social-link__icon"})]})," "]})}),(0,k.jsx)("li",{children:(0,k.jsxs)("div",{className:"social-link__pinterest",children:[" ",(0,k.jsxs)("a",{href:null!==this.state.socialLinks?this.state.socialLinks.pinterest:"#",children:[" ",(0,k.jsx)(_.r,{className:"social-link__icon"})]})]})}),(0,k.jsx)("li",{children:(0,k.jsxs)("div",{className:"social-link__instagram",children:[" ",(0,k.jsxs)("a",{href:null!==this.state.socialLinks?this.state.socialLinks.instagram:"#",children:[" ",(0,k.jsx)(u.r,{className:"social-link__icon"})," "]})]})}),(0,k.jsx)("li",{children:(0,k.jsx)("div",{className:"social-link__youtube",children:(0,k.jsxs)("a",{href:null!==this.state.socialLinks?this.state.socialLinks.youtube:"#",children:[(0,k.jsx)(p.r,{className:"social-link__icon"})," "]})})})]}),(0,k.jsx)("p",{children:"Follow us in social media to get exclusive resources straight to your feed"})]}),(0,k.jsxs)("div",{className:"custom-page__footer-item",children:[(0,k.jsx)("span",{className:"custom-page__footer-item__title",children:" Content "}),(0,k.jsxs)("ul",{className:"custom-page__footer-item__website-links",children:[(0,k.jsx)("li",{children:(0,k.jsx)("a",{href:"/",children:"Home"})}),null!==this.state.pages&&this.state.pages.map((function(e,s){return(0,k.jsx)("li",{children:(0,k.jsx)("a",{href:"/p/"+e.id,children:e.id})},s)}))]})]}),(0,k.jsxs)("div",{className:"custom-page__footer-item",children:[(0,k.jsx)("span",{className:"custom-page__footer-item__title",children:" About "}),(0,k.jsx)("p",{children:this.state.websiteDescription})]})]}),(0,k.jsx)("hr",{className:"custom-page__footer-devider"}),(0,k.jsxs)("div",{className:"custom-page__footer-copyright",children:[(0,k.jsx)("span",{children:this.state.websiteName})," Copyright \xa9 2021-2022 All rights reserved."]})]})]})}}]),t}(o.Component),w=b}}]);