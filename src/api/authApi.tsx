// import axios from "axios";
// import Cookies from "js-cookie";

// export async function postVerify() {
//   try {
//     const token = Cookies.get("token");
//     const res = await axios.post(
//       "http://localhost:3000/verify",
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log(token);
//     console.log("Verify");
//   } catch (err) {
//     console.log(err);
//     window.location.href = "/login";
//   }
// }
