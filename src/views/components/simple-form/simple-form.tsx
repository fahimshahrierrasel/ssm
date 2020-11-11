import React, { useState } from "react";
import PropTypes from "prop-types";
import OutlineButton from "../outline-button";
import OutlineInput from "../outline-input";
import "./simple-form.scss";

interface ISimpleForm {
  placeholder: string;
  onSave: Function;
  onCancel: Function;
}

const SimpleForm = ({ placeholder, onSave, onCancel }: ISimpleForm) => {
  const [field, setField] = useState<string>("");
  return (
    <div className="simple-form">
		<div className="form-fields">

      <OutlineInput
	  
	  placeholder={placeholder}
	  value={field}
	  onChange={(newValue: string) => setField(newValue)}
      />
	  </div>
      <div className="form-actions">
        <OutlineButton title="CANCEL" onClick={() => onCancel()} />
        <OutlineButton title="SAVE" onClick={() => onSave(field)} />
      </div>
    </div>
  );
};

SimpleForm.propTypes = {
  placeholder: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default SimpleForm;
