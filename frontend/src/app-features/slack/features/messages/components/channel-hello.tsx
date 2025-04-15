import { format } from "date-fns";

type ChannelHelloProps = {
  name: string;
  createdAt: string;
};

export const ChannelHello = ({ name, createdAt }: ChannelHelloProps) => {
  return (
    <div className="px-5">
      <h3 className="font-bold text-3xl">#{name}</h3>
      <p className="text-muted-foreground">
        This channel was created on {format(createdAt, "MMMM do, yyyy")}. This
        is the very beginning of the{" "}
        <span className="font-bold"> {name} </span> Channel
      </p>
    </div>
  );
};
