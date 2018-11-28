$(document).ready(function(){
    
    var database = firebase.database();


    //  On click event for form submission to firebase
    $('#add-train').on("click", function(event){
        event.preventDefault();  
        var trainName = $('#trainName').val().trim();
        var destination = $('#destination').val().trim();
        var frequency = $('#frequency').val().trim();
        var firstTrainTime = $('#firstTrainTime').val().trim();
        
  
  
  
  
        database.ref().push({
        name : trainName,
        destination : destination ,
        frequency : frequency,
        firstTrainTime : firstTrainTime
            
        });
    }); 


})