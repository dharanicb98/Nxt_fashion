import React, { useState } from "react";
import FormInputs from "../popup/formInputs";
import Button from "../button";
import PhoneExtensionSelectBar from "../popup/selectPhoneNo";


const UserList = [
  {
    id: 1,
    type: "text",
    label: "Name",
    apiKey: "name",
    optionsList: "",
    className : "w-[45%]"
  },
  
  {
    id: 3,
    type: "number",
    label: "Pincode",
    apiKey: "pincode",
    optionsList: "",
    className : "w-[45%]"
  },
  {
    id: 4,
    type: "text",
    label: "City",
    apiKey: "city",
    optionsList: "",
    className : "w-[45%]"
  },
  {
    id: 5,
    type: "text",
    label: "State",
    apiKey: "state",
    optionsList: "",
    className : "w-[45%]"
  },
  {
    id: 6,
    type: "text",
    label: "Locality/Area/Street",
    apiKey: "area",
    optionsList: "",
    className : "w-[45%]"
  },
  {
    id: 7,
    type: "text",
    label: "Flat no/Buliding Name",
    apiKey: "flatAddress",
    optionsList: "",
    className : "w-[45%]"
  },
  {
    id: 8,
    type: "text",
    label: "Landmark",
    apiKey: "landmark",
    optionsList: "",
    className : "w-[40%]"
  },
  {
    id: 2,
    type: "phone_ext",
    label: "Phone Number",
    apiKey: "mobile",
    optionsList: "",
    required : true,
    // className:"w-[45%]",
    column : true,
},
];

function AddessFrom({
  isEdit,
  close,
  editData,
  handleRequest,
  value,
  createClick,
  isdisplay = false
}) {
  const [formData, setFormData] = useState({ ...editData });
  const [phoneExt, setPhoneExt] = useState(`${formData?.mobile_ext ? formData.mobile_ext : "+1"}`);


  const handleSubmit = (e) => {
    e.preventDefault();
    close();
    handleRequest(formData);
    // Object.keys(formData).forEach((e) => (formData[e] = ""));
    setFormData(formData);
  };

  const renderFormInputs = (eachItem, index) => {
    switch (eachItem.type) {
      case "phone_ext":
        return (
          <PhoneExtensionSelectBar
            key={index}
            type={eachItem.type}
            inputStyle={eachItem.column ? "flex-col mt-3 items-start justify-start" : "justify-between"}
            value={formData[eachItem.apiKey]}
            labelStyle={
              eachItem.column
                ? "font-medium text-md mx-2"
                : ""
            }
            className={eachItem.column ? `${eachItem.className && eachItem.className} ${isdisplay ? "w-[245%]" : "w-[170%]"} left-0 h-[45px]` : "w-full m-1 h-[50px]"}
            placeholder={"Enter number"}
            label={eachItem.label}
            selectPhoneExt={(item) => setPhoneExt(item)}
            phoneExt={phoneExt}
            onChange={(event) => {
              setFormData({
                ...formData,
                mobile_ext: phoneExt,
                [eachItem.apiKey]: event.target.value,
              })
            }
            }
          />
        )

      default:
        return (
          <FormInputs
            objKey="optionValue"
            optionsData={eachItem.optionsList}
            required={createClick && eachItem.required}
            key={index}
            label={eachItem.label}
            type={eachItem.type}
            labelStyle={`${eachItem.labelStyle ? eachItem.labelStyle : ""}`}
            readTextArea={`${eachItem.className && eachItem.className}`}
            value={formData[eachItem.apiKey] || ""}
            className={`mt-2 ${eachItem.className && eachItem.className} ${isdisplay ? `w-[45%]` : "w-[30%] ml-1"}`}
            readInput={"h-[43px]"}
            onChange={(e) => setFormData(
              createClick
                ? { ...formData, [eachItem.apiKey]: e.target.value }
                : eachItem.apiKey !== "slug"
                  ? { ...formData, [eachItem.apiKey]: e.target.value }
                  : { ...formData }
            )}
          />
        )
    }
  }


  return (
    <div>
      {isEdit && (
        <form onSubmit={handleSubmit}>
           <div className={`flex ${isdisplay ? "xl:space-x-2 md:space-x-1" : "xl:space-x-1.5 md:space-x-1"} xl:space-x-3 md:space-x-1 flex-wrap`}>
            {UserList.map((eachItem, index) => (
                renderFormInputs(eachItem, index)
              ))}
          </div>
          <div className="flex justify-between mt-10">
            <Button type="outline" value="Cancel" onClick={close} />
            <Button buttonType="submit" value={value} type="secondary" className = "!bg-[#3A4980]"/>
          </div>
        </form>
      )}
    </div>
  );
}
export default AddessFrom;
