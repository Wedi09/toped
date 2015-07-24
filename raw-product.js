var request = require('request'),
	fs 		= require('fs'),
	url		= require('url'),
	$ 		= require('cheerio'),	
	i  		= 0,
	aLnk	= null,
	href	= '',
	saveFile= '',
	cat		= ['souvenir-kado-hadiah','mainan-hobi','makanan-minuman',
			   'buku','software','film-musik-game'],	
	/*	
	cat		= ['fashion-aksesoris','pakaian','kecantikan','kesehatan','rumah-tangga',
			   'dapur','perawatan-bayi','handphone-tablet','laptop-aksesoris',
			   'komputer-aksesoris','elektronik','kamera-foto-video','otomotif','olahraga',
			   'office-stationery','souvenir-kado-hadiah','mainan-hobi','makanan-minuman',
			   'buku','software','film-musik-game'],
	*/		   
   	raw		= {};

for(var j=0;j<cat.length;j++){
	raw[cat[j]]=fs.readFileSync('./category/'+cat[j]+'.txt','utf8');
}

readRawData(raw,i,cat);

function readRawData(raw,i,cat){
	var ii = 0;
	console.log(cat[i]);
	aLnk = $('.product > a',raw[cat[i]]);
	getProduct(aLnk,ii,raw,i,cat);
}

function getProduct(aLnk,ii,raw,i,cat){
	setTimeout(function(){
		var href 	 = $(aLnk[ii]).attr("href"),
			saveFile = url.parse(href).pathname;
			saveFile = saveFile.substr(1,saveFile.length).replace("/","~");
			saveFile+= ".txt";

		request(href,function(err,resp,body){
			if(err) return console.log(err+" "+href);
			fs.writeFile("./product/"+saveFile, body, function(err) {
	    		if(err) return console.log(err+" "+href);
	    		console.log(ii+". "+saveFile+" was saved!");
			}); 
		});	

		ii++
		if(ii<aLnk.length){
			getProduct(aLnk,ii,raw,i,cat);
		} else {
			console.log("\n\n\n\n");
			i++;
			if(i<cat.length)readRawData(raw,i,cat);
		}		
	},10000);	
}