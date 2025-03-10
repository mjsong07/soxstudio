$(document).ready(function(){
$("#soxQuestionFrom").validate({ignore:[]});
$( "#userNameId" ).rules( "add", { required: true });
$( "#emailId" ).rules( "add", { required: true, email: true, messages: { email: "Please enter a valid email address" } });
$( "#contentId" ).rules( "add", { required: true });
$("#soxQuestionFrom").submit(function(){
                if ( $(this).valid() == true ) {
                    $form = $(this);
                    var userName = $("#userNameId").val();
					var email = $("#emailId").val();
					var content = $("#contentId").val();
					var rank = $('input[name="rank"]:checked').val();
					if (!chkIsNotNull(rank))
					{
							rank = "0";
					}
					var userName  =  encodeURIComponent(userName);
				    var content  =  encodeURIComponent(content);
					var param = "?webServiceKey=qwe123";
				    param += "&feedBack.userName="+userName;
				    param += "&feedBack.content="+content;
				    param += "&feedBack.email="+email;
				    param += "&feedBack.rank="+rank;
				    param += "&feedBack.sourceType=SOX";
				    var url =  "http://rexshaw.java.myjhost.net/web/sys/feedBack_clientSaveOrUpdate.action"+param;
					 $.ajax({
				  	        type: "get",
				  	      	url: url,
				  	        data: null,
				  	        beforeSend: function(XMLHttpRequest) { 
				  	        }, 
				  	        success: function(data, textStatus) { 
					  	        //alert("thank you for your feedback!");
				  	        },
				  	        complete: function(XMLHttpRequest, textStatus) {
				  	        	 alert("thank you for your feedback!");
				  	        },
				  	      error: function(XMLHttpRequest, textStatus, errorThrown) {
		                    }
			  	  	    });
                    return false;
                }
            });

});



//校验不为空
function chkIsNotNull(obj)     
{      
    if(obj!=null && obj!="" && typeof(obj) != "undefined"){
    	return true;
    }
    return false;
}

