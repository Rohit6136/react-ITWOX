import { useEffect, useMemo, useState } from "react";
import { getComments } from "api/Posts";

import Button from "components/Button/Button";

import "./Card.css";

interface CardProps {
  id: string;
  userId: string;
  title: string;
  body: string;
}
const defaultCardHeight = 400;
const expandableContainerHeight = 200;
const expandedCardHeight = defaultCardHeight + expandableContainerHeight;

const loaderStyles = { "background-color": "#ffffff" };

const Card = ({ id, userId, title, body }: CardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const cardStyling = isExpanded
    ? { height: expandedCardHeight }
    : { height: defaultCardHeight };

  const expandableSectionStyling: any = {
    height: expandableContainerHeight,
    overflowY: isExpanded ? "scroll" : "hidden",
  };

  const fetchComments = async () => {
    setIsLoading(true);
    const response = await getComments({ postId: id });
    const data = await response.json();
    setIsLoading(false);
    setComments(data);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isExpanded) {
      fetchComments();
    }
  }, [isExpanded]);

  const renderComments = useMemo(
    () =>
      comments.map(({ id, name: commenterName, email, body }) => (
        <div className="child-html">
          <div className="commenter-profile-info">
            <p>ID: {id}</p>
            <span className="commenterName">{commenterName}</span>
            <span className="commenterEmail">{email}</span>
          </div>
          <p>{body}</p>
        </div>
      )),
    [comments]
  );

  const renderCommentsCount = () => (
    <> comments count: {renderComments.length}</>
  );

  const renderDropDown = () =>
    isExpanded ? (
      <div className="dropdown-container">
        <div
          className={`expandable-section ${isExpanded ? "expanded" : ""}`}
          style={expandableSectionStyling}
        >
          {renderCommentsCount()}
          {renderComments}
        </div>
      </div>
    ) : (
      <></>
    );

  return (
    <div
      className={`card ${isExpanded ? "card-expanded" : ""}`}
      style={cardStyling}
    >
      <div className="card-header">
        <span>ID: {id}</span>
        <span>userId: {userId}</span>
        <Button
          text={isExpanded ? "Collapse Comments" : "Expand Comments"}
          onClickEvent={toggleExpand}
          type="button"
          isLoading={isLoading}
        />
      </div>
      <div className="card-body">
        <h2 className="title">{title}</h2>
        <hr className="horizontalLine"></hr>
        <p>{body}</p>
        <hr className="horizontalLine"></hr>
        {isLoading ? <>Loading...</> : renderDropDown()}
      </div>
    </div>
  );
};

export default Card;
