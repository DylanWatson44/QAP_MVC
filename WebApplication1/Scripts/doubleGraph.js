function attachAll(classname) {
    require(["js/qlik"], function (qlik) {
        var config = {
            host: 'bi-dev',
            prefix: '/',
            port: 443,
            isSecure: true,
            origin: 'localhost', 
            identity: classname
        };

        var elems = document.getElementsByClassName(classname);
        var appid = elems[0].dataset.qlikAppid;
        app = qlik.openApp(appid, config);
        qlikApps[classname] = app;
        var vx = 0;
        for (; vx < elems.length; ++vx) {
            var elem = elems[vx];
            var objid = elem.dataset.qlikObjid;
            app.getObject(elem, objid)
        }
    });
    return app;
}

function attachButtons(group) {
    var backBtn = document.getElementById("BackBtn" + group);
    $(backBtn).bind('click', function (event) {
        var btn = event.target;
        app = qlikApps[btn.dataset.group]
        app.back();
    });

    var clearbtn = document.getElementById("ClearBtn" + group);
    $(clearbtn).bind('click', function (event) {
        var btn = event.target;
        app = qlikApps[btn.dataset.group]
        app.clearAll();
    });

    var forBtn = document.getElementById("ForBtn" + group);
    $(forBtn).bind('click', function (event) {
        var btn = event.target;
        app = qlikApps[btn.dataset.group]
        app.forward();
    });
}
var promise1 = Promise.resolve(attachAll('qlik-embed-group1'))
promise1.then(attachButtons('qlik-embed-group1'));
attachAll('qlik-embed-group2');
attachButtons('qlik-embed-group2');


