var request = require('request'),
	fs 		= require('fs'),
	url		= require('url'),
	href 	 = "https://www.tokopedia.com/jakartaindoeshop/plastik-bubble-wrap-atau-bubble-pack-paket-5-meter-125cm-x-500cm",
	saveFile = url.parse(href).pathname;
	saveFile = saveFile.substr(1,saveFile.length).replace("/","~");
	saveFile+= ".txt";

	request(href,function(err,resp,body){
		if(err) return console.log(err+" "+href);
		fs.writeFile("./product/"+saveFile, body, function(err) {
	    	if(err) return console.log(err+" "+href);
	   		console.log(saveFile+" was saved!");
		}); 
	});	