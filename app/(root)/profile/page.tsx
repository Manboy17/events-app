import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { eventsOrganizedByUser } from "@/lib/actions/event.action";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const organizedEvents = await eventsOrganizedByUser({ userId });

  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
      <div className="wrapper flex-between flex-col sm:flex-row gap-5">
        <h2 className="h2-bold">Events Organized</h2>
        <Button className="button sm:w-fit" size="lg">
          <Link href="/events/create">Create New Event</Link>
        </Button>
      </div>

      <div className="wrapper py-8">
        <Collection
          data={organizedEvents}
          emptyTitle="Not Events has been created yet!"
          emptyTextSubtext="Go now and create one"
          page={1}
          limit={6}
        />
      </div>
    </section>
  );
};

export default ProfilePage;
