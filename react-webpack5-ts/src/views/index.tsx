import React, {memo} from "react";
import {useLocation} from "react-router-dom";
import {Alert} from "antd";

import {RouteView} from "@c/routeView";
import {R404Page} from "@c/errorBoundary/404";
import {useUrlBreadcrumbItems, RootBreadcrumb, RootMenus, Workbench} from "@c/workbench";
import {useObserved} from "@c/useHooks";
import {navs, routes} from "@/config";

export const Welcome = memo(function() {
    return (
        <div style={{padding: 15}}>
            <Alert
                message="管理首页"
                description="欢迎进入管理首页 !"
                type="info"
            />
        </div>
    );
}, () => true);

const welcomeRoute = {
    key: "welcome",
    path: "/",
    exact: true,
    component: Welcome
};

export default function RootPage() {
    useObserved("RootPage");

    const {pathname} = useLocation();
    const breadcrumbItems = useUrlBreadcrumbItems(pathname, navs);

    return (
        <Workbench
            breadcrumb={<RootBreadcrumb items={breadcrumbItems} />}
            menus={<RootMenus navs={navs} />} logoUrl={"/logo.png"}
        >
            <RouteView before={welcomeRoute} routes={routes[0].subRoute}>{R404Page}</RouteView>
        </Workbench>
    );
}
