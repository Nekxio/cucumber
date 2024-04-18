Feature: Modifying a task
  As a user
  I want to modify a task
  So that its details can be updated

  Scenario: Successfully modifying a task
    Given I have a task with id "1" and subject "Meeting" and date "2023-04-18"
    When I send a PATCH request to "/tasks/1" with new subject "Conference" and new date "2023-04-20"
    Then the task with id "1" should have new subject "Conference" and date "2023-04-20"

  Scenario: Error when modifying a non-existing task
    Given I have no task with id "999"
    When I send a PATCH request to "/tasks/999" with new subject "Conference" and new date "2023-04-20"
    Then I should receive an error for modification

  Scenario: Error when modifying a task with non-existent field
    Given I have a task with id "1" and subject "Meeting" and date "2023-04-18"
    When I try to modify with a non-existent field "location" to "Office"
    Then I should receive an error for modification
