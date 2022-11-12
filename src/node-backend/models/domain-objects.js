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

export const Status = Object.freeze({
    Created: {id: 1, desc: "Created"},
    Assigned: {id: 2, desc: "Assigned"}, // assigned to a student
    InProgress: {id: 3, desc: "In Progress"}, // student opens the task the first time
    NeedsHelp: {id: 4, desc: "Needs Help"}, // student requests help
    StudentDone: {id: 5, desc: "Done"}, // student submits the task
    Grading: {id: 6, desc: "Grading"}, // teacher starts grading
    Finished: {id: 7, desc: "Finished"} // teacher returns graded task
});

export const Topic = Object.freeze({
    Language: {id: 1, desc: "Language"},
    Media: {id: 2, desc: "Media Literacy"},
    Subject: {id: 5, desc: "Subject understanding"}
});

export const HwType = Object.freeze({
    Write: {id:1 , desc: "Write an article about..."}
});

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
    this.status = Status.Created;
    this.articleTitle = "No article selected";
    this.hwType = HwType.Write;
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