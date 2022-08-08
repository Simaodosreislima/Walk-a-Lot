const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username is already taken"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      /*  match: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
         "Please input a valid password between 6 and 16 chars, with upper and lower case characters and special characters"], */
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Please use a valid email address"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    /*     profileImg: {
          type: String,
          default: "",
        },
        walkCards:
          [{ type: Schema.Types.ObjectId, ref: "Card" }], */

    //missing card array - returns cards that user has created

  },

  {

    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
