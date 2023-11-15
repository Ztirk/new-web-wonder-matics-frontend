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
import { Link, useLocation } from "react-router-dom";
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
import { all } from "axios";

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

  // Redux
  const dispatch = useDispatch();
  const addOEditAddress: SendAddress = useSelector(addOEditAddressState);

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
    } else if (
      addOEditAddress.address.province &&
      !addOEditAddress.address.district
    ) {
      getDistrictSelector(setDistrictSelector, addOEditAddress);
    } else if (
      addOEditAddress.address.province &&
      addOEditAddress.address.district
    ) {
      getSubDistrictSelector(setSubDistrictSelector, addOEditAddress);
    }
  }, [addOEditAddress]);

  useEffect(() => {
    dispatch(setDistrict(""));
    dispatch(setSubDistrict(""));
    dispatch(setPostalCode(""));
  }, [addOEditAddress.address.province]);

  useEffect(() => {
    dispatch(setSubDistrict(""));
    dispatch(setPostalCode(""));
  }, [addOEditAddress.address.district]);

  useEffect(() => {
    dispatch(setPostalCode(""));
  }, [addOEditAddress.address.sub_district]);

  useEffect(() => {
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
    const addressType = addressData.address_type;
    const addressTypeDelete = addressData.address_typeDelete;
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
        if (addOEditAddress.address.address_type.includes(data.code_id)) {
          return acc + ", " + data.value;
        }
        return acc;
      }, "")
      .slice(2);

    console.log(displayAddressType);

    const newAddress: SendAddressShape = {
      address_id: addressId,
      address_type: addressType,
      address_typeDelete: addressTypeDelete,
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

    dispatch(setAddressNew(newAddress));
    dispatch(setDisplayAddressInteract(displayAddress));
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
        />
        <Input
          label="ชื่อที่อยู่"
          placeholder="ชื่อที่อยู่"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setName(e.currentTarget.value));
          }}
        />
        <Input
          label="เลขที่"
          placeholder="เลขที่"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setHouseNo(e.currentTarget.value));
          }}
        />
        <Input
          label="หมู่ที่"
          placeholder="หมู่ที่"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setVillageNo(e.currentTarget.value));
          }}
        />
        <Input
          label="ซอย"
          placeholder="ซอย"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setAlley(e.currentTarget.value));
          }}
        />
        <Input
          label="ถนน"
          placeholder="ถนน"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setRoad(e.currentTarget.value));
          }}
        />
        <Selector
          label="จังหวัด*"
          placeholder="จังหวัด"
          type="selector"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          provinceSelector={provinceSelector}
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
        />
      </InputFrame>
      {menu !== "address" ? (
        <ButtonRightFrame>
          <Link to=".." relative="path">
            <Button name="บันทึก" onClick={handleClickSave} />
          </Link>
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
