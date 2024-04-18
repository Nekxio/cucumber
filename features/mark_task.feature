Feature: Marking a task as completed
  As a user
  I want to mark a task as completed
  So that it can be recognized as done

  Scenario: Successfully marking a task as completed
    Given I have a task with id "1"
    When I send a PATCH request to "/tasks/1" to mark as completed
    Then the task with id "1" should be marked as completed

  Scenario: Failing to mark a task as it does not exist
    Given I have no task with id "999"
    When I send a PATCH request to "/tasks/999" to mark as completed
    Then I should receive an error
