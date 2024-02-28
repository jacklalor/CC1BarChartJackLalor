
class BarChart {
    constructor(obj) {
        this.data = obj.data;
        this.yValue = obj.yValue;
        this.xValue = obj.xValue;
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.axisLineColour = obj.axisLineColour;
        this.labelTextSize = obj.labelTextSize;
        this.labelPadding = obj.labelPadding;
        this.labelColour = obj.labelColour;
        this.labelRotation = obj.labelRotation;
        this.barWidth = obj.barWidth;
        this.chartType = obj.chartType;
    }

    render() {
        push();
        translate(this.xPos, this.yPos);
        stroke(this.axisLineColour);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);

        // Draw label on top only once
        fill(this.labelColour);
        noStroke();
        textSize(this.labelTextSize + 10);
        textAlign(CENTER, BOTTOM);
        text("Births For Both Sexes", this.chartWidth / 2, -this.chartHeight - this.labelPadding - 10);

        let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1);
        let labels = this.data.map(d => d[this.xValue]);
        let scale = this.chartType === "Vertical" ? this.chartHeight / max(this.data.map(d => d[this.yValue])) : this.chartWidth / max(this.data.map(row => +row[this.yValue]));

        if (this.chartType === "Vertical") {
            // Vertical barchart
            push();
            translate(gap, 0);

            for (let i = 0; i < this.data.length; i++) {
                fill("#db701f");
                noStroke();
                rect(0, 0, this.barWidth, -this.data[i][this.yValue] * scale);

                fill(this.labelColour);
                noStroke();
                textSize(this.labelTextSize);
                textAlign(CENTER, CENTER);

                push();
                translate(this.barWidth / 2, this.labelPadding * 2);
                push();
                rotate(this.labelRotation);
                text(labels[i], 0, 0);
                pop();
                pop();

                translate(gap + this.barWidth, 0);
            }

            pop();

            let tickGap = this.chartHeight / 5;
            let maxTickValue = max(this.data.map(d => d[this.yValue]));
            let tickValue = maxTickValue / 5;

            for (let i = 0; i <= 5; i++) {
                stroke("#fff");
                line(0, -i * tickGap, -20, -i * tickGap);

                fill(this.labelColour);
                noStroke();
                textSize(this.labelTextSize);
                textAlign(RIGHT, CENTER);

                let currentTickValue = Math.round(tickValue * i);
                text(currentTickValue, -20, -i * tickGap);
            }
        } 
        
    }
}

            

      




