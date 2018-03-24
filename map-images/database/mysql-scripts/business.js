const fs = require("fs");
const mysql = require("mysql2");
const Sequelize = require("sequelize");

const database = new Sequelize("yelp_db", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

database
  .authenticate()
  .then(() => {
    console.log("success");
  })
  .catch(err => {
    console.error("err");
  });

database
  .query("SELECT * FROM business")
  .then(data => {
    var temp = [];
    for (var i = 0; i < 60; i++) {
      temp.push(data[0]);
    }
    var business = temp.reduce((a, b) => {
      return a.concat(b);
    });
    /*-----------ABOVE DUPES DATA----------------------*/

    const file = fs.createWriteStream("./csv/business.csv");
    let write10MnTimes = (n = 100) => {
      let isReady = true;
      while (n > 0 && isReady) {
        business[n].id = n;
        isReady = file.write(
          `${business[n].id}, ${business[n].name}, ${
            business[n].neighborhood
          }, ${business[n].address}, ${business[n].city}, ${
            business[n].state
          }, ${business[n].postal_code}, ${business[n].logitude}, ${
            business[n].latitude
          } \n`
        );
        n--;
      }
      file.once("drain", () => {
        write10MnTimes(n);
        console.log("draining at ", n);
      });
    };
    write10MnTimes();
  })
  .then(data => {
    console.log("business done");
  })
  .catch(error => {
    console.error(error);
  });
