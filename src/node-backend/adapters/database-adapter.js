import {pool} from "./database-connection.js";

// not tested yet, to do when focusing on classroom
export async function addStudentCodes(teacherUsername, className, studentCodes, studentNames) {
  try {
    // queries to be tested
    const getTeacherAndClassQuery = "SELECT teachers.id, classrooms.id FROM teachers, classrooms " +
        "WHERE classrooms.teacherUsername=teachers.username and teachers.username=" + teacherUsername + " and classrooms.name=" + className;
    const ids = await pool.query(getTeacherAndClassQuery);
    const {teacherUsername, classID} = ids.values;
    let insertStudentCodeQuery = "INSERT INTO `studentcodes`(`teacherUsername`,`classID`,`studentCode`) VALUES (";
    let values = "";
    studentCodes.forEach(code => {
      let row = "(" + teacherUsername + ", " + classID + ", " + code + "), ";
      values += row;
    });
    values.substring(0, values.length-2); // remove last comma
    values += ")"; //close bracket
    insertStudentCodeQuery += values;
    return pool.execute(insertStudentCodeQuery);
  } catch (error) {
    console.error("Error while storing student codes: " + error);
    return error;
  }
}

// pass student code and verify that it exists, hasn't expired yet and give back the teacher username (and email?) and classroom
export async function verifyCode(studentCode) {
  if (studentCode.length !== 5) {
    throw Error("Student code has to be 5 characters long");
  }
  try {
    const checkCodeQuery = "SELECT teachers.username, classrooms.name, classroomCodes.studentFullName, classroomCodes.used FROM teachers, classrooms, classroomCodes " +
        "WHERE teachers.username=classroomCodes.teacherUsername and classrooms.id=classroomCodes.classID and classroomCodes.studentJoinCode=?";
    const queryResult = await pool.query(checkCodeQuery, studentCode);
    const valid = (queryResult.length === 1) && (queryResult[0]["used"] === false);
    return {"valid": valid, "result": queryResult};
  } catch (error) {
    console.error("Error while checking student code: " + error);
    return error;
  }
}
