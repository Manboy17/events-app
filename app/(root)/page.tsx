import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.action";
import { SearchParamsProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamsProps) {
  const query = searchParams.q;
  const data = await getAllEvents({ searchQuery: query });

  console.log(data);
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-1">
          <div className="flex flex-col gap-5 justify-center">
            <h1 className="h1-bold">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button className="button w-full sm:w-fit" size="lg">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="object-contain max-h-[70vh] 2xl:max-h-[80vh]"
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper py-8 flex flex-col gap-9 md:py-12"
      >
        <h2 className="h2-bold">
          Trusted by <br /> Thousands of Events
        </h2>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          <Search />
          Filter
        </div>

        <Collection
          data={data}
          emptyTitle="No Events Yet!"
          emptyTextSubtext="Become the first to host an event."
          page={1}
          limit={6}
        />
      </section>
    </>
  );
}
