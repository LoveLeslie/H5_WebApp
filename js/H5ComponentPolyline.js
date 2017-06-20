// 折线图文组件对象
var H5ComponentPolyline = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    // 绘制网格线
    var w = cfg.width;
    var h = cfg.height;

    // 加入一个画布，背景层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w + 40;
    cns.height = ctx.height = h;
    component.append(cns);

    // 水平网格线 100份 5份
    var step = 5;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#d7d7d7";
    window.ctx = ctx;
    ctx.beginPath();
    for (i = 0; i < step + 1; i++) {
        y = h / step * i;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    ctx.stroke();

    // 填充网格
    ctx.fillStyle = '#99c0ff';
    ctx.fillRect(0, 0, w, h / step);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, h / step, w, 2 * h / step);
    ctx.fillStyle = '#99c0ff';
    ctx.fillRect(0, 2 * h / step, w, 3 * h / step);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 3 * h / step, w, 4 * h / step);
    ctx.fillStyle = '#99c0ff';
    ctx.fillRect(0, 4 * h / step, w, 5 * h / step);

    // 垂直网格线 根据项目的个数分
    step = cfg.data.length - 1;
    var name_w = w / step >> 0;

    for (i = 0; i < step + 1; i++) {
        var x = w / step * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.closePath();

        if (cfg.data[i]) {
            var text = $('<div class="name">');
            text.text(cfg.data[i][0]);
            text.css('width', name_w / 2).css('left', x / 2 - name_w / 4);
            text.css('transition', 'all 1s ' + (1.5 + i * .2) + 's');
            component.append(text);
        }
    }
    ctx.stroke();

    // 加入一个画布，数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w + 40;
    cns.height = ctx.height = h;
    component.append(cns);

    // 绘制折线以及对应数据的动画
    // @param {float} per 0—1之间的数值，会根据per 绘制数据变化的中间状态
    var draw = function (per) {
        //清空画布
        ctx.clearRect(0, 0, w + 40, h);

        // 绘制折线数据
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#ff8878";

        var x = 0;
        var y = 0;
        var row_w = ( w / (cfg.data.length - 1));

        //画点
        for (var i = 0; i < cfg.data.length; i++) {
            var item = cfg.data[i];
            x = row_w * i;
            y = h * (1 - item[1] * per);
            ctx.moveTo(x, y);
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
            ctx.fillStyle = '#ff8878';
            ctx.closePath();
            ctx.fill();
        }

        //连线
        ctx.moveTo(0, h * (1 - cfg.data[0][1] * per));
        for (var i = 0; i < cfg.data.length; i++) {
            x = row_w * i;
            y = h * (1 - cfg.data[i][1] * per);
            ctx.lineTo(x, y);
        }
        ctx.stroke();

        //绘制阴影
        ctx.lineTo(x, h);
        ctx.lineTo(0, h);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0)';
        ctx.fillStyle = 'rgba(255, 136, 120, .4)';
        ctx.fill();
        ctx.stroke();

        //写数据
        for (var i = 0; i < cfg.data.length; i++) {
            var item = cfg.data[i];
            x = row_w * i;
            y = h * (1 - item[1] * per);
            ctx.font = '16px';
            ctx.fillStyle = item[2] ? item[2] : '#595959';
            ctx.fillText(((item[1] * 100) >> 0 ) + '%', x, y - 10);
            ctx.font = "20px Arial";
        }
    };


    component.on('afterLoad', function () {
        //折线图生长动画
        var s = 0;
        for (var i = 0; i < 100; i++) {
            setTimeout(function () {
                s += .01;
                draw(s);
            }, i * 10 + 500);
        }
    });

    component.on('onLeave', function () {
        //折线图退场动画
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