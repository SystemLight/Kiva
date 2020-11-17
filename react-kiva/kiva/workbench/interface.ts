import {ReactNode} from "react";

export interface IWorkbenchProps {
    children: ReactNode,
    topBar?: ReactNode,
    breadcrumb?: ReactNode,
    menus: ReactNode,
    footer?: ReactNode,
    logoUrl: string,
    tabs?: ITabs,
    onTabRemove?: (activeKey: string) => void
}

export interface ITabs {
    [to: string]: {title: string}
}

export interface INavData {
    key: string,
    title: string,
    path?: string,
    icon?: ReactNode,
    items?: INavData[]
}

export interface IMenusProps {
    navs: INavData[]
}

export interface IBreadcrumbItem {
    key: string,
    title: string,
}

export interface IBreadcrumbProps {
    items: IBreadcrumbItem[]
}
