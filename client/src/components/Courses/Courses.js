import React from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import { useSelector } from "react-redux";
import { Button } from 'react-bootstrap';

const Courses = () => {
  const { courses } = useSelector((state) => state.cou);
  const courseList = courses.map((c) => c.course_name.toUpperCase());
  console.log(courseList);


  return (
    <div className="container">
      <div className="student__wrapper">
        <AppNavbar />

        <div className="classes__wrapper">
          {courses.length > 0 ? (
            <ul className="allClasses">
              {courses.map(({ course_name, slug }, id) => {
                return (
                  <li key={id}>
                    <Link to={`/about-course/${slug}`}>
                      {course_name.toUpperCase()}
                    </Link>
                  </li>
                );
              })}
              <div>
                  <Button ariant="primary"><Link to="/create-course">Create a course</Link></Button>
              </div>
            </ul>
          ) : (
            <div>
              <h3>No Course Available</h3>
              <br />
              <Button>
                <Link to="/create-course"> Create a course</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;