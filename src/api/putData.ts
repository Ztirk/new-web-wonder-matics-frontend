export async function putEditedData(data: EditedData, id: string) {
  try {
    const res = await fetch(`http://10.0.102.63:3001/customer/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
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
