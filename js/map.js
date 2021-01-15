//wczytywanie danych
var map = L.map('mapid').setView([54.186, 18.031],7);

map.options.minZoom = 9;
map.options.maxZoom = 11;

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Koszty lekcji religii w gminach i miastach województwa pomorskiego</h4>' +
        '<p>Dane zebrane przez użytkowników grupy <a href="https://www.facebook.com/groups/1584850021763935/">Świecka szkoła Pomorze</a> za pomocą wniosków do lokalnych samorządów o udzielenie informacji publicznej.</p>'
    this._div.innerHTML +=
        '<div>Źródła:</div>'
        + '<div><a href="https://dane.gov.pl/pl/dataset/288,dane-jednostkowe-przedszkoli-szko-i-placowek-oswiatowych-w-latach-2012-2018/resource/26041/table">Liczba uczniów w szkołach.</a></div>'
};

info.addTo(map);

//replace hardcoded colors by table
var LEGENDPALETTE8 = [
    '#53000b',
    '#99000d',
    '#cb181d',
    '#ef3b2c',
    '#fb6a4a',
    '#fc9272',
    '#fcbba1',
    '#fee0d2',
    '#151212'
]

var STATUS = L.geoJson(gminyData, {style: styleStatus, onEachFeature: STATUSonEachFeature}).addTo(map);
var PERSTUDENT = L.geoJson(gminyData, {style: stylePerStudent, onEachFeature: PERSTUDENTonEachFeature});
var COST = L.geoJson(gminyData, {style: styleCost, onEachFeature: COSTonEachFeature});
var PERCITIZEN = L.geoJson(gminyData, {style: stylePerCitizen, onEachFeature: PERCITIZENonEachFeature});
var GMINACOST = L.geoJson(gminyData, {style: styleGminaCost, onEachFeature: GMINACOSTonEachFeature});
var SUBVENTION = L.geoJson(gminyData, {style: styleSubvention, onEachFeature: SUBVENTIONonEachFeature});

//kolory do skal
function getColorByCost(d) {
    return d > 1200000 ? LEGENDPALETTE8[0] :
        d > 1000000 ? LEGENDPALETTE8[1] :
            d > 800000 ? LEGENDPALETTE8[2] :
                d > 600000 ? LEGENDPALETTE8[3] :
                    d > 400000 ? LEGENDPALETTE8[4] :
                        d > 200000 ? LEGENDPALETTE8[5] :
                            d > 100000 ? LEGENDPALETTE8[6] :
                                d > 50 ? LEGENDPALETTE8[7] :
                                    LEGENDPALETTE8[8];
}

function styleCost(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColorByCost(feature.properties.price)
    };
}

function getColorByPerCitizen(d) {
    return d > 70 ? LEGENDPALETTE8[0] :
        d > 60 ? LEGENDPALETTE8[1] :
            d > 50 ? LEGENDPALETTE8[2] :
                d > 40 ? LEGENDPALETTE8[3] :
                    d > 30 ? LEGENDPALETTE8[4] :
                        d > 20 ? LEGENDPALETTE8[5] :
                            d > 10 ? LEGENDPALETTE8[6] :
                                d >= 1 ? LEGENDPALETTE8[7] :
                                    LEGENDPALETTE8[8];
}

function stylePerCitizen(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColorByPerCitizen(feature.properties.perCitizen)
    };
}

function getColorByGminaCost(d) {
    return d > 120000 ? LEGENDPALETTE8[0] :
        d > 100000 ? LEGENDPALETTE8[1] :
            d > 80000 ? LEGENDPALETTE8[2] :
                d > 60000 ? LEGENDPALETTE8[3] :
                    d > 40000 ? LEGENDPALETTE8[4] :
                        d > 20000 ? LEGENDPALETTE8[5] :
                            d > 0 ? LEGENDPALETTE8[6] :
                                d === ' ' ? LEGENDPALETTE8[8] :
                                    '#3cc31f'; //vhen value is 0
}

function styleGminaCost(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColorByGminaCost(feature.properties.gminaCost)
    };
}

function getColorBySubvention(d) {
    return d > 1200000 ? LEGENDPALETTE8[0] :
        d > 1000000 ? LEGENDPALETTE8[1] :
            d > 800000 ? LEGENDPALETTE8[2] :
                d > 600000 ? LEGENDPALETTE8[3] :
                    d > 400000 ? LEGENDPALETTE8[4] :
                        d > 200000 ? LEGENDPALETTE8[5] :
                            d > 0 ? LEGENDPALETTE8[6] :
                                d === ' ' ? LEGENDPALETTE8[8] :
                                    '#3cc31f'; //when value is 0
}

function styleSubvention(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColorBySubvention(feature.properties.subvention)
    };
}

function getColorByStatus(d) {
    return d == 1 ? '#FFEDA0' :
        d == 2 ? '#484040' :
            d == 3 ? '#49914e' :
                '#ff0000';
}

function styleStatus(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColorByStatus(feature.properties.status)
    };
}

function getColorByPerStudent(d) {
    return d > 800 ? LEGENDPALETTE8[0] :
        d > 700 ? LEGENDPALETTE8[1] :
            d > 600 ? LEGENDPALETTE8[2] :
                d > 500 ? LEGENDPALETTE8[3] :
                    d > 400 ? LEGENDPALETTE8[4] :
                        d > 300 ? LEGENDPALETTE8[5] :
                            d > 200 ? LEGENDPALETTE8[6] :
                                d > 50 ? LEGENDPALETTE8[7] :
                                    LEGENDPALETTE8[8];
}

function stylePerStudent(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColorByPerStudent(feature.properties.perStudent)
    };
}

//legendy
var STATUSlegend = L.control({position: 'bottomright'});
STATUSlegend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3],
        labels = ['Odmowa podania informacji', 'Przedłużono czas na odpowiedź', 'Brak odpowiedzi', 'Otrzymano informacje'];

    div.innerHTML += '<div><b>Status zbierania danych</b></div><br>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorByStatus(grades[i]) + '"></i> ' +
            labels[i] + '<br>';
    }
    return div;
};

var PERSTUDENTlegend = L.control({position: 'bottomright'});
PERSTUDENTlegend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [801, 701, 601, 501, 401, 301, 201, 51, 0],
        labels = ['> 800 zł/os', '800 - 700 zł/os', '700 - 600 zł/os', '600 - 500 zł/os', '500 - 400 zł/os', '400 - 300 zł/os', '300 - 200 zł/os', '< 200 zł/os', 'Brak danych'];

    div.innerHTML += '<div><b>Roczny koszt na jednego ucznia</b></div><br>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorByPerStudent(grades[i]) + '"></i> ' +
            labels[i] + '<br>';
    }
    return div;
};

var COSTlegend = L.control({position: 'bottomright'});
COSTlegend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [
            1200001,
            1000001,
            800001,
            600001,
            400001,
            200001,
            100001,
            51,
            0],
        labels = [
            '> 1.200.000 zł',
            '1.200.000 - 1.000.000 zł',
            '1.000.000 - 800.000 zł',
            '800.000 - 600.000 zł',
            '600.000 - 400.000 zł',
            '400.000 - 200.000 zł',
            '200.000 - 100.000 zł',
            '< 100.000 zł',
            'Brak danych'];

    div.innerHTML += '<div><b>Roczne wydatki na katechezę</b></div><br>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorByCost(grades[i]) + '"></i> ' +
            labels[i] + '<br>';
    }
    return div;
};

var PERCITIZENlegend = L.control({position: 'bottomright'});
PERCITIZENlegend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [
            71,
            61,
            51,
            41,
            31,
            21,
            11,
            1,
            0],
        labels = [
            '> 70,00 zł',
            '70,00 zł - 60,00 zł',
            '60,00 zł - 50,00 zł',
            '50,00 zł - 40,00 zł',
            '40,00 zł - 30,00 zł',
            '30,00 zł - 20,00 zł',
            '20,00 zł - 10,00 zł',
            '< 10,00 zł',
            'Brak danych'];

    div.innerHTML += '<div><b>Roczne wydatki na mieszkańca</b></div><br>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorByPerCitizen(grades[i]) + '"></i> ' +
            labels[i] + '<br>';
    }
    return div;
};

var GMINACOSTlegend = L.control({position: 'bottomright'});
GMINACOSTlegend.onAdd = function (map) { //fixme
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [
            120001,
            100001,
            80001,
            60001,
            40001,
            20001,
            1,
            0,
            " "],
        labels = [
            '> 120 000 zł',
            '120 000 zł - 100 000 zł',
            '100 000 zł - 80 000 zł',
            '80 000 zł - 60 000 zł',
            '60 000 zł - 40 000 zł',
            '40 000 zł - 20 000 zł',
            '20 000 zł - 0 zł',
            '0 zł',
            'Brak danych'];

    div.innerHTML += '<div><b>Roczne wydatki z budżetu gminy</b></div><br>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorByGminaCost(grades[i]) + '"></i> ' +
            labels[i] + '<br>';
    }
    return div;
};

var SUBVENTIONlegend = L.control({position: 'bottomright'});
SUBVENTIONlegend.onAdd = function (map) { //fixme
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [
            1200001,
            1000001,
            800001,
            600001,
            400001,
            200001,
            1,
            0,
            " "],
        labels = [
            '> 1 200 000 zł',
            '1 200 000 zł - 1 000 000 zł',
            '1 000 000 zł - 800 000 zł',
            '800 000 zł - 600 000 zł',
            '600 000 zł - 400 000 zł',
            '400 000 zł - 200 000 zł',
            '200 000 zł - 0 zł',
            '0 zł',
            'Brak danych'];

    div.innerHTML += '<div><b>Roczna subwencja na nauczanie religii</b></div><br>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorBySubvention(grades[i]) + '"></i> ' +
            labels[i] + '<br>';
    }
    return div;
};

//wypór legendy
var baseMaps = {
    "Status zapytań": STATUS,
    "Koszt bezwzględny": COST,
    "Koszt na ucznia": PERSTUDENT,
    "Koszt na mieszkańca": PERCITIZEN,
    "Koszt gminy" : GMINACOST,
    "Wysokość subwencji" : SUBVENTION
};

var overlayMaps = {};

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false,
    position: 'topright'
}).addTo(map);

STATUSlegend.addTo(map);
currentLegend = STATUSlegend;

//zmiana legendy przy zminie danych
map.on('baselayerchange', function (eventLayer) {
    if (eventLayer.name === 'Status zapytań') {
        map.removeControl(currentLegend);
        currentLegend = STATUSlegend;
        STATUSlegend.addTo(map);
    } else if (eventLayer.name === 'Koszt na ucznia') {
        map.removeControl(currentLegend);
        currentLegend = PERSTUDENTlegend;
        PERSTUDENTlegend.addTo(map);
    } else if (eventLayer.name === 'Koszt bezwzględny') {
        map.removeControl(currentLegend);
        currentLegend = COSTlegend;
        COSTlegend.addTo(map);
    } else if (eventLayer.name === 'Koszt na mieszkańca') {
        map.removeControl(currentLegend);
        currentLegend = PERCITIZENlegend;
        PERCITIZENlegend.addTo(map);
    } else if (eventLayer.name === 'Koszt gminy') {
        map.removeControl(currentLegend);
        currentLegend = GMINACOSTlegend;
        GMINACOSTlegend.addTo(map);
    }else if (eventLayer.name === 'Wysokość subwencji') {
        map.removeControl(currentLegend);
        currentLegend = SUBVENTIONlegend;
        SUBVENTIONlegend.addTo(map);
    }
})

//opisy do kontrolek
function getDescription(feature) {

    var content = '';
    content += '<h3>' + feature.properties.JPT_NAZWA_ + '</h3>';
    if (feature.properties.price) {
        content += '<div>Kwota przeznaczona na lekcje relgii:</div><div class="tooltip">' + parseFloat(feature.properties.price).toLocaleString(undefined, {minimumFractionDigits: 2}) + ' zł</div>';
    }

    if (feature.properties.populate) {
        content += '<div>Liczba mieszkańców: ' + parseFloat(feature.properties.populate).toLocaleString(undefined) + '</div>';
    }

    if (feature.properties.students) {
        content += '<div>Liczba uczniów: ' + parseFloat(feature.properties.students).toLocaleString(undefined) + '</div>';
    }

    if (feature.properties.perCitizen) {
        content += '<div>Kwota na mieszkańca: ' + parseFloat(feature.properties.perCitizen).toLocaleString(undefined) + ' zł/os</div>';
    }

    if (feature.properties.perStudent) {
        content += '<div>Kwota na ucznia: ' + parseFloat(feature.properties.perStudent).toLocaleString(undefined) + ' zł/os</div>';
    }

    if (feature.properties.description) {
        content += '<br><div>Uwaga:</div><div class="tooltip">' + feature.properties.description + '</div><br>';
    }

    return content;
}

function getDescriptionPopup(feature) {
    var content = '';
    content += getDescription(feature);

    if (feature.properties.subvention) {
        if (feature.properties.subvention !== " ") {
            content += '<div>Kwota subwencji oświatowej: ' + parseFloat(feature.properties.subvention).toLocaleString(undefined) + ' zł</div>';
        }
    }

    if (feature.properties.gminaCost) {
        if (feature.properties.gminaCost !== " ") {
            content += '<div>Kwota z samorządu: ' + parseFloat(feature.properties.gminaCost).toLocaleString(undefined) + ' zł</div>';
        }
    }

    if (feature.properties.link.length > 0) {
        content += '<br><div>Źródła:</div>';
        for (let j = 0; j < feature.properties.link.length; j++) {
            content += '<div class="tooltip"><a href="' + feature.properties.link[j] + '">' + feature.properties.link[j] + '</a><div/><br>';
        }
    }

    return content;
}

//zachowanie tooltipa
function STATUSonEachFeature(feature, layer) {
    layer.bindPopup(getDescriptionPopup(feature));
    layer.bindTooltip(getDescription(feature));

    layer.on('mouseover', function (f, l) {
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        if (layer.isPopupOpen()) {
            layer.closeTooltip();
        }
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    });

    layer.on('mouseout', function (f, l) {
        STATUS.resetStyle(layer);
    });

    layer.on('click', function (f, l) {
        map.fitBounds(layer.getBounds());
        layer.closeTooltip();
    });
}

function PERSTUDENTonEachFeature(feature, layer) {
    layer.bindPopup(getDescriptionPopup(feature));
    layer.bindTooltip(getDescription(feature));

    layer.on('mouseover', function (f, l) {
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        if (layer.isPopupOpen()) {
            layer.closeTooltip();
        }
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    });

    layer.on('mouseout', function (f, l) {
        PERSTUDENT.resetStyle(layer);
    });

    layer.on('click', function (f, l) {
        map.fitBounds(layer.getBounds());
        layer.closeTooltip();
    });
}

function PERCITIZENonEachFeature(feature, layer) {
    layer.bindPopup(getDescriptionPopup(feature));
    layer.bindTooltip(getDescription(feature));

    layer.on('mouseover', function (f, l) {
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        if (layer.isPopupOpen()) {
            layer.closeTooltip();
        }
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    });

    layer.on('mouseout', function (f, l) {
        PERCITIZEN.resetStyle(layer);
    });

    layer.on('click', function (f, l) {
        map.fitBounds(layer.getBounds());
        layer.closeTooltip();
    });
}

function COSTonEachFeature(feature, layer) {
    layer.bindPopup(getDescriptionPopup(feature));
    layer.bindTooltip(getDescription(feature));

    layer.on('mouseover', function (f, l) {
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        if (layer.isPopupOpen()) {
            layer.closeTooltip();
        }
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    });

    layer.on('mouseout', function (f, l) {
        COST.resetStyle(layer);
    });

    layer.on('click', function (f, l) {
        map.fitBounds(layer.getBounds());
        layer.closeTooltip();
    });
}

function GMINACOSTonEachFeature(feature, layer) {
    layer.bindPopup(getDescriptionPopup(feature));
    layer.bindTooltip(getDescription(feature));

    layer.on('mouseover', function (f, l) {
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        if (layer.isPopupOpen()) {
            layer.closeTooltip();
        }
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    });

    layer.on('mouseout', function (f, l) {
        GMINACOST.resetStyle(layer);
    });

    layer.on('click', function (f, l) {
        map.fitBounds(layer.getBounds());
        layer.closeTooltip();
    });
}

function SUBVENTIONonEachFeature(feature, layer) {
    layer.bindPopup(getDescriptionPopup(feature));
    layer.bindTooltip(getDescription(feature));

    layer.on('mouseover', function (f, l) {
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        if (layer.isPopupOpen()) {
            layer.closeTooltip();
        }
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    });

    layer.on('mouseout', function (f, l) {
        SUBVENTION.resetStyle(layer);
    });

    layer.on('click', function (f, l) {
        map.fitBounds(layer.getBounds());
        layer.closeTooltip();
    });
}

L.tileLayer('', {
    attribution: '<a href="https://www.facebook.com/groups/1584850021763935/">Świecka szkoła Pomorze</a>. <a href="">Wykonał DFL</a> ',
}).addTo(map);



//resize the geojson view to bounds
map.fitBounds(STATUS.getBounds());
