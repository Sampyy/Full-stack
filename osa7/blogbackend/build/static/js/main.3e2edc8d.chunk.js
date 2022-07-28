(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n(16),a=n.n(c),s=n(2),i=n.n(s),o=n(5),u=n(3),l=n(0),d=function(e){var t=e.message,n=e.success;return null===t?null:!0===n?Object(l.jsx)("div",{className:"success",children:t}):Object(l.jsx)("div",{className:"error",children:t})},j=function(e){var t=e.blog,n=e.handleAddLike,c=e.handleDelete,a=e.user,s=Object(r.useState)(!1),i=Object(u.a)(s,2),o=i[0],d=i[1],j={display:o?"none":"",paddingTop:10,paddingLeft:2,border:"solid",borderWidth:1,marginBottom:5},b={display:o?"":"none",paddingTop:10,paddingLeft:2,border:"solid",borderWidth:1,marginBottom:5};return Object(l.jsxs)("div",{className:"blog",children:[Object(l.jsxs)("div",{style:j,className:"partialContent",children:[t.title," ",t.author,Object(l.jsx)("button",{onClick:function(){return d(!o)},children:"show"})]}),Object(l.jsxs)("div",{style:b,className:"fullContent",children:[Object(l.jsxs)("div",{children:[t.title," ",Object(l.jsx)("button",{onClick:function(){return d(!o)},children:"Hide"})]}),Object(l.jsxs)("div",{children:[t.author," "]}),Object(l.jsxs)("div",{children:[t.url," "]}),Object(l.jsxs)("div",{children:["likes ",t.likes,Object(l.jsx)("button",{onClick:function(){return n(t)},children:"Like"})]}),Object(l.jsx)("div",{children:t.user.name}),a.username===t.user.username&&Object(l.jsx)("div",{children:Object(l.jsx)("button",{onClick:function(){return c(t)},children:"Remove"})})]})]})},b=function(e){var t=e.username,n=e.setUsername,r=e.password,c=e.setPassword,a=e.handleLogin;return Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Login"}),Object(l.jsxs)("form",{onSubmit:a,children:[Object(l.jsxs)("div",{children:["username",Object(l.jsx)("input",{type:"text",value:t,name:"Username",id:"username",onChange:function(e){var t=e.target;return n(t.value)}})]}),Object(l.jsxs)("div",{children:["password",Object(l.jsx)("input",{type:"password",value:r,name:"Password",id:"password",onChange:function(e){var t=e.target;return c(t.value)}})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",id:"login-button",children:"login"})})]})]})},h=Object(r.forwardRef)((function(e,t){h.displayName=h;var n=Object(r.useState)(!1),c=Object(u.a)(n,2),a=c[0],s=c[1],i={display:a?"none":""},o={display:a?"":"none"},d=function(){return s(!a)};return Object(r.useImperativeHandle)(t,(function(){return{toggleVisibility:d}})),Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{style:i,children:Object(l.jsx)("button",{onClick:d,children:e.buttonLabel})}),Object(l.jsxs)("div",{style:o,children:[e.children,Object(l.jsx)("button",{onClick:d,children:"cancel"})]})]})})),f=h,p=function(e){var t=e.addBlog,n=Object(r.useState)(""),c=Object(u.a)(n,2),a=c[0],s=c[1],i=Object(r.useState)(""),o=Object(u.a)(i,2),d=o[0],j=o[1],b=Object(r.useState)(""),h=Object(u.a)(b,2),f=h[0],p=h[1];return Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"add new blog"}),Object(l.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t({author:a,title:d,url:f,likes:0}),s(""),j(""),p("")},children:[Object(l.jsxs)("div",{children:["author: ",Object(l.jsx)("input",{value:a,onChange:function(e){var t=e.target;return s(t.value)},id:"authorField",placeholder:"Author name"})]}),Object(l.jsxs)("div",{children:["title: ",Object(l.jsx)("input",{value:d,onChange:function(e){var t=e.target;return j(t.value)},id:"titleField",placeholder:"Title name"})]}),Object(l.jsxs)("div",{children:["url: ",Object(l.jsx)("input",{value:f,onChange:function(e){var t=e.target;return p(t.value)},id:"urlField",placeholder:"url for blog"})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",id:"addBlogButton",children:"Add blog"})})]})]})},O=function(e){var t=e.user,n=e.handleLogout;return Object(l.jsxs)("div",{children:[Object(l.jsxs)("p",{children:[t.name," logged in"]}),Object(l.jsx)("button",{onClick:function(){return n()},children:"Log out "})]})},v=n(6),g=n.n(v),x="/api/blogs",m=null,k={getAll:function(){return g.a.get(x).then((function(e){return e.data}))},create:function(){var e=Object(o.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:m}},e.next=3,g.a.post(x,t,n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),addLike:function(){var e=Object(o.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:m}},e.next=3,g.a.put("".concat(x,"/").concat(t.id),t,n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),deleteBlog:function(){var e=Object(o.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:m}},e.next=3,g.a.delete("".concat(x,"/").concat(t.id),n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),setToken:function(e){m="bearer ".concat(e)}},w={login:function(){var e=Object(o.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},y=function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(null),s=Object(u.a)(a,2),h=s[0],v=s[1],g=Object(r.useState)(null),x=Object(u.a)(g,2),m=x[0],y=x[1],S=Object(r.useState)(""),L=Object(u.a)(S,2),B=L[0],C=L[1],T=Object(r.useState)(""),A=Object(u.a)(T,2),N=A[0],I=A[1],U=Object(r.useState)(null),D=Object(u.a)(U,2),J=D[0],z=D[1],E=Object(r.useRef)(),F=function(){var e=Object(o.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,w.login({username:B,password:N});case 4:n=e.sent,z(n),k.setToken(n.token),window.localStorage.setItem("loggedBlogUser",JSON.stringify(n)),C(""),I(""),y("Logged in as "+n.username),setTimeout((function(){y(null)}),5e3),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(1),v("Incorrect username or password"),setTimeout((function(){v(null)}),5e3);case 18:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(o.a)(i.a.mark((function e(t){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k.create(t);case 3:r=e.sent,c(n.concat(r)),E.current.toggleVisibility(),y("Added a new blog: "+r.title+" by "+r.author),setTimeout((function(){y(null)}),5e3),console.log(r),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),v("Blog couldn\xb4t be added: "+e.t0),setTimeout((function(){v(null)}),5e3);case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(o.a)(i.a.mark((function e(t){var r,a,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k.addLike(t);case 3:for(r=e.sent,console.log(r),a=[],s=0;s<n.length;s++)a[s]=n[s],t.id===n[s].id&&a[s].likes++;a.sort((function(e,t){return t.likes-e.likes})),c(a),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),v("Like couldn`t be added: "+e.t0),setTimeout((function(){v(null)}),5e3);case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}(),H=function(){var e=Object(o.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!window.confirm("Do you really want to delete the blog?")){e.next=6;break}return e.next=4,k.deleteBlog(t);case 4:n=e.sent,console.log(n);case 6:k.getAll().then((function(e){e.sort((function(e,t){return t.likes-e.likes})),c(e)})),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),v("blog couldn`t be deleted: "+e.t0),setTimeout((function(){v(null)}),5e3);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){k.getAll().then((function(e){e.sort((function(e,t){return t.likes-e.likes})),c(e)}))}),[]),Object(r.useEffect)((function(){var e=window.localStorage.getItem("loggedBlogUser");if(e){var t=JSON.parse(e);z(t),k.setToken(t.token)}}),[]),Object(l.jsxs)("div",{children:[Object(l.jsx)("h1",{children:"Blogs"}),Object(l.jsx)(d,{message:m,success:!0}),Object(l.jsx)(d,{message:h}),null===J?Object(l.jsx)(b,{username:B,setUsername:C,password:N,setPassword:I,handleLogin:F}):Object(l.jsxs)("div",{children:[Object(l.jsx)(O,{user:J,handleLogout:function(){window.localStorage.removeItem("loggedBlogUser"),z(null),y("Succesfully logged out"),setTimeout((function(){y(null)}),5e3)}}),Object(l.jsx)(f,{buttonLabel:"Add a new blog",ref:E,children:Object(l.jsx)(p,{addBlog:P})}),Object(l.jsx)("h2",{children:"blogs"}),n.map((function(e){return Object(l.jsx)(j,{blog:e,handleAddLike:R,handleDelete:H,user:J},e.id)}))]})]})};n(41);a.a.render(Object(l.jsx)(y,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.3e2edc8d.chunk.js.map