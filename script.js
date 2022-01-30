 




d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', function(el){
  var dataset= el.data;
  Drawbar(dataset);
})

function Drawbar(dataset){
  const w= 500;
  const h=500;
  padding = 60;
  
  

  const xScale=d3.scaleTime()
                 .domain([new Date("1947-01-01"), new Date("2015-10-01")])
                 .range([padding,w-padding]);
                          
   const yScale=d3.scaleLinear()              .domain([0,d3.max(dataset,(d)=>d[1])])
   .range([h-padding,padding]);
  
  const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
  
   var tooltip = d3.select("body")
                  .append("div")
                  .attr("class", "tooltip")
                  .attr("id", "tooltip")
                  .style("opacity", 100)
  
  svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("x",  (d) => xScale(new Date(d[0])))
       .attr("y", (d)=> yScale(d[1]))
       .attr("width", w/dataset.length)
       .attr("height", (d) => h-yScale(d[1])-padding)
  .attr("fill","purple")
  .attr("data-date",(d)=>d[0])
  .attr("data-gdp",(d)=>d[1])
  .attr("class","bar")
  .on("mouseover",function(d){
    tooltip.transition()
           .duration(200)
           .style("opacity", 0.9);
     tooltip.html("Date: " + d[0] + "," + " GDP: "+ d[1])
   tooltip.attr("data-date", d[0])
  })
   .on("mouseout", function(d){
        tooltip.transition()
               .duration(50)
               .style("opacity", 0);
      });
  
   
    const xAxis =d3.axisBottom(xScale);
  svg.append("g")
     .attr("id","x-axis")
     .attr("transform", "translate(0," + (h - padding) + ")")
   .call(xAxis);
  
   const yAxis = d3.axisLeft(yScale);
  svg.append("g")
       .attr("id","y-axis") 
      .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);
  
  
 
  
  
  
  
}

