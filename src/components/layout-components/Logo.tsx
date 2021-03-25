import * as React from "react";
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_TYPE_TOP,
} from "constants/ThemeConstant";
import { APP_NAME } from "configs/AppConfig";
import { connect } from "react-redux";
import utils from "utils";
import { Grid } from "antd";
import { ITheme } from "redux/reducers/Theme";
import { IState } from "redux/reducers";

interface IGetLogo {
  navCollapsed: boolean;
  logoType: "light" | "dark";
}
const { useBreakpoint } = Grid;

const getLogoWidthGutter = (props: any, isMobile: boolean) => {
  const { navCollapsed, navType } = props;
  const isNavTop = navType === NAV_TYPE_TOP ? true : false;
  if (isMobile && !props.mobileLogo) {
    return 0;
  }
  if (isNavTop) {
    return "auto";
  }
  if (navCollapsed) {
    return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
  } else {
    return `${SIDE_NAV_WIDTH}px`;
  }
};

const getLogo = ({ navCollapsed, logoType }: IGetLogo) => {
  if (logoType === "light") {
    if (navCollapsed) {
      return process.env.PUBLIC_URL + "/img/rsz_is_logo-efactura.png";
    }
    return process.env.PUBLIC_URL + "/img/is_logo-efactura.png";
  }

  if (navCollapsed) {
    return process.env.PUBLIC_URL + "/img/rsz_is-logo-dark.png";
  }
  return process.env.PUBLIC_URL + "/img/is-logo-dark.png";
};

const getLogoDisplay = (isMobile: boolean, mobileLogo: boolean) => {
  if (isMobile && !mobileLogo) {
    return "d-none";
  } else {
    return "logo";
  }
};

export const Logo = (props: any) => {
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  return (
    <div
      className={getLogoDisplay(isMobile, props.mobileLogo)}
      style={{ width: `${getLogoWidthGutter(props, isMobile)}` }}
    >
      <img src={getLogo(props)} alt={`${APP_NAME} logo`} />
    </div>
  );
};

const mapStateToProps = ({ theme }: IState) => {
  const { navCollapsed, navType } = theme as ITheme;
  return { navCollapsed, navType };
};

export default connect(mapStateToProps)(Logo);
