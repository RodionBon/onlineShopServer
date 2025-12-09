import { DataTypes } from "sequelize";
import sequelize from "./sequelize";
import CartItem from "./cartItem.model";

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    itemsLeft: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
}, {
    tableName: 'product',
    timestamps: false,
    underscored: true
});

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

export default Product;

