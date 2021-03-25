import * as React from "react";
import { Drawer } from "antd";
import { connect } from "react-redux";
import { NAV_TYPE_SIDE } from "constants/ThemeConstant";
import { Scrollbars } from "react-custom-scrollbars";
import MenuContent from "components/layout-components/MenuContent";
import { onMobileNavToggle } from "redux/actions/Theme";
import Logo from "components/layout-components/Logo";
import Flex from "components/shared-components/Flex";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ITheme } from "redux/reducers/Theme";
import { IState } from "redux/reducers";

interface MobileNavProps {
  [key: string]: any;
}

export const MobileNav = ({
  sideNavTheme,
  mobileNav,
  onMobileNavToggle,
  routeInfo,
  hideGroupTitle,
  localization = true,
}: MobileNavProps) => {
  const props = { sideNavTheme, routeInfo, hideGroupTitle, localization };

  const onClose = () => {
    onMobileNavToggle(false);
  };

  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={onClose}
      visible={mobileNav}
      bodyStyle={{ padding: 5 }}
    >
      <Flex flexDirection="column" className="h-100">
        <Flex justifyContent="between" alignItems="center">
          <Logo mobileLogo={true} />
          <div className="nav-close" onClick={() => onClose()}>
            <ArrowLeftOutlined />
          </div>
        </Flex>
        <div className="mobile-nav-menu">
          <Scrollbars autoHide>
            <MenuContent type={NAV_TYPE_SIDE} {...props} />
          </Scrollbars>
        </div>
      </Flex>
    </Drawer>
  );
};

const mapStateToProps = ({ theme }: IState) => {
  const { navCollapsed, sideNavTheme, mobileNav } = theme as ITheme;
  return { navCollapsed, sideNavTheme, mobileNav };
};

export default connect(mapStateToProps, { onMobileNavToggle })(MobileNav);
