
var blocks =[
                  {
                    hour:"9 am",
                    fullHour:9,
                    eventText:[],
                },
                {
                    hour:"10 am",
                    fullHour:10,
                    eventText:[],
                },
                {
                    hour:"11 am",
                    fullHour:11,
                    eventText:[],
                },
                {
                    hour:"12 pm",
                    fullHour:12,
                    eventText:[],
                },

                {
                    hour:"1 pm",
                    fullHour:13,
                    eventText:[],
                },
                {
                    hour:"2 pm",
                    fullHour:14,
                    eventText:[],
                },
                {
                    hour:"3 pm",
                    fullHour:15,
                    eventText:[],
                },
                {
                    hour:"4 pm",
                    fullHour:16,
                    eventText:[],
                },
                {
                    hour:"5 pm",
                    fullHour:17,
                    eventText:[],
                },
]
  
var saveTasks = function(data) {
    localStorage.setItem("Events", JSON.stringify(data));
  };

var loadTasks = function() 
  {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (tasks) {
      blocks= tasks;
      console.log(tasks);
      console.log(blocks);
    }
  };
//   saveTasks();
var timeBlock = function(i,hour , eventText,color) {
        // create elements that make up a task item
        var taskLi = $("<section>").addClass("row m-3");
      
        var taskHour = $("<h2>")
          .addClass("col-2 h-100 text-md-left text-lg-right pt-md-3 pt-sm-0 border border-left-0 border-success")
          .text(hour);
    //   console.log("color in timeBlock"+ color);
        var taskEvent = $("<p>")
          .addClass("col-8 h-100 pt-3")
          .addClass(color)
          .attr("id",i)
          .attr("type","input")
          .text(eventText);
        
          var button = $("<button>")
          .addClass("col-2 h-100 fas fa-address-book bg-info rounded-right")
          .attr("type","submit")
          .attr("index",i)
      
        // append span and p element to parent li
        taskLi.append(taskHour, taskEvent,button);
      
      
        // append to ul list on the page
        $(".container" ).append(taskLi);
      };

      var saveTasks = function() {
        localStorage.setItem("tasks", JSON.stringify(blocks));
      };


var colorSelector= function(hourBlock,currentHour){
    console.log("block time is"+hourBlock);
    console.log(currentHour);
    if(hourBlock < currentHour){
        color="bg-secondary";
    }
    else if(hourBlock==currentHour){
        color="bg-danger";
    }else{
     color="bg-success";
    }
    console.log(color);
return color;
}




$(document).ready(function(){
    loadTasks();
    dateText= moment().format('dddd , MMMM Do '); 
    currentHour= moment().format('H'); 
    // currentHour=13;
    console.log("current hour is "+currentHour);
    $("#currentDay").text(dateText);

    for(i=0;i<= blocks.length-1;i++){
        hourBlock=blocks[i].fullHour;

    color = colorSelector(hourBlock,currentHour);

    console.log("your color is"+color);
    timeBlock(i,blocks[i].hour,blocks[i].eventText,color);
    // console.log(blocks[0].eventText[0]);
    }

    $("p").on("click", function() {
        var id = $(this).attr("id");
        // create new input element
        var dateInput = $("<input>")
          .attr("type", "text")
          .addClass("col-8 h-100 ")
          .attr("placeholder","add event")
          .attr("id",id);
      
        // swap out elements
        $(this).replaceWith(dateInput);
      
        // automatically focus on new element
        dateInput.trigger("focus");
      });

    $("button").on("click",function(e){
      currentHour= moment().format('H');
        e.preventDefault();
        var index = $(this).attr("index");
        var data = $("#"+index).val();
        console.log(data);
        if(data === null || data === ""){
            alert("Please enter value to proceed");
            console.log(data);
            hourBlock=blocks[index].fullHour;

            color = colorSelector(hourBlock,currentHour);
            loadTasks();
            var taskEvent = $("<p>")
            .addClass("col-8 pt-3 h-100")
            .attr("id",index)
            .addClass(color)
            .attr("type","input")
            .text(blocks[index].eventText[0]);
            $("#"+index).replaceWith(taskEvent);
        }else{
            alert(data+"   added successfully in local storage");
            blocks[index].eventText.push(data);
            console.log(blocks[index].eventText);
            saveTasks();
            loadTasks();
            hourBlock=blocks[index].fullHour;
            color = colorSelector(hourBlock,currentHour);
            var taskEvent = $("<p>")
            .addClass("col-8 pt-3 h-100")
            .addClass(color)
            .attr("id",index)
            .attr("type","input")
            .text(blocks[index].eventText[0]);
            $("#"+index).replaceWith(taskEvent);
        }
});

});
