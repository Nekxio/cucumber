Feature: Deleting a task
  As a user
  I want to delete a task
  So that it can be removed from the task list

  Scenario: Successfully deleting a task
    Given I have a task with id "1"
    When I send a DELETE request to "/tasks/1"
    Then the task with id "1" should be successfully deleted

  Scenario: Failing to delete a task as it does not exist
    Given I have no task with id "999"
    When I send a DELETE request to "/tasks/999"
    Then I should receive an error for task deletion
