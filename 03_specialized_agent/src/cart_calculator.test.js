const { calculateTotal } = require('./cart_calculator');

describe('calculateTotal', () => {
    test('should_return_zero_when_items_are_not_an_array', () => {
        // Arrange
        const items = null;

        // Act
        const result = calculateTotal(items);

        // Assert
        expect(result).toBe(0);
    });

    test('should_return_zero_when_items_array_is_empty', () => {
        // Arrange
        const items = [];

        // Act
        const result = calculateTotal(items);

        // Assert
        expect(result).toBe(0);
    });

    test('should_use_default_tax_rate_when_tax_rate_is_omitted', () => {
        // Arrange
        const items = [{ price: 10, quantity: 1 }];

        // Act
        const result = calculateTotal(items);

        // Assert
        expect(result).toBe(12);
    });

    test('should_use_default_discount_when_discount_is_omitted', () => {
        // Arrange
        const items = [{ price: 10, quantity: 1 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(10);
    });

    test('should_calculate_subtotal_from_price_and_quantity', () => {
        // Arrange
        const items = [
            { price: 10, quantity: 2 },
            { price: 5.5, quantity: 3 },
        ];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(36.5);
    });

    test('should_default_item_price_to_zero_when_price_is_missing', () => {
        // Arrange
        const items = [{ quantity: 2 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(0);
    });

    test('should_default_item_quantity_to_one_when_quantity_is_missing', () => {
        // Arrange
        const items = [{ price: 10 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(10);
    });

    test('should_clamp_negative_prices_to_zero', () => {
        // Arrange
        const items = [{ price: -10, quantity: 2 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(0);
    });

    test('should_clamp_negative_quantities_to_zero', () => {
        // Arrange
        const items = [{ price: 10, quantity: -2 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(0);
    });

    test('should_treat_zero_quantity_as_one_when_quantity_is_falsy', () => {
        // Arrange
        const items = [{ price: 10, quantity: 0 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(10);
    });

    test('should_apply_fixed_discount_before_tax', () => {
        // Arrange
        const items = [{ price: 100, quantity: 1 }];

        // Act
        const result = calculateTotal(items, 0.2, 10);

        // Assert
        expect(result).toBe(108);
    });

    test('should_clamp_discounted_subtotal_to_zero_when_discount_exceeds_subtotal', () => {
        // Arrange
        const items = [{ price: 10, quantity: 1 }];

        // Act
        const result = calculateTotal(items, 0.2, 15);

        // Assert
        expect(result).toBe(0);
    });

    test('should_apply_tax_rate_to_discounted_subtotal', () => {
        // Arrange
        const items = [{ price: 50, quantity: 2 }];

        // Act
        const result = calculateTotal(items, 0.1, 20);

        // Assert
        expect(result).toBe(88);
    });

    test('should_round_total_to_two_decimal_places', () => {
        // Arrange
        const items = [{ price: 10, quantity: 1 }];

        // Act
        const result = calculateTotal(items, 0.3333);

        // Assert
        expect(result).toBe(13.33);
    });

    test('should_return_zero_when_valid_items_have_zero_effective_value', () => {
        // Arrange
        const items = [
            { price: 0, quantity: 4 },
            { price: -5, quantity: 2 },
        ];

        // Act
        const result = calculateTotal(items, 0.2);

        // Assert
        expect(result).toBe(0);
    });
});
