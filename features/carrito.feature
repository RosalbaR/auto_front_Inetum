Feature: Gestión del carrito de compras

  Scenario: Agregar producto al carrito
    Given el usuario inicia sesión como "standard_user" con "secret_sauce"
    When agrega el primer producto al carrito
    Then el carrito muestra 1 producto