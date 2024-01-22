import React from "react";
import "./copy-link-button.css";

import LinkIcon from "../../../../assets/icons/link-purple.png";
import { toast } from "react-toastify";

function CopyLinkButton({ link }) {
  function copyToClipboard() {
    toast("Panoya Kopyalandı", { type: "success", position: "top-center" });
    navigator.clipboard.writeText(link);
  }
  return (
    <button className="copy-link-button" onClick={copyToClipboard}>
      <img className="copy-link-button__icon" src={LinkIcon} alt="link" />

      <p className="copy-link-button__text">kopyala</p>
    </button>
  );
}

export default CopyLinkButton;
