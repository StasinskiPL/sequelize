"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, User }) {
      this.belongsTo(Post, { foreignKey: "postId", as: "post" });
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      // define association here
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
        postId: undefined,
      };
    }
  }
  comment.init(
    {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },

    {
      sequelize,
      tableName: "comments",
      modelName: "Comment",
    }
  );
  return comment;
};
