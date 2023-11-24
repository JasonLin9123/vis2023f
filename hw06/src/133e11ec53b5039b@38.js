function _1(md){return(
md`# HW6`
)}

function _artist(FileAttachment){return(
FileAttachment("artist.csv").csv()
)}

function _artistPublic(FileAttachment){return(
FileAttachment("artistPublic.csv").csv()
)}

function _artistQuestion(artist){return(
Object.keys(artist[0])[3]
)}

function _artistPublicQuestion(artistPublic){return(
Object.keys(artistPublic[0])[4]
)}

function _artistAnswer(artist,artistQuestion){return(
artist.map(row => row[artistQuestion])
)}

function _artistPublicAnswer(artistPublic,artistPublicQuestion){return(
artistPublic.map(row => row[artistPublicQuestion])
)}

function _yCounts(){return(
[]
)}

function _9(yCounts,artistAnswer,artistPublicAnswer)
{
  yCounts.length = 0;
  for (var y = 1; y <= 5; y++) { 
    yCounts.push({Answer: y,Identity: "artist", Count: 0}); 
    yCounts.push({Answer: y,Identity: "artistPublic", Count: 0}); 
  }
  artistAnswer.forEach (x => {
    yCounts[x * 2 - 2].Count++;
  })
  artistPublicAnswer.forEach (x => {
    yCounts[x * 2 - 1].Count++;
  })
  return yCounts
}


function _10(md){return(
md`## Simple baseline (3pt)
- 利用 Plot 完成堆疊柱狀圖 (2pt)
- 加入 Checkbox input 使其可選擇呈現的資料集 (1pt)`
)}

function _selectedIdentityPlot(Inputs){return(
Inputs.checkbox(["artist", "artistPublic"], {label: "Dataset", value: ["artist", "artistPublic"]})
)}

function _12(Plot,artistQuestion,yCounts,selectedIdentityPlot){return(
Plot.plot({
  title: artistQuestion, 
  y: {label: "Count", grid: true},
  x: {label: "Answer"},
  color: {
    domain: ["artist", "artistPublic"],
    range: ["#92A3D9", "#CDB1E4"],
    legend: true
  },
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts.filter((d) => selectedIdentityPlot.includes(d.Identity)), {x: "Answer", y: "Count", fill: "Identity", tip: {format: {x: true}}}),
  ]
})
)}

function _13(md){return(
md`## Medium baseline (4pt)
- 利用 SVG 完成堆疊柱狀圖 (含 Checkbox) (3pt)
- 加入 D3 的過渡效果 (1pt)`
)}

function _selectedIdentitySvgMedium(Inputs){return(
Inputs.checkbox(["artist", "artistPublic"], {label: "Dataset", value: ["artist", "artistPublic"]})
)}

function _chartMedium(yCounts,selectedIdentitySvgMedium,d3)
{
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  const filteredData = yCounts.filter(d => selectedIdentitySvgMedium.includes(d.Identity));

  let group = Array.from(d3.group(filteredData, d => d.Answer), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.Identity, obj.Count]))};
  });

  const stack = d3.stack().keys(["artist", "artistPublic"]);
  const series = stack(group);

  const xScale = d3.scaleBand()
    .domain(yCounts.map(d => d.Answer))
    .range([0, width])
    .padding(0.2);

  const yMax = d3.max(series, Identity => d3.max(Identity, d => d[1]));
  const yScale = d3.scaleLinear()
    .domain([0, yMax]).nice()
    .range([height, 0]);

  const color = d3.scaleOrdinal()
    .domain(["artist", "artistPublic"])
    .range(["#92A3D9", "#CDB1E4"]);

  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g")
    .call(d3.axisLeft(yScale))
    .call(g => g.append("g")
        .attr("stroke-opacity", 0.1)
        .call(d3.axisLeft(yScale).tickSize(-width).tickFormat("")));

  series.forEach((serie) => {
    let bars = g.append("g")
        .attr("fill", color(serie.key))
        .selectAll("rect")
        .data(serie);
  
    bars.enter().append("rect")
        .attr("x", d => xScale(d.data.value))
        .attr("y", height)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .transition() 
        .duration(1000)
        .attr("y", d => yScale(d[1]))
        .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));
  
  return svg.node();
}


function _16(md){return(
md`## Strong baseline (3pt)
- 利用 SVG 製成的堆疊柱狀圖添加陰影效果 (2pt)
- 添加滑鼠游標偵測效果 (1pt)`
)}

function _selectedIdentitySvgStrong(Inputs){return(
Inputs.checkbox(["artist", "artistPublic"], {label: "Dataset", value: ["artist", "artistPublic"]})
)}

function _chartStrong(yCounts,selectedIdentitySvgStrong,d3)
{
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  const filteredData = yCounts.filter(d => selectedIdentitySvgStrong.includes(d.Identity));

  let group = Array.from(d3.group(filteredData, d => d.Answer), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.Identity, obj.Count]))};
  });

  const stack = d3.stack().keys(["artist", "artistPublic"]);
  const series = stack(group);

  const xScale = d3.scaleBand()
    .domain(yCounts.map(d => d.Answer))
    .range([0, width])
    .padding(0.2);

  const yMax = d3.max(series, Identity => d3.max(Identity, d => d[1]));
  const yScale = d3.scaleLinear()
    .domain([0, yMax]).nice()
    .range([height, 0]);

  const color = d3.scaleOrdinal()
    .domain(["artist", "artistPublic"])
    .range(["#92A3D9", "#CDB1E4"]);

  const colorHover = d3.scaleOrdinal()
    .domain(["artist", "artistPublic"])
    .range(["#6B7BAD", "#937CA6"]);

  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const defs = svg.append("defs");
  const filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "130%");
  
  filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 3)
    .attr("result", "blur");
  
  filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 3)
    .attr("dy", 3)
    .attr("result", "offsetBlur");
  
  const feMerge = filter.append("feMerge");
  
  feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
  
  feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g")
    .call(d3.axisLeft(yScale))
    .call(g => g.append("g")
      .attr("stroke-opacity", 0.1)
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat("")));

  series.forEach((serie) => {
    let bars = g.append("g")
      .attr("fill", color(serie.key))
      .selectAll("rect")
      .data(serie);
  
  bars.enter().append("rect")
    .attr("x", d => xScale(d.data.value))
    .attr("y", height)
    .attr("width", xScale.bandwidth())
    .attr("height", 0)
    .attr("y", d => yScale(d[1]))
    .attr("height", d => yScale(d[0]) - yScale(d[1]))
    .style("filter", "url(#drop-shadow)")
    .on("mouseover", function(d) {
      d3.select(this).attr("fill", colorHover(serie.key));})
    .on("mouseout", function(d) {
      d3.select(this).attr("fill", color(serie.key));
      d3.select(".tooltip").remove();})
  });

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale));
  
  return svg.node();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artistPublic.csv", {url: new URL("./files/41a9c6bfdf8907c7f19b5a52517012d51d11afcdf769218a6b5c1af5288c865ca2bf10f0fdac5144f8d3676054b833c736642053e880c85ec6123fb15744ae7f.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["artist.csv", {url: new URL("./files/363ea43eed3c6a6a6fed83d3e26ac23641da56f4f0689da720760208af84f1c3caff531322fc2ceeaf3924e4ff2f0ca4314a49adfe0e45701c6687fc36ee24d3.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artist")).define("artist", ["FileAttachment"], _artist);
  main.variable(observer("artistPublic")).define("artistPublic", ["FileAttachment"], _artistPublic);
  main.variable(observer("artistQuestion")).define("artistQuestion", ["artist"], _artistQuestion);
  main.variable(observer("artistPublicQuestion")).define("artistPublicQuestion", ["artistPublic"], _artistPublicQuestion);
  main.variable(observer("artistAnswer")).define("artistAnswer", ["artist","artistQuestion"], _artistAnswer);
  main.variable(observer("artistPublicAnswer")).define("artistPublicAnswer", ["artistPublic","artistPublicQuestion"], _artistPublicAnswer);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer()).define(["yCounts","artistAnswer","artistPublicAnswer"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof selectedIdentityPlot")).define("viewof selectedIdentityPlot", ["Inputs"], _selectedIdentityPlot);
  main.variable(observer("selectedIdentityPlot")).define("selectedIdentityPlot", ["Generators", "viewof selectedIdentityPlot"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","artistQuestion","yCounts","selectedIdentityPlot"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("viewof selectedIdentitySvgMedium")).define("viewof selectedIdentitySvgMedium", ["Inputs"], _selectedIdentitySvgMedium);
  main.variable(observer("selectedIdentitySvgMedium")).define("selectedIdentitySvgMedium", ["Generators", "viewof selectedIdentitySvgMedium"], (G, _) => G.input(_));
  main.variable(observer("chartMedium")).define("chartMedium", ["yCounts","selectedIdentitySvgMedium","d3"], _chartMedium);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("viewof selectedIdentitySvgStrong")).define("viewof selectedIdentitySvgStrong", ["Inputs"], _selectedIdentitySvgStrong);
  main.variable(observer("selectedIdentitySvgStrong")).define("selectedIdentitySvgStrong", ["Generators", "viewof selectedIdentitySvgStrong"], (G, _) => G.input(_));
  main.variable(observer("chartStrong")).define("chartStrong", ["yCounts","selectedIdentitySvgStrong","d3"], _chartStrong);
  return main;
}
