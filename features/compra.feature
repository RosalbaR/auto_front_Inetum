Feature: Proceso de compra

  Scenario: Completar compra con usuario estándar
    Given el usuario inicia sesión como "standard_user" con "secret_sauce"
    And agrega el primer producto al carrito
    When inicia el proceso de compra
    And completa los datos de envío
    Then ve el mensaje de confirmación de compranpm install
