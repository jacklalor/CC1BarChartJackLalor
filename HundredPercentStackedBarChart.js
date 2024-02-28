class HundredPercentStackedBarChart {
    // Constructor to initialize the chart properties with given values
    constructor(obj) {
        this.data = obj.data;
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.axisLineColour = obj.axisLineColour;
        this.barWidth = 20;
        this.labelTextSize = obj.labelTextSize;
        this.labelPadding = obj.labelPadding;
        this.labelColour = obj.labelColour;
        this.labelRotation = obj.labelRotation;
        this.yValues = obj.yValues;
        this.xValue = obj.xValue;
        // this.yLabel = obj.yLabel;
        // this.xLabel = obj.xLabel;
        this.xyLabelRotation = obj.xyLabelRotation;
        this.barColours = ["#add2e4", "#FFC0CB"];
        this.labelStroke = obj.labelStroke;
        this.chartName = obj.chartName;
    }

    // Calculate the maximum data value among all yValues
    calculateDataMax() {
        return this.yValues.reduce((acc, yVal) => acc + Math.max(...this.data.map(row => +row[yVal])), 0);
    }

    // Calculate the total value for each data point by summing yValues
    calculateTotalValues() {
        return this.data.map(row => this.yValues.reduce((sum, y) => sum + +row[y], 0));
    }

    // Render the horizontal axis lines of the chart
    renderAxisLines() {
        push();
        translate(this.xPos, this.yPos);
        stroke(this.axisLineColour);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);
        pop();
    }

    // Render the stacked bars on the chart
    renderBars() {
        const totalValues = this.calculateTotalValues();
        const gap = (this.chartWidth - this.data.length * this.barWidth) / (this.data.length + 1);
        const labels = this.data.map(d => d[this.xValue]);

        push();
        translate(this.xPos + gap, this.yPos);
        textSize(17.5);
        noStroke();
        text(this.chartName, 270, -250);

        for (let i = 0; i < this.data.length; i++) {
            push();
            for (let j = 0; j < this.yValues.length; j++) {
                const scale = this.chartHeight / totalValues[i];
                fill(this.barColours[j]);
                rect(0, 0, this.barWidth, -this.data[i][this.yValues[j]] * scale);
                translate(0, -this.data[i][this.yValues[j]] * scale);
            }
            pop();

            textSize(this.labelTextSize);
            noStroke();
            fill(this.labelColour);
            textAlign(LEFT, CENTER);

            push();
            translate(this.barWidth / 2, this.labelPadding);
            rotate(this.labelRotation);
            text(labels[i], -5, 15);
            pop();

            translate(gap + this.barWidth, 0);
        }
        pop();
    }

    // Render the ticks and labels on the vertical axis
    renderTicks() {
        const tickGap = this.chartHeight / 5;
        const tickValue = 100 / 5;

        push();
        translate(this.xPos, this.yPos);

        for (let i = 0; i <= 5; i++) {
            stroke(255);
            line(0, -i * tickGap, -20, -i * tickGap);
            textSize(this.labelTextSize);
            noStroke();
            fill(this.labelColour);
            textAlign(RIGHT, CENTER);
            text(round(tickValue * i) + "%", -20, -i * tickGap);
        }
        pop();
    }

    // Render the labels on the chart
    renderLabels() {
        push();
        translate(this.xPos, this.yPos);
        rotate(this.xyLabelRotation);
        stroke(255);
        strokeWeight(this.labelStroke);
        pop();
    }

    // Render the entire chart
    render() {
        this.renderAxisLines();
        this.renderBars();
        this.renderTicks();
        this.renderLabels();
    }
}
