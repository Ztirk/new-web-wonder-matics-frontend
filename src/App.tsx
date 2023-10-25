import Main from "./routes/Main";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./routes/Login";
import Main_AddNew from "./routes/Main_AddNew";
import Frame from "./routes/Frame";
import Main_View from "./routes/Main_View";
import Main_Edit from "./routes/Main_Edit";
import Main_AddNew_Contact from "./routes/Main_AddNew_Contact";
import Main_AddNew_Person from "./routes/Main_AddNew_Person";
import Test from "./routes/test";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Frame />}>
          {/* ลูกค้า */}
          <Route path="/customer" element={<Main />}></Route>
          <Route
            path="/customer/add-new-customer"
            element={<Main_AddNew />}
          ></Route>
          <Route
            path="/customer/add-new-customer/add-new-contact"
            element={<Main_AddNew_Contact />}
          ></Route>
          <Route path="/customer/:customer_id" element={<Main_View />}></Route>
          <Route
            path="/customer/:customer_id/edit"
            element={<Main_Edit />}
          ></Route>
          <Route
            path="/customer/:customer_id/edit/add-new-contact"
            element={<Main_AddNew_Contact />}
            s
          ></Route>
          <Route
            path="/customer/:customer_id/edit/add-new-person"
            element={<Main_AddNew_Person />}
          ></Route>

          {/* คน */}
          <Route path="/person" element={<Main />}></Route>
          <Route
            path="/person/add-new-person"
            element={<Main_AddNew />}
          ></Route>
          <Route path="/person/:person_id" element={<Main_View />}></Route>
          <Route path="/person/:person_id/edit" element={<Main_Edit />}></Route>

          {/* ติดต่อ */}
          <Route path="/contact" element={<Main />}></Route>
          <Route
            path="/contact/add-new-contact"
            element={<Main_AddNew />}
          ></Route>
          <Route path="/contact/:contact_id" element={<Main_View />}></Route>
          <Route
            path="/contact/:contact_id/edit"
            element={<Main_Edit />}
          ></Route>

          {/* ที่อยู่ */}
          <Route path="/address" element={<Main />}></Route>
          <Route
            path="/address/add-new-address"
            element={<Main_AddNew />}
          ></Route>
          <Route path="/address/:address_id" element={<Main_View />}></Route>
          <Route
            path="/address/:address_id/edit"
            element={<Main_Edit />}
          ></Route>

          {/* ฟลีต */}
          <Route path="/fleet" element={<Main />}></Route>
          <Route path="/fleet/add-new-fleet" element={<Main_AddNew />}></Route>
          <Route path="/fleet/:fleet_id" element={<Main_View />}></Route>
          <Route path="/fleet/:fleet_id/edit" element={<Main_Edit />}></Route>

          {/* รถ */}
          <Route path="/vehicle" element={<Main />}></Route>
          <Route
            path="/vehicle/add-new-vehicle"
            element={<Main_AddNew />}
          ></Route>
          <Route path="/vehicle/:vehicle_id" element={<Main_View />}></Route>
          <Route
            path="/vehicle/:vehicle_id/edit"
            element={<Main_Edit />}
          ></Route>

          {/* device */}
          <Route path="/device" element={<Main />}></Route>
          <Route
            path="/device/add-new-device"
            element={<Main_AddNew />}
          ></Route>
          <Route path="/device/:vehicle_id" element={<Main_View />}></Route>
          <Route
            path="/device/:vehicle_id/edit"
            element={<Main_Edit />}
          ></Route>

          {/* device_serial */}
          <Route path="/deviceserial" element={<Main />}></Route>
          <Route
            path="/deviceserial/add-new-deviceserial"
            element={<Main_AddNew />}
          ></Route>
          <Route path="/deviceserial/:vehicle_id" element={<Main_View />}></Route>
          <Route
            path="/deviceserial/:vehicle_id/edit"
            element={<Main_Edit />}
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
