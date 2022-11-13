import { pool } from "./database-connection.js";

const selectHwTaskQueryTemplate = "SELECT taskId as 'taskId', tasks.title, tasks.description, tasks.type, tasks.assignedToStudent, " +
    "tasks.assignedByTeacher, date(tasks.startdate) as 'startdate', date(tasks.duedate) as 'duedate', " +
    "date(tasks.donedate) as 'donedate', date(tasks.gradeddate) as 'gradeddate', tasks.status, " +
    "tasks.concernsArticle, categories.id as 'categoryId' FROM tasks, categories, taskCategories " +
    "WHERE tasks.id=taskCategories.taskId AND taskCategories.categoryId=categories.id";

export async function addStudentCodes(classId, studentInfos) {
  try {
    let insertStudentCodeQuery =
      "INSERT INTO `classroomcodes`(`classID`,`studentJoinCode`,`studentFullName`,`parentEmail`) VALUES ";
    let values = "";
    studentInfos.forEach((student) => {
      let row =
        "('" +
        classId +
        "', '" +
        student.joinCode +
        "', '" +
        student.fullName +
        "', '" +
        student.email +
        "'), ";
      values += row;
    });
    values = values.slice(0, -2); // remove last comma
    insertStudentCodeQuery += values;
    return pool.query(insertStudentCodeQuery);
  } catch (error) {
    console.error("Error while storing student codes: " + error);
    return error;
  }
}

// pass student code and verify that it exists, hasn't expired yet and give back the teacher username (and email?) and classroom
export async function verifyCode(studentCode) {
  if (studentCode.length !== 5) {
    throw Error("Student code has to be 5 characters long");
  }
  try {
    const checkCodeQuery =
      "SELECT teachers.username, classrooms.id, classroomCodes.studentFullName, classroomCodes.used FROM teachers, classrooms, classroomCodes " +
      "WHERE teachers.username=classroomCodes.teacherUsername and classrooms.id=classroomCodes.classID and classroomCodes.studentJoinCode=?";
    const queryResult = await pool.query(checkCodeQuery, studentCode);
    const valid = queryResult.length === 1 && queryResult[0]["used"] === false;
    return { valid: valid, result: queryResult };
  } catch (error) {
    console.error("Error while checking student code: " + error);
    throw error;
  }
}

export async function getTeacherForClass(classId) {
  try {
    const teacherEmailQuery =
      "SELECT teachers.username, teachers.email FROM teachers, classrooms WHERE teachers.username=classrooms.teacherUsername AND classrooms.id=?";
    const teacherInfo = await pool.query(teacherEmailQuery, classId);
    return teacherInfo[0];
  } catch (error) {
    console.error(
      "Error while trying to retrieve teacher information for the given class: " +
        error
    );
    throw error;
  }
}

export async function markCodeAsUsed(code) {
  try {
    const updateJoinCodeAsUsed =
      "UPDATE `classroomcodes` SET `codeUsed`=1 WHERE `studentJoinCode`=?";
    return pool.query(updateJoinCodeAsUsed, code);
  } catch (error) {
    console.error(
      "Error while trying to mark student signup code as used: " + error
    );
    throw error;
  }
}

export async function addStudent(username, fullName) {
  try {
    const insertStudentQuery =
      "INSERT INTO `students`(`username`, `fullName`) VALUES (?,?)";
    return pool.query(insertStudentQuery, [username, fullName]);
  } catch (error) {
    console.error(
      "Error while trying to register student in database: " + error
    );
    throw error;
  }
}

export async function enrollStudentInClass(username, classId) {
  try {
    const enrollStudentQuery =
      "INSERT INTO `classesEnrolled`(`classId`, `username`) VALUES (?,?)";
    return pool.query(enrollStudentQuery, [classId, username]);
  } catch (error) {
    console.error("Error while trying to enroll student in class: " + error);
    throw error;
  }
}

export async function registerTeacher(username, email) {
  try {
    const insertTeacherQuery =
      "INSERT INTO `teachers`(`username`, `email`) VALUES (?,?)";
    return pool.query(insertTeacherQuery, [username, email]);
  } catch (error) {
    console.error(
      "Error while trying to register teacher in database: " + error
    );
    throw error;
  }
}

export async function registerTeacherAuthCode(username, authCode) {
  try {
    const insertAuthCodeQuery =
      "INSERT INTO `teacherAuth`(`username`, `authCode`) VALUES (?,?)";
    return pool.query(insertAuthCodeQuery, [username, authCode]);
  } catch (error) {
    console.error(
      "Error while trying to store teacher authentication code: " + error
    );
    throw error;
  }
}

export async function registerTeacherAsVerified(username) {
  try {
    const updateTeacherQuery =
      "UPDATE `teachers` SET `isVerified`=1 WHERE `username`=?";
    return pool.query(updateTeacherQuery, username);
  } catch (error) {
    console.error(
      "Error while trying to register teacher as verified in db: " + error
    );
    throw error;
  }
}

export async function getTeacherAuthCode(username) {
  try {
    const teacherAuthQuery =
      "SELECT `authCode` FROM `teacherAuth` WHERE `teacherAuth`.`username`=?";
    const result = await pool.query(teacherAuthQuery, username);
    if (result.length === 1) {
      return result[0]["authCode"];
    } else {
      throw Error("Error while trying to verify authentication code");
    }
  } catch (error) {
    console.error(
      "Error while trying to retrieve authentication code: " + error
    );
    throw error;
  }
}

export async function getTeacherInfo(user) {
  try {
    const teacherUsernameQuery =
      "SELECT `username`, `email`, `isVerified` FROM `teachers` WHERE `teachers`.`username`=? OR `teachers`.`email`=?";
    const result = await pool.query(teacherUsernameQuery, [user, user]);
    if (result.length === 1) {
      return result[0];
    } else {
      throw Error(
        "Error while trying to find teacher with the provided login credentials"
      );
    }
  } catch (error) {
    console.error("Error while trying to retrieve user: " + error);
    throw error;
  }
}

export async function getStudentCodesForTeacher(username) {
  try {
    const getQuery =
      "SELECT `studentJoinCode`, `parentEmail` FROM classroomcodes WHERE classId = (SELECT `id` FROM classrooms WHERE teacherUsername =?);";
    return pool.query(getQuery, username);
  } catch (error) {
    console.error(
      "Error while trying to store teacher authentication code: " + error
    );
    throw error;
  }
}

export async function getStudentsForClass(classId) {
  try {
    const getStudentsQuery = "SELECT `username` FROM classesEnrolled WHERE classId = ?;";
    return pool.query(getStudentsQuery, classId);
  } catch (error) {
    console.error(
        "Error while trying to store teacher authentication code: " + error
    );
    throw error;
  }
}

export async function insertNewHwTasks(createdTasks) {
  try {
    let insertHwTasksQuery = "INSERT INTO `tasks`(`title`, `description`, `type`, `assignedToStudent`, " +
        "`assignedByTeacher`, `startdate`, `duedate`, `status`, `concernsArticle`) VALUES ";
    const taskValueStr = "(?,?,?,?,?,?,?,?,?), ";
    const taskValues = [];
    let insertCategoriesQuery = "INSERT INTO `taskCategories`(`taskId`, `categoryId`) VALUES ";
    const catValueStr = "(?,?), ";
    const catValues = [];
    for (let i = 0; i < createdTasks.length; i++){
      const task = createdTasks[i];
      insertHwTasksQuery += taskValueStr;
      taskValues[taskValues.length] = task.title;
      taskValues[taskValues.length] = task.description;
      taskValues[taskValues.length] = task.hwType.id;
      taskValues[taskValues.length] = task.assignedToStudent;
      taskValues[taskValues.length] = task.assignedByTeacher;
      taskValues[taskValues.length] = task.startDate;
      taskValues[taskValues.length] = task.dueDate;
      taskValues[taskValues.length] = task.status.id;
      taskValues[taskValues.length] = task.articleTitle;
    }
    insertHwTasksQuery = insertHwTasksQuery.slice(0, -2); // remove last comma
    const tasksResult = await pool.query(insertHwTasksQuery, taskValues);

    const taskIDs = [];
    if (tasksResult['warningStatus'] === 0) {
      // insert categories
      for (let i = 0; i < tasksResult['affectedRows']; i++) {
        const firstTaskId = Number(tasksResult['insertId']);
        taskIDs[i] = firstTaskId + i;
        for (let j = 0; j < createdTasks[i].gradingCategories.length; j++) {
          insertCategoriesQuery += catValueStr;
          catValues[catValues.length] = taskIDs[i];
          catValues[catValues.length] = createdTasks[i].gradingCategories[j];
        }
      }
    } else {
      throw Error("Error while storing homework tasks");
    }
    insertCategoriesQuery = insertCategoriesQuery.slice(0, -2); // remove last comma
    const catResult = await pool.query(insertCategoriesQuery, catValues);
    if (catResult['warningStatus'] === 0) {
      return taskIDs;
    } else {
      throw Error("Error while storing homework task categories, please update the task categories");
    }
  } catch (error) {
    console.error("Error while storing homework tasks: " + error);
    return error;
  }
}

export function getHwTask(hwTaskId) {
  try {
    const getHwTaskQuery = selectHwTaskQueryTemplate + " AND tasks.id = ?;";
    return pool.query(getHwTaskQuery, hwTaskId);
  } catch (error) {
    console.error(
        "Error while trying to get homework task: " + error
    );
    throw error;
  }
}

export function getHwForStudent(username) {
  try {
    const getHwForStudentQuery = selectHwTaskQueryTemplate + " AND tasks.assignedToStudent = ?;";
    return pool.query(getHwForStudentQuery, username);
  } catch (error) {
    console.error(
        "Error while trying to get the assigned homework for a student: " + error
    );
    throw error;
  }
}

export function getGradingCategories() {
  try {
    const getCategoriesQuery = "SELECT categories.id as categoryId, categories.category, categories.topic, " +
        "topics.id as topicId, topics.name, topics.shortname FROM categories, topics WHERE categories.topic=topics.id;";
    return pool.query(getCategoriesQuery);
  } catch (error) {
    console.error(
        "Error while trying to retrieve grading categories: " + error
    );
    throw error;
  }
}

export function addGradingCategory(topicId, gradingCategoryName) {
  try {
    const insertCategoriesQuery = "INSERT INTO `categories`(`category`, `topic`) VALUES (?,?)";
    return pool.query(insertCategoriesQuery, [gradingCategoryName, topicId]);
  } catch (error) {
    console.error(
        "Error while trying to add grading category: " + error
    );
    throw error;
  }
}
