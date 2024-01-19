import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";

interface CollectionProps {
  data: IEvent[];
  emptyTitle: string;
  emptyTextSubtext: string;
  page: number;
  limit: number;
  totalPages?: number;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
}

const Collection = async ({
  data,
  emptyTitle,
  emptyTextSubtext,
  page,
  limit,
  totalPages = 0,
  collectionType,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col gap-10 items-center">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event: IEvent) => {
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={event._id} className="flex justify-center">
                  <Card event={event} hidePrice={hidePrice} />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p>{emptyTextSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
