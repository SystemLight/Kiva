import React, {memo, useState} from "react";
import {Breadcrumb, Layout, Menu} from "antd";
import {MenuFoldOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import styled from "styled-components";

import {IBreadcrumbProps, IMenusProps, IWorkbenchProps} from "./interface";
import {getMenuItem} from "./utils";

const {Sider, Header, Footer, Content} = Layout;

const DarkLayout = styled(Layout)`
    min-height: 100vh;

    .logo {
        height: 45px;
        background: url("${({$logoUrl}: {$logoUrl: string}) => $logoUrl}") no-repeat 30% 0;
        background-size: auto 100%;
        margin: 15px;
    }

    .sider-fixed {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        height: 100%;
        overflow: auto;
        overflow-x: hidden;
        box-shadow: 2px 0 8px 0 rgba(29, 35, 41, .05);

        .ant-layout-sider-children {
            display: flex;
            flex-direction: column;
            height: 100%;

            & ::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }

            & ::-webkit-scrollbar-thumb {
                background: hsla(0, 0%, 100%, .15);
                border-radius: 3px;
                -webkit-box-shadow: inset 0 0 5px rgba(37, 37, 37, .05);
            }

            & ::-webkit-scrollbar-track {
                background: hsla(0, 0%, 100%, .15);
                border-radius: 3px;
                -webkit-box-shadow: inset 0 0 5px rgba(37, 37, 37, .05);
            }
        }
    }

    .site-layout-header {
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
        height: 48px;
        line-height: 48px;

        & > .header-wrap {
            display: flex;
            padding: 0 16px;

            .header-placeholder {
                flex: 1 1 0;
            }
        }
    }

    .site-layout-background {
        background: #FFFFFF;
    }
`;

const PseudoSider = styled.div`
    overflow: hidden;
    width: ${(props: {$siderWidth: number}) => props.$siderWidth}px;
    max-width: ${(props) => props.$siderWidth}px;
    min-width: ${(props) => props.$siderWidth}px;
    flex: 0 0 ${(props) => props.$siderWidth}px;
`;

export const DarkBreadcrumb = memo(function({items}: IBreadcrumbProps) {
    return (
        <Breadcrumb style={{margin: "16px 0"}}>
            {
                items.map((v, i) => (
                    <Breadcrumb.Item key={v.key}>{v.title}</Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
    );
}, (oldProps, newProps) => {
    return oldProps.items === newProps.items;
});

export const DarkMenus = memo(function({prefix, navs}: IMenusProps) {
    const {pathname} = useLocation();
    const pathnameList = pathname.split("/");

    return (
        <Menu
            defaultOpenKeys={pathnameList} defaultSelectedKeys={pathnameList}
            theme="dark" mode="inline" inlineIndent={16}
        >
            {
                navs.map((v, i) => v.items ? (
                    <Menu.SubMenu key={v.key} title={v.title} icon={v.icon}>
                        {v.items.map((c, ci) => getMenuItem(prefix, c, ci, `/${v.key}/${c.key}`))}
                    </Menu.SubMenu>
                ) : getMenuItem(prefix, v, i, `/${v.key}`))
            }
        </Menu>
    );
}, (oldProps, newProps) => {
    return oldProps.navs === newProps.navs;
});

/*
    暗黑系后台管理外层结构组件
 */
export function DarkWorkbench({logoUrl, breadcrumb, menus, topBar, children, footer}: IWorkbenchProps) {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <DarkLayout $logoUrl={logoUrl}>
            <PseudoSider $siderWidth={collapsed ? 80 : 200} />
            <Sider
                collapsible={true} collapsed={collapsed} onCollapse={(collapsed) => setCollapsed(collapsed)}
                trigger={<MenuFoldOutlined />} className={"sider-fixed"} collapsedWidth={80}
            >
                <Link to="/">
                    <div className="logo" style={{
                        backgroundPositionX: collapsed ? 4 : "30%"
                    }} />
                </Link>
                <div style={{flex: "1 1 0", overflow: "hidden auto"}}>{menus}</div>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background site-layout-header" style={{padding: 0}}>
                    <div className={"header-wrap"}>
                        <div className={"header-placeholder"} />
                        <div className={"header-right"}>
                            {topBar}
                        </div>
                    </div>
                </Header>
                <Content style={{margin: "0 16px"}}>
                    {breadcrumb}
                    <div className="site-layout-background" style={{minHeight: 380}}>
                        {children}
                    </div>
                </Content>
                <Footer style={{textAlign: "center"}}>{footer}</Footer>
            </Layout>
        </DarkLayout>
    );
}
