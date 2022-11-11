export function Credentials(username = "", password = "", email = "") {
    this.username = username;
    this.password = password;
    this.email = email;
}

export function JoiningStudent(fullName, email = "No email set") {
    this.fullName = fullName;
    this.email = email;
    this.joinCode = false;
}

export const Status = {
    Created: "Created",
    Assigned: "Assigned",
    InProgress: "In Progress",
    NeedsHelp: "Needs Help",
    StudentDone: "Done",
    Grading: "Grading",
    Finished: "Finished"
};

export const Topic = {
    Language: "Language",
    Media: "Media Literacy",
    Subject: "Subject understanding"
}

export const Achievement = {
    FirstArticle: "First Article written!"
}

export function TeacherHwList(currentHw, plannedHw, pastHw) {
    this.current = currentHw;
    this.planned = plannedHw;
    this.past = pastHw;
}

export function StudentHwList(currentHw, lateHw, doneHw, gradedHw) {
    this.current = currentHw;
    this.late = lateHw;
    this.doneHw = doneHw;
    this.gradedHw = gradedHw;
}

//extend if necessary
export function HwTask(title = "New Homework",
                       description = "New homework description", teacher, student,
                       gradingCategories, startDate, dueDate) {
    this.id = -1;
    this.title = title;
    this.description = description;
    this.assignedByTeacher = teacher;
    this.assignedToStudent = student;
    this.gradingCategories = gradingCategories; // list of grading categories
    this.gradings = false; // list of gradings
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.doneDate = false;
    this.gradedDate = false;
    this.status = Status.Assigned;
    this.articleTitle = "No article selected";
}

export function Grading(gradingCategory, grade, comment) {
    this.category = gradingCategory;
    this.grade = grade;
    this.comment = comment;
}

export function GradingCategory(topic, category) {
    this.topic = topic;
    this.category = category;
}