class HorizontalBarChart {
  // Constructor for initializing the chart with provided configuration
  constructor(obj) {
    this.data = obj.data;
    this.chartWidth = obj.chartWidth;
    this.chartHeight = obj.chartHeight;
    this.xPos = obj.xPos;
    this.yPos = obj.yPos;
    this.axisLineColour = obj.axisLineColour;
    this.barWidth = obj.barWidth;
    this.labelTextSize = obj.labelTextSize;
    this.labelPadding = obj.labelPadding;
    this.labelColour = obj.labelColour;
    this.labelRotation = obj.labelRotation;
    this.yValue = obj.yValue;
    this.xValue = obj.xValue;
    this.chartName = obj.chartName;
  }

  // Rendering function to display the horizontal bar chart
  render() {
    push();
    // Translate to the specified position
    translate(this.xPos, this.yPos);

    // Draw x-axis line
    stroke(this.axisLineColour);
    line(0, 0, this.chartWidth, 0);

    // Draw y-axis line
    line(0, 0, 0, -this.chartHeight);

    // Display chartName on top of the chart
    textSize(20); // Adjust the size as needed
    textAlign(CENTER, BOTTOM);
    fill(this.labelColour);
    noStroke()
    text("Births For Both Sexes", this.chartWidth / 2, -this.chartHeight - 10); // Adjust the position as needed


    // Calculate gap between bars
    let gap = (this.chartHeight - this.data.length * this.barWidth) / (this.data.length + 1);

    // Extract labels and calculate scale for bars
    let labels = this.data.map((d) => d[this.yValue]);
    let scale = this.chartWidth / max(this.data.map((d) => d[this.xValue]));

    // Draw the horizontal elements, bars, and labels
    push();
    translate(0, -gap);

    // Set common styling for labels
    noStroke();
    textSize(17.5);
    textSize(this.labelTextSize);
    stroke(255);
    strokeWeight(this.labelStroke);

    for (let i = 0; i < this.data.length; i++) {
      // Draw rectangle bars
      stroke(255);
      fill("#db701f");
      rect(0, 0, this.data[i][this.xValue] * scale, -this.barWidth);

      // Draw labels
      textSize(this.labelTextSize);
      noStroke();
      fill(this.labelColour);
      textAlign(RIGHT, CENTER);

      push();
      translate(-this.labelPadding, -this.barWidth / 2);
      // rotate(this.labelRotation);
      text(labels[i], 0, 0);
      pop();

      translate(0, -gap - this.barWidth);
    }
    pop();

    // Draw the vertical elements
    let tickGap = this.chartWidth / 5;
    let tickValue = max(this.data.map((d) => d[this.xValue])) / 5;

    for (let i = 0; i <= 5; i++) {
      stroke(255);
      line(i * tickGap, 0, i * tickGap, 20);
      textSize(this.labelTextSize);
      noStroke();
      fill(this.labelColour);
      textAlign(CENTER, BOTTOM);
      text(round(tickValue * i), i * tickGap, 40);
    }

    // Rotate the chart labels
    rotate(this.labelRotation);
    textSize(this.labelTextSize);
    stroke(255);
    strokeWeight(this.labelStroke);
    pop();
  }
}
