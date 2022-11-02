var margin = {top: 0, left:0,right:0,bottom:0},
 height = 900 - margin.top - margin.bottom,
 width = 900 - margin.left - margin.right;
 
 var svg = d3.select("#map")
 .append("svg")
 .attr("height", height )
 .attr("width", width )
 .append("g")
 .attr("id","svg_id")

function ukMap(value){
    d3.queue()
 .defer(d3.json, "https://git.1ws.app/uk.json")//i've saved the uk map structure json file to my domain name.
 .defer(d3.json, "http://34.78.46.186/Circles/Towns/"+value)
//  .defer(d3.json, "https://git.1ws.app/d3_cobley.json")
 .await(ready)
 
 var projection = d3.geoMercator()
 .translate([width/2, height/2])
 .scale(2000)
 .center([-5, 54])

var path = d3.geoPath()
.projection(projection)

var tooltip = d3.select("body")
    .append("div").attr("class","tooltips")
// console.log(counties);
function ready(error, data,data2){

    //this is for generating the various circle sizes
     var crcSz = [5,4,7,10,8,11,5,4,7,10,8,11,5,4,7,10,8,11,5,4,7,10,8,11,5,4,7,10,8,11,5,4,7,10,8,11,5,4,7,10,8,11,5,4,7,10,8,11,5,4,7,10,8,11,5,4,7,10,8,11,5,4,7,10,8,11,5,4,7,10,8,11];

     //this is for UK map Structure.
    svg.selectAll(".land")
.data(data.features)
.enter().append("path")
.attr("class","land")
.attr("d",path)

//this is for getting your(Andy Cobley's) json file, and showing the counties
svg.selectAll(".county")
.data(data2)
.enter()
.append("circle")
.attr("class","county")
.attr("r", function(s,i){return crcSz[i];})
.on("mouseover", function(d){
    //this line for reseting the map hovers
    d3.select(this).classed("selected", false)
    //this line for a small circle
    d3.select(this).attr("r", "8")
    //this line for a highlihght the circle.
    d3.select(this).classed("selected", true)
    //this line for enalarge the circle
    d3.select(this).attr("r", "15")
     //this line for tooptips
    d3.select("#showTooltps").html("<b class='tltp_cntry'>Town: </b>" + d.Town +"<br> <b class='tltp_cunty'>County: </b>" + d.County + "<br>" + "<b class='tltp_ppltion'>Population: </b>" + d3.format(",")(d.Population))
    tooltip.html("<b class='tltp_cntry'>Town: </b>" + d.Town +"<br> <b class='tltp_cunty'>County: </b>" + d.County + "<br>" + "<b class='tltp_ppltion'>Population: </b>" + d3.format(",")(d.Population)); return tooltip.style("visibility", "visible");
   
})
//this line for hold the tooltips
.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
//this line for hide the tooltips
 .on("mouseout", function(){d3.select(this).classed("selected", false);d3.select(this).attr("r", "8");d3.select("#showTooltps").html("");return tooltip.style("visibility", "hidden")})
// d3.select(this).classed("selected", true)
// .on('mouseover', function(d){
//     d3.select(".selected").classed("selected", false)
//     d3.select(this).classed("selected", true)
//     d3.select(this).html("test" + "<br/>"  + d.close)	
//                 .style("left", 1 + "px")		
//                 .style("top", 30- 28 + "px");	

// }) 
// .on("mouseout", function(d) {		
//     d3.select(this).transition()		
//         .duration(500)		
//        .style("opacity", 0);	
// })
.attr("cx",function(d){
    var coords = projection([d.lng, d.lat, d.Town])
    return coords[0];
})
.attr("cy",function(d){
    var coords = projection([d.lng, d.lat])
    return coords[1]
})
//geting the cities from the Andy cobley's json file
svg.selectAll(".city_nm")
.data(data2).enter().append("text")
.attr("class","city_nm")
.on("mouseover", function(d){
    d3.select(this).classed("bigfnt", false)
    d3.select(this).classed("bigfnt", true)
    d3.select("#showTooltps").html("<b class='tltp_cntry'>Town: </b>" + d.Town +"<br> <b class='tltp_cunty'>County: </b>" + d.County + "<br>" + "<b class='tltp_ppltion'>Population: </b>" + d3.format(",")(d.Population))
    tooltip.html("<b class='tltp_cntry'>Town: </b>" + d.Town +"<br> <b class='tltp_cunty'>County: </b>" + d.County + "<br>" + "<b class='tltp_ppltion'>Population: </b>" + d3.format(",")(d.Population)); return tooltip.style("visibility", "visible");
   
}).on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
.on("mouseout", function(){d3.select(this).classed("bigfnt", false);d3.select("#showTooltps").html("");return tooltip.style("visibility", "hidden")})
.transition()
.duration(500)
.attr("x", function(d){
    var coords = projection([d.lng, d.lat, d.Town])
    return coords[0]
})
.attr("y", function(d){
    var coords = projection([d.lng, d.lat, d.Town])
    return coords[1]
})
.text(function(d){
    return d.Town;
})
.attr("dx",10)
.attr("dy",4)
.ease("easeSinIn")


}

}
//suffle the cities when reload the button
// d3.select("#reloadBtn")
// 	.on("click",function(){
//         // console.log(d3.select(this).attr("data-id"));
//         //this line for keep the current value from the slider,
//         document.getElementById("showTooltps").innerHTML = "";
//         var reloadVal = d3.select(this).attr("data-id");
//         document.getElementById("svg_id").innerHTML = "";
// 		ukMap(reloadVal);
// 	});

//     var rangeslider = document.getElementById("sldrId");
//     var mapDiv = document.getElementById("svg_id");
//     var reloadBtn = document.getElementById("reloadBtn");
// var output = document.getElementById("demo");
// output.innerHTML = rangeslider.value;

// rangeslider.oninput = function() {
//   output.innerHTML = this.value;
//   reloadBtn.setAttribute("data-id",this.value);//attrbt val to reload button, 
//   mapDiv.innerHTML = "";
//   ukMap(this.value);
// }