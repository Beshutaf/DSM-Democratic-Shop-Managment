/**
 * Created by Tmura on 03/01/2017.
 */
var DB;
// connect to database
var MongoClient = require('mongodb').MongoClient;
var assert = require("assert");
//unit tests
var url = 'mongodb://localhost:27017/dbWatch';
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    //assert unit test
    console.log("Connected correctly to server.");


    if(err) { return console.log(err); } //handling errors


    //
    DB=db;
    //db.close();
});
var mongoose= require('mongoose');
var mongodb=require('mongodb');
mongoose.connect('mongodb://localhost/dbWatch');
var Schema = mongoose.Schema;
// var typesCollection = DB.collection('types').find();
// var permissionsCollection = DB.collection('permissions').find();
// var watchesCollection = DB.collection('Watches').find();
// var categoriesCollection = DB.collection('categories').find();
// var clientsCollection = DB.collection('clients').find();
// var ordersCollection = DB.collection('orders').find();
// var companiesCollection = DB.collection('companies').find();
// var usersCollection = DB.collection('users').find();
module.exports={
    //companies
    getAllCompanies:function() {
        return DB.collection('companies').find({});
    },
    deleteCompany:function(id){

        DB.collection('companies').deleteOne({_id:new mongodb.ObjectID(id)});
            console.log("Removed document");
            return DB.collection('companies').find({});



    },

    //orders
    getAllOrders:function() {
        return DB.collection('orders').find({});
    },
    deleteOrder:function(id){

        DB.collection('orders').deleteOne({_id:new mongodb.ObjectID(id)});
        console.log("Removed document");
        return DB.collection('orders').find({});



    },
    //watches
    getAllWatches:function() {
        return DB.collection('Watches').find({});
    },
    deleteWatches:function(id){

        DB.collection('Watches').deleteOne({_id:new mongodb.ObjectID(id)});
        console.log("Removed document");
        return DB.collection('Watches').find({});



    },

}








// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
// var url = 'mongodb://localhost:27017/dbWatch';
// //init mongoose

//
//

//
//     /*insert by sarah Leibovitz*/
//     // var document= {
//     //     "client" : null,
//     //     "watch" : "58653fbccab7e7d4fd4dade3",
//     //     "payment" : null,
//     //     "dateOrder" : 2.7
//     // }
//     typesCollection.insert(document, function(err,docsInserted){
//         if(err) {
//             throw err;
//         }
//     });
//     permissionsCollection.insert(document, function(err,docsInserted){
//         if(err) {
//             throw err;
//         }
//     });
//     watchesCollection.insert(document, function(err,docsInserted){
//         if(err) {
//             throw err;
//         }
//     });
//     categoriesCollection.insert(document, function(err,docsInserted){
//         if(err) {
//             throw err;
//         }
//     });
//     clientsCollection.insert(document, function(err,docsInserted){
//         if(err) {
//             throw err;
//         }
//     });
//     ordersCollection.insert(document, function(err,docsInserted){
//         if(err) {
//             throw err;
//         }
//     });
//     companiesCollection.insert(document, function(err,docsInserted){
//         if(err) {
//             throw err;
//         }
//     });
//     usersCollection.insert(document, function(err,docsInserted){
//         if(err) {
//             throw err;
//         }
//     });
//     /*find collection to and convert to array by Sarah Leibovitz*/
//     typesCollection.find({}).toArray(function(err, docs) {
//         console.log("Found the following records");
//         console.dir(docs);
//     });
//     permissionsCollection.find({}).toArray(function(err, docs) {
//         console.log("Found the following records");
//         console.dir(docs);
//     });
//     watchesCollection.find({}).toArray(function(err, docs) {
//         console.log("Found the following records");
//         console.dir(docs);
//     });
//     categoriesCollection.find({}).toArray(function(err, docs) {
//         console.log("Found the following records");
//         console.dir(docs);
//     });
//     clientsCollection.find({}).toArray(function(err, docs) {
//         console.log("Found the following records");
//         console.dir(docs);
//     });
//     ordersCollection.find({}).toArray(function(err, docs) {
//         console.log("Found the following records");
//         console.dir(docs);
//     });
//     companiesCollection.find({}).toArray(function(err, docs) {
//         console.log("Found the following records");
//         console.dir(docs);
//     });
//     usersCollection.find({}).toArray(function(err, docs) {
//         console.log("Found the following records");
//         console.dir(docs);
//     });
//     //delete document from collection by chedva klinger
//     typesCollection.deleteOne(document, function (err, docs) {
//         console.log("Removed document");
//         console.dir(docs);
//     });
//     permissionsCollection.deleteOne(document, function (err, docs) {
//         console.log("Removed document");
//         console.dir(docs);
//     });
//     watchesCollection.deleteOne(document, function (err, docs) {
//         console.log("Removed document");
//         console.dir(docs);
//     });
//     categoriesCollection.deleteOne(document, function (err, docs) {
//         console.log("Removed document");
//         console.dir(docs);
//     });
//     clientsCollection.deleteOne(document, function (err, docs) {
//         console.log("Removed document");
//         console.dir(docs);
//     });
//     ordersCollection.deleteOne(document, function (err, docs) {
//         console.log("Removed document");
//         console.dir(docs);
//     });

//     usersCollection.deleteOne(document, function (err, docs) {
//         console.log("Removed document");
//         console.dir(docs);
//     });
//     /*created by adina and zehava*/
// //clients
//     var clientsSchema = new Schema({
//         _id: String,
//         name: String,
//         email:String,
//         tel: String,
//         payment: String
//     }, {collection: 'clients'});
//     var Clients = mongoose.model('Clients', clientsSchema);
//
// //watches
//     var watchesSchema = new Schema({
//         _id: String,
//         model: String,
//         priceList:String,
//         endPrice: String,
//         inStock: String,
//         type:String,
//         details:String,
//         image:String,
//         category:String
//     }, {collection: 'Watches'});
//     var Watches = mongoose.model('Watches', watchesSchema);
//
// //categories
//     var categorieSchema = new Schema({
//         _id: String,
//         title: String
//     }, {collection: 'categories'});
//     var Categories = mongoose.model('categories', categorieSchema);
//
// //companies
//     var companiesSchema = new Schema({
//         _id: String,
//         name: String,
//         image:String,
//         percentCalc: String,
//         percentProfit: String,
//         details:String
//     }, {collection: 'companies'});
//     var Companies = mongoose.model('companies', companiesSchema);
//
// //orders
//     var ordersSchema = new Schema({
//         _id: String,
//         client: String,
//         watch:String,
//         payment: String,
//         dateOrder: String
//     }, {collection: 'orders'});
//     var Orders = mongoose.model('orders', ordersSchema);
//
// //permissions
//     var permissionsSchema = new Schema({
//         _id: String,
//         title: String,
//         level:String
//     }, {collection: 'permissions'});
//     var Permissions = mongoose.model('permissions', permissionsSchema);
//
// //types
//     var typesSchema = new Schema({
//         _id: String,
//         title: String
//     }, {collection: 'types'});
//     var Types = mongoose.model('types', typesSchema);
//
// //users
//     var usersSchema = new Schema({
//         _id: String,
//         name: String,
//         password:String,
//         mailDelivery:String,
//         permissions:String
//     }, {collection: 'users'});
//     var Users = mongoose.model('users', usersSchema);
//
//
// //fetch all clients
//     Clients.find({ }, function(err,clientsData) {
//         if (err) {
//             return console.log("something went wrong when fetching the data");
//         }
//
//         console.log(clinetsData);
//     });
//
//
//     //fetch all users
//     Users.find({ }, function(err,usersData) {
//         if (err) {
//             return console.log("something went wrong when fetching the data");
//         }
//
//         console.log(usersData);
//     });
//
//     //fetch all types
//     Types.find({ }, function(err,types) {
//         if (err) {
//             return console.log("something went wrong when fetching the data");
//         }
//
//         console.log(types);
//     });
//
//
//     //fetch all permission
//     Permissions.find({ }, function(err,permissions) {
//         if (err) {
//             return console.log("something went wrong when fetching the data");
//         }
//
//         console.log(permissions);
//     });
//
//
//     //fetch all categories
//     Categories.find({ }, function(err,categories) {
//         if (err) {
//             return console.log("something went wrong when fetching the data");
//         }
//
//         console.log(categories);
//     });
//
//
//     //fetch all orders
//     Orders.find({ }, function(err,orders) {
//         if (err) {
//             return console.log("something went wrong when fetching the data");
//         }
//
//         console.log(orders)
//     });
//
//
//
//     //fetch all companies
//     Companies.find({}, function(err,companyData) {
//         if (err) {
//             return console.log("something went wrong when fetching the data");
//         }
//
//         console.log(CompanyData);
//     });
//
//
//     //fetch all watches
//     Watches.find({}, function(err,WatchData) {
//         if (err) {
//             return console.log("something went wrong when fetching the data");
//         }
//
//         console.log(WatchData);
//     });
//
//     /*
//      //fetch first client that matches name+email
//      Clients.findOne({name: client.name,email: client.email}, function(err,clientD) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(clinetD);
//      });
//
//      //fetch all users that match wanted permission
//      Users.find({permission: user.permission }, function(err,usersByPermissionData) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(usersByPermissionData);
//      });
//
//      //fetch first user that matches name+password
//      Users.findOne({name: user.name, password: user.password}, function(err,userD) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(userD);
//      });
//
//      //fetch type that match wanted title
//      Types.find({title: type.title}, function(err,typesByTitle) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(typesByTitle);
//      });
//
//      //fetch permission that match wanted title
//      Permissions.find({title: permission.title}, function(err,permissionByTitle) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(permissionByTitle);
//      });
//
//      //fetch categories that match wanted title
//      Categories.find({title: categoriy.title}, function(err,categoryByTitle) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(categoryByTitle);
//      });
//
//
//      //fetch all orders of wanted client
//      Orders.find({client: order.client}, function(err,ordersByClient) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(ordersByClient);
//      });
//
//      //fetch all orders of wanted date
//      Orders.find({dateOrder: order.dateOrder}, function(err,ordersByDate) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(ordersByClient);
//      });
//
//      //fetch all orders of wanted client+dateOrder
//      Orders.find({client: order.client, dateOrder: order.dateOrder}, function(err,ordersByClientAndDate) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(ordersByClientAndDate);
//      });
//
//      //fetch all companies by propfit percent
//      Companies.find({percentProfit: company.precentprofit}, function(err,companyByProfitPercent) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(companyByProfitPercent);
//      });
//
//      //fetch all companies by calc percent
//      Companies.find({percentCalc: company.percentCalc}, function(err,companyByCalcPercent) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(companyByCalcPercent);
//      });
//
//      //fetch all watches by model
//      Watches.find({model: watch.model}, function(err,watchesByModel) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(watchesByModel);
//      });
//
//      //fetch all watches inStock/notInStock
//      Watches.find({inStock: watch.inStock}, function(err,WatchesByStock) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(WatchesByStock);
//      });
//
//      //fetch all watches by type
//      Watches.find({type: watch.type}, function(err,WatchByType) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(WatchByType);
//      });
//
//      //fetch all watches by category
//      Watches.find({model: watch.model}, function(err,watchesByCategory) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(watchesByCategory);
//      });
//
//      //fetch all watches by type+category
//      Watches.find({type: watch.type, category: watch.category}, function(err,WatchesByTypeAndCategory) {
//      if (err) {
//      return console.log("something went wrong when fetching the data");
//      }
//
//      console.log(WatchesByTypeAndCategory);
//      });
//
//      */
//
//
//
//
//
//
//
//
// });