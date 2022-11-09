import * as dbAdapter from "../adapters/database-adapter.js";

export async function downloadStudentCodes(classId) {

}


export async function sendStudentCodesPerEmail(classId) {

}


export async function getJoiningStudents(classId) {

}


export async function createClassroom(username, classname) {

}


export async function saveJoiningStudents(studentNamesEmails, classId) {
    studentNamesEmails.forEach(student => {
        student.joinCode = Math.floor(Math.random() * 100000);
    });
    return dbAdapter.addStudentCodes(classId, studentNamesEmails);
}