$(document).ready(function(){
    
    var database = firebase.database();


    //  On click event for form submission to firebase
    $('#add-train').on("click", function(event){
        // prevents the form from refreshing the page
        event.preventDefault();  
        // Get input for name, destination, frequency and the start time
        var trainName = $('#trainName').val().trim();
        var destination = $('#destination').val().trim();
        var frequency = $('#frequency').val().trim();
        var startTime = $('#start-time').val().trim();  
//   
        // push our data into the database
        database.ref().push({
        // data properties
        name : trainName,
        destination : destination ,
        frequency : frequency,
        startTime : startTime            
        });
    }); 

    // on a firebase update this will add the data to the table. 
    database.ref().on("child_added", function(childSnapshot){

        // read the properties of the snapshot
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var startTime = childSnapshot.val().startTime;

         
   
   
             $('.table').append('<tr><td>' + name +
                 '</td> <td>' + destination +
                 '</td> <td>' + frequency +
                 '</td> <td>' + startTime +                 
                 ' </td> </tr>');
         }) 
   


})