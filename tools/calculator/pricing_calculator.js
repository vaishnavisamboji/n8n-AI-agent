const item = (items[0] && items[0].json) || {};
const type = String(query.exhibit_type || "").trim().toLowerCase();
const size = Number(query.size_sqft);

if (!Number.isFinite(size)) throw new Error("size_sqft must be a number");

const booths = {
  inline:    { price: 55, fee: 800,  min: 100 },
  corner:    { price: 60, fee: 1000, min: 200 },
  peninsula: { price: 70, fee: 1200, min: 400 },
};

const cfg = booths[type];
if (!cfg) throw new Error(`Invalid exhibit type: ${type}`);
if (!(size > 0)) throw new Error("Booth size must be greater than 0");
if (size < cfg.min) throw new Error(`Min size for ${type} is ${cfg.min}`);

const subtotal = size * cfg.price;
return JSON.stringify([{
  json: {
    type,
    size_sqft: size,
    price_per_sqft: cfg.price,
    registration_fee: cfg.fee,
    subtotal,
    total: subtotal + cfg.fee,
  }
}]);
