let barCharts = [];
let data;
let cleanData=[];
let numRows;

function preload(){
    data = loadTable("data/births.csv", "csv", "header");
}

function setup(){
    background(50)
    createCanvas(1000,1000)

    noLoop()

    numRows = data.rows.length;
    for(let i=0;i<numRows;i++){
        cleanData.push(data.rows[i].obj)
    }
    // cleanData = data.rows.map(d => d.obj)

    console.log(cleanData)

    let barChart01 = {
    data:cleanData,
    chartType:"Vertical",
    yValue:"Both Sexes",
    xValue:"Year",
    chartWidth: 300,
    chartHeight:200,
    xPos:90,
    yPos:400,
    axisLineColour:"#d9d9d9",
    barWidth:20,
    labelTextSize:10,
    labelPadding:10,
    labelColour:"#db1f83",
    labelRotation:45,
    };

    //Horizontal
    let barChart02 = {
        data: cleanData,
        chartType: "Horizontal",
        yValue: "Year", // Adjust this based on your horizontal bar chart data
        xValue: "Both Sexes",  // Adjust this based on your horizontal bar chart data
        chartWidth: 300,
        chartHeight: 200,
        xPos: 500,  // Adjust the x position to position it beside the first chart
        yPos: 300,
        axisLineColour: "#d9d9d9",
        barWidth: 15,
        labelTextSize: 10,
        labelPadding: 10,
        labelColour: "#db1f83",
        labelRotation: 45,
    };
    //stacked
    let barChart03 = {
        data: cleanData,
        chartName: "Male + Female Births",
        // chartType: "StackedBarChart",
        yValues:["Male", "Female"], // Adjust this based on your horizontal bar chart data
        xValue: "Year",  // Adjust this based on your horizontal bar chart data
        chartWidth: 300,
        chartHeight: 200,
        xPos: 0,  // Adjust the x position to position it beside the first chart
        yPos: 300,
        axisLineColour: "#d9d9d9",
        barWidth: 20,
        labelTextSize: 10,
        labelPadding: 10,
        labelColour: "#db1f83",
        xyLabelRotation: 90,
        xLabel: "Year",
        yLabel: "Births",
        labelRotation: 45,
    };

    let barChart04 = {
        data: cleanData,
        chartName: "Percentage of Male to Female births",
        // chartType: "HundredPercentStackedBarChart",
        yValues: ["Male", "Female"], // Adjust this based on your horizontal bar chart data
        xValue: "Year",  // Adjust this based on your horizontal bar chart data
        chartWidth: 300,
        chartHeight: 200,
        xPos: 500,  // Adjust the x position to position it beside the first chart
        yPos: 0,
        axisLineColour: "#d9d9d9",
        barWidth: 20,
        labelTextSize: 10,
        labelPadding: 10,
        labelColour: "#db1f83",
        labelRotation: 45,
    };

    barCharts.push(new BarChart(barChart01));
    barCharts.push(new HorizontalBarChart(barChart02));
    barCharts.push(new StackedBarChart(barChart03));
    barCharts.push(new HundredPercentStackedBarChart(barChart04));


    console.log(barCharts);


}

function draw() {
    background(50);
    barCharts.forEach(bar => bar.render())
}

