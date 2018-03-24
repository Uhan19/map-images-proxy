const mysql = require("mysql2");
const Sequelize = require("sequelize");
const fs = require("fs");

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
  .query("SELECT * FROM photo")
  .then(data => {
    var temp = [];
    for (var i = 0; i < 60; i++) {
      temp.push(data[0]);
    }
    var photo = temp.reduce((a, b) => {
      return a.concat(b);
    });

    const file = fs.createWriteStream("../csv/photo2.csv");
    let write10MnTimes = (n = 1e7) => {
      let isReady = true;
      while (n > 0 && isReady) {
        photo[n].unique_id = n;
        photo[n].business_id = n;
        isReady = file.write(
          `${photo[n].unique_id}, ${photo[n].id}, ${photo[n].business_id}, ${
            photo[n].caption
          }, ${photo[n].label}, \n`
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
    console.log("photo done");
  })
  .catch(error => {
    console.error(error);
  });
