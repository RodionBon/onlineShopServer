import { DataTypes } from "sequelize";
import sequelize from "./sequelize";
import CartItem from "./cartItem.model";

const User = sequelize.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    encryptedPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'user',
    timestamps: false,
    underscored: true
});

User.hasMany(CartItem, { foreignKey: 'userId' });
CartItem.belongsTo(User, { foreignKey: 'userId' });

export default User;

