function callAjax(url, my_type, user_data, callback, async_val){
	//console.log("url: "+url+" type: "+my_type+" data:"+user_data+" async:"+async_val+" ");
	$.ajax({
		type: my_type,
		url: url,
		data: user_data,
		async: async_val,
		dataType:'json',
		success: function(data){
			//console.log(data);
			callback(data);
		},
		error: function(xhr, errorString, exception) {
			console.log("xhr.status="+xhr.status+" error="+errorString+" exception=("+exception+")");
		}
	});
}
