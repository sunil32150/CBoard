/**
 * Created by jintian on 2017/8/7.
 *
 */

var echartsBasicOption = {
    title: {},
    grid: {
        left: '50',
        right: '20',
        bottom: '15%',
        top: '20%',
        containLabel: false
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        x: 'left',
        itemWidth: 15,
        itemHeight: 10
    }
};

var CBoardHeatMapRender = function (jqContainer, options, isDeepSpec) {
    this.container = jqContainer; // jquery object
    var heatMap = jqContainer.get(0);
    $(heatMap).css("width", "100%");
    //判断是否在大屏中显示
    if(!heatMap.id.endsWith("_01")){
        $(heatMap).css("height", "500px");
    }
    this.ecc = echarts.init(jqContainer.get(0), this.theme);
    this.isDeppSpec = isDeepSpec;

    this.basicOption = echartsBasicOption;
    this.options = options;
};

//CBoardHeatMapRender.prototype.theme = "dark"; // 主题

var changeTheme1 = function(themeName) {
	CBoardHeatMapRender.prototype.theme = themeName; 
}


CBoardHeatMapRender.prototype.chart = function (group, persist) {
    var self = this;
    var options = this.isDeppSpec == true ? self.options : $.extend(true, {}, self.basicOption, self.options);
    if (options.visualMap != undefined) {
        $(this.jqContainer).css({
            height: 500 + "px",
            width: '100%'
        });
    }
    if (options.legend.data && options.legend.data.length > 35) {
        options.grid.top = '5%';
        options.legend.show = false;
    }
    if (persist) {
        options.animation = false;
    }
    self.ecc.setOption(options);
    self.changeSize(self.ecc);
    self.container.resize(function (e) {
        self.ecc.resize();
        self.changeSize(self.ecc);
    }); // 图表大小自适应
    if (group) {
        self.ecc.group = group;
        echarts.connect(group);
    }
    if (persist) {
        setTimeout(function () {
            persist.data = self.ecc.getDataURL({
                type: 'jpeg',
                pixelRatio: 2,
                backgroundColor: '#fff'
            });
            persist.type = "jpg";
            persist.widgetType = "echarts";
        }, 1000);
    }
    return function (o) {
        o = $.extend(true, {}, self.basicOption, o)
        self.ecc.setOption(o, true);
    }
};

CBoardHeatMapRender.prototype.changeSize = function (instance) {
    var o = instance.getOption();
    var seriesType = o.series[0] ? o.series[0].type : null;
    if (seriesType == 'pie') {
        var l = o.series.length;
        var b = instance.getWidth() / (l + 1 + l * 8)
        for (var i = 0; i < l; i++) {
            if ((b * 8) < (instance.getHeight() * 0.75)) {
                o.series[i].radius = [0, b * 4];
            } else {
                o.series[i].radius = [0, '75%'];
            }
        }
        instance.setOption(o);
    }

};
