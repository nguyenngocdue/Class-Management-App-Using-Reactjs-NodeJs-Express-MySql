import React, { useEffect } from "react";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";
import { Link, withRouter, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteClass } from "../../store/actions/classActions";
import "../../styles.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

function ViewClass() {
  const history = useHistory();
  const dispatch = useDispatch();
  let { slug: s_slug } = useParams();
  console.log(s_slug)

  const { students } = useSelector((state) => state.stu);
  const { classes, deleted } = useSelector((state) => state.cla);
  const classDetail = classes.filter(({ slug }) => slug == s_slug)[0];
  console.log(classes);
  console.log(classDetail);

  const numOfStudents = students.filter(
    ({ student_class }) => student_class == classDetail.class_name
  );

  const notify = () => toast.success("Success Delete Class!");


  const onDelete = (uid) => {
    dispatch(deleteClass(uid));
    toast.success("Success Delete Class!");
    // setTimeout(() => history.push("/"), 5000)
  };

  // Go back path="/classes" after you have deleted
  useEffect(() => {
    if (deleted) {
      window.location.href = "/classes";
    }
  }, [deleted]);

  return (
    <div className="container">
      <AppNavbar />
      <div className="one__student">
        {classDetail ? (
          <>
            <div className="one__student__left">
              <img src={avatar} />

              <h1>{classDetail.class_name.toUpperCase()}</h1>
            </div>
            <div className="one__student__right">
              <h2 className="class__info" > Class Information</h2>
              <ul>
                <li>
                  <span>Name</span>: {classDetail.class_name.toUpperCase()}
                </li>
                <li>
                  <span>Number of Students </span>:
                  {numOfStudents.length > 0 ? (
                    numOfStudents.length
                  ) : (
                    <span style={{ color: "red", marginLeft: "10px" }}>
                      No student attached to this class
                    </span>
                  )}
                </li>
                <li>
                  <span>Participating Students</span>:
                  <ol style={{ marginTop: "14px" }}>
                    {numOfStudents.map(({ student_name }) => (
                      <li>
                        <span
                          style={{
                            color: "green",
                            marginLeft: "10px",
                            textTransform: "capitalize",
                            fontSize: "12px",
                          }}
                        >
                          {student_name.toUpperCase()}
                        </span>
                      </li>
                    ))}
                  </ol>
                </li>
              </ul>

              <div className="one__actions">
                <Link className="btn btn-primary" to={`/class/update/${classDetail.slug}`}>
                  Update student records <i class='fas fa-pen-alt'> </i>
                </Link>

                <button
                  className="btn-delete btn btn-danger"
                  onClick={() => onDelete(classDetail.class_id)}
                >
                  Delete Class <i class='fas fa-trash-alt'></i>
                </button>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  theme = "colored"
                 />
              </div>
            </div>
          </>
        ) : (
          <h3>Record Unavailable for Student</h3>
        )}
      </div>
    </div>
  );
}

export default withRouter(ViewClass);