import * as React from "react";
import { Card } from "antd";
import ApexChart from "react-apexcharts";
import { apexPieChartDefaultOption } from "constants/ChartConstant";

const defaultOption = apexPieChartDefaultOption;

const Chart = (props: any) => {
  return <ApexChart {...props} />;
};

const DonutChartWidget = (props: any) => {
  const { series, customOptions, labels, width, height, title, extra } = props;
  let options = defaultOption;
  options.labels = labels;
  options.plotOptions.pie.donut.labels.total.label = title;
  if (!title) {
    options.plotOptions.pie.donut.labels.show = false;
  }
  if (customOptions) {
    options = { ...options, ...customOptions };
  }
  return (
    <Card>
      <div className="text-center">
        <Chart
          type="donut"
          options={options}
          series={series}
          width={width}
          height={height}
        />
        {extra}
      </div>
    </Card>
  );
};

export default DonutChartWidget;
