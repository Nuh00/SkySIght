// import http from "k6/http";
// import { check } from "k6";
// import { sleep } from "k6";

// export let options = {
//   vus: 20,
//   duration: "10s",
// };

// export default function () {
//   const url = "https://skysight-production.up.railway.app/api/dashboard";

//   const payload = JSON.stringify({
//     session: {
//       user: {
//         email: "barkatnoah35@gmail.com",
//       },
//     },
//   });

//   const params = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const res = http.post(url, payload, params);
//   sleep(1);

//   check(res, {
//     "status is 200": (r) => r.status === 200,
//     "response body is not empty": (r) => r.body.length > 0,
//   });
// }
