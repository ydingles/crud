$(document).ready(function(){


// Initialize Parse app
Parse.initialize("1yhdhqrslDBUveCWFvu1hE5sXH4ciuhIseBej08n", 
	"aC5L5leSdCxZT6rdFICtD1IvtnRvRW3pziqmHcJW");

var Review = Parse.Object.extend('Review');

	$('#stars').raty({path:'http://students.washington.edu/ydingles/info343/crud/lib/images'});


// function to set data
	$('form').submit(function() {

	// Create a new instance of your Music class 
	// For each input element, set a property of your new instance equal to the input's value
	// After setting each property, save your new instance back to your database

	// Create a new instance of your Music class 
	var newReview = new Review();
	//	Set a property 'stars' equal to user stars
	newReview.set('stars', $('#stars').raty('score'));
	// Set a property 'title' equal to a user title
	newReview.set('title', $('#title').val()); 
	// Set a property 'name' equal to the user name
	newReview.set('name', $('#name').val()); 
 	// Set a property 'reviewtext' equal to user review
	newReview.set('reviewtext', $('#reviewtext').val()); 
	// Save instance of review to see it on parse.com!
	newReview.save();

	// clear the form
	$('#stars').raty({path:'http://students.washington.edu/ydingles/info343/crud/lib/images'});
	$('#title').val('');
	$('#name').val('');
	$('#reviewtext').val('');

	return false // prevents a new page from loading
});

//var starnumber = $('#stars').raty('score'));

// function to run a query
	var getData = function() {
		var query = new Parse.Query(Review);
		query.notEqualTo('stars', null);
//		query.notEqualTo('title','');
//		query.notEqualTo('name','');
		query.notEqualTo('reviewtext','');
		query.find({
			success:function(results) {
				buildList(results)
			}
		})

	}

// function to build list
	var buildList = function(data) {
		$('ol').empty();

		data.forEach(function(d) {
			addItem(d);
		})
	}

// function to take item and add to screen
	var addItem = function(item) {
		var stars = item.get('stars');
		var title = item.get('title');
		var name = item.get('name');
		var reviewtext = item.get('reviewtext');
	
		var div = $('<div id="reviewstar">' + $('#reviewstar').raty({path:'http://students.washington.edu/ydingles/info343/crud/lib/images', readOnly: true, score: stars}) + '</div>');
		
		//var reviewstar = $('#reviewstar').raty({path:'http://students.washington.edu/ydingles/info343/crud/lib/images', readOnly: true, score: stars})
		//var li = $('<li>' + '<div id="reviewstar">' + $('#reviewstar').raty({path:'http://students.washington.edu/ydingles/info343/crud/lib/images'}) + '</div>' + title + name + reviewtext + '</li>');
		//var div = $('#reviewstar').raty({path:'http://students.washington.edu/ydingles/info343/crud/lib/images', readOnly:true, score: stars})
		
		//var reviewstar = $('#reviewstar').raty({path:'http://students.washington.edu/ydingles/info343/crud/lib/images', readOnly: true, score: stars})
		
		var li = $('<li>' +  title + " " + name + " " + reviewtext + '</li>')
		
		//var li = $('<li>' + "<div id=starsgo>" + "</div>" + title + '</li>')
		//$('#starsgo').raty({path:'http://students.washington.edu/ydingles/info343/crud/lib/images', readOnly: true, score: stars});

		var button = $('<button class="btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>')

		button.click(function() {
			item.destroy({
				success:getData
		})
	})

		li.prepend(div);
		li.append(button);
		$('ol').append(li);

	}

getData();



})