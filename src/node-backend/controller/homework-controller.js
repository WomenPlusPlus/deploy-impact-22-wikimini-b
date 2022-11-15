import {
    Achievement,
    GradingCategory,
    HwTask,
    HwType,
    Status,
    StudentHwList,
    TeacherHwList,
    Topic
} from "../models/domain-objects.js";
import * as dbAdapter from "../adapters/database-adapter.js";
import {checkForAchievement} from "../adapters/database-adapter.js";

export async function checkAchievements(username) {
    // check for achievements in database
    const queryResult = await dbAdapter.checkForAchievement(username);
    // now you need to check if what your query returns fulfills the achievement:
    // for example, if you want to know if the student has at least one finished article, and your query returns all finished articles of the student,
    // you need to check if the length of the query result is at least 1
    if (queryResult.length >= 1) {
        // achievement condition is met, so you create the object for the achievement and return it
        return [Achievement.FirstArticle];
    } else {
        // achievement condition is not met, so you return the empty list
        return [];
    }
}


export async function studentHelpRequest(username, hwTaskId, question) {

}


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
    return dbAdapter.convertDbTasks(result)[0];
}

function isCurrent(task) {
    return task.doneDate === false && new Date(task.startDate) <= Date.now() && new Date(task.dueDate) >= Date.now();
}

function isLate(task) {
    return task.doneDate === false && new Date(task.startDate) <= Date.now() && new Date(task.dueDate) < Date.now();
}

function isDone(task) {
    return task.doneDate !== false && task.gradedDate === false;
}

function isGraded(task) {
    return task.doneDate !== false && task.gradedDate !== false;
}

export async function getHwForStudent(username) {
    const result = await dbAdapter.getHwForStudent(username);
    const allHomework = dbAdapter.convertDbTasks(result);
    const current = allHomework.filter(task => isCurrent(task));
    const late = allHomework.filter(task => isLate(task));
    const done = allHomework.filter(task => isDone(task));
    const graded = allHomework.filter(task => isGraded(task));
    return new StudentHwList(current, late, done, graded);
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