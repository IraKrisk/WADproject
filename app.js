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
var partners = require("./models/partners.json"); // enable access the partners.json file
var team_members = require("./models/team_members.json"); // enable access the team_members.json file

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
  
  
      if((req.body.name === "") || (req.body.city === "") || (req.body.address === "") || ((/^[0-9.]+$/).test(req.body.price) === false)){
        res.render("addapartmenterror");
     } 
  
     else {
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
     }
  
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










// ** START PARTNERS CODE ** //


// HTTP GET request for partners page
app.get('/partners', function(req, res){
  res.render("partners", 
             {partners:partners} // call the partners variable
            ); 
  console.log("Partners page is loaded");
})

// HTTP GET request for individual partner info
app.get('/showpartner/:name', function(req, res){
	  console.log("Show partner details");
  //  function to filter individual partner for display
	function onePar(indPar){ 
	    return indPar.name === req.params.name;
	}    // set variable for the filtered data
	    var indPar = partners.filter(onePar);
	    res.render("showpartner", // pass the data to the view
                 {indPar:indPar}
	    );
  	console.log(indPar); // log into the console
});

// search by category

app.get('/partnercat/:category', function(req, res){ 
    function parcat(oneCatpar){
    return oneCatpar.category === req.params.category;  // find a partner category
    }
    var partcat = partners.filter(parcat);  // filter partner category
    res.render("partnercat",
                {partcat:partcat}
              );  
});

//START of code for adding a partner //
// HTTP GET request for add a new partner page
app.get('/addpartner', function(req, res){
  res.render("addpartner"); 
  console.log("Add partner page is loaded"); 
})

// HTTP POST request for addpartner page
app.post('/addpartner', function(req, res){

  // function to get maxID, this is needed as length itself would not be suitable as instances of partners could be deleted 
	function maxId(partner, id) {
    var max  
      for (var i=0; i<partner.length; i++) {
      if(!max || parseInt(partner[i][id]) > parseInt(max[id]))
      max = partners[i];		
    }
	  return max;
	}
	
	var largestId = maxId(partners, "id"); //pass the parameters 
	newId = parseInt(largestId.id) + 1; //add 1 to the existing largest id
	console.log(newId);

      // add a new partner, input field values
      var partner = {
            name : req.body.name,
            category : req.body.category,
            website : req.body.website,
            discount_rate : req.body.discount_rate,
            logo : req.body.logo,
            description : req.body.description,
            id : newId
          };
      
      var json = JSON.stringify(partners); // convert from object to string
      fs.readFile('./models/partners.json', 'utf8', function readFileCallback(err, data){
            if(err){
              console.log("Error");
            }
            else {
              partners.push(partner);  // push new info
              json = JSON.stringify(partners, null, 4); //convert back to json
              fs.writeFile('./models/partners.json', json, 'utf8');  // write new partner into the json file
            }
      });
   	res.redirect('/partners'); // redirect users back to the partners page after adding a partner
});

//END of code for adding a partner //

//START of code for editing a partner //
// HTTP GET request for editpartner page
app.get('/editpartner/:name', function(req, res){
	  console.log("Edit partner page loaded");
  //  function to filter individual partner for editing
	function onePar(indPar){ 
	    return indPar.name === req.params.name;
	}    // set variable for the filtered data
	    var indPar = partners.filter(onePar);
	    res.render("editpartner", // pass the data to the view
                 {indPar:indPar}
	    );
  	console.log(indPar); // log into the console
});

// HTTP POST request for editpartner page
app.post('/editpartner/:name', function(req, res){
	  var json = JSON.stringify(partners); // convert from object to string
	  fs.readFile('./models/partners.json', 'utf8', function readFileCallback(err, data){
	      if(err){
	        console.log("Error");
	      }
	    else {
	
	      var findName = req.params.name;
	      var data = partners;
	      var index = data.map(function(partner) {return partner.name;}).indexOf(findName); // function to find the data by name for editing
	      
        // values from the editpartner form
	      partners.splice(index, 1, {
            name: req.body.newname,
            category: req.body.newcategory,
            website: req.body.newwebsite,
            discount_rate: req.body.newdiscount_rate,
            logo: req.body.newlogo,
            description : req.body.newdescription,
            id: req.body.newid
	      });
	      json = JSON.stringify(partners, null, 4);  // convert from object to string
	      fs.writeFile('./models/partners.json', json, 'utf8');  // write new values into the json file
	    }
	    res.redirect('/partners');
	  });	
});
//END of code for editing a partner //

//START of code for deleting a partner //
// HTTP GET request for deleting a partner
app.get('/deletepartner/:name', function(req, res){
  
  // access to partners.json
  fs.readFile('./models/partners.json', 'utf8', function readFileCallback(err, data){
      if (err) {
          console.log("Error");
      }
      else {
          var findName = req.params.name;
          var data = partners;
          var index = data.map(function(partner) {return partner.name;}).indexOf(findName);  // function to find the data by name for editing
         
          partners.splice(index, 1);  // delete one partner 
          json = JSON.stringify(partners, null, 4);
          fs.writeFile('./models/partners.json', json, 'utf8'); // write new data into the file
      }}); 
      res.redirect('/partners');              
});
//END of code for deleting a partner //
//END PARTNER CODE//

// ** START TEAM_MEMBERS CODE ** //

// HTTP GET request for team_members page
app.get('/team_members', function(req, res){
  res.render("team_members", 
             {team_members:team_members} // call the team_members variable
            ); 
  console.log("team_members page is loaded");
})
// HTTP GET request for individual team_member info
app.get('/showteam_member/:fname', function(req, res){
	  console.log("Show team_member details loaded");
  //  function to filter individual team_member for display
	function oneMem(indMem){ 
	    return indMem.fname === req.params.fname;
	}    // set variable for the filtered data
	    var indMem = team_members.filter(oneMem);
	    res.render("showteam_member", // pass the data to the view
                 {indMem:indMem}
	    );
  	console.log(indMem); // log into the console
});

//START of code for adding a team_member //
// HTTP GET request for add a new team_member page
app.get('/addteam_member', function(req, res){
  res.render("addteam_member"); 
  console.log("Add team_member page is loaded"); 
})

// HTTP POST request for addteam_member page
app.post('/addteam_member', function(req, res){

  // function to get maxID, this is needed as length itself would not be suitable as instances of team_members could be deleted 
	function maxId(team_member, id) {
    var max  
      for (var i=0; i<team_member.length; i++) {
      if(!max || parseInt(team_member[i][id]) > parseInt(max[id]))
      max = team_members[i];		
    }
	  return max;
	}
	
	var largestId = maxId(team_members, "id"); //pass the parameters 
	newId = parseInt(largestId.id) + 1; //add 1 to the existing largest id
	console.log(newId);

      // add a new team_member, input field values
      var team_member = {
            fname: req.body.fname,
            lname: req.body.lname,
            city: req.body.city,
            email: req.body.email,
            bio: req.body.bio,
            photo: req.body.photo,
            id: newId
          };

      var json = JSON.stringify(team_members); // convert from object to string
      fs.readFile('./models/team_members.json', 'utf8', function readFileCallback(err, data){
            if(err){
              console.log("Error");
            }
            else {
              team_members.push(team_member);  // push new info
              json = JSON.stringify(team_members, null, 4); //convert back to json
              fs.writeFile('./models/team_members.json', json, 'utf8');  // write new team_member into the json file
            }
      });
   	res.redirect('/team_members'); // redirect users back to the team_members page after adding a team_member
});

//END of code for adding a team_member //

//START of code for editing a team_member //
// HTTP GET request for editteam_member page
app.get('/editteam_member/:fname', function(req, res){
	  console.log("Edit team_member page loaded");
  //  function to filter individual team_member for editing
	function oneMem(indMem){ 
	    return indMem.fname === req.params.fname;
	}    // set variable for the filtered data
	    var indMem = team_members.filter(oneMem);
	    res.render("editteam_member", // pass the data to the view
                 {indMem:indMem}
	    );
  	console.log(indMem); // log into the console
});

// HTTP POST request for editteam_member page
app.post('/editteam_member/:fname', function(req, res){
	  var json = JSON.stringify(team_members); // convert from object to string
	  fs.readFile('./models/team_members.json', 'utf8', function readFileCallback(err, data){
	      if(err){
	        console.log("Error");
	      }
	    else {
	
	      var findFname = req.params.fname;
	      var data = team_members;
	      var index = data.map(function(team_member) {return team_member.fname;}).indexOf(findFname); // function to find the data by fname for editing
	      
        // values from the editteam_member form
	      team_members.splice(index, 1, {
            fname: req.body.newfname,
            lname: req.body.newlname,
            city: req.body.newcity,
            email: req.body.newemail,
            bio: req.body.newbio,
            photo: req.body.newphoto,
            id: req.body.newid
	      });
	      json = JSON.stringify(team_members, null, 4);  // convert from object to string
	      fs.writeFile('./models/team_members.json', json, 'utf8');  // write new values into the json file
	    }
	    res.redirect('/team_members');
	  });	
});
//END of code for editing a team_member //

//START of code for deleting a team_member //
// HTTP GET request for deleting a team_member
app.get('/deleteteam_member/:fname', function(req, res){
  
  // access to team_members.json
  fs.readFile('./models/team_members.json', 'utf8', function readFileCallback(err, data){
      if (err) {
          console.log("Error");
      }
      else {
          var findFname = req.params.fname;
          var data = team_members;
          var index = data.map(function(team_member) {return team_member.fname;}).indexOf(findFname);  // function to find the data by fname for editing
         
          team_members.splice(index, 1);  // delete one team_member 
          json = JSON.stringify(team_members, null, 4);
          fs.writeFile('./models/team_members.json', json, 'utf8'); // write new data into the file
      }}); 
      res.redirect('/team_members');              
});
//END of code for deleting a team_member //
//END TEAM_MEMBERS CODE//







// HTTP GET request for contact page
app.get('/contact', function(req, res) {
  res.render("contact");    
});


// HTTP POST request for contact page
app.post('/contact', function(req, res){
    if((req.body.contname === "") || ((/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/).test(req.body.contemail) === false) || (req.body.contmessage === "") || (req.body.contcaptcha != 17)){
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