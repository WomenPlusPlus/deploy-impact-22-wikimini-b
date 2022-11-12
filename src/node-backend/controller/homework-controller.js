import {GradingCategory, HwTask, HwType, Status, TeacherHwList, Topic} from "../models/domain-objects.js";
import * as dbAdapter from "../adapters/database-adapter.js";

const dbNull = null;

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
    const hwType = Object.keys(HwType).find(k => HwType[k]['id'] === result[0]['type']);
    const doneDate = result[0]['donedate'] === dbNull ? false : result[0]['donedate'];
    const gradedDate = result[0]['gradeddate'] === dbNull ? false : result[0]['gradeddate'];
    const status = Object.keys(Status).find(k => Status[k]['id'] === result[0]['status']);
    const article = result[0]['concernsArticle'] === dbNull ? false : result[0]['concernsArticle'];
    const gradingCategories = [];
    for (let i = 0; i < result.length; i++) {
        gradingCategories[i] = result[i]['categoryId'];
    }
    const task = new HwTask(result[0]['title'], result[0]['description'],
        result[0]['assignedByTeacher'], result[0]['assignedToStudent'],
        gradingCategories, result[0]['startdate'],result[0]['duedate']);
    task.id = result[0]['taskId'];
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
        const task = new HwTask(newHwTask.title, newHwTask.description, newHwTask.assignedByTeacher,
            students[i].username, newHwTask.gradingCategories,
            newHwTask.startDate, newHwTask.dueDate);
        newHwTask.hwType = HwType.Write;
        newHwTask.status = Status.Assigned;
        createdTasks[i] = task;
    }
    return dbAdapter.insertNewHwTasks(createdTasks);
}

// add new grading category
export async function addGradingCategory(topicId, gradingCategoryName) {
    // const topicId = newGradingCategory.topic.id;
    // const gradingCategoryName = newGradingCategory.name;
    const result = await dbAdapter.addGradingCategory(topicId, gradingCategoryName);
    if (result['warningStatus'] === 0) {
        return Number(result['insertId']);
    } else {
        throw Error("Problem while saving new category");
    }
}

export async function getGradingCategories() {
    const dbCategories = await dbAdapter.getGradingCategories();
    const categories = [];
    for (let i = 0; i < dbCategories.length; i++) {
        const dbCat = dbCategories[i];
        categories[i] = new GradingCategory(Topic[dbCat['shortname']], dbCat['categoryId'], dbCat['category']);
    }
    return categories;
}