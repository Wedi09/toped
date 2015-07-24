var fs 		= require('fs'),
	url		= require('url'),
	$ 		= require('cheerio'),	
	i  		= 0,
	aLnk	= null,
	href	= '',
	result	= [],
	saveFile= '',
	cat		= ['fashion-aksesoris','pakaian','kecantikan','kesehatan','rumah-tangga',
			   'dapur','perawatan-bayi',/*'handphone-tablet',*/'laptop-aksesoris',
			   'komputer-aksesoris','elektronik','kamera-foto-video','otomotif','olahraga',
			   'office-stationery','souvenir-kado-hadiah','mainan-hobi','makanan-minuman',
			   'buku','software','film-musik-game'];

readRawCategory(i,cat,result);

function readRawCategory(i,cat,result){
	console.dir(cat);
	console.log(i);
	var ii = 0,
		raw=fs.readFileSync('./category/'+cat[i]+'.txt','utf8');
	console.log(cat[i]);
	aLnk = $('.product > a',raw);
	readRawProduct(aLnk,ii,i,cat,result);
}

function readRawProduct(aLnk,ii,i,cat,result){
		var href 	 = $(aLnk[ii]).attr("href"),
			price 	 = $(aLnk[ii]).find('span.price').text().replace(/Rp /g,'').replace(".","");
			saveFile = url.parse(href).pathname;
			saveFile = saveFile.substr(1,saveFile.length).replace("/","~");

		var raw 	 = fs.readFileSync('./product/'+saveFile+".txt",'utf8'),
			aSale	 = $('.product-content-container dd',raw);
			sale 	 = eval($(aSale[2]).text().replace(",",".").replace('rb','*1000'));

		var write 	 = '"'+(ii+1)+'","'+cat[i]+'","'+saveFile+'","'+sale+'","'+price+'","'+price*sale+'"';
		console.log(write);
		result.push(write);
		ii++
		if(ii<aLnk.length){
			readRawProduct(aLnk,ii,i,cat,result);
		} else {
			console.log("\n\n\n\n");
			i++;
			if(i<cat.length){
				readRawCategory(i,cat,result);
			} else {
				fs.writeFile("./result.txt", result.join("\n"), function(err) {
	    			if(err) return console.log(err+" "+href);
	    			console.log("result.txt was saved");
				}); 
			}
		}		
}