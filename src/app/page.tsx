import {Button} from "@/components/ui/button";
import {InputCard} from "@/components/test/InputCard";

export default function Home() {
  return (
      <div>
        <h1>Home Page</h1>
        <div className="flex flex-col p-4 gap-2">
            <div>
              <Button
                  variant="outline"
                  size="default"
              >
                  Shadcn 버튼
              </Button>
            </div>
            <div>
                <InputCard />
            </div>
        </div>
      </div>
  );
}
