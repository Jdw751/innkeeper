!function(e){function t(r){if(n[r])return n[r].exports;var s=n[r]={exports:{},id:r,loaded:!1};return e[r].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(1),n(2),n(3),n(4),n(5),n(6),n(7),n(8),n(9),n(10),n(11),e.exports=n(12)},function(e,t){function n(e,t){e.sessionStorage.setItem(t.username,""),e.sessionStorage.setItem(t.fname,""),e.sessionStorage.setItem(t.lname,""),e.sessionStorage.setItem(t.aptid,""),e.sessionStorage.setItem(t.isadmin,"")}function r(e,t){return null!==e.sessionStorage.getItem(t.username)&&""!==e.sessionStorage.getItem(t.username)}function s(e,t){return console.log(e.sessionStorage.getItem(t.isadmin)),"true"===e.sessionStorage.getItem(t.isadmin)}var i=angular.module("mainApp",["ngRoute","loginModule","registerModule","reimbursementApp","maintenanceApp"]);angular.module("reimbursementApp",["ui.router"]),angular.module("registerModule",[]),angular.module("loginModule",[]),angular.module("maintenanceApp",[]);i.constant("seshkeys",{fname:"fname",lname:"lname",username:"username",aptid:"aptId",isadmin:"isAdmin",serviceurl:"serviceUrl",securedurl:"securedUrl"}),i.run(["$window","$location","seshkeys",function(e,t,n){var r=t.host();r&&"localhost"!==r&&(r=t.host()),e.sessionStorage.setItem(n.serviceurl,"http://"+r+":3030"),e.sessionStorage.setItem(n.securedurl,"https://"+r+":3030")}]),i.controller("NavbarCtrl",["$scope","$http","$location","$window","seshkeys","$timeout",function(e,t,i,o,a,u){e.$on("$locationChangeStart",function(){e.online=r(o,a),e.admin=s(o,a),console.log(e.admin),e.greetingMessage=o.sessionStorage.getItem(a.fname)+" "+o.sessionStorage.getItem(a.lname)}),e.$on("$locationChangeStart",function(){e.online!==!1||i.path().includes("register")||i.path("/login")}),e.isActive=function(e){return i.path().includes(e)},e.logout=function(){n(o,a),t.get("http://localhost:3030/logout"),e.online=r(o,a),u(function(){i.path("/login")},2e3)},e.online=r(o,a),e.admin=!1}]),i.config(["$routeProvider",function(e){e.when("/apartments",{templateUrl:"Room_Apt/views/aptPage.html",controller:"apt_list_user"}).when("/apartments/manage",{templateUrl:"Room_Apt/views/apt_admin.html",controller:"apt_list_admin"}).when("/maintenance",{templateUrl:"Maintenance/views/Maintenance.html",controller:"maintenanceCtrl"}).when("/maintenance/manage",{templateUrl:"Maintenance/views/MaintenaceAdmin.html",controller:"maintenanceAdminCtrl"}).when("/reimbursement",{templateUrl:"reimbursement/views/reimbursement.html",controller:"BurseCtrl"}).when("/reimbursement/manage",{templateUrl:"reimbursement/views/reimbursement_admin.html",controller:"BurseAdminCtrl"}).when("/login",{templateUrl:"loginRegistration/views/login.html",controller:"loginCtrl"}).when("/register",{templateUrl:"loginRegistration/views/register.html",controller:"registerCtrl"})}])},function(e,t){function n(e,t,n){e.sessionStorage.setItem(n.username,t.username),e.sessionStorage.setItem(n.fname,t.fname),e.sessionStorage.setItem(n.lname,t.lname),e.sessionStorage.setItem(n.aptid,t.aptId),e.sessionStorage.setItem(n.isadmin,t.isAdmin)}var r=angular.module("loginModule");r.controller("loginCtrl",["$scope","$window","loginFactory","seshkeys","$location","$timeout",function(e,t,r,s,i,o){e.login=function(){var a=r.tryLogin(e.loginUsername,e.loginPassword);a.then(function(e){e.data.length>1?o(function(){alert("Invalid username/password"),i.path("/login")}):(n(t,e.data.user,s),e.data.user.isAdmin===!0?i.path("/reimbursement/manage"):i.path("/reimbursement"))},function(e){o(function(){alert("Invalid username/password"),i.path("/login")})})}}])},function(e,t){var n=angular.module("registerModule");n.controller("registerCtrl",["$scope","registerFactory","$http","$location",function(e,t,n,o){var a=!1;e.register=function(){var n={username:e.registerUsername,password:e.registerPassword,email:e.registerEmail,fname:e.registerFname,lname:e.registerLname,isAdmin:!1,aptId:null};r(n.username,"Username"),r(n.password,"Password"),r(n.email,"Email"),r(n.fname,"First Name"),r(n.lname,"Last Name"),r(e.registerPassword2,"Confirm Password"),s(e.registerPassword,e.registerPassword2),a===!0?(i(),a=!1):t.createUser(n).then(function(){o.path("/login")},function(t){alert(t.data.error),e.registerUsername="",e.registerPassword="",e.registerPassword2=""})}}]);var r=function(e,t){e||(errors=!0,alert(t+" is required."))},s=function(e,t){e!=t&&(errors=!0,alert("Passwords do not match"))},i=function(){$scope.registerUsername="",$scope.registerPassword="",$scope.registerPassword2="",$scope.registerEmail="",$scope.registerFname="",$scope.registerLname=""}},function(e,t){var n=angular.module("loginModule");n.factory("loginFactory",["$http","$window","$timeout","seshkeys",function(e,t,n,r){var s={};return s.tryLogin=function(n,s){return e.post(t.sessionStorage.getItem(r.serviceurl)+"/login",{username:n,password:s})},s}])},function(e,t){var n=angular.module("registerModule");n.factory("registerFactory",["$http","$window","seshkeys",function(e,t,n){var r={};return r.createUser=function(r){return e.post(t.sessionStorage.getItem(n.serviceurl)+"/createUser",r)},r}])},function(e,t){var n=angular.module("maintenanceApp");n.controller("maintenanceAdminCtrl",["$scope","dataAdminFactory","seshkeys",function(e,t,n){e.ticketSubmission=[],e.ticketHistory=[],e.categories=t.getCategories(),e.changedTicket={};var r=function(){var n=[];return t.getAllTickets().then(function(t){n=t.data,e.ticketHistory=n},function(e){alert("getAllTickets"+e)}),n};r(),e.submitNewTicket=function(){e.ticketSubmission.push({category:e.ticket.category,description:e.ticket.description,startDate:new Date,completeDate:"",status:"Submitted",aptID:e.ticket.apartment,usr:n.username}),t.submitNewTicket(e.ticketSubmission[0]).then(function(){e.ticketSubmission.pop(),newTicket.$setPristine(),newTicket.$setUntouched()},function(){alert("failed ticket submission")})},e.getTicketById=function(e,n){t.getTicketById(e).then(function(e){n(e)},function(e){alert("failed to get ticket")})},e.updateTicket=function(n){e.getTicketById(n,function(r){for(var s=0;s<e.ticketHistory.length;s++)n==e.ticketHistory[s]._id&&(e.changedTicket=e.ticketHistory[s],t.updateTicket(e.changedTicket).then(function(e){},function(){alert("Failed Update")}))})}}])},function(e,t){var n=angular.module("maintenanceApp");n.controller("maintenanceCtrl",["$scope","dataAdminFactory","seshkeys",function(e,t,n){e.newTicket=[],e.ticketHistory=[],e.ticketSubmission=[];var r=function(n){var r=[];return t.getTicketsByUser(n).then(function(t){r=t.data,e.ticketHistory=r,console.log(e.ticketHistory)},function(e){alert(e)}),r};r(n.username),e.submitNewTicket=function(){e.ticketSubmission.push({category:e.ticket.category,description:e.ticket.description,startDate:new Date,completeDate:"",status:"Submitted",aptID:e.ticket.apartment,usr:n.username}),t.submitNewTicket(e.ticketSubmission[0]).then(function(){e.ticketSubmission.pop()},function(){alert("failed ticket submission")})}}])},function(e,t){var n=angular.module("maintenanceApp");n.factory("dataAdminFactory",["$http","seshkeys","$window",function(e,t,n){var r=n.sessionStorage.getItem(t.serviceurl),s={};return s.getAllTickets=function(){return e.get(r+"/maintenanceCheck/")},s.getCategories=function(){return["Request Item","Missing Item","Broken Item"]},s.getStatus=function(){return["Submitted","In-Progress","Complete"]},s.getTicketById=function(t){return e.get(r+"/maintenanceTicket/"+t)},s.updateTicket=function(t){return e.post(r+"/maintenanceUpdate/",t)},s.getTicketsByUser=function(t){return e.get(r+"/maintenanceCheck/"+t)},s.submitNewTicket=function(t){return e.post(r+"/maintenanceCheck/",t)},s}])},function(e,t){var n=angular.module("maintenanceApp");n.factory("dataFactory",["$http","seshkeys","$window",function(e,t,n){var r=n.sessionStorage.getItem(t.serviceurl),s={};return s.getTicketsByUser=function(){return e.get(r+"/maintenanceCheck/")},s}])},function(e,t){function n(e){return"In Progress"===e.status}function r(e){return 0===e.length}var s=angular.module("reimbursementApp");s.controller("BurseAdminCtrl",["$scope","burseService","$timeout",function(e,t,s){var i=function(){t.getAllReimbursements().then(function(t){e.burseHistory=t.data,e.emptyHistory=r(e.burseHistory),e.selected=!1},function(){alert("Failed to retreive reimbursements...")})};e.setSidebarActive=function(e){var t,n=document.getElementsByClassName("navButton");for(t=0;t<n.length;t++)angular.element(n[t]).removeClass("active");angular.element(e.target).parent().addClass("active")},e.display=function(r){t.getReimbursementById(r).then(function(t){e.displayBurse=t.data,e.selected=!0,e.completed=n(e.displayBurse)},function(){alert("Error retreiving reimbursement...")})},e.makeDecision=function(n){t.updateReimbursement(e.displayBurse,n).then(function(t){e.pending?i():e.display(e.displayBurse._id)},function(){alert("Update failed...")})},e.reset=function(){i()},e.filterForPending=function(t){return!(!e.pending||"In Progress"!==t.status)||(e.pending===!1||void 0===e.pending)},e.burseHistory=[],e.emptyHistory=!0,e.displayBurse={},e.selected=!1,e.completed=!1,i()}])},function(e,t){function n(e){var t=!1;for(index in e)""!==e[index].date&&"Select a Type"!==e[index].type&&""!==e[index].desc&&""!==e[index].amount||(t=!0);return t}function r(e){return 0===e.length}var s=angular.module("reimbursementApp");s.controller("BurseCtrl",["$scope","burseService","$window","seshkeys",function(e,t,s,i){var o=function(){t.getReimbursementsByUsername(u).then(function(t){e.burseHistory=t.data,e.emptyHistory=r(e.burseHistory)},function(){alert("Failed to retreive reimbursements...")})};e.addReimbursement=function(){n(e.burseSubmit)?alert("Must complete previous rows before adding another"):e.burseSubmit.push({date:"",type:"Select a Type",desc:"",amount:"",status:"In Progress",usrname:u,name:a})},e.submitReimbursement=function(){n(e.burseSubmit)?alert("Must complete all rows before submitting"):t.addReimbursement(e.burseSubmit).then(function(){e.burseSubmit=[{date:"",type:"Select a Type",desc:"",amount:"",status:"In Progress",usrname:u,name:a}],o()},function(){alert("Failed to submit reimbursements...")})},e.removeReimbursement=function(t){e.burseSubmit.splice(t,1)};var a=s.sessionStorage.getItem(i.fname)+" "+s.sessionStorage.getItem(i.lname),u=s.sessionStorage.getItem(i.username);e.types=t.getTypesOfBurse(),e.burseSubmit=[{date:"",type:"Select a Type",desc:"",amount:"",status:"In Progress",usrname:u,name:a}],e.burseHistory=[],o(),e.emptyHistory=r(e.burseHistory)}]),s.config(["$stateProvider",function(e){e.state("history",{url:"/reimbursement",templateUrl:"reimbursement/views/reimbursement_history.html"}).state("submit",{templateUrl:"reimbursement/views/reimbursement_submit.html"})}])},function(e,t){var n=angular.module("reimbursementApp");n.factory("burseService",["$http","$window","seshkeys",function(e,t,n){var r={};return r.getTypesOfBurse=function(){return["Travel","Certification","Supplies"]},r.getReimbursementById=function(r){return e.get(t.sessionStorage.getItem(n.serviceurl)+"/reimbursements/"+r)},r.getReimbursementsByUsername=function(r){return e.get(t.sessionStorage.getItem(n.serviceurl)+"/reimbursement/"+r)},r.getAllReimbursements=function(){return e.get(t.sessionStorage.getItem(n.serviceurl)+"/reimbursements/")},r.addReimbursement=function(r){return e.post(t.sessionStorage.getItem(n.serviceurl)+"/reimbursements/",r)},r.updateReimbursement=function(r,s){return e.post(t.sessionStorage.getItem(n.serviceurl)+"/reimbursements/"+r._id+"/"+s)},r}])}]);