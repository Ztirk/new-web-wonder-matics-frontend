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
import Main_AddNew_Contact from "./routes/Main_AddNew_Contact";
import Main_AddNew_Person from "./routes/Main_AddNew_Person";
import Test from "./routes/test";

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Frame />}>
          {/* ลูกค้า */}
          <Route path="/customer" element={<Main />}></Route>
          <Route
            path="/customer/add-new-customer"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/customer/:customer_id"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/customer/add-new-customer/add-new-contact"
            element={<Main_AddNew_Contact />}
          ></Route>
          <Route
            path="/customer/:customer_id/edit"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/customer/:customer_id/edit/add-new-contact"
            element={<Main_AddNew_Contact />}
          ></Route>
          <Route
            path="/customer/:customer_id/edit/add-new-person"
            element={<Main_AddNew_Person />}
          ></Route>

          {/* คน */}
          <Route path="/person" element={<Main />}></Route>
          <Route
            path="/person/add-new-person"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route path="/person/:person_id" element={<Main_AddNewNViewNEdit />}></Route>
          <Route path="/person/:person_id/edit" element={<Main_AddNewNViewNEdit />}></Route>

          {/* ติดต่อ */}
          <Route path="/contact" element={<Main />}></Route>
          <Route
            path="/contact/add-new-contact"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route path="/contact/:contact_id" element={<Main_AddNewNViewNEdit />}></Route>
          <Route
            path="/contact/:contact_id/edit"
            element={<Main_AddNewNViewNEdit />}
          ></Route>

          {/* ที่อยู่ */}
          <Route path="/address" element={<Main />}></Route>
          <Route
            path="/address/add-new-address"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route path="/address/:address_id" element={<Main_AddNewNViewNEdit />}></Route>
          <Route
            path="/address/:address_id/edit"
            element={<Main_AddNewNViewNEdit />}
          ></Route>

          {/* ฟลีต */}
          <Route path="/fleet" element={<Main />}></Route>
          <Route path="/fleet/add-new-fleet" element={<Main_AddNewNViewNEdit />}></Route>
          <Route path="/fleet/:fleet_id" element={<Main_AddNewNViewNEdit />}></Route>
          <Route path="/fleet/:fleet_id/edit" element={<Main_AddNewNViewNEdit />}></Route>

          {/* รถ */}
          <Route path="/vehicle" element={<Main />}></Route>
          <Route
            path="/vehicle/add-new-vehicle"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route path="/vehicle/:vehicle_id" element={<Main_AddNewNViewNEdit />}></Route>
          <Route
            path="/vehicle/:vehicle_id/edit"
            element={<Main_AddNewNViewNEdit />}
          ></Route>

          {/* device */}
          <Route path="/device" element={<Main />}></Route>
          <Route
            path="/device/add-new-device"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route path="/device/:device_id" element={<Main_AddNewNViewNEdit />}></Route>
          <Route path="/device/:device_id/edit" element={<Main_AddNewNViewNEdit />}></Route>

          {/* device_serial */}
          <Route path="/deviceserial" element={<Main />}></Route>
          <Route
            path="/deviceserial/add-new-deviceserial"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/deviceserial/:device_serial_id"
            element={<Main_AddNewNViewNEdit />}
          ></Route>
          <Route
            path="/deviceserial/:device_serial_id/edit"
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
