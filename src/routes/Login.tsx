import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function Login() {
  const handleUpdate: (e: React.FormEvent<HTMLFormElement>) => void = async (
    e
  ) => {
    e.preventDefault();

    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const body = {
      username: username,
      password: password,
    };

    const res = await axios.post("http://localhost:3000/login", body);

    const token = res.data;

    Cookies.set("token", token);

    const verifyRes = await axios.post(
      "http://localhost:3000/verify",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (verifyRes.status == 200) {
      window.location.href = "/customer";
    }
  };

  const deleteToken = () => {
    Cookies.remove("token");
  };
  return (
    <>
      <form action="" onSubmit={handleUpdate}>
        <input
          name="username"
          placeholder="username"
          className="border border-black"
          id="username"
        />
        <input
          name="password"
          placeholder="password"
          className="border border-black"
          id="password"
        />
        <button className="border border-black">ปุ่ม</button>
      </form>

      <button className="border border-black" onClick={deleteToken}>delete token</button>
    </>
  );
}
