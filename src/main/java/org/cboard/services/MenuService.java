package org.cboard.services;

import org.cboard.dto.DashboardMenu;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpSession;
import javax.sql.RowSet;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by yfyuan on 2016/12/21.
 */
@Repository
public class MenuService {

    private static List<DashboardMenu> menuList = new ArrayList<>();

    static {
        menuList.add(new DashboardMenu(1, -1, "SIDEBAR.CONFIG", "config"));
        menuList.add(new DashboardMenu(2, 1, "SIDEBAR.DATA_SOURCE", "config.datasource"));
        menuList.add(new DashboardMenu(3, 1, "SIDEBAR.DATASET", "config.dataset"));
        menuList.add(new DashboardMenu(4, 1, "SIDEBAR.WIDGET", "config.widget"));
        menuList.add(new DashboardMenu(5, 1, "SIDEBAR.DASHBOARD", "config.board"));
        menuList.add(new DashboardMenu(6, 1, "SIDEBAR.DASHBOARD_CATEGORY", "config.category"));
        menuList.add(new DashboardMenu(7, -1, "SIDEBAR.ADMIN", "admin"));
        menuList.add(new DashboardMenu(8, 7, "SIDEBAR.USER_ADMIN", "admin.user"));
        //left navigation bar, new link(Role)added under 'ADMIN'
        menuList.add(new DashboardMenu(9, 7, "SIDEBAR.ROLE_ADMIN", "admin.role"));
        menuList.add(new DashboardMenu(10, 1, "SIDEBAR.JOB", "config.job"));
        menuList.add(new DashboardMenu(11, 1, "SIDEBAR.SHARE_RESOURCE", "config.role"));
        menuList.add(new DashboardMenu(12, 1, "SIDEBAR.C_DASHBOARD", "dashboard.dashBoard"));
        menuList.add(new DashboardMenu(13, 1, "SIDEBAR.MY_DASHBOARD", "dashboard.myDashBoard"));
        menuList.add(new DashboardMenu(14, 1, "SIDEBAR.HOMEPAGE", "config.homepage"));

    }

    public List<DashboardMenu> getMenuList() {
        return menuList;
    }

}
