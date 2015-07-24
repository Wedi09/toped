var request = require('request'),
	fs		= require('fs'),
	cat		= ['fashion-aksesoris','pakaian','kecantikan','kesehatan','rumah-tangga',
			   'dapur','perawatan-bayi','handphone-tablet','laptop-aksesoris',
			   'komputer-aksesoris','elektronik','kamera-foto-video','otomotif','olahraga',
			   'office-stationery','souvenir-kado-hadiah','mainan-hobi','makanan-minuman',
			   'buku','software','film-musik-game'],
	baseUrl = 'https://www.tokopedia.com/p/',
	saveFile= '',
	url		= '',
	i 		= 0;

getRawData(i,cat);

function getRawData(i,cat){
	setTimeout(function(){
		url = baseUrl+cat[i]+"?ob=9";
		saveFile = cat[i]+".txt";
		request(url,function(err,resp,body){
			if(err) return console.log(err);
			fs.writeFile("./category/"+saveFile, body, function(err) {
	    		if(err) return console.log(err);
	    		console.log(saveFile+" was saved!");
			}); 
		});
		console.log(saveFile);
		i++;
		if(i<cat.length){
			getRawData(i,cat);
		}
	},80000);
}
