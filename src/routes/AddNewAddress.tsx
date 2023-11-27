import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input/Input";
import InputFrame from "../components/Input/InputFrame";
import Divider from "../components/Table/Divider";
import {
  addOEditAddressState,
  setAlley,
  setDistrict,
  setHouseNo,
  setName,
  setPostalCode,
  setRoad,
  setSubDistrict,
  setVillageNo,
} from "../features/addOEdit/addOEditAddressSlice";
import {
  AddressIterate,
  AddressSelector,
  DistrictSelector,
  PickedAddress,
  ProvinceSelector,
  SendAddress,
  SendAddressShape,
  SubDistrictSelector,
} from "../interface/addressType";
import { getSelector } from "../api/getSelector";
import { MasterCode } from "../interface/mastercodeType";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Selector from "../components/Input/Selector";
import Button from "../components/Button/Button";
import ButtonRightFrame from "../components/Button/ฺButtonRightFrame";
import {
  getDistrictSelector,
  getProvinceSelector,
  getSubDistrictSelector,
} from "../api/getAddressSelector";
import { v4 as uuidv4 } from "uuid";
import { setAddressNew } from "../features/addNewOAddExistSlice";
import { setDisplayAddressInteract } from "../features/displaySlice";
import { ErrorPopUpType } from "../interface/componentType";
import {
  errorPopUpState,
  setErrorPopUpState,
} from "../features/errorPopUpSlice";
import { relative } from "path";

interface Props {
  addNew1OId: string;
  addNew2OEdit: string;
}

export default function AddNewAddress({ addNew1OId, addNew2OEdit }: Props) {
  const [selectorData, setSelectorData] = useState<MasterCode>();
  0;
  const [provinceSelector, setProvinceSelector] = useState<ProvinceSelector>();
  const [districtSelector, setDistrictSelector] = useState<DistrictSelector>();
  const [subDistrictSelector, setSubDistrictSelector] =
    useState<SubDistrictSelector>();

  // Router
  const location = useLocation();
  const segments = location.pathname.split("/").splice(1);
  const menu = segments[0];
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const addOEditAddress: SendAddress = useSelector(addOEditAddressState);
  const errorPopUp: ErrorPopUpType = useSelector(errorPopUpState);

  // useEffect
  useEffect(() => {
    getSelector(setSelectorData, "address");
  }, []);

  useEffect(() => {
    if (
      !addOEditAddress.address.province &&
      !addOEditAddress.address.district
    ) {
      getProvinceSelector(setProvinceSelector);
    }
    if (
      (addOEditAddress.address.province && !addOEditAddress.address.district) ||
      (addOEditAddress.address.province &&
        addOEditAddress.address.district &&
        addOEditAddress.address.postal_code)
    ) {
      getDistrictSelector(setDistrictSelector, addOEditAddress);
    }
    if (addOEditAddress.address.province && addOEditAddress.address.district) {
      getSubDistrictSelector(setSubDistrictSelector, addOEditAddress);
    }
  }, [addOEditAddress.address.province, addOEditAddress.address.district]);

  useEffect(() => {
    if (!addOEditAddress.address.province) {
      dispatch(setDistrict(""));
      dispatch(setSubDistrict(""));
      dispatch(setPostalCode(""));
    }
  }, [addOEditAddress.address.province]);

  useEffect(() => {
    if (!addOEditAddress.address.district) {
      dispatch(setSubDistrict(""));
      dispatch(setPostalCode(""));
    }
  }, [addOEditAddress.address.district]);

  useEffect(() => {
    if (!addOEditAddress.address.sub_district) {
      dispatch(setPostalCode(""));
    }
    if (subDistrictSelector) {
      for (const obj of subDistrictSelector.response.sub_districts) {
        if (obj.sub_district_th == addOEditAddress.address.sub_district) {
          dispatch(setPostalCode(obj.postal_code));
        }
      }
    }
  }, [addOEditAddress.address.sub_district]);

  const handleClickSave = () => {
    const addressData = addOEditAddress.address;
    const addressId = uuidv4();
    const addressType = addressData.address_type_code_id;
    const addressTypeDelete = addressData.address_type_code_idDelete;
    const alley = addressData.alley;
    const district = addressData.district;
    const houseNo = addressData.house_no;
    const name = addressData.name;
    const postalCode = addressData.postal_code;
    const province = addressData.province;
    const road = addressData.road;
    const subDistrict = addressData.sub_district;
    const villageNo = addressData.village_no;
    const displayAddressType = selectorData?.response[0]
      .concat(selectorData.response[2])
      .reduce((acc, data) => {
        if (
          addOEditAddress.address.address_type_code_id.includes(data.code_id)
        ) {
          return acc + ", " + data.value;
        }
        return acc;
      }, "")
      .slice(2);

    const newAddress: SendAddressShape = {
      address_id: addressId,
      address_type_code_id: addressType,
      address_type_code_idDelete: addressTypeDelete,
      alley: alley,
      district: district,
      house_no: houseNo,
      name: name,
      postal_code: postalCode,
      province: province,
      road: road,
      sub_district: subDistrict,
      village_no: villageNo,
    };

    const displayAddress: AddressIterate = {
      address_id: addressId,
      address_type: displayAddressType ?? "",
      location:
        name +
        " " +
        houseNo +
        " " +
        villageNo +
        " " +
        alley +
        " " +
        road +
        " " +
        subDistrict +
        " " +
        district +
        " " +
        province +
        " " +
        postalCode,
      RowNum: null,
    };

    if (
      !addOEditAddress.address.address_type_code_id.length ||
      !addOEditAddress.address.province ||
      !addOEditAddress.address.district ||
      !addOEditAddress.address.sub_district ||
      !addOEditAddress.address.postal_code
    ) {
      dispatch(setErrorPopUpState({ active: true, message: "" }));
    } else {
      dispatch(setAddressNew(newAddress));
      dispatch(setDisplayAddressInteract(displayAddress));
      navigate("..", { relative: "path" });
    }
  };

  return (
    <Fragment>
      <Divider title="ข้อมูลที่อยู่" />
      <InputFrame>
        <Selector
          label="ประเภทที่อยู่*"
          selectorData={selectorData?.response[0].concat(
            selectorData.response[2]
          )}
          type="multi-selector"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          required={
            errorPopUp.active &&
            !addOEditAddress.address.address_type_code_id.length
          }
        />
        <Input
          label="ชื่อที่อยู่"
          placeholder="ชื่อที่อยู่"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setName(e.currentTarget.value));
          }}
          defaultValue={addOEditAddress.address.name}
        />
        <Input
          label="เลขที่"
          placeholder="เลขที่"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setHouseNo(e.currentTarget.value));
          }}
          defaultValue={addOEditAddress.address.house_no}
        />
        <Input
          label="หมู่ที่"
          placeholder="หมู่ที่"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setVillageNo(e.currentTarget.value));
          }}
          defaultValue={addOEditAddress.address.village_no}
        />
        <Input
          label="ซอย"
          placeholder="ซอย"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setAlley(e.currentTarget.value));
          }}
          defaultValue={addOEditAddress.address.alley}
        />
        <Input
          label="ถนน"
          placeholder="ถนน"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setRoad(e.currentTarget.value));
          }}
          defaultValue={addOEditAddress.address.road}
        />
        <Selector
          label="จังหวัด*"
          placeholder="จังหวัด"
          type="selector"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          provinceSelector={provinceSelector}
          required={errorPopUp.active && !addOEditAddress.address.province}
        />
        <Selector
          label="อำเภอ/เขต*"
          placeholder="อำเภอ/เขต"
          type="selector"
          disabled={
            (!addNew2OEdit && !isNaN(Number(addNew1OId))) ||
            !addOEditAddress.address.province
              ? true
              : false
          }
          districtSelector={districtSelector}
          required={errorPopUp.active && !addOEditAddress.address.district}
        />
        <Selector
          label="ตำบล/แขวง*"
          placeholder="ตำบล/แขวง"
          type="selector"
          disabled={
            (!addNew2OEdit && !isNaN(Number(addNew1OId))) ||
            !addOEditAddress.address.district ||
            !addOEditAddress.address.province
              ? true
              : false
          }
          subDistrictSelector={subDistrictSelector}
          required={errorPopUp.active && !addOEditAddress.address.sub_district}
        />
        <Selector
          label="รหัสไปรษณีย์*"
          placeholder="รหัสไปรษณีย์"
          type="selector"
          defaultValue={
            addOEditAddress.address.postal_code
              ? addOEditAddress.address.postal_code
              : ""
          }
          disabled={true}
          required={errorPopUp.active && !addOEditAddress.address.postal_code}
        />
      </InputFrame>
      {menu !== "address" ? (
        <ButtonRightFrame>
          <Button name="บันทึก" onClick={handleClickSave} />
          <Link to=".." relative="path">
            <Button name="ยกเลิก" />
          </Link>
        </ButtonRightFrame>
      ) : (
        <></>
      )}
    </Fragment>
  );
}
