export async function postNewData(addNewData: AddNewData) {
  console.log(addNewData);
  console.log("hello");
  try {
    const res = await fetch("http://10.0.102.63:3001/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewData),
    });
    const json = await res.json();
    console.log(json);

    if (res.ok) {
      window.location.href = "/customer";
    }
  } catch (err) {
    console.log(err);
  }
}
