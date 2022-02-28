import React from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import { useSelector } from "react-redux";
import LinkButton from '../../components/linkButton/LinkButton';

/* Button */
import { Button } from 'react-bootstrap';

const Classes = () => {
  const { classes } = useSelector((state) => state.cla);

  return (
    <div className="container">
      <div className="student__wrapper">
        <AppNavbar />

        <div className="classes__wrapper">
          {classes.length > 0 ? (
            <ul className="allClasses">
              {classes.map(({ class_name, slug }, id) => {
                return (
                  <li key={id}>
                    {/* {console.log(class_name, "slug:",slug)} */}
                    <Link to={`/about-class/${slug}`}>
                      {class_name.toUpperCase()}
                    </Link>
                  </li>
                );
              })}
              <div>
                <Button ariant="primary"><Link to="/create-class">Create a class</Link></Button>
              </div>
            </ul>
          ) : (
            <div>
              <h3 style={{color : "red"}}>No Class Available</h3>
              <br />
              <Button ariant="primary">
                <Link to="/create-class">Create a class</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Classes;