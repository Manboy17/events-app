import Collection from "@/components/shared/Collection";
import { getEventById, getRelatedEvents } from "@/lib/actions/event.action";
import { formatDateTime } from "@/lib/utils";
import { ParamsProps } from "@/types";
import Image from "next/image";
import React from "react";

const EventDetails = async ({ params: { id } }: ParamsProps) => {
  const eventDetails = await getEventById({ id });

  const relatedEvents = await getRelatedEvents({
    categoryId: eventDetails.category._id,
    eventId: eventDetails._id,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={eventDetails.imageUrl}
            alt="event image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{eventDetails.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {eventDetails.isFree ? "Free" : `$${eventDetails.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {eventDetails.category.name}
                  </p>
                </div>

                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-primary-500">
                    {eventDetails.organizer.firstName}{" "}
                    {eventDetails.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="p-regular-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p>
                    {formatDateTime(eventDetails.startDate).dateOnly} -{" "}
                    {formatDateTime(eventDetails.startDate).timeOnly}
                  </p>
                  <p className="ml-1">
                    {formatDateTime(eventDetails.endDate).dateOnly} -{" "}
                    {formatDateTime(eventDetails.endDate).timeOnly}
                  </p>
                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-20">
                  {eventDetails.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">What you learn?</p>
              <p className="p-medium-16 lg:p-regular-18">
                {eventDetails.description}
              </p>
              <p className="p-medium-16 lg:p-legular-18 truncate text-primary-500 underline">
                {eventDetails.url}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper py-5 md:py-10 text-start">
        <h1 className="h3-bold pb-5 md:pb-10">Related Events</h1>
        <Collection
          data={relatedEvents}
          emptyTitle="No Events Found"
          emptyTextSubtext="Come back later"
          collectionType="All_Events"
          page={0}
          limit={0}
        />
      </section>
    </>
  );
};

export default EventDetails;
