import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NAV_TYPE_TOP } from "constants/ThemeConstant";
import { IState } from "redux/reducers";
import { ITheme } from "redux/reducers/Theme";

interface IStyle {
  [key: string]: string | number;
}

interface IPageHeaderAlt {
  children?: any;
  background?: any;
  className?: any;
  overlap?: any;
  navType?: any;
}
export const PageHeaderAlt = ({
  children,
  background,
  className,
  overlap,
  navType,
}: IPageHeaderAlt) => {
  const [widthOffset, setWidthOffset] = useState(0);
  const ref = useRef<any>(null);
  useEffect(() => {
    if (navType === NAV_TYPE_TOP) {
      const windowSize = window.innerWidth;
      const pageHeaderSize = ref!.current.offsetWidth;
      setWidthOffset((windowSize - pageHeaderSize) / 2);
    }
  }, [navType]);

  const getStyle = () => {
    let style = {
      backgroundImage: background ? `url(${background})` : "none",
    } as IStyle;
    if (navType === NAV_TYPE_TOP) {
      style.marginRight = -widthOffset;
      style.marginLeft = -widthOffset;
      style.paddingLeft = 0;
      style.paddingRight = 0;
    }
    return style;
  };

  return (
    <div
      ref={ref}
      className={`page-header-alt ${className ? className : ""} ${
        overlap && "overlap"
      }`}
      style={getStyle()}
    >
      {navType === NAV_TYPE_TOP ? (
        <div className="container">{children}</div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

const mapStateToProps = ({ theme }: IState) => {
  const { navType } = theme as ITheme;
  return { navType };
};

export default connect(mapStateToProps, {})(PageHeaderAlt);
