"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { templates } from "../data/templates";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateDocument } from "../api/use-create-document";
import { useRouter } from "next/navigation";

export const TemplatesGallery = () => {
  const router = useRouter();
  const { mutate: createDocumentApi, isPending: isCreating } =
    useCreateDocument();

  const onCreateDocument = (title: string, initialContent: string) => {
    if (isCreating) return;
    createDocumentApi(
      {
        title,
        initialContent
      },
      {
        onSuccess: (data) => {
          router.push(`/docs/documents/${data.documentId}`);
        },
      },
    );
  };

  return (
    <div className="bg-[#F1F3F4]">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-y-4 px-16 py-6">
        <h3 className="font-medium">Start a new document</h3>
        <Carousel
          opts={{
            align: "start",
          }}
          className=""
        >
          <CarouselContent className="">
            {templates.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%]"
              >
                <Card className="rounded-none p-0">
                  <CardContent className="p-0">
                    <button
                      className="relative h-[250px] w-full cursor-pointer bg-cover bg-no-repeat disabled:opacity-30 xl:h-[200px]"
                      style={{
                        backgroundImage: `url(${item.imageUrl})`,
                      }}
                      onClick={() =>onCreateDocument(item.label, item.initialContent)}
                      disabled={isCreating}
                    ></button>
                  </CardContent>
                </Card>
                <p className="truncate text-sm font-medium">{item.label}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
