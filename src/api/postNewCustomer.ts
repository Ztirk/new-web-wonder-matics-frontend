export async function postNewCustomer(addNewData: AddNewData) {
  console.log(addNewData);
  try {
    const res = await fetch("http://10.0.102.87:3001/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewData),
    });
    const json = await res.json();
    console.log(json);
    window.location.href = "/customer";
  } catch (err) {
    console.log(err);
  }
}
