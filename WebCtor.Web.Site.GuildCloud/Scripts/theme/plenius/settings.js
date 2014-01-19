(function(){
	function change_img(color_theme){
		$('.color_img').each(function(){
			url = $(this).attr('src').split('/');
			url.splice(4,1,color_theme);
			new_url = url.join('/');
			$(this).attr('src', new_url);				
		})
	}
	// Cookies
	var layout_style = $('.layout_style'),
			colors_style = $('.colors_style'),
			bg_style = $('.bg_style'),
			settings_box =$('.settings_box'),
			cookie_colors_style;
	if($.cookie('panel_status')=='off'){ // panel status
		settings_box.css('left','-210px');
		$.cookie('panel_status','off');
	}else{
		settings_box.css('left','0px');
		$.cookie('panel_status','on');
	}
	if($.cookie('layout_theme')){ // Layout 
		layout_style.attr('href','css/'+$.cookie('layout_theme')+'.css');
		if($.cookie('layout_theme')=='style'){
			$('.settings_box .dark_layout').addClass('current');
		}else{
			$('.settings_box .light_layout').addClass('current');
			$('.clients').css('opacity','0.5')
		}

	}else{
		layout_style.attr('href','css/style.css');
		$.cookie('layout_theme', 'style');
		$('.settings_box .dark_layout').addClass('current');
	}
	if($.cookie('color_theme')){ // Colors
		switch($.cookie('color_theme')){	
			case 'blue_items': 				cookie_colors_style='blue' 
			break
			case 'red_items': 				cookie_colors_style='red' 
			break
			case 'yellow_items': 			cookie_colors_style='yellow' 
			break
			case 'green_items': 			cookie_colors_style='green' 
			break
			case 'turquoise_items': 	cookie_colors_style='turquoise' 
			break
		}
		cookie_colors_style = 'yellow';
		colors_style.attr('href','css/color_style/'+$.cookie('color_theme')+'.css');
		change_img(cookie_colors_style);
		$('.description-404 .btn').removeClass().addClass('btn long '+cookie_colors_style)
		$('.settings_box').find('.'+$.cookie('color_theme')).addClass('current');
	}else{
		colors_style.attr('href','css/color_style/blue_items.css');
		$.cookie('color_theme','blue_items');
		change_img('blue');
		$('.settings_box').find('.blue_items').addClass('current');
	}
	if($.cookie('bg_theme')){ // Background
		bg_style.attr('href','css/bg_style/'+$.cookie('bg_theme')+'.css');
		$('.settings_box').find('.'+$.cookie('bg_theme')).addClass('current');
		if($.cookie('layout_theme')=='style'){
			$('.comment .sidebar').css('background','url(img/default-image-black.jpg) no-repeat');	
		}
	}else{
		bg_style.attr('href','css/bg_style/blue_bg.css');
		$.cookie('bg_theme','blue_bg');
		$('.settings_box').find('.blue_bg').addClass('current');
		if($.cookie('layout_theme')=='style'){
			$('.comment .sidebar').css('background','url(img/default-image.jpg) no-repeat');	
		}
	}	
	//END

	// settings
	$('body').on('click','.settings', function(){
		$this = $(this);

		if($this.hasClass('light_layout')){
			layout_style.attr('href','css/style_light.css');
			$('.clients').css('opacity','0.5')
			$.cookie('layout_theme', 'style_light');
			$('.comment .sidebar').css('background','url(img/default-image-light.jpg) no-repeat');	
		}
		if($this.hasClass('dark_layout')){
			layout_style.attr('href','css/style.css');
			$('.clients').css('opacity','1')
			$.cookie('layout_theme', 'style')
		}
		
		if($this.hasClass('turquoise_items')){
			$.cookie('color_theme', 'turquoise_items')
			colors_style.attr('href','css/color_style/turquoise_items.css')
			change_img('turquoise');			
			$('.description-404 .btn').removeClass().addClass('btn long turquoise')
		}
		if($this.hasClass('yellow_items')){
			$.cookie('color_theme', 'yellow_items')			
			colors_style.attr('href','css/color_style/yellow_items.css')
			change_img('yellow');
			$('.description-404 .btn').removeClass().addClass('btn long yellow')
		}
		if($this.hasClass('red_items')){
			$.cookie('color_theme', 'red_items')		
			colors_style.attr('href','css/color_style/red_items.css')
			change_img('red');
			$('.description-404 .btn').removeClass().addClass('btn long red')
		}
		if($this.hasClass('green_items')){
			$.cookie('color_theme', 'green_items');
			colors_style.attr('href','css/color_style/green_items.css');
			change_img('green');
			$('.description-404 .btn').removeClass().addClass('btn long green')
		}
		if($this.hasClass('blue_items')){
			$.cookie('color_theme', 'blue_items');
			colors_style.attr('href','css/color_style/blue_items.css');
			change_img('blue');
			$('.description-404 .btn').removeClass().addClass('btn long blue')
		}

		if($this.hasClass('black_bg')){
			bg_style.attr('href','css/bg_style/black_bg.css')
			$.cookie('bg_theme', 'black_bg')			
			if($.cookie('layout_theme')=='style'){
				$('.comment .sidebar').css('background','url(img/default-image-black.jpg) no-repeat');	
			}
		}
		if($this.hasClass('blue_bg')){
			bg_style.attr('href','css/bg_style/blue_bg.css')
			$.cookie('bg_theme', 'blue_bg')			
			if($.cookie('layout_theme')=='style'){
				$('.comment .sidebar').css('background','url(img/default-image.jpg) no-repeat');	
			}
			
		}
		$this.siblings().removeClass('current')
		$this.addClass('current')
	})
	//END
	//panele opne/close
	$('body').on('click','.settings_icon', function(){
		if($.cookie('panel_status')=='off'){
			settings_box.animate({'left':'0px'},300);
			$.cookie('panel_status','on');
		}else{
			settings_box.animate({'left':'-210px'},300);
			$.cookie('panel_status','off');
		}
	});
})()
;
