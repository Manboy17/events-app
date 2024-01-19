import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.action";
import { ParamsProps } from "@/types";
import React from "react";

const EditPage = async ({ params: { id } }: ParamsProps) => {
  const event = await getEventById({ id });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper text-center sm:text-left h2-bold">Edit Event</h3>
      </section>

      <section className="wrapper py-8">
        <EventForm type="Edit" event={event} />
      </section>
    </>
  );
};

export default EditPage;
