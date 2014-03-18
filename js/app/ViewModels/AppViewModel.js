/* new application component */
APP = new APPLICATION();

/* get login status and redirect if recesary */
function getLoginStatusINIT(){
	$(".menu-container").hide();
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		/*
		var path = "#home-page";
		pager.navigate(path);
		*/
	}else{
		var path = "#login-page";
		pager.navigate(path);
	}
}
/* run on load */
$( document ).ready(function() {
	// Handler for .ready() called.
	getLoginStatusINIT()
});

/* LOGIN */
var LoginViewModel = function(){
	console.log("load login model");
	self = this;
	self.username = ko.observable("27723485399");
	self.password = ko.observable("68bdaa");
	self.tryLogin = function() {
		var username = this.username();
		var password = this.password();
		APP.setCellNumber(username);
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=login&username="+username+"&password="+password;
		callAjax(url, "POST", " ", loginCallback, true);
	};
}
function loginCallback(callbackData){
	if(callbackData.RESULT){
		$(".menu-item").css({"display":"inline-block"});

		var path = "#home-page";
		APP.setSessionKey(callbackData.SESSIONKEY);
		pager.navigate(path);
	}else{
		//console.log("login failed");
	}
}
/* LOGOUT */
function logout(){
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=logout&sessionkey="+key;
		console.log("logout url:",url);
		callAjax(url, "POST", " ", logoutCallback, true);
	}
}
function logoutCallback(callbackData){
	console.log("logout : ", callbackData);
	if(!callbackData.RESULT){
		location.reload();
	}
}
/* ELECTRICITY */
var getMeters = function() {
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=getmeters&sessionkey="+key;
		//console.log("url:",url);
		callAjax(url, "POST", " ", getMetersCallback, true);
	}
};
var getMetersCallback = function(callbackData){
	console.log("get meters : ", callbackData);
	$("#meters").empty();
	$("#meters").append("<option value=''>Choose meter</option>");
	$.each(callbackData.METERS, function(key, value) {
		$("#meters").append("<option value="+key+">"+value+"</option>");
	});
	$("#meters").change(function(event){
		$("#meter-number").val($("#meters").val());
	})
}
function setElectricity(){
	console.log("Send electricity ");
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var meternum	= $("#meter-number").val();
		var amount		= $("#meter-amount").val();
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=getelectricity&sessionkey="+key+"&meternum="+meternum+"&vchvalue="+amount+"&destnumber=";
		console.log("url:",url);
		callAjax(url, "POST", " ", getSetElectricityCallback, true);
	}
}
function getSetElectricityCallback(callbackData){
	console.log("electricity : ", callbackData);
	if(callbackData.RESULT){
		$("#home-page > #electricity-confirm-page #electricity-confirm-container #confirm-message").hide();
		$("#electricity-results").show();
		$("#meter-voucher").text(callbackData.VCHPIN);
		$("#meter-voucher-free").text(callbackData.BSSTPIN);
		$("#meter-num").text(callbackData.METERNUM);
		$("#meter-serial").text(callbackData.VCHSERIAL);
	}else{
		$("#home-page > #electricity-confirm-page #electricity-confirm-container #confirm-message").show();
		$("#electricity-results").hide();
		$("#home-page > #electricity-confirm-page #electricity-confirm-container #confirm-message").text(callbackData.REASON);
	}
}
/* PROFILE */
var getUserProfile = function(){
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=getmyinfo&sessionkey="+key;
		console.log("url:",url);
		callAjax(url, "POST", " ", getUserProfileCallback, true);
	}
}
var getUserProfileCallback = function(callbackData){
	if(callbackData.RESULT){
		this.profile_data_name = ko.observable(callbackData.CLIENTINFO.NAME);
		$("#NAME").text(callbackData.CLIENTINFO.NAME);
		$("#SURNNAME").text(callbackData.CLIENTINFO.SURNAME);
		$("#MOBILE").text(APP.getCellNumber());
		$("#IDNUM").text(callbackData.CLIENTINFO.IDNUM);
		$("#CURBALANCE").text(callbackData.CLIENTINFO.CURBALANCE);
	}
}
/* MY METERS */
var getAllMeters = function(){
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=getmeters&sessionkey="+key;
		console.log("get meters url:",url);
		callAjax(url, "POST", " ", getAllMetersCallback, true);
	}
}
function getAllMetersCallback(callbackData){
	console.log("all meters : ", callbackData);
	var count = 0;
	$.each(callbackData.METERS, function(key, value) {
		var div_name	= "#meter-name-"+count.toString();
		var div_number	= "#meter-number-"+count.toString();
		$(div_name).val(value);
		$(div_number).val(key);
		count++;
	});
}
/* MY LIMITS */
var getLimits = function(){
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=getlimits&sessionkey="+key;
		//console.log("url:",url);
		callAjax(url, "POST", " ", getLimitsCallback, true);
	}
}
function getLimitsCallback(callbackData){
	console.log("limits : ", callbackData)
	if(callbackData.RESULT){
		var LIMITS = callbackData.LIMITS;
		$("#monthly-e-token").val(LIMITS.etmonthlylimit);
		$("#daily-e-token").val(LIMITS.etdailylimit);
		$("#e-token-transfer").val(LIMITS.ettransferlimit);
		$("#monthly-payment-limit").val(LIMITS.paymonthlylimit);
		$("#daily-payment-limit").val(LIMITS.paydailylimit);
		$("#payment-limit").val(LIMITS.paytransferlimit);
		$("#monthly-e-wallet").val(LIMITS.ewmonthlylimit);
		$("#daily-e-wallet").val(LIMITS.ewdailylimit);
	}
}
/* STATEMENTS */
function getStatement(){
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=tranlist&sessionkey="+key;
		//console.log("url:",url);
		callAjax(url, "POST", " ", getStatementCallback, true);
	}
}
var getStatementCallback = function(callbackData){
	console.log("statement : ", callbackData);
	$("#statement-container").empty();
	if(callbackData.RESULT){
		var TRANLIST = callbackData.TRANLIST;
		var index = 0;
		while( index < TRANLIST.length){
			$("#statement-container").append('<div class="statement-label"> '+TRANLIST[index].VCHTYPE+'</div> <div class="statement-data"> R'+TRANLIST[index].VCHVALUE+'</div>');
			index++;
		}
	}
}
/* NETWORK LIST */
function getNetworks(){
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=netlist&sessionkey="+key;
		console.log("netlist url:",url);
		callAjax(url, "POST", " ", getNetworksCallback, true);
	}
}
var getNetworksCallback = function(callbackData){
	console.log("netlist : ", callbackData);
	$("#airtime_cellnum").val(APP.getCellNumber());
	$(".voucher-list").empty();
	if(callbackData.RESULT){
		$(".airtime-list").empty();
		$.each(callbackData.NETWORKS, function(key, value) {
			$(".airtime-list").append(
				'<li id="radio-container-'+key+'" class="vendors">'+
					'<input type="radio" id="'+key+'"  value="'+key+'" name="airtime" checked />'+
					'<label for="'+key+'">'+value+'</label>'+
				'</li>'+
				'<div id="airtime_clear"> </div>'
			);
		});
	}
	$("div .vendors").click(function(event){
		//alert(event.target.id);
		$("#"+event.target.id+" input[type='radio']").prop('checked', true);
	});
}
/* VOUCHER LIST */
function getVoucherList(){
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var network = $(".airtime-list input[type='radio']:checked").val();
		APP.setNetworkID(network);
		var number_owner  = $(".airtime-to input[type='radio']:checked").val();
		var cell_number  = "";
		if(number_owner == "self"){
			cell_number = APP.CELL_NO;
			APP.setFriendNumber(cell_number);
		}else if(number_owner == "friend"){
			cell_number = $("#airtime_cellnum").val();
			APP.setFriendNumber(cell_number);
		}
		console.log("network value : ", network);
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=vchlist&network="+network+"&sessionkey="+key;
		console.log("voucher url:",url);
		callAjax(url, "POST", " ", getVoucherListCallback, true);
	}
}
var getVoucherListCallback = function(callbackData){
	console.log("vouchers : ", callbackData);
	if(callbackData.RESULT){
		$(".voucher-list").empty();
		$.each(callbackData.VOUCHERS, function(key, value) {
			$(".voucher-list").append(
				'<li id="airtime-list-'+key+'" class="vendor-airtime-list">'+
					'<input type="radio" id="'+key+'"  value="'+key+'" name="airtime-voucher" checked />'+
					'<label for="'+key+'">'+value+'</label>'+
				'</li>'+
				'<div id="airtime_clear"> </div>'
			);
		});
	}
	$("div .vendor-airtime-list").click(function(event){
		//alert(event.target.id);
		$("#"+event.target.id+" input[type='radio']").prop('checked', true);
	});
}
function voucherConfirm(){
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var voucher_id  = $(".voucher-list input[type='radio']:checked").val();
		APP.setVoucherNumber(voucher_id);
		console.log("app data : ", APP);
		$("#voucher-cellnumber").text(APP.FRIEND_NUMBER);
		$("#voucher-number").text(APP.VOUCHER_NUMBER);
	}
}
/* VOUCHER REQUEST */ 
function voucherRequest(){
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var voucher  = APP.getVoucherNumber();
		var number   = APP.getFriendNumber();
		var network	 = APP.getNetworkID();

		var key = APP.getSessionKey();
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=getvoucher&voucherid="+voucher+"&destnumber="+number+"&sessionkey="+key;
		//console.log("netlist url:",url);
		/* uncomment under normal operations */
		callAjax(url, "POST", " ", getVoucherRquestCallback, true);
	}
}
var getVoucherRquestCallback = function(callbackData){
	console.log("request : ", APP);
	if(callbackData.RESULT){
		$("#curr-balance").text(callbackData.CURBALANCE);
		$("#voucher").text(callbackData.VCHPIN);
		$("#voucher-error").hide();
	}else{
		$("#voucher-page-request .voucher-container ").hide()
		$("#voucher-page-request .main-text").hide();
		$("#voucher-error").text(callbackData.REASON);
	}
}
/* PASSWORD SET */
function setPassword(){
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var old_password		= $("#oldpass").val();
		var new_password		= $("#newpass").val();
		var confirm_password	= $("#confpass").val();
		if(new_password == confirm_password){
			var url = "http://www.mobile-money.co.za/?q=vdsjson&action=changepin&newpin="+new_password+"&sessionkey="+key;
			console.log("netlist url:",url);
			callAjax(url, "POST", " ", getNewPasswordCallback, true);
		}else{
			$("#confirm-message").text("New and Confirmation passwords do not match")
		}
	}
}
var getNewPasswordCallback = function(callbackData){
	console.log("pass new : ", callbackData);
	if(callbackData.RESULT){
		$("div #default-confirm-page div #confirm-message").text(callbackData.MESSAGE);
	}
}
function setMeters(){
	console.log("set meters");
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		//alert("update meters");
		var m_name   = $("#meter-name-0").val();
		var m_number = $("#meter-number-0").val();
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=updatemeter&sessionkey="+key+"&meter=1&meterdesc="+m_name+"&meternum="+m_number
		console.log("meter 1 : ", url);
		callAjax(url, "POST", " ", getMetersSetCallbackNULL, true);

		var m_name1   = $("#meter-name-1").val();
		var m_number1 = $("#meter-number-1").val();
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=updatemeter&sessionkey="+key+"&meter=2&meterdesc="+m_name1+"&meternum="+m_number1
		console.log("meter 2 : ", url);
		callAjax(url, "POST", " ", getMetersSetCallbackNULL, true);

		var m_name2   = $("#meter-name-2").val();
		var m_number2 = $("#meter-number-2").val();
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=updatemeter&sessionkey="+key+"&meter=3&meterdesc="+m_name2+"&meternum="+m_number2
		console.log("meter 3 : ", url);
		callAjax(url, "POST", " ", getMetersSetCallback, true);
	}
}
var getMetersSetCallbackNULL = function(callbackData){
	if(callbackData.RESULT){
		$("#confirm-message").text(callbackData.MESSAGE);
	}
	$("#confirm-message").text(callbackData.MESSAGE);
}
var getMetersSetCallback = function(callbackData){
	//alert("ggg");
	if(callbackData.RESULT){
		$("#confirm-message").text(callbackData.MESSAGE);
		console.log("meters set : ",callbackData);
		var path = "#profile-page";
		pager.navigate(path);
	}
}
function setLimits(){
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var etmonthlylimit	= $("#monthly-e-token").val();
		var etdailylimit		= $("#daily-e-token").val();
		var ettransferlimit	= $("#e-token-transfer").val();
		var paymonthlylimit	= $("#monthly-payment-limit").val();
		var paydailylimit	= $("#daily-payment-limit").val();
		var paytransferlimit	= $("#payment-limit").val();
		var ewmonthlylimit 	= $("#monthly-e-wallet").val();
		var ewdailylimit 	=  $("#daily-e-wallet").val();
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=setlimits&sessionkey="+key+
			"&etmonthlylimit="+etmonthlylimit+
			"&etdailylimit="+etdailylimit+
			"&ettransferlimit="+ettransferlimit+
			"&paymonthlylimit="+paymonthlylimit+
			"&paydailylimit="+paydailylimit+
			"&paytransferlimit="+paytransferlimit+
			"&ewmonthlylimit="+ewmonthlylimit+
			"&ewdailylimit="+ewdailylimit;
		console.log("url : ", url);
		callAjax(url, "POST", " ", getLimitsSetCallback, true);
	}
}
var getLimitsSetCallback = function(callbackData){
	//console.log("limit set callback : ", callbackData);
	var path = "#profile-page";
	pager.navigate(path);
}
/* TRANSFER*/
function setTransfer(){
	console.log("start transfer");
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var amount	= $("#transfer-amount").val();
		var ref 	= $("#transfer-ref").val();
		var dest	= $("#transfer-destnumber").val();

		url = "http://www.mobile-money.co.za/?q=vdsjson&action=etokentransfer&sessionkey="+key+"&tranamount="+amount+"&tranref="+ref+"&destnum="+dest;
		console.log("transfer url : ",url);
		callAjax(url, "POST", " ", getSetTransferCallback, true);
	}
}
var getSetTransferCallback = function(callbackData){
	console.log("set transfer : ", callbackData);
	if(callbackData.RESULT){
		$("#home-page > #transfer-confirm-page #transfer-confirm-container #confirm-message").hide();
		$("#transfer-results").show();
		$("#transfer-DESTNUM").text(callbackData.DESTNUM);
		$("#transfer-AMOUNT").text(callbackData.AMOUNT);
		$("#transfer-CURBALANCE").text(callbackData.CURBALANCE);
		$("#transfer-REFERENCE").text(callbackData.REFERENCE);
		$("#transfer-TRANSREF").text(callbackData.TRANSREF);
	}else{
		$("#home-page > #transfer-confirm-page #transfer-confirm-container #confirm-message").show();
		$("#transfer-results").hide();
		$("#home-page > #transfer-confirm-page #transfer-confirm-container #confirm-message").text(callbackData.REASON);
	}
}
/* LOCK */
function setLock(){
	var key = APP.getSessionKey();
	if(typeof(key) != "undefined"){
		var lock_pass = $("#lockpass").val();
		var url = "http://www.mobile-money.co.za/?q=vdsjson&action=lockaccount&sessionkey="+key+"&password="+lock_pass;
		console.log("set lock url : ", url);
		callAjax(url, "POST", " ", getSetLockCallback, true);
	}
}
var getSetLockCallback = function(callbackData){
	console.log("lock callback : ", callbackData);
	if(callbackData.RESULT){
		$("#profile-page  #lock-confirm-page #lock-confirm-container #confirm-message").text(callbackData.MESSAGE);
	}else{
		$("#profile-page  #lock-confirm-page #lock-confirm-container #confirm-message").text(callbackData.REASON);
	}
}
/*Main View Model - model wrapper */
var viewModel = {
	loginInit:new LoginViewModel(),
	//getElectricity: new ElectricityViewModel()
};

/* Money transfer */
pager.extendWithPage(viewModel);
ko.applyBindings(viewModel, $(".body")[0]);
pager.start(viewModel);

/* SET MODELS */
/*
var setloginViewModel = new LoginViewModel();
var setElectricityViewModel = new ElectricityViewModel()
*/
/*apply page bindings */
/*pager.extendWithPage(setloginViewModel);
ko.applyBindings(setloginViewModel);
pager.start();
window.VM = setloginViewModel;
*/
