import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteConfirmation from "./DeleteConfirmation";

interface CardProps {
  event: IEvent;
  hidePrice?: boolean;
}

const Card = ({ event, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();

  let userId = sessionClaims?.userId as string;

  const isEventCreator = (userId = event.organizer._id.toString());
  return (
    <div
      className="
        relative
        flex
        flex-col
        min-h-[380px]
        w-full
        max-w-[400px]
        overflow-hidden
        rounded-xl
        bg-white
        shadow-md
        transition-all
        hover:shadow-lg
        md:min-h-[438px]
    "
    >
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500"
      />

      {isEventCreator && !hidePrice && (
        <div className="absolute top-[10px] right-[10px] flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/edit`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <Link
        href={`/events/${event._id}`}
        className="flex flex-col min-h-[230px] gap-3 p-5 md:gap-5"
      >
        {!hidePrice && (
          <div className="flex gap-3">
            <span className="p-semibold-14 w-min rounded-full px-4 py-1 bg-green-100 text-green-600">
              {event.isFree ? "FREE" : event.price}
            </span>
            <p className="p-semibold-14 w-min rounded-full px-4 py-1 bg-grey-500/10 text-grey-500">
              {event.category.name}
            </p>
          </div>
        )}

        <p className="p-medium-16 md:p-medium-18 text-grey-500">
          {formatDateTime(event.startDate).dateTime}
        </p>

        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
          {event.title}
        </p>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
