// Application based on Web Application Development module (NCI), classes and tutorials delivered and written by lecturer Liam McCabe
var express = require("express");  // require the express module
var app = express();  // create the express application
var bodyParser = require("body-parser"); // require the body-parser module
var fs = require("fs"); // require the file system module

app.use(express.static("views"));  // access to the view folder
app.use(express.static("scripts"));  // access to the scripts folder
app.use(express.static("images")); // access to the images folder
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "jade");  // view engine setup

var apartments = require("./models/apartments.json");  // access to the apartments.json file


// HTTP GET request for root page
app.get('/', function(req, res) {
  res.render("index",
            {apartments:apartments}
            );
});

// HTTP GET request for individual apartments
app.get('/show/:name', function(req, res){ 
  function findApart(apart) {
  return apart.name === req.params.name;
  }
  
  individual = apartments.filter(findApart);
  res.render("show", 
         {individual:individual}
        );
});



// HTTP GET request for addapartment page

app.get('/addapartment', function(req, res){
  res.render("addapartment");  
});


// HTTP POST request for addapartment page

app.post('/addapartment', function(req, res){

    // unique id
  
	function maxId(apartment, id) {
		var max
		for (var i=0; i<apartments.length; i++) {
			if(!max || parseInt(apartments[i][id]) > parseInt(max[id]))
				max = apartments[i];		
		}
		return max;
	}
	
	var largestId = maxId(apartments, "id");
	newId = parseInt(largestId.id) + 1;
	console.log(newId);
	
      
      // a new apartment, input field values
      var apartment = {
            name : req.body.name,
            city : req.body.city,
            address : req.body.address,
            price : req.body.price,
            description : req.body.description,
            image : req.body.image,
            id : newId
          };
      
      var json = JSON.stringify(apartments);
      fs.readFile('./models/apartments.json', 'utf8', function readFileCallback(err, data){
            if(err){
              console.log("Error");
            }
            else {
              apartments.push(apartment);  // push new info
              json = JSON.stringify(apartments, null, 4);
              fs.writeFile('./models/apartments.json', json, 'utf8');  // write new apartment into the file
            }
      });
	
   	res.redirect('/');
});



// HTTP GET request for editapartment page


app.get('/editapartment/:name', function(req, res){
	
	function oneApartment(indivAp){
			return indivAp.name === req.params.name;
	}
			var indivAp = apartments.filter(oneApartment);
			res.render("editapartment", {
				indivAp:indivAp		
			});
});


// HTTP POST request for editapartment page

app.post('/editapartment/:name', function(req, res){
		var json = JSON.stringify(apartments);
		fs.readFile('./models/apartments.json', 'utf8', function readFileCallback(err, data){
				if(err){
					console.log("Error");
				}
			else {
				
				var findName = req.params.name;
				var data = apartments;
				var index = data.map(function(apartment) {return apartment.name;}).indexOf(findName);
				
        // values from the edit form
				apartments.splice(index, 1, {
						name: req.body.newname,
						city: req.body.newcity,
						address: req.body.newaddress,
						price: req.body.newprice,
						description: req.body.newdescription,
						image: req.body.newimage,
						id: req.body.newid
				});
				
				json = JSON.stringify(apartments, null, 4);
				fs.writeFile('./models/apartments.json', json, 'utf8');  // writes new values into the file
				
			}
			res.redirect('/');
		});			
});


// HTTP GET request for delete

app.get('/deleteapartment/:name', function(req, res){
  
  // access to apartments.json
  fs.readFile('./models/apartments.json', 'utf8', function readFileCallback(err, data){
      if (err) {
          console.log("Error");
      }
      else {
          var findName = req.params.name;
          var data = apartments;
          var index = data.map(function(apartment) {return apartment.name;}).indexOf(findName);  // var index holds position returned by indexOf
         
          apartments.splice(index, 1);  // deletes one apartment at index position
          json = JSON.stringify(apartments, null, 4);
          fs.writeFile('./models/apartments.json', json, 'utf8'); // writes new data into the file
          
      }}); 
      
      res.redirect('/');
                 
});


// search by city

app.get('/category/:city', function(req, res){ 
    function categ(oneCat){
    return oneCat.city === req.params.city;  // find city
    }
    
    var cat = apartments.filter(categ);  // filter city
    res.render("category",
                {cat:cat}
              );  
});



// HTTP GET request for contact page
app.get('/contact', function(req, res) {
  res.render("contact");    
});



// HTTP POST request for contact page
app.post('/contact', function(req, res){
    if((req.body.contname === "") || ((/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/).test(req.body.contemail) === false) || (req.body.contmessage === "") || (req.body.contcaptcha != 17)){
        res.render("error");
    }
    else {
        res.render("thankyou");
    }
});


// server set up
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  console.log("Server started");
});