// 环图文组件对象
var H5ComponentRing = function(name, cfg) {

    // 数据格式化为只有一项
    if (cfg.data.length > 1){
        cfg.data = [cfg.data[0]];
    }

    var component =  new H5ComponentPie(name, cfg);

    // 创建遮罩元素
    var mask = $('<div class="mask">');
    component.append(mask);

    // 在遮罩元素中添加文本，并设置样式
    var text = component.find('.name');
    text.attr('style', '');
    // if(cfg.data[0][2]){
    //     text.css('color',cfg.data[0][2]);
    // }
    mask.append(text);

    return component;
};