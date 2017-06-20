// 雷达图文组件对象

var H5ComponentRadar = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    // 绘制网格线
    var w = cfg.width;
    var h = cfg.height;

    // 加入一个画布，背景层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    var r = w / 2;
    var step = cfg.data.length;

    // 绘制网格背景
    var isBlue = false;
    for (var s = 5; s > 0; s--) {
        ctx.beginPath();
        for ( var i = 0; i < step; i++) {
            var rad = (2 * Math.PI) / step * i;
            var x = r + Math.cos(rad) * r * (s / 5);
            var y = r + Math.sin(rad) * r * (s / 5);
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
        ctx.fill();
    }

    // 绘制伞骨
    for (i = 0; i < step; i++) {
        var rad = (2 * Math.PI) / step * i;
        var x = r + Math.cos(rad) * r;
        var y = r + Math.sin(rad) * r;

        ctx.moveTo(r, r);
        ctx.lineTo(x, y);

        //输出项目文字
        var text = $('<div class="name">');
        text.text(cfg.data[i][0]);

        if (x > w / 2) {
            text.css('left', x / 2);
        } else {
            text.css('right', (w - x) / 2);
        }

        if (y > h / 2) {
            text.css('top', y / 2 + 5);
        } else {
            text.css('bottom', (h - y) / 2 + 5);
        }

        if (cfg.data[i][2]) {
            text.css('color', cfg.data[i][2]);
        }

        text.css('transition', 'all 1s ' + (1.5 + i * .2) + 's');
        component.append(text);
    }

    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();


    // 加入一个画布，数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    ctx.strokeStyle = '#f00';
    var draw = function (per) {

        //清除画布
        ctx.clearRect(0, 0, w, h);

        //输出数据折线
        for (i = 0; i < step; i++) {
            var rad = (2 * Math.PI) / step * i;
            var rate = 2 * cfg.data[i][1] * per;
            var x = r + Math.cos(rad) * r * rate;
            var y = r + Math.sin(rad) * r * rate;
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        //输出点
        ctx.fillStyle = '#ff7676';
        for (var i = 0; i < step; i++) {
            var rad = (2 * Math.PI) / step * i;
            var rate = 2 * cfg.data[i][1] * per;
            var x = r + Math.cos(rad) * r * rate;
            var y = r + Math.sin(rad) * r * rate;

            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    };
    draw(0);

    component.on('afterLoad', function () {
        var s = 0;
        for (var i = 0; i < 100; i++) {
            setTimeout(function () {
                s += .01;
                draw(s);
            }, i * 10 + 500);
        }
    });
    component.on('onLeave', function () {
        var s = 1;
        for (var i = 0; i < 100; i++) {
            setTimeout(function () {
                s -= .01;
                draw(s);
            }, i * 10 + 500);
        }
    });

    return component;
};