import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


/* Actions */
import { createStudent } from "../../store/actions/studentActions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function MultipleSelectCheckmarks() {
  const dispatch = useDispatch();
  const [personName, setPersonName] = React.useState([]);
//   console.log(personName)


    const onSubmit = (e) => {
        e.preventDefault();

        let courseStudents = [];
        // const tags = document.querySelectorAll(".tagify__tag");
        // for (var i = 0; i <= tags.length; i++) {
        //   if (tags[i]) {
        //     courseStudents.push(tags[i].getAttribute("value"));
        //   }
        // }
        console.log(courseStudents, "course students")

        dispatch(
        createStudent({
            courses: courseStudents,
        })
        );
    };



  const { courses } = useSelector((state) => state.cou);
  const courseList = courses.map((c) => c.course_name.toUpperCase());

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Assign Courses</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {courseList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
