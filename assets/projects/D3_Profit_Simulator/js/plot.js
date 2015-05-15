var createGraphFirst = false;
var profitArr = [];
var uservalArr = []; 
var stochasticvalArr = [];

//Called when "start" button is clicked
function runSim(form) {
    
    createGraphFirst = true;
    
    //Gets user input
    var uservalue = (parseFloat(form.uservalue.value)).toFixed(3);
    //Checks if it's 0 - 1
    if(uservalue > 1 || uservalue < 0) {
        alert("Please enter an input from 0 - 1.");
        return;
    }
    //50 year interval
    var numYears = 61;
    
    var totalProfit = 0.00;
    
    for(var i = 0; i < numYears; i++) {
        
        //Generates random stochasticvalue
        var stochasticvalue = (Math.random() * 1 - 0 + 0).toFixed(3);
        
        var num = 2010 + i;
        //Creates array for 62 points for profits, x axis
        var curr = simProfit(uservalue, stochasticvalue);
        totalProfit += parseFloat(curr);
        var roundedTotal = (totalProfit).toFixed(3);
        profitArr[i] = {"y" : curr , "x" : num, "t" : roundedTotal};
        
        //Creates an array for 62 points for user value
        uservalArr[i] = {"y" : uservalue , "x" : num };
        
        //Creates an array for 62 points for stochasticvalue
        stochasticvalArr[i] = {"y" : stochasticvalue , "x" : num };
    }
    
    //Specify the width, height, and margin of the svg element
    var margin = {top: 50, right: 180, bottom: 80, left: 100},
        w = 1000 - margin.left - margin.right,
        h = 500 - margin.top - margin.bottom;
    
    //Recreate svg element
    d3.select('#sim').selectAll('svg').remove();
    var svg = d3.select('#sim').append('svg')
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
    //tool tip var
    var tooltip1 = d3.select("body").append("div")   
        .attr("class", "tooltip1")               
        .style("opacity", 0);
    var tooltip2 = d3.select("body").append("div")   
        .attr("class", "tooltip2")               
        .style("opacity", 0);
    var tooltip3 = d3.select("body").append("div")   
        .attr("class", "tooltip3")               
        .style("opacity", 0);
    
    //Rectangle for graph background
    svg.append("rect")
        .attr("width", w)
        .attr("height", h)
        .attr("fill", "#ccc");
    
    //Creates the variables for x and y scale from 0 to 1
    var x = d3.scale.linear()
	    //.domain([new Date(profitArr[0].x), d3.time.year.offset(new Date(profitArr[profitArr.length-1].x), 0)])
        .domain([2010, 2070])
	    .range([0, w]);
	var y = d3.scale.linear()
	    .domain([0, 1.1])
	    .range([h, 0]);
    
    //Define X and Y axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(10);
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5);
    
    // Creates functions for the X and Y Grid to be created
    function gridXaxis() {
        return d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(30)
    }
    function gridYaxis() {
        return d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10)
    }
    
    //Create X axis
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (h) + ")")
		.call(xAxis)
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-60)" )
        .style("text-anchor", "end");
    // Creates xAxis label
    svg.append("text")
        .attr("transform", "translate(" + (w/2) + " ," + (h + margin.bottom -10) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Year");
    //Creates Y axis and Y label
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + 0 + ",0)")
		.call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -170)
        .attr("dy", "-3em")
        .style("font-size", "20px")
        .style("text-anchor", "middle") 
        .text("Value in Millions ($)");
    
    // Draw xAxis grid
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + h + ")")
        .call(gridXaxis()
            .tickSize(-h, 0, 0)
            .tickFormat("")
        )

    // Draw yAxis grid
    svg.append("g")
        .attr("class", "grid")
        .call(gridYaxis()
            .tickSize(-w, 0, 0)
            .tickFormat("")
        )
    
    //d3.svg.line is a path generator (both object and function), containing scale information
    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); })
    
    //Draws the svg Path for profit
    svg.append("path")
        .attr("class", "line1")
        .attr("d", line(profitArr))
        .data(profitArr)
        .on("mouseover", function(d) {
            tooltip1.transition()
                .duration(100)
                .style("opacity", .9);
            tooltip1.html("<strong><u>Profit</u></strong>" + "<br/>"
                        + "<strong>Profit : $</strong>" + d.y + "<br/>"
                        + "<strong>Total Profit : $</strong>" + d.t + "<br/>"
                        + "<strong>Year : </strong>" + d.x)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip1.transition()        
                .duration(500)      
                .style("opacity", 0)
        })
        .transition()
        .duration(2000)
        .attrTween('d', pathTween1);
    function pathTween1() {
        var interpolate = d3.scale.quantile()
            .domain([0,1])
            .range(d3.range(1, profitArr.length + 1));
        return function(t) {
            return line(profitArr.slice(0, interpolate(t)));
        };
    }
    
    //Draws the svg Path for uservalue
    svg.append("path")
        .attr("class", "line2")
        .attr("d", line(uservalArr))
        .data(uservalArr)
        .on("mouseover", function(d) {
            tooltip2.transition()        
                .duration(100)     
                .style("opacity", .9);      
            tooltip2.html("<strong><u>User Value</u></strong>" + "<br/>"
                        + "<strong>User Value : $</strong>" + d.y + "<br/>"
                        + "<strong>Year : </strong>" + d.x)  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px"); 
        })
        .on("mouseout", function(d) {       
            tooltip2.transition()        
                .duration(500)      
                .style("opacity", 0)
        })
        .transition()
        .duration(2000)
        .attrTween('d', pathTween2);
    function pathTween2() {
        var interpolate = d3.scale.quantile()
            .domain([0,1])
            .range(d3.range(1, uservalArr.length + 1));
        return function(t) {
            return line(uservalArr.slice(0, interpolate(t)));
        };
    }
    
    //Draws the svg Path for stochastic values
    svg.append("path")
        .attr("class", "line3")
        .attr("d", line(stochasticvalArr))
        .data(stochasticvalArr)
        .on("mouseover", function(d) {
            tooltip3.transition()        
                .duration(100)      
                .style("opacity", .9);
            tooltip3.html("<strong><u>Stochastic Value</u></strong>" + "<br/>"
                        + "<strong>Stochastic Value : $</strong>" + d.y + "<br/>"
                        + "<strong>Year : </strong>" + d.x)
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px"); 
        })
        .on("mouseout", function(d) {       
            tooltip3.transition()        
                .duration(500)      
                .style("opacity", 0)
        })
        .transition()
        .duration(2000)
        .attrTween('d', pathTween3);
    function pathTween3() {
        var interpolate = d3.scale.quantile()
            .domain([0,1])
            .range(d3.range(1, stochasticvalArr.length + 1));
        return function(t) {
            return line(stochasticvalArr.slice(0, interpolate(t)));
        };
    }
    
    //Creates Line Labels
    svg.append("text")
        .transition()
        .duration(2000)
        .delay( function(d,i) {
            return i * 500;
        })
        .attr("transform", "translate(" + (w + 5) + "," + y(profitArr[profitArr.length - 1].y) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "DarkSlateBlue")
        .text("Profit");
    svg.append("text")
        .transition()
        .duration(2000)
        .delay( function(d,i) {
            return i * 500;
        })
        .attr("transform", "translate(" + (w + 5) + "," + y(uservalArr[uservalArr.length - 1].y) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "DarkSeaGreen")
        .text("User Value");
    svg.append("text")
        .transition()
        .duration(2000)
        .delay( function(d,i) {
            return i * 500;
        })
        .attr("transform", "translate(" + (w + 5) + "," + y(stochasticvalArr[stochasticvalArr.length - 1].y) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "CadetBlue")
        .text("Stochastic Value");
    
    // draw legend colored rectangles
    svg.append("rect")
        .attr("x", 0)
        .attr("y", -25)
        .attr("width", w)
        .attr("height", 20)
        .attr("fill", "#ddd")
        .style("stroke-size", "1px");
    svg.append("circle")
        .attr("r", 5)
        .attr("cx", 30)
        .attr("cy", -15)
        .style("fill", "DarkSlateBlue")
    svg.append("circle")
        .attr("r", 5)
        .attr("cx", 110)
        .attr("cy", -15)
        .style("fill", "DarkSeaGreen");
    svg.append("circle")
        .attr("r", 5)
        .attr("cx", 220)
        .attr("cy", -15)
        .style("fill", "CadetBlue");
    svg.append("text")
        .attr("class", "label1")
        .attr("x", 80)
        .attr("y", -10)
        .style("text-anchor", "end")
        .text("Profit");
    svg.append("text")
        .attr("class", "label2")
        .attr("x", 195)
        .attr("y", -10)
        .style("text-anchor", "end")
        .text("User Value");
    svg.append("text")
        .attr("class", "label3")
        .attr("x", 340)
        .attr("y", -10)
        .style("text-anchor", "end")
        .text("Stochastic Value");
    svg.append("text")
        .attr("class", "label4")
        .attr("x", w-20)
        .attr("y", -10)
        .style("text-anchor", "end")
        .text("Total Profit (2010-2070) : $" + profitArr[profitArr.length-1].t + " Million");
}

//Simulates the profit and returns the profit
function simProfit(uservalue, stochasticvalue) {
    
    var profit = (1 - (uservalue - stochasticvalue) * (uservalue - stochasticvalue))
    
    return (profit).toFixed(3);
}

var useryear;
var validyear = false;

//Called when "Find Profit" button is clicked
function runFind(form) {
    useryear = form.useryear.value;
    
    if(createGraphFirst == false) {
        alert("Please Create a Graph First.");
        return;
    }
    
    if(useryear > 2070 || useryear < 2010) {
        alert("Please enter year between 2010 - 2070.");
        return;
    }
    
    var yearProfit = profitArr[useryear - 2010].y;
    var totProfit = profitArr[useryear - 2010].t;
    
    document.getElementById('yearinfo').innerHTML = "<br/>In <strong>" + useryear + "</strong>, you made <strong>$" + yearProfit + " Million</strong>.<br/><br/>"
                                                    + "From the years <strong>2010 to " + useryear + "</strong>, you made a total of <strong>$" + totProfit + " Million</strong>.";
    validyear = true;
}

var stoviewhide = true;

//Called when "Show Stochastic Value" button is clicked.
function showSto() {
    if(createGraphFirst == false) {
        alert("Please Create a Graph First.");
        return;
    }
    
    if(validyear == false) {
        alert("Please Enter A Valid Year.");
        return;
    }
    
    if(stoviewhide == true) {
        document.getElementById('showstovalue').innerHTML = "<br/> In the year <strong>" + useryear + "</strong>, the Stochastic Value is <strong>$" + stochasticvalArr[useryear-2010].y + " Million</strong>.";
        stoviewhide = false;
    } else {
        document.getElementById('showstovalue').innerHTML = "";
        stoviewhide = true;
    }
    
}