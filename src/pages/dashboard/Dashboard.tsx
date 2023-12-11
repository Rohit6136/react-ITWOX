import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getPosts } from "api/Posts";

import Card from "components/Card/Card";

import { getUserData } from "helpers/selector";

import "./Dashboard.css";
import Button from "components/Button/Button";

const resultsPerPage = 10;

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage,setCurrentPage] = useState(1)
  const [visiblePosts, setVisiblePosts] = useState<ReactNode>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { email } =
    useSelector(getUserData) ||
    JSON.parse(localStorage.getItem("userData") || "{}");

  const isSignedIn = !!email;

  //validating page numbers
  if (currentPage < 1) {
    setCurrentPage(1)
  }
  if (currentPage > 10) {
    setCurrentPage(10)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const response = await getPosts();
      const data = await response.json();
      setIsLoading(false);
      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const normalizedPageCount = currentPage - 1;
    if (posts.length > 0) {
      const results = [];
      for (
        let currCount = normalizedPageCount * resultsPerPage;
        currCount < normalizedPageCount * resultsPerPage + resultsPerPage;
        currCount++
      ) {
        const { id, title, body, userId } = posts[currCount];

        results.push(
          <Card userId={userId} id={id} title={title} body={body} />
        );
      }
      setVisiblePosts(results);
    }
  }, [posts, currentPage]);

  const onPreviousClick = () => {
    setCurrentPage(currentPage-1);
  };

  const onNextClick = () => {
    setCurrentPage(currentPage+1);
  };

  const isPreviousButtonDisabled = currentPage < 2;
  const isNextButtonDisabled = currentPage > 9;

  if (!isSignedIn) {
    return <></>;
  }

  return (
    <div className="dashboardPage">
      <h1 data-testid="dashboard-title">Dashboard</h1>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <div className="postsContainer">{visiblePosts}</div>
          <div className="pagination">
            <Button
              text="Previous"
              onClickEvent={onPreviousClick}
              type="button"
              disabled={isPreviousButtonDisabled}
            />
            <span className="currentPageNumber">{currentPage}</span>
            <Button
              text="Next"
              onClickEvent={onNextClick}
              type="button"
              disabled={isNextButtonDisabled}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
