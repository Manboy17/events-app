"use server";

import {
  CreateEventParams,
  DeleteEventParams,
  EditEventParams,
  GetEventByIdParams,
  GetRelatedEventsParams,
  EventsOrganizedByUserParams,
  GetAllEventsParams,
} from "@/types";
import { connectToDatabase } from "../database";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";

const getCategoryByName = async (filter: string) => {
  return await Category.findOne({ name: { $regex: filter, $options: "i" } });
};

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

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    console.log(error);
  }
}

export async function getEventById(params: GetEventByIdParams) {
  try {
    await connectToDatabase();

    const { id } = params;

    const event = await populateEvent(Event.findById(id));

    if (!event) {
      throw new Error("Event not found");
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.log(error);
  }
}

export async function getAllEvents(params: GetAllEventsParams) {
  try {
    await connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 3 } = params;

    const skipAmount = (page - 1) * pageSize;

    const searchConditions = searchQuery
      ? {
          $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { description: { $regex: searchQuery, $options: "i" } },
          ],
        }
      : {};

    const filterConditions = filter ? await getCategoryByName(filter) : null;

    const conditions = {
      $and: [
        searchConditions,
        filterConditions ? { category: filterConditions._id } : {},
      ],
    };

    const events = await populateEvent(Event.find(conditions))
      .sort({ createdAt: -1 })
      .skip(skipAmount)
      .limit(pageSize);

    if (!events) {
      throw new Error("Events not found");
    }

    const totalEvents = await Event.countDocuments(conditions);

    const totalPages = Math.ceil(totalEvents / pageSize);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages,
    };
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

export async function editEvent(params: EditEventParams) {
  try {
    await connectToDatabase();

    const { event, path } = params;

    const editEvent = await Event.findById(event._id);

    if (!editEvent) {
      throw new Error("Event not found");
    }

    const edittedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(edittedEvent));
  } catch (error) {
    console.log(error);
  }
}

export async function getRelatedEvents(params: GetRelatedEventsParams) {
  try {
    await connectToDatabase();

    const { categoryId, eventId, page, pageSize } = params;

    const skipAmount = (page - 1) * pageSize;

    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    };

    const relatedEvents = await populateEvent(Event.find(conditions))
      .skip(skipAmount)
      .limit(pageSize);

    if (!relatedEvents) {
      throw new Error("Related events not found");
    }

    const totalRelatedEvents = await Event.countDocuments(conditions);
    const totalPages = Math.ceil(totalRelatedEvents / pageSize);

    return {
      data: JSON.parse(JSON.stringify(relatedEvents)),
      totalPages,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function eventsOrganizedByUser(
  params: EventsOrganizedByUserParams
) {
  try {
    await connectToDatabase();

    const { userId } = params;

    const organizedEvents = await populateEvent(
      Event.find({ organizer: userId })
    );

    if (!organizedEvents) {
      throw new Error("Events not found");
    }

    return JSON.parse(JSON.stringify(organizedEvents));
  } catch (error) {
    console.log(error);
  }
}
