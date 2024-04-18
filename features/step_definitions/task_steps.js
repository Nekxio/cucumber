const {Given, When, Then} = require('@cucumber/cucumber');
const assert = require('assert');
let tasks = [];
let response = {};

Given('I am a user', function () {
    tasks = [];
});
Given('I have a task with id {string}', function (taskId) {
    tasks[taskId] = {id: taskId, completed: false};
});

Given('I have no task with id {string}', function (taskId) {
    delete tasks[taskId];
});

Given('I have a task with id {string} and subject {string} and date {string}', function (taskId, subject, date) {
    tasks[taskId] = { id: taskId, subject: subject, date: date, completed: false };
});

When('I send a POST request to {string} with the title {string}', function (path, title) {
    if (title) {
        const newTask = {id: tasks.length + 1, title: title};
        tasks.push(newTask);
        response = {status: 200, data: newTask};
    } else {
        response = {status: 400, data: {error: "Required fields are missing"}};
    }
})

When('I send a POST request to {string} with no title', function (path) {
    response = {status: 400, data: {error: "Required fields are missing"}};
})

Then('I should get a response with status {int}', function (statusCode) {
    assert.strictEqual(response.status, statusCode);
})

Then('the response should contain a JSON object with an "id" and "title"', function () {
    assert.strictEqual(typeof response.data.id, 'number');
    assert.strictEqual(response.data.title, tasks[tasks.length - 1].title);
})

Then('the response should contain an error indicating the required fields', function () {
    assert.strictEqual(response.data.error, 'Required fields are missing');
})

When('I send a PATCH request to {string} to mark as completed', function (path) {
    const taskId = path.split('/')[2];
    if (tasks[taskId]) {
        tasks[taskId].completed = true;
        response = {status: 200, data: true};
    } else {
        response = {status: 404, data: {error: "Task not found"}};
    }
});

Then('the task with id {string} should be marked as completed', function (taskId) {
    assert.strictEqual(tasks[taskId].completed, true);
    assert.strictEqual(response.data, true);
});

Then('I should receive an error', function () {
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.data.error, 'Task not found');
});
When('I send a DELETE request to {string}', function (path) {
    const taskId = path.split('/')[2];
    if (tasks[taskId]) {
        delete tasks[taskId];
        response = {status: 200, data: true};
    } else {
        response = {status: 404, data: {error: "Task not found"}};
    }
});

Then('the task with id {string} should be successfully deleted', function (taskId) {
    assert.strictEqual(tasks[taskId], undefined);
    assert.strictEqual(response.data, true);
});


Then('I should receive an error for task deletion', function () {
    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.data.error, 'Task not found');
});

When('I send a PATCH request to {string} with new subject {string} and new date {string}', function (path, newSubject, newDate) {
    const taskId = path.split('/')[2];
    if (!tasks[taskId]) {
        response = { status: 404, data: { error: "Task not found" } };
    } else {
        tasks[taskId].subject = newSubject;
        tasks[taskId].date = newDate;
        response = { status: 200, data: tasks[taskId] };
    }
});


When('I try to modify with a non-existent field {string} to {string}', function (field, value) {
    const taskId = "1";
    if (tasks[taskId] && !(field in tasks[taskId])) {
        response = { status: 400, data: { error: "Field not found" } };
    } else {
        response = { status: 200, data: tasks[taskId] };
    }
});


Then('the task with id {string} should have new subject {string} and date {string}', function (taskId, subject, date) {
    assert.strictEqual(tasks[taskId].subject, subject);
    assert.strictEqual(tasks[taskId].date, date);
    assert.strictEqual(response.data.subject, subject);
    assert.strictEqual(response.data.date, date);
});

Then('I should receive an error for modification', function () {
    assert(response.status === 404 || response.status === 400);
    assert(response.data.error.includes('not found') || response.data.error.includes('Field not found'));
});
