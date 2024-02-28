class StackedBarChart {
    // Constructor to initialize the chart with provided configuration object (obj)
    constructor(obj) {
        // Initialize properties with provided values or defaults
        this.data = obj.data;
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.axisLineColour = obj.axisLineColour;
        this.barWidth = 20;
        this.yValues = obj.yValues;
        this.xValue = obj.xValue;
        this.yLabel = obj.yLabel;
        this.xLabel = obj.xLabel;
        this.labelTextSize = obj.labelTextSize;
        this.labelPadding = obj.labelPadding;
        this.labelColour = obj.labelColour;
        this.labelRotation = obj.labelRotation;
        this.xyLabelRotation = obj.xyLabelRotation;
        this.barColours = ["#add2e4", "#FFC0CB"];
        this.labelStroke = obj.labelStroke;
        this.chartName = obj.chartName;
    }

    // Function to calculate the maximum value in the data for scaling purposes
    calculateDataMax() {
        return this.yValues.reduce((acc, yVal) => {
            let maxVal = Math.max(...this.data.map(row => +row[yVal]));
            return acc + maxVal;
        }, 0);
    }

    // Function to render horizontal axis lines
    renderAxisLines() {
        push();
        translate(this.xPos, this.yPos);
        stroke(this.axisLineColour);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);
        pop();
    }

    // Function to render stacked bars on the chart
    renderBars() {
        let dataMax = this.calculateDataMax();
        let scale = this.chartHeight / dataMax;
        let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1);
        let labels = this.data.map(d => d[this.xValue]);

        push();
        translate(this.xPos + gap, this.yPos);

        for (let i = 0; i < this.data.length; i++) {
            push();
            for (let j = 0; j < this.yValues.length; j++) { // Loop through each stacked value (e.g., Male, Female)
                fill(this.barColours[j]);
                rect(0, 0, this.barWidth, -this.data[i][this.yValues[j]] * scale); // Draw a rectangle (bar) based on the data value and scale
                translate(0, -this.data[i][this.yValues[j]] * scale); // Move the drawing position for the next stacked bar
            }
            pop();

            textSize(this.labelTextSize);
            noStroke();
            fill(this.labelColour);
            textAlign(LEFT, CENTER);

            push();
            translate(this.barWidth / 2, this.labelPadding);
            rotate(this.labelRotation);
            text(labels[i], -5, 10);
            pop();

            translate(gap + this.barWidth, 0);
        }
        pop();
    }

    // Function to render tick marks and labels on the vertical axis
    renderTicks() {
        const tickGap = this.chartHeight / 5;
        const tickValue = this.calculateDataMax() / 5;

        push();
        translate(this.xPos, this.yPos);

        for (let i = 0; i <= 5; i++) {
            stroke(255);
            line(0, -i * tickGap, -20, -i * tickGap);
            textSize(this.labelTextSize);
            noStroke();
            fill(this.labelColour);
            textAlign(RIGHT, CENTER);
            text(round(tickValue * i), -20, -i * tickGap);
        }
        pop();
    }

    // Function to render the chart name above the chart
    renderChartName() {
        push();
        translate(this.xPos + this.chartWidth / 2, this.yPos - 30);
        textSize(20);
        fill(this.labelColour);
        textAlign(CENTER, CENTER);
        text(this.chartName, 5, -200);
        pop();
    }

    // Function to render additional labels or elements, in this case, rotating text
    renderLabels() {
        push();
        translate(this.xPos, this.yPos);
        rotate(this.xyLabelRotation);
        stroke(255);
        pop();
    }

    // Main rendering function that calls other rendering functions
    render() {
        this.renderAxisLines();
        this.renderBars();
        this.renderTicks();
        this.renderLabels();
        this.renderChartName();
    }
}
