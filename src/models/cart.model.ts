import { DataTypes } from "sequelize";
import sequelize from "./sequelize";
import CartItem from "./cartItem.model";

const Cart = sequelize.define('cart', {
    userId: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
}, {
    tableName: 'cart',
    timestamps: false,
    underscored: true
});

Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

export default Cart;

