var fs = require("fs");
const faker = require("faker");

let businessFaker = function(businessId) {
  const fakerBusiness = {
    _id: businessId,
    business_id: businessId,
    name: faker.company.companyName(),
    neighborhood: faker.address.streetName(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    postal_code: faker.address.zipCode(),
    longitude: faker.address.longitude(),
    latitude: faker.address.latitude(),
  };
  return fakerBusiness;
};

var giriSux = 174567;

var file = fs.createWriteStream("../json/businessTen.json");
let write10MnTimes = (n = giriSux) => {
  let isReady = true;
  while (n > 0 && isReady) {
    n === 1
      ? (isReady = file.write(`${JSON.stringify(businessFaker(n))}]`))
      : n === giriSux
        ? (isReady = file.write(`[${JSON.stringify(businessFaker(n))},\n`))
        : (isReady = file.write(`${JSON.stringify(businessFaker(n))},\n`));
    n -= 1;
  }
  file.once("drain", () => {
    write10MnTimes(n);
  });
};
write10MnTimes();
