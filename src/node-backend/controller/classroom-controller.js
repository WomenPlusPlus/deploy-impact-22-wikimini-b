import * as dbAdapter from "../adapters/database-adapter.js";


export async function saveStudentsToRegister(studentNamesEmails, classId) {
    studentNamesEmails.forEach(student => {
        student.joinCode = Math.floor(Math.random() * 100000);
    });
    return dbAdapter.addStudentCodes(classId, studentNamesEmails);
}
