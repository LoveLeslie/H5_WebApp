// 散点图文组件对象
var H5ComponentPoint = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    var base = cfg.data[0][1];//以第一个数据的比例为大小的 100%

    // 输出每个Point
    $.each(cfg.data, function (idx, item) {
        var point = $('<div class="point point_' + idx + '">');
        var name = $('<div class="name">');
        var rate = $('<div class="rate">');

        name.text(item[0]);
        rate.text((item[1] * 100) + '%');
        name.append(rate);
        point.append(name);

        var per = (item[1] / base * 100) + '%';
        var leftToCenter = 50 - (parseInt(per) / 2) + '%';
        var topToCenter = 50 - (parseInt(per) / 2) + '%';

        point.width(per).height(per);

        if (item[2]) {
            point.css('backgroundColor', item[2]);
        }

        //  设置zIndex、初始位置
        point.css('zIndex', 100 - idx);
        point.css('left', leftToCenter).css('top', topToCenter);

        component.on('afterLoad', function () {
            if (item[3] !== undefined && item[4] !== undefined) {
                point.delay(idx * 500).animate({'left': item[3], 'top': item[4]});
            }
        });

        component.on('onLeave', function () {
            point.animate({'left': leftToCenter, 'top': topToCenter});
        });

        component.append(point);
    });

    return component;
};