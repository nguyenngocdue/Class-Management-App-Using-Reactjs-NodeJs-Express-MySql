import React, { useEffect } from "react";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";
import { Link, withRouter, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent } from "../../store/actions/studentActions";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

function ViewStudent() {
  let { slug: s_slug } = useParams(); // kết nối URL và lấy 1 phần của URL làm tham số 
  const dispatch = useDispatch();
  console.log(s_slug, "__slug")


  const { students, deleted } = useSelector((state) => state.stu);
  const studentDetail = students.filter(({ slug }) => slug == s_slug)[0];
  const totalCourse = studentDetail.student_course.split(" ").length;

  console.log(studentDetail, "studentDetail")

  const onDelete = (uid) => {
    toast.success("Successfully deleted a student")
    dispatch(deleteStudent(uid));
  };


  useEffect(() => {
    if (deleted) {
      window.location.href = "/students";
    }
  }, [deleted]);

  return (
    <div className="container">
      <AppNavbar />
      <div className="one__student">
        {studentDetail ? (
          <>
            <div className="one__student__left">
              <img src={avatar} />

              <h1>{studentDetail.student_name.toUpperCase()}</h1>
            </div>
            <div className="one__student__right">
              <ul>
                <li>
                  <span>Name</span>: {studentDetail.student_name.toUpperCase()}
                </li>
                <li>
                  <span>Age</span>: {studentDetail.student_age}
                </li>
                <li>
                  <span>Class</span>:{studentDetail.student_class.toUpperCase()}
                </li>
                <li>
                  <span>Courses</span>:
                  {studentDetail.student_course.toUpperCase()}
                </li>
                <li>
                  <span>Total Number Courses</span>:{totalCourse}
                </li>
              </ul>

              <div className="one__actions">
                <Link className="btn btn-primary" to={`/student/update/${studentDetail.slug}`}>
                  Update student records <i class='fas fa-pen-alt'> </i>
                </Link>

                <button
                  className="btn-delete btn btn-danger"
                  onClick={
                    console.log(studentDetail.student_id, "studentDetail.student_id"),
                    () => onDelete(studentDetail.uid)}
                >
                  Delete Student <i class='fas fa-trash-alt'></i>
                </button>
                  <ToastContainer position="top-right" autoClose={5000} theme="colored" />
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

export default ViewStudent;