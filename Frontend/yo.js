const token_expiration_date = new Date("2024-01-01");
const today_date = new Date();

if (today_date > token_expiration_date) {
  console.log("Token expired");
}

