import {TeacherHwList} from "../models/domain-objects.js";

export async function gradeHwTask(taskId, gradings) {

}


export async function updateHwTaskStatus(taskId, newStatus, datetime) {

}


export async function editHwTask(taskId, taskWithUpdates) {

}


export async function updateArticleTitleForHwTask(articleTitle, articleUrl) {

}

export async function getHwTask(hwTaskId) {

}

export async function getGradedHwForStudent(username) {

}

export async function getDoneHwForStudent(username) {

}

export async function getLateHwForStudent(username) {

}

export async function getHwForStudent(username) {

}

// returns three lists inside the TeacherHwList() object
export async function getHwByClass(classId) {
    // return homework tasks assgined by the teacher of the class with startdate <= today and not marked as done
    // return homework assigned by teacher of class with startdate > today
    // return homework assgined by the teacher of the class with startdate <= today and marked as done
    return new TeacherHwList();
}

// add new homework task for all students in the class
export async function addNewHwTaskForClass(classId, newHwTask) {

}

// add new grading category
export async function addGradingCategory(newGradingCategory) {

}