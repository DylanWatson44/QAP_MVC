require(["js/qlik"], function (qlik) {
    app = qlikApps['f83dfb3d-9fd0-43af-b360-95a5fd813e7c'];
    app.getObject("someID", "PgJXGg", {
        noSelections: true
    })
    //    .then(function (model) {   
    //    var mytable = qlik.table(model)
    //    mytable.OnData.bind(function () {
    //        var element = document.getElementById("element");
    //        var $exportButton = $(document.createElement('button'));
    //        $exportButton.html('Export');
    //        $exportButton.bind('click', function () {
    //            mytable.exportData({ format: "CSV_C", filename: "mydata.csv", state: "P", download: true });
    //        });
    //        $(element).append($exportButton);
    //    });
    //});
      
    app.visualization.get('PgJXGg').then(function (vis) {
        vis.setOptions({ title: "Now improved" });
        vis.setOptions({ orientation: "vertical" });

    });
    //vis.setOptions({
    //    legend: {
    //        show: true,
    //        dock: "left",
    //        showTitle: true
    //    }
    //})

        app.visualization.get('RnMrR').then(function (filter) {
            filter.setOptions({
                subtitle: "Select a year:",
                title: null,
                showTitles: true
            });
        });
        var data = app.field("Reporting Year").getData()
        data.OnData.bind(function () {
            var select = document.getElementById("mySelect");
            var newoption1 = $(document.createElement('option'));
            newoption1.html("None");
            newoption1.value = "None";
            $(select).append(newoption1);
            for (var i = 0; i < data.rows.length; i++) {
                var newoption = $(document.createElement('option'));
                newoption.html(data.rows[i].qText);
                newoption.value = data.rows[i].qText;
                $(select).append(newoption);
            }
            data.OnData.unbind();
        })



        app.visualization.create('barchart',
            [{
                "qDef": {
                    "qFieldDefs": ["Reporting Year"],
                    "qSortCriterias": [{ "qSortByNumeric": 1 }]
                }
            },
            {
                "qDef": {
                    "qDef": "=Avg([Dollars Plan])",
                    "qLabel": "Dollars Plan"
                },
                "qAttributeExpressions": [
                    {
                        "qExpression": "RGB(237,211,156)",
                        "id": "colorByExpression"
                    }
                ]
            }
            ],
            {
                title: "Great on-the-fly Graph",
                subtitle: "Heres a subtitle",
                footnote: "This is my footnote",
                "color": {
                    "auto": false,
                    "mode": "byExpression"
                },
                showTitles: true
            }).then(function (kpi) {
                kpi.show('QV01', {
                    //noSelections: true
                });
            });

        //
    });

    var backBtn = document.getElementById("BackBtn");
    $(backBtn).bind('click', function () {
        app.back();
    });

    var clearbtn = document.getElementById("ClearBtn");
    $(clearbtn).bind('click', function () {
        app.clearAll();
    });

    var forBtn = document.getElementById("ForBtn");
    $(forBtn).bind('click', function () {
      app.forward();
    });

    var selector = document.getElementById("mySelect")
    selector.onchange = function () {
        var x = document.getElementById("mySelect").value;
        if (x != "None") {
            app.field('Reporting Year').selectMatch(x.toString(), true);
        } else {
            app.field('Reporting Year').clear();
        }
    }

//var result = qlik.navigation.getMode();
//alert('mode:' + result);  //returns analysis

//app.visualization.create('barchart', [{ qLibraryId: "TsPny", qType: "dimension" },
    //    {   qLibraryId: "ypTJpJ", qType: "measure", "qAttributeExpressions": [
    //        { "qExpression": "RGB(237,211,156)",
    //            "id": "colorByExpression"
    //        }
    //    ]
    //    }, { qLibraryId: "vpuAva", qType: "measure"}], {
    //        "color": {
    //            "auto": false,
    //            //"mode": "byExpression",
    //            //"expressionIsColor": true
    //            //paletteColor: {
    //            //    index: -1,
    //            //    color: "#00cc00"
    //            //},
    //            //autoMinMax: false,
    //            //measureMin: 1,
    //            //measureMax: 2,
    //            useBaseColors: "measure"

    //        },
    //        "barGrouping": {
    //            "grouping": "grouped"
    //        }
    //    })
    //.then(function (kpi) {
    //    kpi.show('QV02', { noSelections: true });
    //});