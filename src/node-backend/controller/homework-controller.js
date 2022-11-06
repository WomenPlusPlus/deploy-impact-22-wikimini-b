import {TeacherHwList} from "../models/domain-objects.js";

export async function addArticleUrlToHwTask(articleTitle, articleUrl) {

}

export async function getArticleUrlForHwTask(hwTaskId) {

}

export async function getGradedHwForStudent(username) {

}

export async function getDoneHwForStudent(username) {

}

export async function getLateHwForStudent(username) {

}

export async function getCurrentHwForStudent(username) {

}

// returns three lists inside the TeacherHwList() object
export async function getHwByClass(classId) {
    // return homework tasks assgined by the teacher of the class with startdate <= today and not marked as done
    // return homework assigned by teacher of class with startdate > today
    // return homework assgined by the teacher of the class with startdate <= today and marked as done
    return new TeacherHwList();
}

// add new homework task for all students in the class
export async function addNewHwTask(classId, newHwTask) {

}

// add new grading category
export async function addGradingCategory(topic, newGradingCategory) {

}