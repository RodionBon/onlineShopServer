import { DataTypes } from "sequelize";
import sequelize from "./sequelize";
import OrderItem from "./orderItem.model";


const Order = sequelize.define('order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'order',
    timestamps: false,
    underscored: true
});

Order.hasMany(OrderItem);


export default Order;
