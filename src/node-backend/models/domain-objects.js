// DomainObjects

export function Credentials(username = "", password = "", email = "") {
    this.username = username;
    this.password = password;
    this.email = email;
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
}
