var express = require('express');
var app = express();
var path = require('path');
 var dir=path.resolve('../client/admin/views');
//var dirCustomer=path.resolve('../client/customer/views');

app.use(express.static(dir));
//app.use(express.static(dirCustomer));
var db=require('./db.js');
//console.log(db.dbw);

app.listen(3000, function () {
    console.log("server running at port 3000!");

});
//companies
app.get('/getCompanies', function (req, res) {
    console.log("serving getCompanies");
    var arr=db.getAllCompanies();

    var arrComp;

    arr.toArray(function(err, items) { //foreach
         arrComp=JSON.stringify(items);
         res.send(arrComp);

    });


});
app.get('/deleteCompany/:id', function (req, res) {

    console.log("serving deleteCompany");
    console.log(req.params.id);
    var arr=db.deleteCompany(req.params.id);

     var arrComp;
    arr.toArray(function(err, items) { //foreach
        arrComp=JSON.stringify(items);
        //console.log(items);
        res.send(arrComp);

    });

});

//tzofia
//orders
app.get('/getOrders', function (req, res) {
    console.log("serving getOrders");
    var arr=db.getAllOrders();

    var arrOrders;

    arr.toArray(function(err, items) { //foreach
        arrOrders=JSON.stringify(items);
        res.send(arrOrders);

    });


});
app.get('/deleteOrders/:id', function (req, res) {

    console.log("serving deleteOrders");
    console.log(req.params.id);
    var arr=db.deleteOrder(req.params.id);

    var arrOrders;
    arr.toArray(function(err, items) { //foreach
        arrOrders=JSON.stringify(items);
        //console.log(items);
        res.send(arrOrders);

    });

});

//watches
//tzofia
app.get('/getWatches', function (req, res) {
    console.log("serving getWatches");
    var arr=db.getAllWatches();

    var arrWatches;

    arr.toArray(function(err, items) { //foreach
        arrWatches=JSON.stringify(items);
        res.send(arrWatches);

    });


});
app.get('/deleteWatch/:id', function (req, res) {

    console.log("serving deleteWatche");
    console.log(req.params.id);
    var arr=db.deleteWatches(req.params.id);

    var arrWatches;
    arr.toArray(function(err, items) { //foreach
        arrWatches=JSON.stringify(items);
        //console.log(items);
        res.send(arrWatches);

    });

});



/*Sarah*/
app.get('/',function(req,res){
    res.sendFile(path.join(dir,'/index.html'));
    //__dirname : It will resolve to your project folder.
});

app.get('/menu',function(req,res){
    res.sendFile(path.join(dir,'/menu.html'));

});
app.get('/orders',function(req,res){
    res.sendFile(path.join(dir,'/orders.html'));

});
app.get('/watch',function(req,res){
    res.sendFile(path.join(dir,'/watch.html'));

});
app.get('/company',function(req,res){
    res.sendFile(path.join(dir,'/company.html'));

});
app.get('/rights',function(req,res){
    res.sendFile(path.join(dir,'/rights.html'));

});
app.get('/message',function(req,res){
    res.sendFile(path.join(dir,'/message.html'));

});

/*statics (sarah)*/




//customer
// app.get('/',function(req,res){
//     res.sendFile(path.join(dirCustomer,'/index.html'));
//     //__dirname : It will resolve to your project folder.
// });
//
// app.get('/404',function(req,res){
//
//     res.sendFile(path.join(dirCustomer,'/404.html'));
//     //__dirname : It will resolve to your project folder.
// });
// app.get('/about',function(req,res){
//
//     res.sendFile(path.join(dirCustomer,'/about.html'));
//     //__dirname : It will resolve to your project folder.
// });
// app.get('/brands',function(req,res){
//     res.sendFile(path.join(dirCustomer,'/brands.html'));
//     //__dirname : It will resolve to your project folder.
// });
// app.get('/checkout',function(req,res){
//     res.sendFile(path.join(dirCustomer,'/checkout.html'));
//     //__dirname : It will resolve to your project folder.
// });
// app.get('/contact',function(req,res){
//     res.sendFile(path.join(dirCustomer,'/contact.html'));
//     //__dirname : It will resolve to your project folder.
// });
// app.get('/home',function(req,res){
//     res.sendFile(path.join(dirCustomer,'/home.html'));
//     //__dirname : It will resolve to your project folder.
// });
// app.get('/legall',function(req,res){
//     res.sendFile(path.join(dirCustomer,'/legall.html'));
//     //__dirname : It will resolve to your project folder.
// });
// app.get('/login',function(req,res){
//     res.sendFile(path.join(dirCustomer,'/login.html'));
//     //__dirname : It will resolve to your project folder.
// });
// app.get('/men',function(req,res){
//     res.sendFile(path.join(dirCustomer,'/men.html'));
//     //__dirname : It will resolve to your project folder.
// });
// app.get('/order',function(req,res){
//     res.sendFile(path.join(dirCustomer,'/order.html'));
//     //__dirname : It will resolve to your project folder.
// });
//
// app.get('/register',function(req,res){
//     res.sendFile(path.join(dirCustomer,'/register.html'));
//     //__dirname : It will resolve to your project folder.
// });
// app.get('/single',function(req,res){
//     res.sendFile(path.join(dirCustomer,'/single.html'));
//     //__dirname : It will resolve to your project folder.
// });
// app.get('/whatsNew',function(req,res){
//     res.sendFile(path.join(dirCustomer,'/whatsNew.html'));
//     //__dirname : It will resolve to your project folder.
// });
// app.get('/woman',function(req,res){
//     res.sendFile(path.join(dirCustomer,'/woman.html'));
//     //__dirname : It will resolve to your project folder.
// });
