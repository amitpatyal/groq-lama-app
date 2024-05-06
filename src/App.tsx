import { useState } from "react";
import { useForm } from "react-hook-form";
import main from "./lib/groq";
import {
  CornerDownLeft,
  Loader,
  Mic,
  Paperclip,
  SquareTerminal,
  Triangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const App = () => {
  const [question, setQuestion] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const data = await main(question);
      setSummary(data);
    } catch (error) {
      console.error(error);
    } finally {
      setQuestion("");
      setIsLoading(false);
    }
  };
  return (
    <div className="grid h-screen w-full pl-[53px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="Playground"
                >
                  <SquareTerminal className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Playground
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Playground</h1>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-10 lg:col-span-4">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            {isLoading ? (
              <Loader />
            ) : (
              <Textarea
                value={summary}
                readOnly
                className="relative flex min-h-[50vh] flex-col rounded-xl bg-muted/50 lg:col-span-4"
              />
            )}
            <div className="flex-1 p-5" />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="dashboard-03-chunk-1"
            >
              <Input
                {...register("message", { required: true })}
                placeholder="Type your message here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              />
              {errors.message && (
                <p className="text-xl text-destructive mx-4 mt-2">
                  You must ask some thing.
                </p>
              )}
              <div className="flex items-center mt-2 p-3 pt-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
