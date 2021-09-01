import { Component, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts"; 
import  am4themes_animated from "@amcharts/amcharts4/themes/animated"

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amtry1';
  private chart!: am4charts.XYChart;
  constructor(private zone: NgZone) {};

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("Line-chart", am4charts.XYChart);
      let title = chart.titles.create();
      title.text = "Product Sales by Area";

      let data = [
        { "area": "Florida", "computers": 20, "cars": 50, "boats": 10 },
        { "area": "Alabama", "computers": 50, "cars": 150, "boats": 10 },
        { "area": "Virginia", "computers": 120, "cars": 50, "boats": 80 },
        { "area": "Arizona", "computers": 18, "cars": 60, "boats": 20 },
        { "area": "Colorado", "computers": 60, "cars": 90, "boats": 5 }
      ];

      chart.data = data;

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.title.text = "Area";
      categoryAxis.dataFields.category = "area";

      let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis()) ;
      valueAxisY.title.text = "Sales";
      valueAxisY.renderer.minWidth = 20;

      let seriesNames = ["computers", "cars", "boats"];
      for (let i=0; i<3; i++) {
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.categoryX = "area";
        series.dataFields.valueY = seriesNames[i];
        series.name = seriesNames[i];

        let bullet= series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 5;
        bullet.tooltipText = "Area: {categoryX} \n Sales: {valueY} {name}";

      }
      
      chart.legend = new am4charts.Legend();
      this.chart = chart;

    })
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if(this.chart){
        this.chart.dispose();
      }

    })
  }
}
