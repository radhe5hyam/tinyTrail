import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CiCalendarDate } from "react-icons/ci";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface UrlShortenerFormProps {
  longUrl: string;
  setLongUrl: (url: string) => void;
  setExpiry: (date: Date) => void;
  handleShorten: () => void;
}

const ShortUrlForm: React.FC<UrlShortenerFormProps> = ({
  longUrl,
  setLongUrl,
  setExpiry,
  handleShorten,
}) => {
  const [date, setDate] = React.useState<Date>();
  return (
    <>
      <Input
        type="text"
        placeholder="Enter long URL here"
        className="w-full max-w-md my-4 rounded-full h-12"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full max-w-md justify-start text-left font-normal my-4 rounded-full h-12",
              !date && "text-muted-foreground"
            )}
          >
            <CiCalendarDate className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP")
            ) : (
              <span>Pick an expiry date (Optional) </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-md p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button
        className="w-full max-w-md my-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={handleShorten}
      >
        Shorten it
      </Button>
    </>
  );
};

export default ShortUrlForm;
