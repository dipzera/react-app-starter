import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";
import navigationConfig from "configs/NavigationConfig";
import IntlMessage from "components/util-components/IntlMessage";
let breadcrumbData = {
  "/app": <IntlMessage id="home" />,
} as { [key: string]: any };

navigationConfig.forEach((elm, i) => {
  const assignBreadcrumb = (obj: any) =>
    (breadcrumbData[obj.path] = <IntlMessage id={obj.title} />);
  assignBreadcrumb(elm);
  if (elm.submenu) {
    elm.submenu.forEach((elm: any) => {
      assignBreadcrumb(elm);
      if (elm.submenu) {
        elm.submenu.forEach((elm: any) => {
          assignBreadcrumb(elm);
        });
      }
    });
  }
});

const BreadcrumbRoute = withRouter((props) => {
  const { location } = props;
  const pathSnippets = location.pathname.split("/").filter((i: any) => i);
  const buildBreadcrumb = pathSnippets.map((_: any, index: any) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        {/*<Link to={url}>{breadcrumbData[url]}</Link>*/}
      </Breadcrumb.Item>
    );
  });

  return <Breadcrumb>{buildBreadcrumb}</Breadcrumb>;
});

export class AppBreadcrumb extends Component {
  render() {
    return <BreadcrumbRoute />;
  }
}

export default AppBreadcrumb;
