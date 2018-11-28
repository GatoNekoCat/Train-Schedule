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

        // clear the values after collecting data
        var trainName = $('#trainName').val("");
        var destination = $('#destination').val("");
        var frequency = $('#frequency').val('');
        var startTime = $('#start-time').val('');     
     }); 

    // on a firebase update this will add the data to the table. 
    database.ref().on("child_added", function(childSnapshot){

        // read the properties of the snapshot
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var startTime = childSnapshot.val().startTime;

        // call moment to get the time and convert the startTime to useable format
        var theTime = moment();
        var startTimeConverted = moment(startTime, 'hh:mm').subtract(1, 'years');
        
        var timeDifference = moment().diff(moment(startTimeConverted), 'minutes');
        // Time remaining until next train
        var timeRem = timeDifference % frequency;
        // time till next train
        var nextTrainTime = frequency - timeRem;
        var nextTrain = moment().add(nextTrainTime, 'minutes');
        var nextTrainConv = moment(nextTrain).format('hh:mm'); 
   
        // add data and converted times to the table
        $('.table').append('<tr><td>' + name +
                 '</td> <td>' + destination +
                 '</td> <td>' + frequency +
                 '</td> <td>' + nextTrainConv +                 
                 '</td> <td>' + nextTrainTime +                 
                 ' </td> </tr>');
         }) 
   


})