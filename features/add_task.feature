Feature: Task management
  As a user
  I want to be able to add a task
  So that it can be displayed in the task list

  Scenario: Add a task with correct details
    Given I am a user
    When I send a POST request to "/tasks" with the title "Buy milk"
    Then I should get a response with status 200
    And the response should contain a JSON object with an "id" and "title"

  Scenario: Attempt to add a task without a title
    Given I am a user
    When I send a POST request to "/tasks" with no title
    Then I should get a response with status 400
    And the response should contain an error indicating the required fields
