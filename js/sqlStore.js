// http://www.html5rocks.com/en/tutorials/offline/storage/demo.html?indexed

var sqlStore = {
    supported: function() {
      return !!window.openDatabase;
    },
    setup: function(handler) {
      this.db = openDatabase('crMapas', '1.0', 'CRMapas', 8192);
      this.db.transaction(function(tx) {
        tx.executeSql("create table if not exists " + 
          "CRMapaDistritos(id integer primary key asc, prov string, cant string, dist string)",
          [],
          function() { handler(); }
        );
      });
    },
    reset: function(handler) {
      sqlStore.db.transaction(function(tx) {
        tx.executeSql("delete from CRMapaDistritos",
        [],
        handler||function() {},
        sqlStore.onError);
      });
    },
    save: function(dist, handler) {
	//alert(dist);
      sqlStore.db.transaction(function(tx) {
        tx.executeSql("insert into CRMapaDistritos (id, prov, cant, dist) values (?,?,?,?);",
        [dist.cod, dist.p,dist.c,dist.d],
        handler,
        sqlStore.onError);
      });
    },
    search: function(moodQuery, handler) {
	console.log("searching1  "+moodQuery);
      sqlStore.db.transaction(function(tx) {
 	console.log("searching2  "+moodQuery);
        tx.executeSql(
          "select * from CRMapaDistritos" + (moodQuery ? " where id=?":""),
          moodQuery ? [moodQuery] : [],
          function(tx, results) {
            console.log("moodQ", moodQuery);
            console.log("res", results);
            for (i = 0; i < results.rows.length; i++) {
              handler(results.rows.item(i));
            }
          },
          sqlStore.onError
        );
      });
    },
    count: function(handler) {
      sqlStore.db.transaction(function(tx) {
        tx.executeSql("select count(*) from CRMapaDistritos;", [], function(tx, results) {
          handler(results.rows.item(0)["count(*)"]);
        },
        sqlStore.onError);
      });
    },
    onError: function(tx,error) {
      console.log("Error occurred: ", (error ? error.message  :""));
    }
  };

sqlStore.setup(function(){});
//sqlStore.reset(function(){});

