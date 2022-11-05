// DomainObjects

export function Credentials(username = "", password = "", email = "") {
    this.username = username;
    this.password = password;
    this.email = email;
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

//extend if necessary
export function HwTask(title = "New Homework",
                       description = "New homework description", teacher, student,
                       gradingCategories, startDate, dueDate) {
    this.id = -1;
    this.title = title;
    this.description = description;
    this.assignedByTeacher = teacher;
    this.assignedToStudent = student;
    this.gradingCategories = gradingCategories;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.doneDate = false;
    this.gradedDate = false;
    this.status = Status.Assigned;
    this.hasArticleUrl = false;
    this.articleUrl = false;
    this.articleTitle = "No article selected";
}
