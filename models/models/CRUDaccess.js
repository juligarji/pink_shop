
var CRUDaccess = {

    create : function(object,callback){},
    remove : function(objectId,callback){},
    update : function(oldObject,newObject,callback){},
    delete : function(callback){},
    getByName : function(objectName,callback){},
    getAll : function(callback){},
    getPartial : function(recent,ammount,index,callback){},
    getByParameters : function(recent,ammount,index,parameters,callback){}
}

module.exports = CRUDaccess;
