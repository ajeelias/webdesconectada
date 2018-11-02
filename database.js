/***
NetTalk Mobile Database
***/
var database={
  name: "invoice",
  version:2,
  handle:{},
  open:0,
  error:"",
  errorcode:0,
  synchost: "http://35.175.123.174",
  synctimer: 900,   // seconds
  deviceid: "",
  user:"",
  password:"",
  token:"",
  status:0,
  syncDate:"",
  onSyncCommsSuccess:function(data){
  },
  onSyncCommsError:function(XMLHttpRequest, textStatus, errorThrown){
  },
  tables:[
    { name: "invoice",
      syncproc: "syncinvoice",
      objectStore:{},
      everythingafter:0,
      primarykeyfield: "guid",
      timestampfield: "ts",
      servertimestampfield: "sts",
      deletedtimestampfield: "dts",
      indexes: [
        {name:'inv_servertimestampkey',unique: false, fields:["sts"]},
        {name:'inv_timestampkey',unique: false, fields:["ts"]},
        {name:'inv_numberkey',unique: false, fields:["invoicenumber"]},
        {name:'inv_customerkey',unique: false, fields:["customerguid"]}
      ],
      relations: [
        {type:"onetomany",tableName:"lineitems",links:{guid:"invoiceguid"}}
      ],
      record: {
        guid:"",
        ts:0,
        sts:0,
        dts:0,
        invoicenumber:0,
        customerguid:"",
        date:"",
        paid:0,
        terms:0
      },
      afterSync: function(){
      }
    },
    { name: "lineitems",
      syncproc: "synclineitems",
      objectStore:{},
      everythingafter:0,
      primarykeyfield: "guid",
      timestampfield: "ts",
      servertimestampfield: "sts",
      deletedtimestampfield: "dts",
      indexes: [
        {name:'lin_timestampkey',unique: false, fields:["ts"]},
        {name:'lin_servertimestampkey',unique: false, fields:["sts"]},
        {name:'lin_productkey',unique: false, fields:["productguid"]},
        {name:'lin_invoicekey',unique: false, fields:["invoiceguid"]}
      ],
      relations: [
        {type:"manytoone",tableName:"invoice",links:{invoiceguid:"guid"}}
      ],
      record: {
        guid:"",
        ts:0,
        sts:0,
        dts:0,
        invoiceguid:"",
        productguid:"",
        price:0,
        quantity:0
      },
      afterSync: function(){
      }
    },
    { name: "thisdevice",
      syncproc: "syncthisdevice",
      objectStore:{},
      everythingafter:0,
      primarykeyfield: "guid",
      timestampfield: "ts",
      servertimestampfield: "sts",
      deletedtimestampfield: "dts",
      indexes: [
        {name:'tdh_timestampkey',unique: false, fields:["ts"]},
        {name:'thd_servertimestampkey',unique: false, fields:["sts"]}
      ],
      relations: [
      ],
      record: {
        guid:"",
        sts:0,
        ts:0,
        dts:0,
        clientdeviceid:"",
        phonenumber:"",
        password:"",
        salt:"",
        synchost:""
      },
      afterSync: function(){
      }
    }
  ],
  invoice:{
    table: {},
    record: {},
    view:  function(){idbSelect({table:database.tables[0],orderBy:'ts',oncomplete:function(resultset){idbShowResult(database.tables[0],resultset)}})},
    empty: function(){idbEmpty(database,database.tables[0]);}
  },
  lineitems:{
    table: {},
    record: {},
    view:  function(){idbSelect({table:database.tables[1],orderBy:'ts',oncomplete:function(resultset){idbShowResult(database.tables[1],resultset)}})},
    empty: function(){idbEmpty(database,database.tables[1]);}
  },
  thisdevice:{
    table: {},
    record: {},
    view:  function(){idbSelect({table:database.tables[2],orderBy:'ts',oncomplete:function(resultset){idbShowResult(database.tables[2],resultset)}})},
    empty: function(){idbEmpty(database,database.tables[2]);}
  },
  last:0
};
database.invoice.table = database.tables[0];
database.invoice.record = database.tables[0].record;
database.lineitems.table = database.tables[1];
database.lineitems.record = database.tables[1].record;
database.thisdevice.table = database.tables[2];
database.thisdevice.record = database.tables[2].record;
//------------------------
var syncTimer;
//------------------------
function syncDatabase(){
  idbSyncAll(database,0,function(){ // oncomplete - all tables have been sync'd
  }, function(XMLHttpRequest, textStatus, errorThrown){ // on error
  }
  )
}
//------------------------
function syncTimerOn(){
  if(database.synctimer){
    syncTimer = setInterval(syncDatabase,database.synctimer*1000); // sync database on a timer
  }
}
//------------------------
function syncTimerOff(){
  clearInterval(syncTimer);
}

//------------------------
//------------------------
$(document).ready(function() {
  setTimeout(syncDatabase,3*1000+100); // sync database soon after program starts
  syncTimerOn()
});
//------------------------

