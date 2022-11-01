import mariadb from "mariadb";
import * as dotenv from 'dotenv'
dotenv.config()

export const pool = mariadb.createPool({
  host: process.env.HOST,
  user: process.env.MARIA_USER,
  password: process.env.MARIA_PASS,
  database: process.env.MARIA_DATABASE,
  connectionLimit: 5,
});

// Connect and check for errors
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection lost");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connection");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
    console.error("Unknown error while initialising database connection: " + err)
  }
  if (connection) connection.release();
});

// add a list of student codes to the db, with teacher, class and student names given
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
// could be improved to give back more detail: expired/not found
export async function verifyCode(studentCode) {
  if (studentCode.length !== 5) {
    throw Error("Student code has to be 5 characters long");
  }
  try {
    const checkCodeQuery = "SELECT teachers.username, classrooms.name, classroomCodes.studentFullName, classroomCodes.used FROM teachers, classrooms, classroomCodes " +
        "WHERE teachers.username=classroomCodes.teacherUsername and classrooms.id=classroomCodes.classID and classroomCodes.studentJoinCode=?";
    const queryResult = await pool.query(checkCodeQuery, studentCode);
    const valid = (queryResult.length === 1) && (queryResult[0]["used"] === false); // is valid if there is only one corrsponding code and if it hasn't been used yet
    return {"valid": valid, "result": queryResult}; // is that good?
  } catch (error) {
    console.error("Error while checking student code: " + error);
    return error;
  }
}
