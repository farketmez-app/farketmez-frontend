import React, { useContext, useState } from "react";
import { interests } from "../../constants";
import SelectBox from "../../../select-box/SelectBox";
import InfoBox from "../../../info-box/InfoBox";
import { AppContext } from "../../../../context/AppContext";
import { ModalContext } from "../../../../context/ModalContext";

function SignupInterestSelection() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { state, dispatch } = useContext(AppContext);
  const { dispatch: modalDispatch } = useContext(ModalContext);

  function handleSetInterestsForUser() {
    const ids = [];

    for (let i = 0; i < selectedInterests.length; i++) {
      ids.push(selectedInterests[i].id);
    }

    console.log(state.user.id)

    fetch(
      `http://localhost:8080/user-interests/${state.user.id}/setInterests`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
      }
    )
      .then((res) => {
        
        res.json();
      })
      .then((data) => {
        dispatch({ type: "SET_USER_HAS_SELECTED_INTERESTS", payload: true });
        modalDispatch({ type: "RESET_MODAL" });
      })
      .catch((err) => console.log(err));
  }

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
          onClick={handleSetInterestsForUser}
          disabled={selectedInterests.length < 3}
          className="sign-up-form-sign-up-button"
        >
          İlgi Alanlarını Seç
        </button>
      </div>
    </>
  );
}

export default SignupInterestSelection;
