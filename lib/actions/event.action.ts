"use server";

import {
  CreateEventParams,
  DeleteEventParams,
  GetEventByIdParams,
} from "@/types";
import { connectToDatabase } from "../database";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";

const populateEvent = (value: any) => {
  return value
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

export async function createEvent(params: CreateEventParams) {
  try {
    await connectToDatabase();

    const { event, userId, path } = params;

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    console.log(error);
  }
}

export async function getEventById(params: GetEventByIdParams) {
  try {
    await connectToDatabase();

    const { id } = params;

    const event = await Event.findById(id);

    if (!event) {
      throw new Error("Event not found");
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.log(error);
  }
}

export async function getAllEvents() {
  try {
    await connectToDatabase();

    const events = await populateEvent(Event.find());

    if (!events) {
      throw new Error("Events not found");
    }

    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.log(error);
  }
}

export async function deleteEvent(params: DeleteEventParams) {
  try {
    await connectToDatabase();

    const { eventId, path } = params;

    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
