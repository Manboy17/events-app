import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";
import React from "react";

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper text-center sm:text-left h2-bold">
          Create Event
        </h3>
      </section>

      <section className="wrapper py-8">
        <EventForm type="Create" userId={userId} />
      </section>
    </>
  );
};

export default CreateEvent;
