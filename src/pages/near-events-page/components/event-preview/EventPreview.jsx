import React, { useEffect, useState } from "react";
import "./event-preview.css";
import RatingStars from "../rating-stars/RatingStars";
import TickIcon from "../../../../assets/icons/tick.svg";

import EventComment from "./components/event-comment/EventComment";
import EventCommentSkeleton from "./components/event-comment/EventCommentSkeleton";

const fakeComments = [
  {
    id: 1,
    name: "Ahmet",
    surname: "Kaya",
    comment:
      "Yemekleri, ikramları, servisi ve atmosferi ile kusursuz bir mekan. Yemekleri porsiyon olarak fazlasıyla yetiyor. 3 yaşındaki oğlum için ayrı servis ve meze getirmeleri ise çok hoş bir davranıştı.",
    rating: 4.5,
    commentedTox: 1,
  },
  {
    id: 2,
    name: "Mehmet",
    surname: "Kaya",
    comment:
      "Yemekleri, ikramları, servisi ve atmosferi ile kusursuz bir mekan. Yemekleri porsiyon olarak fazlasıyla yetiyor. 3 yaşındaki oğlum için ayrı servis ve meze getirmeleri ise çok hoş bir davranıştı.",
    rating: 4.1,
    commentedTo: 1,
  },
  {
    id: 3,
    name: "Veli",
    surname: "Kaya",
    comment:
      "Yemekleri, ikramları, servisi ve atmosferi ile kusursuz bir mekan. Yemekleri porsiyon olarak fazlasıyla yetiyor. 3 yaşındaki oğlum için ayrı servis ve meze getirmeleri ise çok hoş bir davranıştı.",
    rating: 4.3,
    commentedTo: 1,
  },
];

function EventPreview({ event }) {
  const [fetchingComments, setFetchingComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setFetchingComments(true);

    setTimeout(() => {
      setComments(fakeComments);
      setFetchingComments(false);
    }, 2000);
  }, []);
  return (
    <div className="event-preview">
      <div className="event-preview__container">
        <div className="event-preview__images">
          <img
            src={event.images[0]}
            alt="event"
            className={`event-preview__image event-preview__image--1`}
          />

          <div className="event-preview__images--right-hand-side">
            <img
              src={event.images[1]}
              alt="event"
              className={`event-preview__image event-preview__image--2`}
            />

            <img
              src={event.images[2]}
              alt="event"
              className={`event-preview__image event-preview__image--3`}
            />
          </div>
        </div>

        <div className="event-preview__info">
          <div className="event-preview__info-header">
            <div className="event-preview__rating">
              <RatingStars size={"large"} rating={event.rating} />
            </div>

            <div className="event-preview__where-and-cost-info">
              <div className="event-preview__where">
                {event.where}

                <img
                  src={TickIcon}
                  alt="tick"
                  className="event-preview__tick-icon"
                />
              </div>

              <div className="event-preview__cost">
                {event.cost}

                <img
                  src={TickIcon}
                  alt="tick"
                  className="event-preview__tick-icon"
                />
              </div>
            </div>
          </div>

          <p className="event-preview__title">{event.title}</p>

          <div className="event-preview__comments">
            <p className="event-preview__comments-header">Yorumlar</p>

            {fetchingComments &&
              Array.from({ length: 3 }).map((_, index) => {
                return <EventCommentSkeleton key={index} />;
              })}

            {!fetchingComments &&
              comments.map((comment, index) => {
                return <EventComment key={index} comment={comment} />;
              })}

            <div className="event-preview__comments-see-all">
              <a
                href={event.commentsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="event-preview__comments-see-all-link"
              >
                Tüm yorumları gör
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPreview;
