$(document).ready(function(){


// Initialize Parse app
Parse.initialize("1yhdhqrslDBUveCWFvu1hE5sXH4ciuhIseBej08n", 
	"aC5L5leSdCxZT6rdFICtD1IvtnRvRW3pziqmHcJW");

var Review = Parse.Object.extend('Review');

	$('#stars').raty({path:'http://students.washington.edu/ydingles/info343/crud/lib/images'});

	$('form').submit(function() {

	// Create a new instance of your Music class 
	// For each input element, set a property of your new instance equal to the input's value
	// After setting each property, save your new instance back to your database

	// Create a new instance of your Music class 
	var newReview = new Review();

	// Set a property 'star' equal to user star
	// newReview.set('star', $('#star').raty(
	// 	{	number: function() {
	// 		return $(this).attr('data-number');
	// 		}
	// 	}));

	newReview.set('star', $('#star').raty('score'));

	// Set a property 'title' equal to a user title
	newReview.set('title', $('#title').val()); 
	// Set a property 'name' equal to the user name
	newReview.set('name', $('#name').val()); 
 	// Set a property 'reviewtext' equal to user review
	newReview.set('reviewtext', $('#reviewtext').val()); 
	// Save instance of review to see it on parse.com!
	newReview.save();

	// clear the form
	$('#star').raty({score:0});
	$('#title').val('');
	$('#name').val('');
	$('#reviewtext').val('');

	return false // prevents a new page from loading
});


})