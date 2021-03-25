import * as React from "react";
import { Component } from "react";
import { SlidersOutlined } from "@ant-design/icons";
import { Drawer, Menu } from "antd";
import { connect } from "react-redux";
import ThemeConfigurator from "components/layout-components/ThemeConfigurator";
import IntlMessage from "components/util-components/IntlMessage";
import { Tooltip } from "antd";
import { IState } from "redux/reducers";
import { ITheme } from "redux/reducers/Theme";

class NavPanel extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Menu mode="horizontal">
          <Menu.Item onClick={this.showDrawer}>
            <Tooltip
              title={<IntlMessage id={"sidenav.settings"} />}
              placement="bottom"
            >
              <SlidersOutlined className="nav-icon mr-0" />
            </Tooltip>
          </Menu.Item>
        </Menu>
        <Drawer
          title={<IntlMessage id={"theme.Title"} />}
          placement="right"
          width={400}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <ThemeConfigurator />
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = ({ theme }: IState) => {
  const { locale } = theme as ITheme;
  return { locale };
};

export default connect(mapStateToProps)(NavPanel);
