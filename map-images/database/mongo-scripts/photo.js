var fs = require("fs");
const faker = require("faker");

let photoFaker = function(photoID) {
  const fakerPhoto = {
    _id: photoID,
    id: faker.image.imageUrl(),
    business_id: photoID,
    caption: faker.lorem.word(),
    label: faker.address.streetName(),
    date: faker.date.past(),
  };
  return fakerPhoto;
};

var giriSux = 10000000;

var file = fs.createWriteStream("../json/photoTen.json");
let write10MnTimes = (n = giriSux) => {
  let isReady = true;
  while (n > 0 && isReady) {
    n === 1
      ? (isReady = file.write(`${JSON.stringify(photoFaker(n))}]`))
      : n === giriSux
        ? (isReady = file.write(`[${JSON.stringify(photoFaker(n))},\n`))
        : (isReady = file.write(`${JSON.stringify(photoFaker(n))},\n`));
    n -= 1;
  }
  file.once("drain", () => {
    write10MnTimes(n);
  });
};
write10MnTimes();
