$(function(){
	// Font Resizing
	$("header h1").fitText(0.2, { maxFontSize: '176px' });
	$("header h1.alt").fitText(0.3, { maxFontSize: '176px' });
	$("header h2").fitText(0.4, { maxFontSize: '140px' });
	$("#work-list .intro").fitText(1.5, { maxFontSize: '22px' });

	// Pulldown Menus
	$("select.slick-select").each(function(){
        $(this).ddslick({
            width: '100%',
        });
    });

	$('select.categories').ddslick({
		width: '100%',
		onSelected: function(data){
			if (data.selectedData.value == '') {
				window.location = "/blog/";
			} else {
				window.location = data.selectedData.value;
			}
    	}
	});

	function labels (){
		// Show Labels Where Appropriate
		$('input, textarea').each(function(){
			if ($(this).data('label') == 'show'){
				$(this).prev('label').show();
			}
		});		
	}
	labels();

	// Social Links: All (convention: li a)
/*	$('.social-list li').click(function(){
		window.open($(this.firstChild).attr('href'));
  		return false;
	});*/

	// Page scrolling
	$('.scroll').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		if ($('body').hasClass('mobile-nav')){
			$('.menu').click();
		}

		var element = $(this).data('scrollto');
		var offset = $(this).data('offset');
		if (offset === undefined)
		{
			offset = 0;
		}
		var element_pos = $('#'+element+'').offset().top - 95 - offset;
		$('html, body').animate({scrollTop:element_pos}, 'slow');
	});

	// Expandable
	$('.expandable article a').click(function(){
		var current_index;
		var selected_index = $(this).parent('article').index();
		$(this).find('.triangle').toggleClass('triangle-down');
		$(this).closest('.expandable').find('article .content').each(function(index, element){
			if ($(this).is(':visible')){
				current_index = index;
				$(this).slideUp().parent('article').find('a .triangle').removeClass('triangle-down');
			}
		});
		if (current_index != selected_index){
			$(this).next('.content').slideToggle();
		}

		return false;
	});

	// Specify Colors
	var colors = {'darkblack' : '#000', black: '#404041', grey: '#babaae', red: '#df5832', blue: '#9ac5d2', yellow: '#f1be45', 'darkgrey': '#aaaa9f', 'blue2': '#aaaa9f', 'pink': '#aaaa9f'};

	var page_width = $(window).width();
	var paper = Raphael('page-background', page_width, 500);
	var paper_top = Raphael('page-background-top', page_width, 150);
	var background = '';
	//修改默认的背景 色
	//var background_overlay = paper_top.path('M 0 0 L 0 150 L '+paper_top.width+' 34 L '+paper_top.width+' 0 Z').attr('fill', '#414142').attr('stroke', 'none');
	var background_overlay = paper_top.path('M 0 0 L 0 150 L '+paper_top.width+' 34 L '+paper_top.width+' 0 Z').attr('fill', '#ffffff').attr('stroke', 'none');

	function resizePaper(windowWidth){
		page_width = $(window).width();

		if ( page_width < '768')
		{
			$('#page-background-top').addClass('page-background-shrink');
		}
		else{
			$('#page-background-top').removeClass('page-background-shrink');
		}

// 		paper.setViewBox(0,0, page_width, 500, false);
		paper.setSize(page_width, 500);
// 		paper.canvas.setAttribute('preserveAspectRatio', 'none');
// 		paper_top.setViewBox(0,0, page_width, 150, false);
		paper_top.setSize(page_width, 150);
// 		paper_top.canvas.setAttribute('preserveAspectRatio', 'none');
		
		// Background
		var newPath = ["M", 0, 0, "L", 0, 450, "L", page_width, 334, "L", page_width, 0];
		background.attr({ path : newPath });

		// Background overlay
		var newOverlayPath = ["M", 0, 0, "L", 0, 150, "L", page_width, 34, "L", page_width, 0];
		background_overlay.attr({ path : newOverlayPath });
	}

	///////////////////////////////////
	// Window Resize, Orientation Change
	///////////////////////////////////

	$(window).resize(resizePaper);
	$(window).on('orientationchange', function() { 
		$('html').width(window.innerWidth);
	});

	function init(){
		var body_class = $('body').attr('class');
		if (typeof body_class != 'undefined'){
			body_class = body_class.match(/section-(\w+)/)[1];
		}

		var color = colors.grey
		if (body_class){
			color = colors[body_class];
		}
		background = paper.path('M 0 0 L 0 450 L '+paper.width+' 334 L '+paper.width+' 0 Z').attr('fill', color).attr('stroke', 'none');

		if ( page_width < '768')
		{
			$('#page-background-top').addClass('page-background-shrink');
		}
	}
	init();

	///////////////////////////////////
	// SVG Icons
	///////////////////////////////////
	$('.right-arrow').each(function(){
		var arrow = Raphael($(this)[0], 35, 35);

		var color = colors.black
		set_color = $(this).data('color');
		if (set_color){
			color = colors[set_color];
		}
		arrow.circle(15, 15, 15).attr({fill: color, stroke: 'none' });
		arrow.path('M9.6 13.4 h0.6 H14 c0.5 0 1-0.4 1-1 V9.7 c0-0.5 0.4-1 1-1 c0.2 0 0.4 0.1 0.6 0.2 l0.1 0.1 l4.1 4.1 l0.9 0.9 l0.1 0.1c0.2 0.3 0.4 0.6 0.4 1c0 0.4-0.1 0.7-0.4 1l-0.1 0.1l-0.9 0.9l-4.2 4.2 l0 0c-0.2 0.2-0.4 0.3-0.7 0.3 c-0.5 0-1-0.4-1-1 v-2.7 c0-0.5-0.4-1-1-1 h-3.9 H9.6 c-1.1 0-2-0.7-2-1.8 C7.6 14.1 8.5 13.4 9.6 13.4').attr({fill: '#FFFFFF', stroke: 'none'});
	});

	$('.left-arrow').each(function(){
		var arrow = Raphael($(this)[0], 35, 35);

		var color = colors.black
		set_color = $(this).data('color');
		if (set_color){
			color = colors[set_color];
		}
		arrow.circle(15, 15, 15).attr({fill: color, stroke: 'none' });
		arrow.path('M20.4,16.6h-0.6H16c-0.5,0-1,0.4-1,1v2.7c0,0.5-0.4,1-1,1c-0.2,0-0.4-0.1-0.6-0.2l-0.1-0.1l-4.1-4.1L8.3,16 l-0.1-0.1c-0.2-0.3-0.4-0.6-0.4-1c0-0.4,0.1-0.7,0.4-1l0.1-0.1l0.9-0.9l4.2-4.2l0,0c0.2-0.2,0.4-0.3,0.7-0.3c0.5,0,1,0.4,1,1v2.7 c0,0.5,0.4,1,1,1h3.9h0.6c1.1,0,2,0.7,2,1.8C22.4,15.9,21.5,16.6,20.4,16.6').attr({fill: '#FFFFFF', stroke: 'none'});
	});

	///////////////////////////////////
	// Homepage Element Animation
	///////////////////////////////////
	
	$('.one .svg-laptop').animate({left: "-500px"}, 2000, 'linear');


	///////////////////////////////////
	// Scroll Nav change

	var changeHeaderOn = 150;

	function expose_nav(){
		$('#nav').fadeIn('300');
		$('#nav-header').removeClass('nav-header-shrink');
		$('#page-background-top').removeClass('page-background-shrink');
	}

	function hide_nav(){
		$('#nav').fadeOut('300');
		$('#page-background-top').addClass('page-background-shrink');
		$('#nav-header').addClass('nav-header-shrink');
	}

	// Determine Scrolling Direction
	var lastScrollTop = 0;
	$(window).scroll(function(){
		var st = $(this).scrollTop();
		if (st > lastScrollTop && st >= changeHeaderOn){
			// downscroll code
			if (page_width > 481){
				hide_nav();
			}
		} else {
			if (page_width > 767){
				// upscroll code
				expose_nav();
			}
		}
		lastScrollTop = st;
	});

	$('.menu').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		$('body').toggleClass('mobile-nav');
		if ($('body').hasClass('mobile-nav')){
			$('#logo-wrapper, #page-background-top').slideDown('fast');
		}

		if ($('.nav-collapse').hasClass('collapse')){
			$('.nav-collapse').slideDown(90).addClass('in').removeClass('collapse');
		}else{
			$('.nav-collapse').slideUp(90).addClass('collapse').removeClass('in');
		}
	});

	$('.comment-butn a').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		// $('.comment-form').slideToggle();
	});

	$('#process article aside h3').each(function(){
		heading = $(this).text().split('.');
		if (page_width < '420' && heading[0].length > '15'){
			new_heading = heading[0].replace(' ', '<br/>');
			html_heading = $(this).html().replace(heading[0], new_heading);
			$(this).html(html_heading);
		}
	});

	$('img').svgmagic();
	$('.icon, .logo, li.mail a, .twitter, .rss').svgmagic({
		backgroundimage: true
	});

	$('input, textarea').placeholder();

	function field_error(field, status, message)
	{
		if (status == false)
		{
			field.parent().find('label').addClass('error'); // Field label
			field.addClass('error'); // Field
			field.parent().find('.error.block').remove(); // Remove any existing error messages
			$(field).after('<label class="error block">'+message+'</label>'); // Error message
		} 
		else {
			$(field).parent().find('.error.block').remove(); // Error message
			field.parent().find('label').removeClass('error'); // Field label
			field.removeClass('error'); // Field
		}
	}

	function validate_comment()
	{
		valid = true;

		$form = $('form.comment-form');

		// Name
		$field = $form.find('input[name="name"]');
		if ($field.val() == 'undefined' || $field.val() == '')
		{
			field_error($field, false, "This field is required");
			valid = false;
		} else {
			field_error($field, true);
		}

		// Email
		$field = $form.find('input[name="email"]');
		if ($field.val() == 'undefined' || $field.val() == '')
		{
			field_error($field, false, "Please enter a valid email");
			valid = false;			
		} else {
			field_error($field, true);
		}

		// Comment
		$field = $form.find('textarea[name="comment"]');
		if ($field.val() == 'undefined' || $field.val() == '')
		{
			field_error($field, false, "This field is required");
			valid = false;
		} else {
			field_error($field, true);
		}

		// Return valid var
		return valid;
	}

	// Comment form submission
	$('.comment-form').submit(function(){
		valid = validate_comment();

		if (valid == false)
		{
			return false;			
		}
	});

	// Blog Search
	$('#blog-search').submit(function(){
		keywords = $(this).find('input[name="keywords"]').val();

		$(this).find('.error.block').remove();
		if (keywords == "undefined" || keywords == "")
		{
			$(this).find('.error.block').remove();
			$(this).find('input[name="keywords"]').after('<label class="error block">Please enter a search term</label>');
			return false;
		}
	});

	$(".expandable .content").fitVids();

	/* Tabbing through forms */
	$('form input, form textarea').on({
		focus: function(e){
			if ($('body').hasClass('mobile-nav')){
				$('.menu').click();
			}
		},
	});

	//var eggs = new Konami(function() { alert('Konami code!')});
});

Modernizr.addTest('ios-ipad', function () {
  return !!navigator.userAgent.match(/iPad/i);
});
 
Modernizr.addTest('ios-iphone', function () {
  return !!navigator.userAgent.match(/iPhone/i);
});

/* MailChimp */

var fnames = new Array();var ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';
try {
    var jqueryLoaded=jQuery;
    jqueryLoaded=true;
} catch(err) {
    var jqueryLoaded=false;
}
var head= document.getElementsByTagName('head')[0];
if (!jqueryLoaded) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
    head.appendChild(script);
    if (script.readyState && script.onload!==null){
        script.onreadystatechange= function () {
              if (this.readyState == 'complete') mce_preload_check();
        }    
    }
}

var err_style = '';
try{
    err_style = mc_custom_error_style;
} catch(e){
    err_style = '#mc_embed_signup input.mce_inline_error{border-color:#6B0505;} #mc_embed_signup div.mce_inline_error{margin: 0 0 1em 0; padding: 5px 10px; background-color:#6B0505; font-weight: bold; z-index: 1; color:#fff;}';
}
var head= document.getElementsByTagName('head')[0];
var style= document.createElement('style');
style.type= 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = err_style;
} else {
  style.appendChild(document.createTextNode(err_style));
}
head.appendChild(style);
setTimeout('mce_preload_check();', 250);

var mce_preload_checks = 0;
function mce_preload_check(){
    if (mce_preload_checks>40) return;
    mce_preload_checks++;
    try {
        var jqueryLoaded=jQuery;
    } catch(err) {
        setTimeout('mce_preload_check();', 250);
        return;
    }
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://downloads.mailchimp.com/js/jquery.form-n-validate.js';
    head.appendChild(script);
    try {
        var validatorLoaded=jQuery("#fake-form").validate({});
    } catch(err) {
        setTimeout('mce_preload_check();', 250);
        return;
    }
    mce_init_form();
}
function mce_init_form(){
    jQuery(document).ready( function($) {
      var options = { errorClass: 'mce_inline_error', errorElement: 'div', onkeyup: function(){}, onfocusout:function(){}, onblur:function(){}  };
      var mce_validator = $("#mc-embedded-subscribe-form").validate(options);
      $("#mc-embedded-subscribe-form").unbind('submit');//remove the validator so we can get into beforeSubmit on the ajaxform, which then calls the validator
      options = { url: 'http://soxstudio.us1.list-manage.com/subscribe/post-json?u=db108a550c57ce7fe4bf67d8a&id=d636fe424a&c=?', type: 'GET', dataType: 'json', contentType: "application/json; charset=utf-8",
                    beforeSubmit: function(){
                        $('#mce_tmp_error_msg').remove();
                        $('.datefield','#mc_embed_signup').each(
                            function(){
                                var txt = 'filled';
                                var fields = new Array();
                                var i = 0;
                                $(':text', this).each(
                                    function(){
                                        fields[i] = this;
                                        i++;
                                    });
                                $(':hidden', this).each(
                                    function(){
                                        var bday = false;
                                        if (fields.length == 2){
                                            bday = true;
                                            fields[2] = {'value':1970};//trick birthdays into having years
                                        }
                                      if ( fields[0].value=='MM' && fields[1].value=='DD' && (fields[2].value=='YYYY' || (bday && fields[2].value==1970) ) ){
                                        this.value = '';
                      } else if ( fields[0].value=='' && fields[1].value=='' && (fields[2].value=='' || (bday && fields[2].value==1970) ) ){
                                        this.value = '';
                      } else {
                          if (/\[day\]/.test(fields[0].name)){
                                              this.value = fields[1].value+'/'+fields[0].value+'/'+fields[2].value;                         
                          } else {
                                              this.value = fields[0].value+'/'+fields[1].value+'/'+fields[2].value;
                                          }
                                      }
                                    });
                            });
                        $('.phonefield-us','#mc_embed_signup').each(
                            function(){
                                var fields = new Array();
                                var i = 0;
                                $(':text', this).each(
                                    function(){
                                        fields[i] = this;
                                        i++;
                                    });
                                $(':hidden', this).each(
                                    function(){
                                        if ( fields[0].value.length != 3 || fields[1].value.length!=3 || fields[2].value.length!=4 ){
                                        this.value = '';
                      } else {
                          this.value = 'filled';
                                      }
                                    });
                            });
                        return mce_validator.form();
                    }, 
                    success: mce_success_cb
                };
      $('#mc-embedded-subscribe-form').ajaxForm(options);
      
      
    });
}
function mce_success_cb(resp){
//  console.log(resp);
    $('.mc-field-group, #mc-embedded-subscribe-form .col-md-4').hide(); // Hide field and button upon success
    $('#mce-success-response').hide();
    $('#mce-error-response').hide();
    if (resp.result=="success"){
        $('#mce-'+resp.result+'-response').show();
        $('#mce-'+resp.result+'-response').html("Almost finished...we need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you.");
        $('#mc-embedded-subscribe-form').each(function(){
            this.reset();
      });
    } else {
        var index = -1;
        var msg;
        try {
            var parts = resp.msg.split(' - ',2);
            if (parts[1]==undefined){
                msg = resp.msg;
            } else {
                i = parseInt(parts[0]);
                if (i.toString() == parts[0]){
                    index = parts[0];
                    msg = parts[1];
                } else {
                    index = -1;
                    msg = resp.msg;
                }
            }
        } catch(e){
            index = -1;
            msg = resp.msg;
        }
        try{
            if (index== -1){
                $('#mce-'+resp.result+'-response').show();
                $('#mce-'+resp.result+'-response').html(msg);            
            } else {
                err_id = 'mce_tmp_error_msg';
                html = '<div id="'+err_id+'" style="'+err_style+'"> '+msg+'</div>';
                
                var input_id = '#mc_embed_signup';
                var f = $(input_id);
                if (ftypes[index]=='address'){
                    input_id = '#mce-'+fnames[index]+'-addr1';
                    f = $(input_id).parent().parent().get(0);
                } else if (ftypes[index]=='date'){
                    input_id = '#mce-'+fnames[index]+'-month';
                    f = $(input_id).parent().parent().get(0);
                } else {
                    input_id = '#mce-'+fnames[index];
                    f = $().parent(input_id).get(0);
                }
                if (f){
                    $(f).append(html);
                    $(input_id).focus();
                } else {
                    $('#mce-'+resp.result+'-response').show();
                    $('#mce-'+resp.result+'-response').html(msg);
                }
            }
        } catch(e){
            $('#mce-'+resp.result+'-response').show();
            $('#mce-'+resp.result+'-response').html(msg);
        }
    }
}