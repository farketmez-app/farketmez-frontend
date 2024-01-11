import React, { useContext, useState } from "react";
import { interests } from "../../constants";
import SelectBox from "../../../select-box/SelectBox";
import InfoBox from "../../../info-box/InfoBox";
import { AppContext } from "../../../../context/AppContext";

const CINEMA = "Sinema";
const RESTAURANT = "Restoran ve yemek";
const CONCERT = "Konserler ve canlı müzik";
const THEATRE = "Tiyatro";
const ART_GALLERY = "Sanat sergileri ve galeriler";
const SPORTS = "Spor";
const OUTDOOR = "Doğa yürüyüşleri ve açık hava";
const CLUBS = "Gece kulüpleri ve eğlence mekanları";
const READING = "Kitap okuma ve edebiyat";
const MUSEUM = "Müzeler";
const KIDS_ACTIVITIES = "Çocuk etkinlikleri";
const YOGA = "Yoga ve spor salonları";

function SignupInterestSelection() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { state } = useContext(AppContext);

  function changeInterestsToEnum(interests) {
    let interestsEnum = [];
    interests.forEach((interest) => {
      switch (interest.name) {
        case CINEMA:
          interestsEnum.push("CINEMA");
          break;
        case RESTAURANT:
          interestsEnum.push("RESTAURANT");
          break;
        case CONCERT:
          interestsEnum.push("CONCERT");
          break;
        case THEATRE:
          interestsEnum.push("THEATRE");
          break;
        case ART_GALLERY:
          interestsEnum.push("ART_GALLERY");
          break;
        case SPORTS:
          interestsEnum.push("SPORTS");
          break;
        case OUTDOOR:
          interestsEnum.push("OUTDOOR");
          break;
        case CLUBS:
          interestsEnum.push("CLUBS");
          break;
        case READING:
          interestsEnum.push("READING");
          break;
        case MUSEUM:
          interestsEnum.push("MUSEUM");
          break;
        case KIDS_ACTIVITIES:
          interestsEnum.push("KIDS_ACTIVITIES");
          break;
        case YOGA:
          interestsEnum.push("YOGA");
          break;
        default:
          break;
      }
    });
    return interestsEnum;
  }

  function handleSetInterestsForUser() {
    // request body will look like this: ["MUSEUM","YOGA","READING","OUTDOOR"] (string)
    /**
    fetch(`http://localhost:8080/user/${state.user.id}/interests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changeInterestsToEnum(selectedInterests)),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      }); */

    console.log(JSON.stringify(changeInterestsToEnum(selectedInterests)));
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
