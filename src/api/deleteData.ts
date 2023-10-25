export async function deleteData(id: string, module: string) {
  try {
    const res = await fetch(`http://10.0.102.63:3001/${module}/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    console.log(json);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}
