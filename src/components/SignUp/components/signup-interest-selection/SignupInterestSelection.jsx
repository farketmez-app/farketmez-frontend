import React, { useState } from "react";
import { interests } from "../../constants";
import SelectBox from "../../../select-box/SelectBox";
import InfoBox from "../../../info-box/InfoBox";

function SignupInterestSelection() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  return (
    <>
      <div className="sign-up-form-interests">
        <p className="sign-up-form-interests-title">
          İlgi alanlarını seçerek etkinlik önerileri alabilirsin
        </p>
        <div className="sign-up-form-interests-grid">
          {interests.map((interest) => (
            <SelectBox
              selectedOnes={selectedInterests}
              option={interest}
              toggleSelectBox={(option) => {
                if (selectedInterests.includes(option)) {
                  setSelectedInterests(
                    selectedInterests.filter((item) => item !== option)
                  );
                } else {
                  setSelectedInterests([...selectedInterests, option]);
                }
              }}
              image={interest.image}
              text={interest.name}
            />
          ))}
        </div>

        {selectedInterests.length < 3 && (
          <InfoBox text={"En az 3 ilgi alanı seçmelisin"} type="error" />
        )}

        <button
          disabled={selectedInterests.length < 3}
          className="sign-up-form-sign-up-button"
        >
          Hesap Oluştur
        </button>
      </div>
    </>
  );
}

export default SignupInterestSelection;
