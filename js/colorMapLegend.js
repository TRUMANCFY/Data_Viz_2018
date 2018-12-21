
var colorbar = undefined;
var boxLegend = undefined;

function createD3LegendBox(svg, legend) {
  removeAllLegend();

  if (legend === 0) {
    svg.append('text')
            .text('Legend Baseflow change values')
            .attr('fill', 'black')
            .attr('font-size', 15)
            .attr('transform', 'translate(10, 16)');
    createColorMapLegend(svg);
  } else if (legend === 1) {
    svg.append('text')
            .text('Legend heatmap')
            .attr('fill', 'black')
            .attr('font-size', 15)
            .attr('transform', 'translate(10, 16)');
    createBoxLegend(svg);
  }

}

function addColorsToLegend(colors, percentages, legend) {
  for(var i = 0; i < colors.length; ++i) {
    legend.append("stop")
      .attr("offset", percentages[i])
      .attr("stop-color", colors[i])
      .attr("stop-opacity", 1);
  }
}

function removeColorBar() {
  if(colorbar !== undefined) {
    colorbar.remove();
  }
}

function removeBoxLegend() {
  if(boxLegend !== undefined) {
    boxLegend.remove();
  }
}

function removeAllLegend() {
  removeColorBar();
  removeBoxLegend();
}

function getColorsAndPercentages(value) {
  return colorsDefs[value];
}

function createBoxLegend(svg) {

    var linear = d3.scaleOrdinal()
    .domain(["Low", "Medium", "High"])
    .range(["rgb(10, 50, 200)", "rgb(255, 255, 10)", "rgb(255, 0, 0)"]);

    boxLegend = svg.append("g")
      .attr("class", "legendOrdinal")
      .attr("transform", "translate(30,30)");

    var legendOrdinal = d3.legendColor()
      .shapeWidth(50)
      .shapeHeight(15)
      .cells(3)
      .shapePadding(10)
      .orient('horizontal')
      .scale(linear);

      svg.select(".legendOrdinal")
        .call(legendOrdinal);
}

function createColorMapLegend(svg, value) {
  colorbar = svg.append('g')

                      .attr('transform', 'translate(0, 40)')
                      .attr('width', 50);

  var w = 300, h = 50;


  var legend = colorbar.append("defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  const colorsObject = getColorsAndPercentages(0);
  console.log(colorsObject);
  addColorsToLegend(colorsObject.colors, colorsObject.percentages, legend);

  colorbar.append("rect")
    .attr("width", w)
    .attr("height", h - 36)
    .style("fill", "url(#gradient)")
    .attr("transform", "translate(0,10)");

  var y = d3.scaleLinear()
    .range([0, 200])
    .domain([-100000, 100000]);

  var yAxis = d3.axisBottom()
    .scale(y)
    .ticks(3);

  colorbar.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,24)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("axis title");
}
