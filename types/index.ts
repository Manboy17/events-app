// user

export interface CreateUserParams {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  picture: string;
}

// user

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// event

export interface CreateEventParams {
  event: {
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDate: Date;
    endDate: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  userId: string | null | undefined;
  path: string;
}

export interface EditEventParams {
  event: {
    _id: string;
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDate: Date;
    endDate: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
}

export interface DeleteEventParams {
  eventId: string;
  path: string;
}

export interface GetEventByIdParams {
  id: string;
}

export interface GetRelatedEventsParams {
  categoryId: string;
  eventId: string;
}

export interface EventsOrganizedByUserParams {
  userId: string;
}

// categories

export interface CreateNewCategoryParams {
  categoryName: string;
}

// url params

export interface ParamsProps {
  params: {
    id: string;
  };
}
