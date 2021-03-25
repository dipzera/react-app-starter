import * as React from "react";
import { useRef, useEffect, CSSProperties } from "react";
import { Card } from "antd";
import ApexChart from "react-apexcharts";
import {
  apexLineChartDefaultOption,
  apexBarChartDefaultOption,
  apexAreaChartDefaultOption,
} from "../../../constants/ChartConstant";
import ReactResizeDetector from "react-resize-detector";

interface IStylesDictionary {
  [key: string]: CSSProperties;
}

interface ChartWidgetProps {
  title?: string | JSX.Element;
  series: any[];
  xAxis?: any[];
  customOptions?: any;
  width?: string | number;
  height?: string | number;
  card?: boolean;
  type?:
    | "line"
    | "area"
    | "bar"
    | "histogram"
    | "pie"
    | "donut"
    | "rangeBar"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "radar"
    | "polarArea";
  extra?: any;
}

const styles: IStylesDictionary = {
  titleStyle: {
    position: "absolute",
    zIndex: 1,
  },
  extraStyle: {
    position: "absolute",
    zIndex: 1,
    right: "0",
    top: "-2px",
  },
};

const getChartTypeDefaultOption = (type: ChartWidgetProps["type"]) => {
  switch (type) {
    case "line":
      return apexLineChartDefaultOption;
    case "bar":
      return apexBarChartDefaultOption;
    case "area":
      return apexAreaChartDefaultOption;
    default:
      return apexLineChartDefaultOption;
  }
};

const ChartWidget = ({
  title,
  series,
  width,
  height,
  xAxis,
  customOptions,
  card,
  type,
  extra,
}: ChartWidgetProps) => {
  let options: { [key: string]: any } = getChartTypeDefaultOption(type);
  const isMobile = window.innerWidth < 768;
  const chartRef = useRef(null);

  const setLegendOffset = () => {
    if (chartRef.current) {
      // @ts-ignore
      const lengend = chartRef.current.querySelectorAll(
        "div.apexcharts-legend"
      )[0];
      lengend.style.marginRight = `${
        isMobile ? 0 : extraRef.current!["offsetWidth"]
      }px`;
      if (isMobile) {
        lengend.style.position = "relative";
        lengend.style.top = 0;
        lengend.style.justifyContent = "start";
        lengend.style.padding = 0;
      }
    }
  };
  useEffect(() => {
    setLegendOffset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const extraRef = useRef(null);

  options.xaxis.categories = xAxis;
  if (customOptions) {
    options = { ...options, ...customOptions };
  }

  const onResize: any = (): any => {
    setTimeout(() => {
      setLegendOffset();
    }, 600);
  };

  const renderChart = (
    <ReactResizeDetector onResize={onResize()}>
      <div className="chartRef" ref={chartRef}>
        <ApexChart
          options={options}
          type={type}
          series={series}
          width={width}
          height={height}
        />
      </div>
    </ReactResizeDetector>
  );

  return (
    <>
      {card ? (
        <Card>
          <div className="position-relative">
            {<div style={!isMobile ? styles.titleStyle : {}}>{title}</div> && (
              <h4
                className="font-weight-bold"
                style={!isMobile ? styles.titleStyle : {}}
              >
                {title}
              </h4>
            )}
            {extra && (
              <div ref={extraRef} style={!isMobile ? styles.extraStyle : {}}>
                {extra}
              </div>
            )}
            {renderChart}
          </div>
        </Card>
      ) : (
        renderChart
      )}
    </>
  );
};

export default ChartWidget;
