import Main from "./routes/Main";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./routes/Login";
import Main_AddNewNViewNEdit from "./routes/Main_AddNewNViewNEdit";
import Frame from "./routes/Frame";
import AddNewContact from "./routes/AddNewContact";
import AddNewPerson from "./routes/AddNewPerson";
import Test from "./routes/test";
import AddNewCustomer from "./routes/AddNewCustomer";
import AddNewVehicle from "./routes/AddNewVehicle";
import AddNewAddress from "./routes/AddNewAddress";
import AddNewFleet from "./routes/AddNewFleet";

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Frame />}>
          {/* ลูกค้า */}
          <Route path="/customer" element={<Main />}></Route>
          <Route
            path="/customer/addnew-customer"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/customer/:customer_id"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/customer/:customer_id/edit"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/customer/addnew-customer/addnew-contact"
            element={<AddNewContact />}
          ></Route>
          <Route
            path="/customer/addnew-customer/addnew-vehicle"
            element={<AddNewVehicle />}
          ></Route>
          <Route
            path="/customer/addnew-customer/addnew-person"
            element={<AddNewPerson />}
          ></Route>
          <Route
            path="/customer/addnew-customer/addnew-address"
            element={<AddNewAddress />}
          ></Route>
          <Route
            path="/customer/addnew-customer/addnew-fleet"
            element={<AddNewFleet />}
          ></Route>
          <Route
            path="/customer/:customer_id/edit/addnew-person"
            element={<AddNewPerson />}
          ></Route>
          <Route
            path="/customer/:customer_id/edit/addnew-vehicle"
            element={<AddNewVehicle />}
          ></Route>
          <Route
            path="/customer/:customer_id/edit/addnew-contact"
            element={<AddNewContact />}
          ></Route>
          <Route
            path="/customer/:customer_id/edit/addnew-fleet"
            element={<AddNewFleet />}
          ></Route>
          <Route
            path="/customer/:customer_id/edit/addnew-address"
            element={<AddNewAddress />}
          ></Route>

          {/* คน */}
          <Route path="/person" element={<Main />}></Route>
          <Route
            path="/person/addnew-person"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/person/:person_id"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/person/:person_id/edit"
            element={<Main_AddNewNViewNEdit />}
          ></Route>

          {/* ติดต่อ */}
          <Route path="/contact" element={<Main />}></Route>
          <Route
            path="/contact/addnew-contact"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/contact/:contact_id"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/contact/:contact_id/edit"
            element={<Main_AddNewNViewNEdit />}
          ></Route>

          {/* ที่อยู่ */}
          <Route path="/address" element={<Main />}></Route>
          <Route
            path="/address/addnew-address"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/address/:address_id"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/address/:address_id/edit"
            element={<Main_AddNewNViewNEdit />}
          ></Route>

          {/* ฟลีต */}
          <Route path="/fleet" element={<Main />}></Route>
          <Route
            path="/fleet/addnew-fleet"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/fleet/:fleet_id"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/fleet/:fleet_id/edit"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/fleet/addnew-fleet/addnew-customer"
            element={<AddNewCustomer />}
          ></Route>
          <Route
            path="/fleet/addnew-fleet/addnew-customer"
            element={<AddNewCustomer />}
          ></Route>

          {/* รถ */}
          <Route path="/vehicle" element={<Main />}></Route>
          <Route
            path="/vehicle/addnew-vehicle"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/vehicle/:vehicle_id"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/vehicle/:vehicle_id/edit"
            element={<Main_AddNewNViewNEdit />}
          ></Route>

          {/* device */}
          <Route path="/device" element={<Main />}></Route>
          <Route
            path="/device/addnew-device"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/device/:device_id"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/device/:device_id/edit"
            element={<Main_AddNewNViewNEdit />}
          ></Route>

          {/* device_serial */}
          <Route path="/device-serial" element={<Main />}></Route>
          <Route
            path="/device-serial/addnew-device-serial"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/device-serial/:device_serial_id"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/device-serial/:device_serial_id/edit"
            element={<Main_AddNewNViewNEdit />}
          ></Route>

          {/* Test */}
          <Route path="/test" element={<Test />}></Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
