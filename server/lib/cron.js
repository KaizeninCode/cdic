import cron from "cron";
import https from "https";

const job = new cron.CronJob("0 */14 * * * *", () => {
  https
    .get("https://localhost:3500", (res) => { // change to server URL when deployed
      res.statusCode === 200
        ? console.log("GET request sent to server successfully")
        : console.log("Error sending GET request to server");
    })
    .on("error", (e) => console.log(e.message));
});

export default job