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
import AddNewDocument from "./routes/AddNewDocument";
import AddNewCard from "./routes/AddNewCard";
import AddNewDevice from "./routes/AddNewDevice";

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Frame />}>
          {/* ลูกค้า */}
          <Route path="/customer" element={<Main />} />
          <Route
            path="/customer/add-new-customer"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/customer/:customer_id"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/customer/:customer_id/edit"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/customer/add-new-customer/add-new-contact"
            element={<AddNewContact />}
          />
          <Route
            path="/customer/add-new-customer/add-new-vehicle"
            element={<AddNewVehicle />}
          />
          <Route
            path="/customer/add-new-customer/add-new-person"
            element={<AddNewPerson />}
          />
          <Route
            path="/customer/add-new-customer/add-new-address"
            element={<AddNewAddress />}
          />
          <Route
            path="/customer/add-new-customer/add-new-document"
            element={<AddNewDocument />}
          />
          <Route
            path="/customer/add-new-customer/add-new-fleet"
            element={<AddNewFleet />}
          />
          <Route
            path="/customer/:customer_id/edit/add-new-person"
            element={<AddNewPerson />}
          />
          <Route
            path="/customer/:customer_id/edit/add-new-vehicle"
            element={<AddNewVehicle />}
          />
          <Route
            path="/customer/:customer_id/edit/add-new-contact"
            element={<AddNewContact />}
          />
          <Route
            path="/customer/:customer_id/edit/add-new-fleet"
            element={<AddNewFleet />}
          />
          <Route
            path="/customer/:customer_id/edit/add-new-address"
            element={<AddNewAddress />}
          />
          <Route
            path="/customer/:customer_id/edit/add-new-document"
            element={<AddNewDocument />}
          />
          {/* คน */}
          <Route path="/person" element={<Main />} />
          <Route
            path="/person/add-new-person"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/person/:person_id"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/person/:person_id/edit"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/person/add-new-person/add-new-customer"
            element={<AddNewCustomer />}
          />
          <Route
            path="/person/add-new-person/add-new-contact"
            element={<AddNewContact />}
          />
          <Route
            path="/person/add-new-person/add-new-address"
            element={<AddNewAddress />}
          />
          <Route
            path="/person/add-new-person/add-new-document"
            element={<AddNewDocument />}
          />
          <Route
            path="/person/add-new-person/add-new-card"
            element={<AddNewCard />}
          />
          <Route
            path="/person/:person_id/edit/add-new-customer"
            element={<AddNewCustomer />}
          />
          <Route
            path="/person/:person_id/edit/add-new-contact"
            element={<AddNewContact />}
          />
          <Route
            path="/person/:person_id/edit/add-new-address"
            element={<AddNewAddress />}
          />
          <Route
            path="/person/:person_id/edit/add-new-document"
            element={<AddNewDocument />}
          />
          <Route
            path="/person/:person_id/edit/add-new-card"
            element={<AddNewCard />}
          />
          {/* ติดต่อ */}
          <Route path="/contact" element={<Main />} />
          <Route
            path="/contact/add-new-contact"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/contact/:contact_id"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/contact/:contact_id/edit"
            element={<Main_AddNewNViewNEdit />}
          />
          {/* เอกสาร */}
          <Route path="/document" element={<Main />} />
          <Route
            path="/document/add-new-document"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/document/:document_id"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/document/:document_id/edit"
            element={<Main_AddNewNViewNEdit />}
          />
          {/* บัตร */}
          <Route path="/card" element={<Main />} />
          <Route
            path="/card/add-new-card"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route path="/card/:card_id" element={<Main_AddNewNViewNEdit />} />
          <Route
            path="/card/:card_id/edit"
            element={<Main_AddNewNViewNEdit />}
          />
          {/* ที่อยู่ */}
          <Route path="/address" element={<Main />} />
          <Route
            path="/address/add-new-address"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/address/:address_id"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/address/:address_id/edit"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/address/add-new-address/add-new-document"
            element={<AddNewDocument />}
          />
          <Route
            path="/address/:address_id/edit/add-new-document"
            element={<AddNewDocument />}
          />
          {/* ฟลีต */}
          <Route path="/fleet" element={<Main />} />
          <Route
            path="/fleet/add-new-fleet"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route path="/fleet/:fleet_id" element={<Main_AddNewNViewNEdit />} />
          <Route
            path="/fleet/:fleet_id/edit"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/fleet/add-new-fleet/add-new-customer"
            element={<AddNewCustomer />}
          />
          <Route
            path="/fleet/add-new-fleet/add-new-person"
            element={<AddNewPerson />}
          />
          <Route
            path="/fleet/add-new-fleet/add-new-vehicle"
            element={<AddNewVehicle />}
          />
          <Route
            path="/fleet/:fleet_id/edit/add-new-customer"
            element={<AddNewCustomer />}
          />
          <Route
            path="/fleet/:fleet_id/edit/add-new-person"
            element={<AddNewPerson />}
          />
          <Route
            path="/fleet/:fleet_id/edit/add-new-vehicle"
            element={<AddNewVehicle />}
          />
          {/* รถ */}
          <Route path="/vehicle" element={<Main />} />
          <Route
            path="/vehicle/add-new-vehicle"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/vehicle/:vehicle_id"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/vehicle/:vehicle_id/edit"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/vehicle/add-new-vehicle/add-new-customer"
            element={<AddNewCustomer />}
          />{" "}
          <Route
            path="/vehicle/add-new-vehicle/add-new-person"
            element={<AddNewPerson />}
          />
          <Route
            path="/vehicle/:vehicle_id/edit/add-new-customer"
            element={<AddNewCustomer />}
          />
          <Route
            path="/vehicle/:vehicle_id/edit/add-new-person"
            element={<AddNewPerson />}
          />
          {/* device */}
          <Route path="/device" element={<Main />} />
          <Route
            path="/device/add-new-device"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/device/:device_id"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/device/:device_id/edit"
            element={<Main_AddNewNViewNEdit />}
          />
          {/* device_serial */}
          <Route path="/device-serial" element={<Main />} />
          <Route
            path="/device-serial/add-new-device-serial"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/device-serial/:device_serial_id"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/device-serial/:device_serial_id/edit"
            element={<Main_AddNewNViewNEdit />}
          />
          <Route
            path="/device-serial/add-new-device-serial/add-new-device"
            element={<AddNewDevice />}
          />
          <Route
            path="/device-serial/:device_serial_id/edit/add-new-device"
            element={<AddNewDevice />}
          />
          {/* Test */}
          <Route path="/test" element={<Test />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
