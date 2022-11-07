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
    const checkCodeQuery = "SELECT teachers.username, classrooms.id, classroomCodes.studentFullName, classroomCodes.used FROM teachers, classrooms, classroomCodes " +
        "WHERE teachers.username=classroomCodes.teacherUsername and classrooms.id=classroomCodes.classID and classroomCodes.studentJoinCode=?";
    const queryResult = await pool.query(checkCodeQuery, studentCode);
    const valid = (queryResult.length === 1) && (queryResult[0]["used"] === false);
    return {"valid": valid, "result": queryResult};
  } catch (error) {
    console.error("Error while checking student code: " + error);
    throw error;
  }
}

export async function getTeacherEmailForClass(classId) {
  try {
    const teacherEmailQuery = "SELECT teachers.email FROM teachers, classrooms WHERE teachers.username=classrooms.teacherUsername AND classrooms.id=?";
    return await pool.query(teacherEmailQuery, classId);
  } catch (error) {
    console.error("Error while trying to retrieve teachers email for the given class: " + error);
    throw error;
  }
}

export async function markCodeAsUsed(code) {
  try {
    const updateJoinCodeAsUsed = "UPDATE `classroomcodes` SET `codeUsed`=1 WHERE `studentJoinCode`=?";
    return pool.query(updateJoinCodeAsUsed, code);
  } catch (error) {
    console.error("Error while trying to mark student signup code as used: " + error);
    throw error;
  }
}

export async function addStudent(username, fullName) {
  try {
    const insertStudentQuery = "INSERT INTO `students`(`username`, `fullName`) VALUES (?,?)";
    return pool.query(insertStudentQuery, [username, fullName]);
  } catch (error) {
    console.error("Error while trying to register student in database: " + error);
    throw error;
  }
}

export async function enrollStudentInClass(username, classId) {
  try {
    const enrollStudentQuery = "INSERT INTO `classesEnrolled`(`classId`, `username`) VALUES (?,?)";
    return pool.query(enrollStudentQuery, [classId, username]);
  } catch (error) {
    console.error("Error while trying to enroll student in class: " + error);
    throw error;
  }
}

export async function registerTeacher(username, email) {
  try {
    const insertTeacherQuery = "INSERT INTO `teachers`(`username`, `email`) VALUES (?,?)";
    return pool.query(insertTeacherQuery, [username, email]);
  } catch (error) {
    console.error("Error while trying to register teacher in database: " + error);
    throw error;
  }
}

export async function registerTeacherAuthCode(username, authCode) {
  try {
    const insertAuthCodeQuery = "INSERT INTO `teacherAuth`(`username`, `authCode`) VALUES (?,?)";
    return pool.query(insertAuthCodeQuery, [username, authCode]);
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

export async function getTeacherInfo(user) {
  try {
    const teacherUsernameQuery = "SELECT `username`, `email`, `isVerified` FROM `teachers` WHERE `teachers`.`username`=? OR `teachers`.`email`=?";
    const result = await pool.query(teacherUsernameQuery, [user, user]);
    if (result.length === 1) {
      return result[0];
    } else {
      throw Error("Error while trying to find teacher with the provided login credentials");
    }
  } catch (error) {
    console.error("Error while trying to retrieve user: " + error);
    throw error;
  }
}
