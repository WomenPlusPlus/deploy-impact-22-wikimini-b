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
    throw error;
  }
}

export async function getTeacherEmail(teacherUsername) {
  try {
    const teacherEmailQuery = "SELECT teachers.email FROM teachers WHERE teachers.username=?";
    return pool.query(teacherEmailQuery, teacherUsername);
  } catch (error) {
    console.error("Error while trying to retrieve teachers email: " + error);
    throw error;
  }
}

export async function registerTeacher(username, email) {
  try {
    const insertTeacherQuery = "INSERT INTO `teachers`(`username`, `email`) VALUES ('" + username + "','" + email + "')";
    return pool.query(insertTeacherQuery);
  } catch (error) {
    console.error("Error while trying to register teacher in database: " + error);
    throw error;
  }
}

export async function registerTeacherAuthCode(username, authCode) {
  try {
    const insertAuthCodeQuery = "INSERT INTO `teacherAuth`(`username`, `authCode`) VALUES ('" + username + "','" + authCode + "')";
    return pool.query(insertAuthCodeQuery);
  } catch (error) {
    console.error("Error while trying to store teacher authentication code: " + error);
    throw error;
  }
}

export async function registerTeacherAsVerified(username) {
  try {
    const updateTeacherQuery = "UPDATE `teachers` SET `isVerified`=1 WHERE `username`=?";
    return pool.query(updateTeacherQuery, username);
  } catch (error) {
    console.error("Error while trying to register teacher as verified in db: " + error);
    throw error;
  }
}

export async function getTeacherAuthCode(username) {
  try {
    const teacherAuthQuery = "SELECT `authCode` FROM `teacherAuth` WHERE `teacherAuth`.`username`=?";
    const result = await pool.query(teacherAuthQuery, username);
    if (result.length === 1) {
      return result[0]["authCode"];
    } else {
      throw Error("Error while trying to verify authentication code");
    }
  } catch (error) {
    console.error("Error while trying to retrieve authentication code: " + error);
    throw error;
  }
}
