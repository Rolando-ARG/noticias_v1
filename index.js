$(document).ready(function(){
		// $(".cssload-fond").hide();

		// d89cfca75466bd7241449b856f85303c0383cd590fc51e144ecd225d

	function getCountry(){
			let result = $.ajax({
				url:'https://api.ipdata.co/?api-key=d89cfca75466bd7241449b856f85303c0383cd590fc51e144ecd225d',
				dataType: 'json',
				async:false
			}).responseJSON;
			return result;
		}
	 const country = getCountry();
	 let country_code = 'ar'

	// console.log(result);
	 console.log(country_code);
	 console.log(country);

	 country_code= country.country_code;
	 const newsarea = $('#newsarea');
	 const newsrow = $('#newsrow');

	const alert = $("#err_alert");

	//let url = `https://newsapi.org/v2/top-headlines?country=ar&apiKey=1439caad7bd1484a91a32684ba7a0546`;

      let url = `https://newsapi.org/v2/top-headlines?country=${country_code}&apiKey=1439caad7bd1484a91a32684ba7a0546`;
	

	$("#cflag").attr("src",country.flag);
	$("#cflag").css("display","block");

	

	$("#lists a").click(function(){
		$('#search').val("");
		const listdata = $(this).data('cat');
		let catquery = "&"
		if(listdata!="topnews"){
			catquery = `&category=${listdata}&`;
		}
		url= `https://newsapi.org/v2/top-headlines?country=ar${catquery}apiKey=1439caad7bd1484a91a32684ba7a0546`;

		rendernews();

		$.each($('#lists a'),function(i,link){
			$(link).removeClass('active');
		})
		$(this).addClass('active');
		
	});


	rendernews();

	function rendernews(){
		$(".cssload-fond").show();

		alert.css("display","none");
		newsrow.empty();//Clear contents of newsrow

		$.getJSON(url,function (result) {
		if(result.status=="ok"&&result.totalResults>0){
			$.each(result.articles,function(i,articles){

// <img src="https://www....... class="img-fluid newsimg">

			let newsimg = $("<img>")
				.attr("src",articles.urlToImage)
				.addClass('img-fluid newsimg');

// <h6  //class="newstitle text-center">Max Verstappen aprovechó el............ - infobae</h6>

			let newstitle = $("<p>")
				.addClass("newstitle text-center")
	//			.html(articles.publishedAt) 
				.html(articles.title
					+ "<br>" 
					+ "<strong> Leer Más &gt;&gt;&gt; </strong>") ;
				
//  <strong>LeerMass</strong>Leer Mas &gt;&gt;&gt;
// <a href="#">Learn More <i class="fas fa-angle-double-right"></i></a>

			let newsmore= $("<href>")
				.attr("Leer Mas");

// <a class="newsblock col-lg-3 col-md-3 col-sm-5 col-12 my-2 offset-md-1 px-0" 
// href="https://www.infobae.com/america/.../" target="_blank">				

			let newslinkdiv = $("<a>")
				.addClass('newsblock col-lg-3 col-md-3 col-sm-5 col-12 my-2 offset-md-1 px-0')
				.attr("href",articles.url)
				.attr("target","_blank")
				.appendTo(newsrow);
				
// <div>
			let newsdiv = $("<div>")
				// .addClass('')
				.append(newstitle)
				// .append(newssrc)
				.prepend(newsimg)
				.appendTo(newslinkdiv);
				
				$(".cssload-fond").hide();

				//console.log(result);

			});	

		}

		else{
			alert.css("display","block");
			alert.css("visibility","visible");
		}

		


		
	});
	}



	const search = $('#search');
	let val=''
	search.on('keyup',function(e){
		val = search.val();
		if(e.keyCode==13&&val!=''){
			url = `https://newsapi.org/v2/everything?q=${encodeURI(val)}&sortBy=popularity&pageSize=50&apiKey=1439caad7bd1484a91a32684ba7a0546`;
			rendernews();
			alert.log("MMMMMMMM");
			$.each($('#lists a'),function(i,link){
			$(link).removeClass('active');
		})
		}
	})

});


