import React from "react";
import "./welcome-page.css";
import ThumbsDownImage from "../../assets/images/thumbs-down.png";
import ThumbsUpImage from "../../assets/images/thumbs-up.png";
import CalendarImage from "../../assets/images/calendar.png";
import Heading from "../../components/heading/Heading";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <Heading
        images={[
          {
            src: ThumbsDownImage,
            alt: "Thumbs Down",
          },
          {
            src: ThumbsUpImage,
            alt: "Thumbs Up",
          },
          {
            src: CalendarImage,
            alt: "Calendar",
          },
        ]}
        title={"Farketmez"}
        type={"gradient"}
      />

      <div className="welcome-page__content">
        <div className="welcome-page__content__title">
          <h3 className="welcome-page__content__title__text">
            Kararsızlığını Yönet
          </h3>

          <p className="welcome-page__content__title__description">
            Başkalarının puanlayıp değerlendirdiği etkinlik seçeneklerini
            keşfet. Hoşuna giden fikirleri diğerleriyle paylaş!
          </p>
        </div>

        <div className="welcome-page__content__buttons">
          <Button
            onClick={() => navigate("/sign-up")}
            type="secondary"
            customClassname={"welcome-page__content__button"}
          >
            <span>Kayıt Ol</span>
          </Button>

          <Button
            onClick={() => navigate("/sign-in")}
            type="primary"
            customClassname={"welcome-page__content__button"}
          >
            <span>Giriş Yap</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
