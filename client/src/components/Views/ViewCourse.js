import React, { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse } from "../../store/actions/classActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

function ViewCourse() {
  let { slug: s_slug } = useParams();
  const dispatch = useDispatch();

  const { courses, deleted } = useSelector((state) => state.cou);
  const courseDetail = courses.filter(({ slug }) => slug == s_slug)[0];
  const { students } = useSelector((state) => state.stu);
  const [courseStudents, setCourseStudents] = useState("");

  console.log(courseDetail, "courseDetail")

  console.log(students, "students")
  console.log(courseDetail.course_name, "courseDetail.course_name")

  const onDelete = (id) => {
    toast.success("Successfully deleted a course")
    dispatch(deleteCourse(id));
  }
   

  // Duyệt để đưa ra thằng học khóa học này
  useEffect(() => {
    if (courseDetail) {
      const studentList = students
        .map(({ student_course, student_name }) => {
          if (student_course.includes(courseDetail.course_name)) {
            return student_name.toUpperCase();
          }
        })
        .filter((student) => student != undefined);

      setCourseStudents(studentList);
    }
  }, [courseDetail]);

  useEffect(() => {
    if (deleted) {
      window.location.href = "/courses";
    }
  }, [deleted]);

  return (
    <div className="container">
      <AppNavbar />
      <div className="one__student">
        {courseDetail ? (
          <>
            <div className="one__student__left">
              <img src={avatar} />

              <h1>{courseDetail.course_name.toUpperCase()}</h1>
            </div>
            <div className="one__student__right">
              <ul>
                <li>
                  <span>Name</span>: {courseDetail.course_name.toUpperCase()}
                </li>
                <li>
                  <h3>Course Students</h3>

                  {courseStudents.length > 0 ? (
                    <ol>
                      {courseStudents.map((c) => (
                        <li>{c}</li>
                      ))}
                    </ol>
                  ) : (
                    <div>
                      <h6>No Students Assigned Yet</h6>
                    </div>
                  )}
                </li>
              </ul>

              <div className="one__actions">
                <Link
                  className="btn btn-primary"
                  to={`/course/update/${courseDetail.slug}`}
                >
                  Update Course <i class="fas fa-pen-alt"> </i>
                </Link>

                <button
                  className="btn-delete btn btn-danger"
                  onClick={
                    (console.log(
                      courseDetail.course_id,
                      "courseDetail.course_id"
                    ),
                    () => {
                      onDelete(courseDetail.course_id);
                    })
                  }
                >
                  <ToastContainer position="top-right" autoClose={5000}  theme="colored"/>
                  Delete Course <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </>
        ) : (
          <h3>Record Unavailable for Course</h3>
        )}
      </div>
    </div>
  );
}

export default ViewCourse;