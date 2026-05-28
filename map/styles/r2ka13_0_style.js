var size = 0;
var placement = 'point';

var style_r2ka13_0 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var value = feature.get("tokyo_safety_scored_log_対数_危険度レベル");
    var labelFont = "13.0px \'Open Sans\', sans-serif";
    var labelFill = "#323232";
    var bufferColor = "#fafafa";
    var bufferWidth = 3.0;
    var textAlign = "left";
    var offsetX = 0;
    var offsetY = 0;
    var placement = 'point';
    if (feature.get("地域名") !== null && resolution > 0 && resolution < 14) {
        labelText = String(feature.get("地域名"));
    }
    if (value >= 0.000000 && value <= 0.310000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(255,255,255,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 0.310000 && value <= 0.780000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(238,227,227,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 0.780000 && value <= 1.050000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(221,198,198,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 1.050000 && value <= 1.290000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(204,170,170,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 1.290000 && value <= 1.520000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(188,142,142,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 1.520000 && value <= 1.760000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(171,113,113,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 1.760000 && value <= 2.020000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(154,85,85,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 2.020000 && value <= 2.330000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(137,57,57,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 2.330000 && value <= 2.780000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(120,28,28,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 2.780000 && value <= 4.720000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(103,0,0,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    };

    return style;
};
