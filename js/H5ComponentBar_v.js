// 垂直柱图组件对象

var H5ComponentBar_v = function (name, cfg) {
    //  component 的初始化定义
    var component = new H5ComponentBar(name, cfg);

    //  完成 width 每个柱图中项目的宽度计算。
    var width = Math.floor(100 / cfg.data.length) + '%';
    component.find('.line').width(width);

    $.each(component.find('.rate'), function () {
        var w = $(this).css('width');
        // 把进度区的宽度重设为高度，并且取消原来的宽度
        $(this).height(w).width('');
    });

    $.each(component.find('.per'), function () {
        //  把(.per)添加到 (.rate)中。
        $(this).appendTo($(this).prev());
    });

    return component;
};