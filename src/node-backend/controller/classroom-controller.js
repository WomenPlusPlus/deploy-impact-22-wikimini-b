import * as dbAdapter from "../adapters/database-adapter.js";

export const getClassroomById = async (req, res) => {
  try {
    const { classroomId } = req.body;
    const sqlQuery = "SELECT * FROM classroomCodes WHERE classId=?";
    const rows = await pool.pool.query(sqlQuery, classroomId);
    res.status(200).json({ sucess: true, classroomCodes: rows });
  } catch (error) {
    res.status(400).send({ sucess: true, error: error.message });
  }
};

export async function downloadStudentCodes(classId) {

}


export async function sendStudentCodesPerEmail(classId) {

}


export async function getJoiningStudents(classId) {
    return dbAdapter.getStudentCodes(classId);
}


export async function createClassroom(username, classname) {
    const queryResult = await dbAdapter.createClassroom(username, classname);
    if (queryResult['warningStatus'] === 0) {
        return Number(queryResult['insertId']);
    } else {
        throw Error("Error while trying to create new classroom");
    }
}


export async function saveJoiningStudents(studentNamesEmails, classId) {
    studentNamesEmails.forEach(student => {
        student.joinCode = Math.floor(Math.random() * 100000);
    });
    return dbAdapter.addStudentCodes(classId, studentNamesEmails);
}
