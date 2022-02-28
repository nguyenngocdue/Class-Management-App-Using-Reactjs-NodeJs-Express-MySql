import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import {deleteStudent} from "../../store/actions/studentActions";
import { useParams} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';


const Students = () => {
  const { students } = useSelector((state) => state.stu);
  const { courses } = useSelector((state) => state.cou);
  const { classes } = useSelector((state) => state.cla);

  const dispatch = useDispatch();
  const onDelete = (uid) => dispatch(deleteStudent(uid));

  const [show, setShow] =useState(false);

  function  rederStudent (idElement){
    var getItemStudent = document.querySelector(".tr-item-" + idElement);
    if (getItemStudent) {
      getItemStudent.remove();
    }
  }


  return (
    <div className="container">
      <div className="student__wrapper students__cover">
        <AppNavbar />

        {students.length > 0 && courses.length > 0 && classes.length > 0 ? (
          <table className="table table-striped table-dark ">
            <thead className="py-4 bg-dark text-light rounded ">
              <th>NAME</th>
              <th>AGE</th>
              <th>CLASS</th>
              <th>COURSES</th>
              <th></th>
              <th></th>
            </thead>
            <tbody id="tbody" className="scrollbar set_width">
              {students.map(
                (
                  {
                    student_name,
                    student_age,
                    student_class,
                    student_course,
                    slug,
                  },
                  id
                ) => {
                  const studentCourses = student_course.split(",");
                  // console.log(studentCourses)

                  return (
                    <tr key={id} id={id} className={`tr-item-${id}`}>
                      <td>
                        <Link to={`/student/${slug}`} style={{textDecoration: 'none'}} >
                          {student_name.toUpperCase()}
                        </Link>
                      </td>
                      <td>{student_age}</td>
                      <td>{student_class.toUpperCase()}</td>
                      <td>
                        <select value="">
                          <option defaultValue="1">Courses</option>
                          {studentCourses.map((_, id) => (
                            <option value="2">{_.toUpperCase()}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn-delete btn btn-danger"
                          key={id}
                          id = {id}
                          onClick={() => {
                            var idElement = id;
                            var getUidStudent = students[idElement].uid;
                            onDelete(getUidStudent);
                            setShow (toast.success("Successfully deleted a student"));
                            rederStudent(idElement);
                          }}
                        >
                          Delete <i class="fas fa-trash-alt"></i>
                        </button>
                        <ToastContainer
                          position="top-right"
                          autoClose={5000}
                          theme="colored"
                        />
                      </td>

                      <td>
                        <Link to={`/student/${slug}`}>
                          <Button ariant="primary" >
                            Edit <i class="fas fa-edit"> </i>{" "}
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        ) : (
          <div style={{ paddingLeft: "10px" }}>
            <h4>Please complete the following to manage students</h4>
            <ul>
              {courses.length < 1 ? (
                <li>
                  <Link to="/create-course"> Create a course</Link>
                </li>
              ) : null}
              {classes.length < 1 ? (
                <li>
                  <Link to="/create-class">Create a Class</Link>
                </li>
              ) : null}
              {classes.length > 0 && courses.length > 0 ? (
                <li style={{ listStyle: "none" }}>
                  <Link to="/create-student">
                    <Button ariant="primary">
                      <i class="fas fa-plus"></i> Add a Student
                    </Button>
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
          
        )}
      <div className="btn-add-student">
        <Button variant="outline-warning"> <Link style={{textDecoration: "none", color: "blue"}} to="/create-student"> Add a student <i class='fas fa-plus' style={{color: "white"}} > </i></Link></Button>
      </div>
      </div>
    </div>
  );
};

export default Students;