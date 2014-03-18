/*load pages when all skeleton is ready */
$( document ).ready(function(){
	$("#menu-page").load('js/app/Views/pages/menu.html');
});
function  previousPage(){
	parent.history.back();
	return false;
}
//main app
function APPLICATION() {
	//Application Variables
	this.SESSION_KEY;
	this.CELL_NO;
	this.USERNAME;
	this.FRIEND_NUMBER;
	this.VOUCHER_NUMBER;
	this.NETWORK_ID;

	/* session key */
	APPLICATION.prototype.setSessionKey = function (NEW_SESSION_KEY) {
		this.SESSION_KEY = NEW_SESSION_KEY;
	}
	APPLICATION.prototype.getSessionKey = function () {
		return this.SESSION_KEY;
	}
	/* cellnumber key */
	APPLICATION.prototype.setCellNumber = function (NEW_CELL_NO) {
		this.CELL_NO = NEW_CELL_NO;
	}
	APPLICATION.prototype.getCellNumber = function () {
		return this.CELL_NO;
	}
	/* username  */
	APPLICATION.prototype.setUsername = function (NEW_USERNAME) {
		this.USERNAME = NEW_USERNAME;
	}
	APPLICATION.prototype.getUsername = function () {
		return this.USERNAME;
	}
	/* friend number  */
	APPLICATION.prototype.setFriendNumber = function (NEW_FRIEND_NUMBER) {
		this.FRIEND_NUMBER = NEW_FRIEND_NUMBER;
	}
	APPLICATION.prototype.getFriendNumber = function () {
		return this.FRIEND_NUMBER;
	}
	/* voucher number */
	APPLICATION.prototype.setVoucherNumber = function (NEW_VOUCHER_NUMBER) {
		this.VOUCHER_NUMBER = NEW_VOUCHER_NUMBER;
	}
	APPLICATION.prototype.getVoucherNumber = function () {
		return this.VOUCHER_NUMBER;
	}
	/* network number */
	APPLICATION.prototype.setNetworkID = function (NEW_NETWORK_ID) {
		this.NETWORK_ID = NEW_NETWORK_ID;
	}
	APPLICATION.prototype.getNetworkID = function () {
		return this.NETWORK_ID;
	}
}

