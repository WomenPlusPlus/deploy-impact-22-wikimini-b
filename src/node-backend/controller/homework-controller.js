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

// return homework tasks assgined by the teacher of the class with startdate <= today and not marked as done
export async function getCurrentHwByClass(classId) {

}

// return homework assigned by teacher of class with startdate > today
export async function getPlannedHwByClass(classId) {

}

// return homework assgined by the teacher of the class with startdate <= today and marked as done
export async function getPastHwByClass(classId) {

}

// add new homework task for all students in the class
export async function addNewHwTask(classId, newHwTask) {

}

// add new grading category
export async function addGradingCategory(topic, newGradingCategory) {

}