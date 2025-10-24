Feature: Login de usuarios

  Scenario: Login exitoso con usuario estándar
    Given el usuario navega a la página de login
    When ingresa "standard_user" y "secret_sauce"
    Then accede a la página de productos

  Scenario: Login fallido con usuario bloqueado
    Given el usuario navega a la página de login
    When ingresa "locked_out_user" y "secret_sauce"
    Then ve un mensaje de error