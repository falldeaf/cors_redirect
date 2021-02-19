require('dotenv').config()
const fetch = require('node-fetch');
const csvtojson=require('csvtojson');

exports.corsRedirect = async (req, res) => {
	var url = req.query.url; //URL to pull
	var key = req.query.key; //Secret Key
	var csv = req.query.csv2json; //Convert CSV to JSON?
	var jsn = req.query.json; //Send JSON headers

	if(key === process.env.KEY) {
		var content = await fetch(decodeURI(url), {redirect: 'follow'});
		var output = await content.text();
	
		if(csv) {
			jsn = true;
			output = await csvtojson({noheader:true}).fromString(output);
		}
	
		res.set('Access-Control-Allow-Origin', "*")
		res.set('Access-Control-Allow-Methods', 'GET, POST')
		if(jsn) {
			res.json(output);
		} else {
			res.send(output);
		}
	} else {
		res.send("💀");
	}

};