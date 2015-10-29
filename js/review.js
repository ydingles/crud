$(document).ready(function(){

// Initialize Parse app
	Parse.initialize("1yhdhqrslDBUveCWFvu1hE5sXH4ciuhIseBej08n", "aC5L5leSdCxZT6rdFICtD1IvtnRvRW3pziqmHcJW");

	var Review = Parse.Object.extend('Review');

	//set raty
	$('#stars').raty({path:'http://students.washington.edu/ydingles/info343/crud/lib/images'});

	// function to set data
	$('form').submit(function() {

		// Create new instance of Review
		var newReview = new Review();
		//	Set a property 'stars' equal to user stars
		newReview.set('stars', $('#stars').raty('score'));
		// Set a property 'title' equal to a user title
		newReview.set('title', $('#title').val()); 
		// Set a property 'name' equal to the user name
		newReview.set('name', $('#name').val()); 
	 	// Set a property 'reviewtext' equal to user review
		newReview.set('reviewtext', $('#reviewtext').val()); 
		// Save instance of review to parse
		newReview.save();

		// clear the form
		$('#stars').raty({path:'http://students.washington.edu/ydingles/info343/crud/lib/images'});
		$('#title').val('');
		$('#name').val('');
		$('#reviewtext').val('');

		getData();

		return false // prevents a new page from loading
	});


	// function to run a query
	var getData = function() {
		var query = new Parse.Query(Review);
		query.notEqualTo('stars', null);
		// query.notEqualTo('title','');
		// query.notEqualTo('name','');
		query.notEqualTo('reviewtext','');
		query.find({
			success:function(results) {
				buildList(results)
			}
		})

	}

	// function to build list
	var buildList = function(data) {
		$('ul').empty();

		//$('#listreviews').empty();

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
		var voteUP = item.get('voteUP');
		var voteDOWN = item.get('voteDOWN');
	
		var staraty =  $('#reviewstar').raty({path:'http://students.washington.edu/ydingles/info343/crud/lib/images', readOnly: true, score: stars});

		var div = $('<div id="reviewstar">'+'</div>');
		var li = $('<li>' + '<h3>' + title + '</h3>' + "by " + name + '<br>' + reviewtext + '<br></br>' + 'Was this review helpful? ' + voteUP + ' YES! ' + voteDOWN + ' NO! ' + '</li>')


		// button to remove a review
		var button = $('<button class="btn-danger btn-xs" style="float:right"><span class="glyphicon glyphicon-remove"></span></button>')
		button.click(function() {
			item.destroy({
				success:getData
			})
		})

		// button to record up votes
		var up = $('<button class="btn-danger btn-xs"><span class="glyphicon glyphicon-arrow-up"></span></button>')
    	up.click(function() {
      		item.increment("voteUP");
      			item.save();
      			getData();     
    	})

    	// button to record down votes
		var down = $('<button class="btn-danger btn-xs"><span class="glyphicon glyphicon-arrow-down"></span></button>')
    	down.click(function() {
      		item.increment("voteDOWN");
      			item.save();
      			getData();     
    	})



		$('ul').append(li).prepend(div);
		li.prepend(staraty);
		li.prepend(button);
		li.append(up).append(down);

	}

getData();

})