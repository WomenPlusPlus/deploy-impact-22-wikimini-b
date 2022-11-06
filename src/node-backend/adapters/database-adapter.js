import {pool} from "./database-connection.js";

export async function addStudentCodes(classId, studentInfos) {
  try {
    let insertStudentCodeQuery = "INSERT INTO `classroomcodes`(`classID`,`studentJoinCode`,`studentFullName`,`parentEmail`) VALUES ";
    let values = "";
    studentInfos.forEach(student => {
      let row = "('" + classId + "', '" + student.joinCode + "', '" + student.fullName + "', '" + student.email + "'), ";
      values += row;
    });
    values  = values.slice(0, -2); // remove last comma
    insertStudentCodeQuery += values;
    return pool.query(insertStudentCodeQuery);
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
