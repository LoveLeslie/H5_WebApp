// 饼图文组件对象
var H5ComponentPie = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    // 绘制网格线
    var w = cfg.width;
    var h = cfg.height;
    var r = w / 2;

    // 加入一个画布 绘制底图层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 1);
    component.append(cns);

    ctx.beginPath();
    ctx.fillStyle = '#99c0ff';
    ctx.strokeStyle = '#99c0ff';
    ctx.lineWidth = 1;
    ctx.arc(r, r, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // 加入一个画布 数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 2);
    component.append(cns);

    var colors = ['red', 'green', 'blue', 'orange', 'gray'];
    var sAngel = 1.5 * Math.PI; //圆弧起始角度 定到12点处
    var eAngel = 0;//圆弧结束角度
    var aAngel = 2 * Math.PI;//百分百结束角度

    var step = cfg.data.length;
    for (var i = 0; i < step; i++) {
        var item = cfg.data[i];
        var color = item[2] || ( item[2] = colors.pop());
        eAngel = sAngel + aAngel * item[1];

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = .1;

        ctx.moveTo(r, r);
        ctx.arc(r, r, r, sAngel, eAngel);
        ctx.fill();
        ctx.stroke();

        sAngel = eAngel;

        //加入项目名称以及百分比
        var text = $('<div class="name">');
        var per = $('<div class="per">');

        text.text(cfg.data[i][0]);
        per.text(cfg.data[i][1] * 100 + '%');

        text.append(per);


        var x = r + r * Math.cos(eAngel);
        var y = r + r * Math.sin(eAngel);

        if (x > w / 2) {
            text.css('left', x / 2);
        } else {
            text.css('right', (w - x) / 2);
        }

        if (y > h / 2) {
            text.css('top', y / 2);
        } else {
            text.css('bottom', (h - y) / 2);
        }

        text.css('transition', 'all 1s ' + (1.5 + i * .2) + 's');
        component.append(text);
    }

    // 加入一个画布 绘制蒙版层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 3);
    component.append(cns);

    ctx.fillStyle = '#eee';
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;

    //生长动画
    var draw = function (per) {
        //清除画布
        ctx.clearRect(0, 0, w, h);

        ctx.beginPath();
        ctx.moveTo(r, r);
        if (per <= 0) {
            ctx.arc(r, r, r, 0, 2 * Math.PI);
        } else {
            ctx.arc(r, r, r, sAngel, sAngel + 2 * Math.PI * per, true);
        }
        ctx.fill();
        ctx.stroke();
    };

    component.on('afterLoad', function () {
        //饼图生长动画
        var s = 0;
        for (var i = 0; i < 100; i++) {
            setTimeout(function () {
                s += .01;
                draw(s);
            }, i * 10 + 500);
        }
    });

    component.on('onLeave', function () {
        //饼图退场动画
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