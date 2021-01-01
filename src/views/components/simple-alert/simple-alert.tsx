import React from "react";
import PropTypes from "prop-types";
import Portal from "../../portal";
import Modal from "../modal";
import "./simple-alert.scss";
import OutlineButton from "../outline-button";

interface ISimpleAlertProps {
  title?: string;
  description: string;
  acceptAction?: Function;
  cancelAction: Function;
}

const SimpleAlert = ({ ...props }: ISimpleAlertProps) => {
  return (
    <Portal>
      <Modal title={props.title ?? "Alert"}>
        <div className="simple-alert">
          <h3>{props.description}</h3>
          <div className="alert-footer">
            <OutlineButton
              title="CANCEL"
              onClick={() => props.cancelAction()}
            />
            {props.acceptAction && (
              <OutlineButton
                title="OK"
                onClick={() => props.acceptAction?.()}
              />
            )}
          </div>
        </div>
      </Modal>
    </Portal>
  );
};

SimpleAlert.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  acceptAction: PropTypes.func,
  cancelAction: PropTypes.func.isRequired,
};

export default SimpleAlert;
