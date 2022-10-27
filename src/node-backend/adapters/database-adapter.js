import mariadb from "mariadb";

export const pool = mariadb.createPool({
  host: 3306,
  user: "wikiuser",
  // add your password here
  password: "yourpassword",
  database: "factorydb",
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

export async function addStudentCodes(teacherUsername, className, studentCodes) {
  try {
    // queries to be tested
    const getTeacherAndClassQuery = "SELECT teachers.id, classes.id FROM teachers, classes " +
        "WHERE classes.teacherID=teacher.ID and teachers.name=" + teacherUsername + " and classes.name=" + className;
    const ids = await pool.query(getTeacherAndClassQuery);
    const {teacherID, classID} = ids.values;
    let insertStudentCodeQuery = "INSERT INTO `studentcodes`(`teacherID`,`classID`,`studentCode`) VALUES (";
    let values = "";
    studentCodes.forEach(code => {
      let row = "(" + teacherID + ", " + classID + ", " + code + "), ";
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

export async function verifyCode(studentCode) {
  if (studentCode.length !== 6) {
    throw Error("Student code has to be 6 characters long");
  }
  try {
    const checkCodeQuery = "SELECT teachers.name, classes.name FROM teachers, classes, studentcodes " +
        "WHERE teachers.id=studentcodes.teacherID and classes.id=studentcodes.classID and studentcodes.studentcode=?";
    const queryResult = await pool.query(checkCodeQuery, studentCode);
    return queryResult.values;
  } catch (error) {
    console.error("Error while checking student code: " + error);
    return error;
  }
}
