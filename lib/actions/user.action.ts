"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Order from "../database/models/order.mode";
import Event from "../database/models/event.model";
import { revalidatePath } from "next/cache";

export async function createUser(params: CreateUserParams) {
  try {
    await connectToDatabase();

    const { clerkId, email, username, firstName, lastName, picture } = params;

    const user = await User.create({
      clerkId,
      email,
      username,
      firstName,
      lastName,
      picture,
    });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(clerkId: string, params: UpdateUserParams) {
  try {
    await connectToDatabase();

    const { username, firstName, lastName } = params;

    const user = {
      username,
      firstName,
      lastName,
    };

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink relationships
    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),

      // Update the 'orders' collection to remove references to the user
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } }
      ),
    ]);

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.log(error);
  }
}
