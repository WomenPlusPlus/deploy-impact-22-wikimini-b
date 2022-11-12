import {HwTask, HwType, Status, TeacherHwList} from "../models/domain-objects.js";
import * as dbAdapter from "../adapters/database-adapter.js";

export async function gradeHwTask(taskId, gradings) {

}


export async function updateHwTaskStatus(taskId, newStatus, datetime) {

}


export async function editHwTask(taskId, taskWithUpdates) {

}


export async function updateArticleTitleForHwTask(articleTitle, articleUrl) {

}

export async function getHwTask(hwTaskId) {
    const result = await dbAdapter.getHwTask(hwTaskId);
    const hwType = Object.keys(HwType).find(name => HwType[name] === result[0].type);
    const doneDate = result[0]['tasks.donedate'] === 'NULL' ? false : result[0]['tasks.donedate'];
    const gradedDate = result[0]['tasks.gradeddate'] === 'NULL' ? false : result[0]['tasks.gradeddate'];
    const status = Object.keys(Status).find(name => Status[name] === result[0].status);
    const article = result[0]['tasks.concernsArticle'] === 'NULL' ? false : result[0]['tasks.concernsArticle'];
    const gradingCategories = [];
    for (let i = 0; i < result.length; i++) {
        gradingCategories[i] = result[i]['categories.id'];
    }
    const task = new HwTask(result[0]['tasks.title'], result[0]['tasks.description'],
        result[0]['tasks.assignedByTeacher'], result[0]['tasks.assignedToStudent'],
        gradingCategories, result[0]['tasks.startdate'],result[0]['tasks.duedate']);
    task.id = hwTaskId;
    task.hwType = hwType;
    task.doneDate = doneDate;
    task.gradedDate = gradedDate;
    task.status = status;
    task.articleTitle = article;
    return task;
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
// classId, title, description, gradingCategories, startDate, dueDate
export async function addNewHwTaskForClass(classId, newHwTask) {
    // get teacher for class
    const teacherInfo = await dbAdapter.getTeacherForClass(classId);
    newHwTask.assignedByTeacher = teacherInfo['username'];
    // create a new task for each student
    const students = await dbAdapter.getStudentsForClass(classId);
    const createdTasks = [];
    for (let i = 0; i < students.length; i++){
        const task = new HwTask(newHwTask.title, newHwTask.description, newHwTask.assignedByTeacher, students[i].username, newHwTask.gradingCategories,
            newHwTask.startDate, newHwTask.dueDate);
        newHwTask.hwType = HwType.Write;
        newHwTask.status = Status.Assigned;
        createdTasks[i] = task;
    }
    return dbAdapter.insertNewHwTasks(createdTasks);
}

// add new grading category
export async function addGradingCategory(newGradingCategory) {

}